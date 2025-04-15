pipeline {
    agent any

    environment {
        CI = 'false'
        REACT_APP_API_URL= 'https://imemories.pl/api'
    }

    stages {
        stage('NPM Install') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Remove old build') {
            steps {
                sh 'sudo rm -rf /var/www/memories/*'
            }
        }

        stage('Copy build to /var/www/memories') {
            steps {
                sh 'sudo cp -r build/* /var/www/memories'
            }
        }

        stage('Restart Nginx') {
            steps {
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}
