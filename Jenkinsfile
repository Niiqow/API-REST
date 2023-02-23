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
    string(name: 'container_port', defaultValue: '3000', description: 'Puerto que usa el contenedor')
  }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
          stage('Build image') {
            steps {
                sh "/usr/local/bin/docker rm -f ${container_name}" // Elimina el contenedor si existe
                sh "/usr/local/bin/docker build -t ${image_name}:${tag_image} --file Dockerfile ."
            }
        }
         stage('Create container') {
            steps {
                sh "/usr/local/bin/docker create --name ${container_name} -p ${container_port}:3000 ${image_name}:${tag_image}"
            }
        }
         stage('Install Dependencies') {
            steps {
                sh "/usr/local/bin/docker start ${container_name}"
                sh "/usr/local/bin/docker exec -t ${container_name} npm install"
            }
        }
         stage('Lint') {
            steps {
                sh "/usr/local/bin/docker exec -t ${container_name} npm run lint"
            }
        }
        stage('Test') {
            steps {
                sh "/usr/local/bin/docker exec -t ${container_name} npm test"
            }
        }
        stage('Deploy') {
            environment {
                DB_HOST = '192.168.1.143'
                DB_PORT = '5432'
            }
            steps {
                sh "/usr/local/bin/docker start ${container_name}"
                sh "/usr/local/bin/docker exec -d ${container_name} nohup node index.js &"
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