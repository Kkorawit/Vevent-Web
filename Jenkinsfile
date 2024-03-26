pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                script {
                    sh"docker system prune -a"
                    sh"docker volume prune"
                    sh"docker images prune"
                }
            }
        }
        stage('Down Container') {
            sh"docker stop web-vevent"
            sh"docker rm web-vevent"
        }
        stage('Build Container') {
            sh"docker build --build-arg ENV_FILE=.env.development -t web-vevent-image ."
        }
    }
}