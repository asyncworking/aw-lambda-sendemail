pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Building release ${RELEASE} with log level ${LOG_LEVEL}..."
            }
        }
        stage('Test') {
            steps {
                echo "Testing. I can see release ${RELEASE}, but not log level ${LOG_LEVEL}"
            }
        }
    }
}
