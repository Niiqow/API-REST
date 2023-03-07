pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker')
        DOCKERHUB_IMAGE = 'niiqow/apirest'
        AZURE_MODEL = 'SOCIUSRGLAB-RG-MODELODEVOPS-DEV'
        AZURE_PLAN = 'Plan-SociusRGLABRGModeloDevOpsDockerDev'
        AZURE_NAME = 'sociuswebapptest009'
  
        
    }
      parameters {
    string(name: 'container_name', defaultValue: 'apirest', description: 'Nombre del contenedor de docker.')
    string(name: 'image_name', defaultValue: 'apirest', description: 'Nombre de la imagene docker.')
   string(name: 'tag_image', defaultValue: "tag-${new Date().format('yyyyMMddHHmmss')}", description: 'Tag de la imagen de la página.')
    string(name: 'container_port', defaultValue: '8080', description: 'Puerto que usa el contenedor')
  }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
         stage('Login to DockerHUB') {
      steps {
           sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password dckr_pat_gVpdHEJnxmBIia7tHyILm6zS05c'
      }
    }
          stage('Build image API REST') {
            steps {
                 sh "docker rm -f apirest"
                sh "docker build -t ${image_name}:${tag_image} --file Dockerfile ."
            }
        }
         stage('Create container') {
            steps {
                sh "docker create --name ${container_name} -p ${container_port}:8080 ${image_name}:${tag_image}"
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
   
  stage('Push to DockerHUB') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password dckr_pat_gVpdHEJnxmBIia7tHyILm6zS05c'
        sh "docker tag ${image_name}:${tag_image} ${DOCKERHUB_IMAGE}:${tag_image}"
        sh "docker push ${DOCKERHUB_IMAGE}:${tag_image}"
      }
    }
     stage('Deploy to Azure App Service') {
      steps {
        withCredentials(bindings: [azureServicePrincipal('Azure-Service-Principal')]) {
          sh 'az login --service-principal -u ${AZURE_CLIENT_ID} -p ${AZURE_CLIENT_SECRET} --tenant ${AZURE_TENANT_ID}'
           sh "az webapp delete -g ${AZURE_MODEL} -n ${AZURE_NAME}"
          sh "az webapp create -g ${AZURE_MODEL} -p ${AZURE_PLAN} -n ${AZURE_NAME} -i ${DOCKERHUB_IMAGE}:${tag_image}"
        }

      }
    }
    
    }
}
