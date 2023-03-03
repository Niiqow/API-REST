pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('task')
        
        DB_HOST = ''
        DB_PORT = ''
        DB_NAME = ''
        DB_USER = ''
        DB_PASSWORD = ''
        
    }
      parameters {
    string(name: 'container_name', defaultValue: 'apirest', description: 'Nombre del contenedor de docker.')
    string(name: 'image_name', defaultValue: 'niiqow/apirest', description: 'Nombre de la imagene docker.')
   string(name: 'tag_image', defaultValue: "tag-${new Date().format('yyyyMMddHHmmss')}", description: 'Tag de la imagen de la página.')
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
                sh "docker build -t ${image_name}:${tag_image} --file Dockerfile ."
            }
        }
         stage('Create container') {
            steps {
                sh "docker create --name ${container_name} -p ${container_port}:3000 ${image_name}:${tag_image}"
            }
        }
         stage('Install Dependencies') {
            steps {
                sh "docker start ${container_name}"
                sh "docker exec -t ${container_name} npm install"
            }
        }
         stage('Lint') {
            steps {
                sh "docker exec -t ${container_name} npm run lint"
            }
        }
        stage('Test') {
            steps {
                sh "docker exec -t ${container_name} npm test"
            }
        }
        stage('Deploy') {
    steps {
        sh "docker start ${container_name}"
        sh "sleep 10" // esperar 10 segundos para asegurarse que el contenedor esté completamente iniciado
        sh 'docker run -d --net="host" apirest:lts'
        sh "sleep 10" // esperar 10 segundos para asegurarse que el contenedor esté completamente iniciado
        sh "docker exec -e DB_HOST=${DB_HOST} -e DB_PORT=${DB_PORT} -e DB_NAME=${DB_NAME} -e DB_USER=${DB_USER} -e DB_PASSWORD=${DB_PASSWORD} ${container_name} node index.js&"

        sh "docker logs ${container_name}"
    }
}
  stage('Push to DockerHUB') {
      steps {
        sh "docker tag ${image_name}:${tag_image} ${image_name}:${tag_image}"
        sh "docker push ${image_name}:${tag_image}"
      }
    }
        stage('Checkout Angular') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Niiqow/my-app.git']]])
            }
        }
        

        stage('Build Image Proyect Angular'){
            steps{
            sh "if lsof -Pi :4200 -sTCP:LISTEN -t >/dev/null ; then kill \$(lsof -t -i:4200); fi"
            sh "/usr/local/bin/docker rm -f task" // Elimina el contenedor si existe
            sh "/usr/local/bin/docker create --name task -p 4200:4200 task:lts" // Crea el contenedor
           
 
               
            }
               
        }

        


stage('Build Angular App') {
    steps {
     
       sh "/usr/local/bin/docker start task"
        sh "/usr/local/bin/docker build -t task:lts --file Dockerfile ."
      
    }
}
stage('Run Docker Container') {
    steps {
        sh "if ! /usr/local/bin/docker ps -q -f name=task > /dev/null; then \
            /usr/local/bin/docker run -d --name task -p 4200:4200 -v ${WORKSPACE}/dist:/usr/share/nginx/html:ro nginx:alpine; \
            fi"
    }
}
    }
}
