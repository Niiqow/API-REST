pipeline {
    agent any
    environment {
        DB_NAME = 'my-app'
        DB_USER = 'niiqow'
        DB_PASSWORD = '2212'
        DB_HOST = 'localhost'
        DB_PORT = '5432'
        PATH = "${env.PATH}:/Users/niiqow/.nvm/versions/node/v18.12.1/bin"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
       
        stage('Deploy') {
            steps {

                sh "-d nohup node index.js &"
            }
        }
        stage('Checkout Angular') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Niiqow/my-app.git']]])
            }
        }
        stage('Install Angular Dependencies') {
            steps {
                
                sh 'npm install'
                sh 'npm install -g @angular/cli'
            }
        }
   
        stage('Deploy Angular') {
            steps {
          sh "kill \$(lsof -t -i:4200)"
             sh 'ng s'
            }
        }
    }
}