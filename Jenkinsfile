pipeline {
    agent any
    options {
        timeout(time: 20, unit: 'MINUTES')
    }
    stages{
        // NPM dependencies
        stage('pull npm dependencies') {
            steps {
                sh 'npm install'
            }
        }
       
       stage('build Docker Image') {
            steps {
                script {
                    // build image
                    docker.build("mosessaah/nodejs-webapp .")
               }
            }
        }
         stage('tag Docker Image') {
            steps {
                script {
                    // tag image
                    docker.tag("mosessaah/nodejs-webapp:latest 231006079632.dkr.ecr.us-east-1.amazonaws.com/nodejs-webapp:latest")
               }
            }
        }


        stage('Trivy Scan (Aqua)') {
            steps {
                sh 'trivy image --format template --output trivy_report.html 231006079632.dkr.ecr.us-east-1.amazonaws.com/nodejs-webapp:latest'
            }
       }
        stage('Push to ECR') {
            steps {
                script{
                    //https://<AwsAccountNumber>.dkr.ecr.<region>.amazonaws.com/netflix-app', 'ecr:<region>:<credentialsId>
                    docker.withRegistry('https://231006079632.dkr.ecr.us-east-1.amazonaws.com/nodejs-webapp:latest', 'ecr:us-east-1:moses-ecr') {
                    // build image
                    def myImage = docker.build("231006079632.dkr.ecr.us-east-1.amazonaws.com/nodejs-webapp:latest")
                    // push image
                    myImage.push()
                    }
                }
            }
        }
        
    }
}
