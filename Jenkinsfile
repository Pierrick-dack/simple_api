pipeline {
    // On utilise ton agent local configuré
    agent {
        label 'Agent-DevOps'
    }

        stage('Verification & Cleanup') {
            steps {
                echo 'Vérification de l\'environnement...'
                sh 'docker --version'
                sh 'docker system prune -f'
            }
        }

        // L'ÉTAPE "Install & Test" A ÉTÉ SUPPRIMÉE ICI

        stage('Build & Push to DockerHub') {
            steps {
                echo 'Construction de l\'image Docker de l\'API...'
                sh 'docker build -t pierrickdevops/nodejs-api:v1 .'
                // sh 'npm run migrate' // À décommenter si ta BDD est déjà accessible
                // sh 'npm run seed'    // À décommenter si besoin
                sh 'npm test'
            }
        }

        stage('Build & Push to DockerHub') {
            steps {
                echo 'Construction de l\'image Docker de l\'API...'
                // Assure-toi d'avoir créé un fichier "Dockerfile" à la racine !
                sh 'docker build -t pierrickdevops/nodejs-api:v1 .'
                
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                    sh 'echo $DOCKER_PWD | docker login -u $DOCKER_USER --password-stdin'
                    echo 'Publication sur DockerHub...'
                    sh 'docker push pierrickdevops/nodejs-api:v1'
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                echo 'Déploiement de l\'API sur la VM Azure...'
                // On utilise la clé SSH qui fonctionne parfaitement !
                sh """
                ssh -o StrictHostKeyChecking=no -i /home/vboxuser/.ssh/id_ed25519 Pierrick@4.251.194.55 "
                    sudo docker pull pierrickdevops/nodejs-api:v1 && \
                    sudo docker stop mon-api || true && \
                    sudo docker rm mon-api || true && \
                    sudo docker run -d -p 3000:3000 --name mon-api pierrickdevops/nodejs-api:v1
                "
                """
            }
        }
    }
}
