pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/fredericEducentre/landing-page-example'
            }
        }
        stage('Build') {
            steps {
                echo 'Simulation du Build en cours...'
                sh 'ls -la' 
            }
        }
        stage('Deploy') {
            steps {
                echo 'Déploiement en cours sur le serveur de production...'
                // Simulation d'une copie de fichiers
                sh 'mkdir -p /tmp/production_site'
                sh 'cp index.html /tmp/production_site/'
                echo 'Le site est désormais en ligne !'
            }
        }
    }
}
