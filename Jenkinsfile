pipeline {
    agent any
        stages {
            stage('Clean') {
                steps {
                    script {
                        sh"docker system prune -af"
                        sh"docker volume prune -f"
                        sh"docker image prune -f"
                    }
                }
            }
            stage('Down Container') {
                steps{
                sh"docker stop web-vevent || true"
                sh"docker rm web-vevent || true"
                }
            }
            stage('Build Container') {
                steps{
                sh"docker build --build-arg ENV_FILE=.env.development -t web-vevent-image ."
                }
            }
            stage('Run Container') {
                steps{
                    sh"docker run -d --name web-vevent -p 3000:3000 web-vevent-image"
                }
            }
        }
}