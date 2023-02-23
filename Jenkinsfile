pipeline {
    agent any
    environment {
        DB_HOST = '192.168.1.143'
        DB_PORT = '5432'
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
          stage('Build image API REST') {
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
    steps {
        sh "/usr/local/bin/docker start ${container_name}"
        sh "sleep 10" // esperar 10 segundos para asegurarse que el contenedor esté completamente iniciado
        sh '/usr/local/bin/docker run -d --net="host" apirest:lts'
        sh "sleep 10" // esperar 10 segundos para asegurarse que el contenedor esté completamente iniciado
        sh "/usr/local/bin/docker exec -e DB_HOST=${DB_HOST} -e DB_PORT=${DB_PORT} -e DB_NAME=${DB_NAME} -e DB_USER=${DB_USER} -e DB_PASSWORD=${DB_PASSWORD} ${container_name} node index.js&"

        sh "/usr/local/bin/docker logs ${container_name}"
    }
}

        stage('Checkout Angular') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Niiqow/my-app.git']]])
            }
        }
        

        stage('Build Image Proyect Angular'){
            steps{
 sh "/usr/local/bin/docker rm -f task" // Elimina el contenedor si existe
                sh "/usr/local/bin/docker build -t task:lts --file Dockerfile2 ."
            }
               
        }

          stage('Create container Angular') {
            steps {
                sh "/usr/local/bin/docker create --name task -p 4200:4200 task:lts"
            }
        }

        stage('Install Angular Dependencies') {
            steps {
               
               
            

                sh "/usr/local/bin/docker start task"
                sh "/usr/local/bin/docker exec -t task npm install"
                  sh "/usr/local/bin/docker exec -t task npm install -g @angular/cli"
            }
        }
   
        stage('Deploy Angular') {
            steps {
     
          sh "kill \$(lsof -t -i:4200)"


           sh "/usr/local/bin/docker exec -t task ng s"
            }
        }
    }
}