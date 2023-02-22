pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "my-app:${env.GIT_COMMIT}"
    DB_USER = credentials('db-user')
    DB_HOST = credentials('db-host')
    DB_NAME = credentials('db-name')
    DB_PASSWORD = credentials('db-password')
    DB_PORT = credentials('db-port')
  }

  stages {
    stage('Build') {
      steps {
        sh '/usr/local/bin/docker build --tag $DOCKER_IMAGE .'
      }
    }

    stage('Test') {
      steps {
        sh '/usr/local/bin/docker run --rm $DOCKER_IMAGE npm test'
      }
    }

    stage('Deploy to Test') {
      when {
        branch 'develop'
      }
      steps {
        withCredentials([string(credentialsId: 'ssh-key', variable: 'SSH_KEY')]) {
          sh '''
            ssh -o StrictHostKeyChecking=no -i $SSH_KEY user@test-server "docker stop my-app; docker rm my-app; docker pull $DOCKER_IMAGE; docker run --name my-app -d -p 80:3000 --env-file=env.list $DOCKER_IMAGE"
          '''
        }
      }
    }

    stage('Deploy to Production') {
      when {
        branch 'master'
        changeset "origin/master"
      }
      steps {
        withCredentials([string(credentialsId: 'ssh-key', variable: 'SSH_KEY')]) {
          sh '''
            ssh -o StrictHostKeyChecking=no -i $SSH_KEY user@prod-server "docker stop my-app; docker rm my-app; docker pull $DOCKER_IMAGE; docker run --name my-app -d -p 80:3000 --env-file=env.list $DOCKER_IMAGE"
          '''
        }
      }
    }
  }
}
