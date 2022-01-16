pipeline {
    agent {
       tools {nodejs "NODEJS"}
    }
     environment {
            CI = 'true'
        }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
                    steps {
                        sh 'npm run newman postman_collection.json'
                    }
                }
                stage('Deliver') {
                            steps {
                                sh 'node app.js'
                                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                                sh 'kill $(cat .pidfile)'
                            }
                        }

    }
}
