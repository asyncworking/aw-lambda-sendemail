pipeline {
    agent {
        docker {  image 'zenika/terraform-aws-cli:latest' }
    }
    // parameters {
    //     string(name: 'environment', defaultValue: 'default', description: 'Workspace/environment file to use for deployment')
    //     string(name: 'version', defaultValue: '', description: 'Version variable to pass to Terraform')
    //     booleanParam(name: 'autoApprove', defaultValue: false, description: 'Automatically run apply after generating plan?')
    // }
    // environment {
    //     AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
    //     AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    //     TF_IN_AUTOMATION      = '1'
    // }
    stages {
        stage('git checkout'){
            steps{
                    // git credentialsId: '9d2efa7d-31f1-44d0-a5b4-3e0926e05388', url: 'https://github.com/asyncworking/aw-lambda-sendemail.git'
                    git branch: '05P3tf-jk-test', credentialsId: '9d2efa7d-31f1-44d0-a5b4-3e0926e05388', url: 'https://github.com/asyncworking/aw-lambda-sendemail.git'                    //git credentialsId: '9d2efa7d-31f1-44d0-a5b4-3e0926e05388', url: 'https://github.com/asyncworking/aw-lambda-sendemail.git'
                    // git branch: 'jk', credentialsId: '9d2efa7d-31f1-44d0-a5b4-3e0926e05388', url: 'https://github.com/asyncworking/jenkins-deploy-lambda-terraform-test.git'
                    // git branch: 'cathy-jk-tf', credentialsId: '9d2efa7d-31f1-44d0-a5b4-3e0926e05388', url: 'https://github.com/asyncworking/aw-lambda-sendemail.git'
            }
        }
        
        stage('preparation for test'){
            steps{
                  withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){ 
                      sh 'ls -a'
                    //   sh 'docker kill localstack_main'
                    //   sh 'docker rm localstack_main'
                      sh 'cat .env'
                      sh 'rm -rf aws-ses-local'
                      sh 'apt-get update'
                      sh 'apt -y install curl'
                      sh 'curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh'
                      sh 'bash nodesource_setup.sh'
                      sh 'apt install nodejs'
                      sh 'mkdir -p ~/.docker/cli-plugins/'
                      sh 'curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                      sh 'chmod +x /usr/local/bin/docker-compose'
                      sh 'docker-compose version'
                      sh 'curl -fsSL https://get.docker.com -o get-docker.sh'
                      sh 'sh get-docker.sh'
                      sh 'npm i python'
                      sh 'npm install'
                      sh 'apt-get -y install python3-pip'
                      sh 'pip install aws'
                      sh 'pip install awscli-local'
                      sh 'npm install aws-ses-local -g'
                      sh 'npm install jest'
                      sh 'chmod a+x ./end_to_end_test/setup-localtest.sh'
                  }
            }
        }
        
         stage('test'){
          
            steps{
                withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){
                            sh 'docker-compose up -d'
                            // sh 'wgeturl.sh http://localhost:4566'
                            sh 'docker ps'
                            // sh 'docker inspect'
                            // sh 'npm i python'
                            // sh 'npm install'
                            // sh 'apt-get -y install python3-pip'
                            // sh 'pip install aws'
                            // sh 'pip install awscli-local'
                            // sh 'npm install aws-ses-local -g'
                            // sh 'npm install jest'
                            // sh 'chmod a+x ./end_to_end_test/setup-localtest.sh'
                            sh 'aws-ses-local &'
                            sh 'docker run -p 127.0.0.1:4566:4566 -d localstack/localstack'
                            sh 'curl localhost:4566'
                            // // sh 'rm -rf .git'
                            // // sh 'git clone https://github.com/csi-lk/aws-ses-local.git'
                            // // sh 'ls'
                            // // sh 'cd aws-ses-local'
                            // // sh 'ls'
                            // // sh 'cp aws-ses-local/Dockerfile Dockerfile'
                            // // sh 'docker build -t mytest .'
                            // // sh 'docker run -d -P mytest'
                            // // sh 'docker run -d -p localhost:4566'
                          
                            // // sh 'docker ps'
                            // // sh 'aws-ses-local &'
                            // // sh 'date +"%T"'
                            // // sleep 20
                            // // sh 'docker ps'
                            // // sh 'jobs'
                            // // sh 'date +"%T"'
                            // sh './end_to_end_test/setup-localtest.sh'
                            // // sleep 20
                            // sh 'npm test'
                            // sh 'docker kill localstack_main'
                            // sh 'docker rm localstack_main'
                    }
            }
         }
                
                // parallel(
                //     a: {
                //         withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){
                //             sh 'docker-compose up -d'
                //         }
                //     },
                //     b: {
                //         withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){
                //             sleep 10
                //             sh 'npm install'
                //             sh 'aws-ses-local'
                //         }
                //     },
                //     c: {
                //         withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){
                            
                //             sleep 60
                //             sh './end_to_end_test/setup-localtest.sh'
                //             sh 'npm test'
                //             }
                //     }
                //     )     
                //   }
        // }
                  
                 
    //     stage('zip files') {
    //         steps{
    //             sh 'apt-get update'
    //             sh 'apt-get -y install zip'
    //             sh 'zip  lambda-jk-tf-test6.zip src/index.js node_modules/dotenv src/helpers/templateHelper.js src/helpers/emailHelper.js'
    //             sh 'ls -a'
    //             sh 'pwd lambda-jk-tf-test6.zip'
    //             withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){ 
    //             sh 'aws s3 cp lambda-jk-tf-test6.zip s3://jk-tf-s3-test6/lambda-functions/lambda-jk-tf-test6.zip'
    //             }
    //               }
    //     }
        
    //     stage('Terraform Init') {
    //         steps{
    //             sh 'terraform init'
    //               }
    //     }
    //     stage('Terraform plan') {
    //         steps{
    //             withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){  
    //                 sh 'terraform plan -out=tfplan -input=false'
    //         }
    //     }
    // }
    //     stage('Terraform apply'){
    //         steps{
    //             withAWS(credentials: 'cathyawscredentials', region:'ap-southeast-2'){
    //                 sh "terraform apply -input=false tfplan"
    //             }
    //         }            
    //     }
    }
}

//      post {
// 		failure {
// 			echo "failed "
// 			emailext attachLog: true, 
// 			body: '${DEFAULT_CONTENT}',
// 			subject: '${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!',
// 			replyTo: '${DEVOPS_TEAM}',
// 			to: 'cathy.yf.yang@gmail.com, ${DEV}, ${CC_RECIPIENTS}'		
// 		}
		
// 		success {
// 			echo "well done" 
// 			emailext attachLog: false, 
// 			body: '${DEFAULT_CONTENT}',                         
// 			subject: '${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!',
// 			replyTo: '${DEVOPS_TEAM}',
// 			to: 'cathy.yf.yang@gmail.com, ${DEV}, ${CC_RECIPIENTS}'         
// 		}
// 	}
// }                    
                       
                       
                       
      //stage('zip files2') {
         //   steps{
          //      sh '''- zipfile="bash${WORKSPACE}/builds/${BUILD_NUMBER}/jk_tf_lambda_test1.zip"
          //           - dir="./Jenkinsfile"
          //           - zip -r $zipfile.zip $dir'''
                      
         //   }
        //}


// pipeline {
//     agent {
//         docker { image 'node:14-alpine' }
//     }
//     stages {
//         stage('Test') {
//             steps {
//                 sh 'node --version'
//             }
//         }
//     }
// }
//  sh 'zip example.zip src/index.js'
                  //sh 'ls /usr/bin'
                  //zip zipFile: \'test.zip\', archive: false, dir: \'src/index.js\'
                // sh 'wget http://security.ubuntu.com/ubuntu/pool/main/a/apt/apt_1.0.1ubuntu2.17_amd64.deb -O apt.deb' 
                 // sh 'uname -a'  
                // zip zipFile: 'test.zip', dir: 'src/index.js'