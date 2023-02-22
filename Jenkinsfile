pipeline {
    agent any
    environment {
        DB_NAME = 'my-app'
        DB_USER = 'niiqow'
        DB_PASSWORD = '2212'
        
        PATH = "${env.PATH}:/Users/niiqow/.nvm/versions/node/v18.12.1/bin"
    }
      parameters {
    string(name: 'container_name', defaultValue: 'apirest', description: 'Nombre del contenedor de docker.')
    string(name: 'image_name', defaultValue: 'apirest', description: 'Nombre de la imagene docker.')
    string(name: 'tag_image', defaultValue: 'lts', description: 'Tag de la imagen de la página.')
    string(name: 'container_port', defaultValue: '90', description: 'Puerto que usa el contenedor')
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
                sh "/usr/local/bin/docker build -t ${image_name}:${tag_image} --file Dockerfile ."
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
            environment {
                DB_HOST = 'localhost'
                DB_PORT = '5432'
            }
            steps {
            sh "/usr/local/bin/docker rm -f ${container_name}" // Elimina el contenedor si existe
            sh "/usr/local/bin/docker run -d -p ${container_port}:80 --name ${container_name} ${image_name}:${tag_image}"
                sh 'nohup node index.js &'
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
        sh "/usr/local/bin/docker rm -f ${container_name}" // Elimina el contenedor si existe
        sh "/usr/local/bin/docker run -d -p ${container_port}:80 --name ${container_name} ${image_name}:${tag_image}"
          sh "kill \$(lsof -t -i:4200)"


             sh 'ng s'
            }
        }
    }
}