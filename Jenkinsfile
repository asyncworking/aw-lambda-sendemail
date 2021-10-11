pipeline {
    agent {
		docker {
			image 'node:14.15.0'
		}
	} 

    environment {
        LABMDA_EXE_ROLE = "arn:aws:iam::245866473499:role/AW_UAT_Verfication_Email_Lambda"
        FUNCTION_NAME = 'random-numbers'
        ZIPFILE = 'random-numbers.zip'
        //REGION= " "      #set var in Jenkins global config
    }  

    stages {
		stage('install awscli') {
			steps {
				echo "installing awscli"
				sh 'apt-get update'
				sh 'apt install python3-pip -y' 
				sh 'pip3 install awscli --upgrade'
			}
		}

		stage ('parameter store') {
			steps {
				withAWSParameterStore(credentialsId: '4b4c942f-2dd7-4c3f-a4ac-0250a775a3df',naming: 'basename', regionName: '${AW_REGION}' ){
					sh ' aws ssm get-parameters --names AW_UAT_VERIFICATION_EMAIL_ROLE --region ${AW_REGION}'
					echo "${AW_UAT_VERIFICATION_EMAIL_ROLE}"
				}
			}
		}

		// stage('Installl Zip') {
		// 			steps {
		// 				echo 'Installing zip...'
		// 				sh 'apt-get update'
		// 				sh 'apt-get install zip'
		// 			}
		// 		}

        // stage('create lambda') {
        //     steps {
        //         echo " creating lambda ${LABMDA_EXE_ROLE} ${FUNCTION_NAME} ${ZIPFILE} ${REGION} "
		// 		sh 'zip random-numbers.zip random-numbers'
		// 		withAWS(credentials: '4b4c942f-2dd7-4c3f-a4ac-0250a775a3df', region:"${REGION}") {
        //         // create lambda 
        //         sh 'aws lambda create-function --function-name "${FUNCTION_NAME}"  --runtime nodejs14.x --memory-size 128 --timeout 3 --zip-file "fileb://${ZIPFILE}" --handler "${FUNCTION_NAME}".handler --role "${LABMDA_EXE_ROLE}" --region "${REGION}" || echo "function exists"'
        //         }
        //     }
        // }
    }


    // post {
	// 	failure {
	// 		echo "failed "
	// 		emailext attachLog: true, 
	// 		body: '${DEFAULT_CONTENT}',
	// 		subject: '${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!',
	// 		replyTo: '${DEVOPS_TEAM}',
	// 		to: '${DEV}, cc:${CC_RECIPIENTS}'		
	// 	}
		
	// 	success {
	// 		echo "well done" 
	// 		emailext attachLog: false, 
	// 		body: '${DEFAULT_CONTENT}',                         
	// 		subject: '${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!',
	// 		replyTo: '${DEVOPS_TEAM}',
	// 		to: '${DEV}, cc:${CC_RECIPIENTS}'         
	// 	}

	// 	aborted {
	// 		emailext attachLog: true,
	// 		body: '${DEFAULT_CONTENT}',  
	// 		replyTo: '${DEVOPS_TEAM}',
	// 		subject: '${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!',
	// 		to: '${DEVOPS_TEAM}'
	// 	}	
	// }
}
