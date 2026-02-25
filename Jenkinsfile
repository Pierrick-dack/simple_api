pipeline {

    agent {
        label 'Agent-DevOps'
    }

    stages {

        stage('Verification & Cleanup') {
            steps {
                echo 'Vérification de l’environnement Docker...'
                sh 'docker --version'
                sh 'docker system prune -f'
            }
        }

        stage('Build & Test') {
            steps {
                echo 'Build de l’application et exécution des tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                echo 'Construction de l’image Docker...'
                sh 'docker build -t pierrickdevops/nodejs-api:v1 .'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PWD'
                    )
                ]) {
                    sh 'echo $DOCKER_PWD | docker login -u $DOCKER_USER --password-stdin'
                    echo 'Push de l’image vers DockerHub...'
                    sh 'docker push pierrickdevops/nodejs-api:v1'
                }
            }
        }

        stage('Deploy to Azure VM') {
            steps {
                echo 'Déploiement de l’API sur la VM Azure...'
                sh """
                ssh -o StrictHostKeyChecking=no \
                    -i /home/vboxuser/.ssh/id_ed25519 \
                    Pierrick@4.251.194.55 '
                        sudo docker pull pierrickdevops/nodejs-api:v1 &&
                        sudo docker stop mon-api || true &&
                        sudo docker rm mon-api || true &&
                        sudo docker run -d -p 3000:3000 --name mon-api pierrickdevops/nodejs-api:v1
                    '
                """
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès'
        }
        failure {
            echo '❌ Échec du pipeline'
        }
        always {
            echo '🧹 Fin du pipeline'
        }
    }
}
