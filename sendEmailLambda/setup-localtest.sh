#!/bin/bash

# Create sqs queue
awslocal sqs create-queue --queue-name AWVerificationEmailBasicPP --region ap-southeast-2

awslocal sqs create-queue --queue-name AW_RECEIVE_Q --region ap-southeast-2


# Create S3 bucket
awslocal s3api create-bucket --bucket aw-email-template --region ap-southeast-2
awslocal s3 cp verification_email_template.txt s3://aw-email-template

# Delete S3 bucket force
# awslocal s3 rb s3://aw-email-template --force

# Create lambda
# In order to mount a local folder, ensure that LAMBDA_REMOTE_DOCKER is set to false then set the S3 bucket name to __local__ or BUCKET_MARKER_LOCAL if it is set, and the S3 key to your local path:
# --code S3Bucket="__local__",S3Key="/my/local/lambda/folder" 
# OR 
# zip your lambda function and use the zip instead of mount to local folder:
# zip -r new-function.zip index.js node_modules/dotenv getTemplateHelper.js sendEmailHelper.js

# delete the lambda function created before for local test
awslocal lambda delete-function --function-name lambdaSendEmail
sleep 1
# create the lambda function 
awslocal lambda create-function --function-name lambdaSendEmail \
--code S3Bucket="__local__",S3Key="$(pwd)" \
--runtime nodejs12.x \
--memory-size 128 \
--handler index.handler \
--timeout 10 \
--role anyrole

# aws lambda create-function --function-name new-function \
# --zip-file "fileb://new-function.zip" \
# --runtime nodejs12.x \
# --memory-size 128 \
# --handler index.handler \
# --timeout 10 \
# --role "sending_email_permission"

# update function code
# aws lambda update-function-code \
#     --function-name  local-function \
#     --cli-connect-timeout 600 \
#     --region ap-southeast-2 \
#     --zip-file fileb://new-function.zip
# update the lambda function configuration with env variables
awslocal lambda update-function-configuration --function-name lambdaSendEmail \
    --environment "Variables={
        region='ap-southeast-2',
        accessKeyId=test,
        secretAccessKey=test,
        sourceEmail=info@asyncworking.com,
        s3Key=verification_email_template.txt,
        s3Bucket=aw-email-template,
        sqsQueueUrl=http://localhost:4566/000000000000/AW_RECEIVE_Q,
        ses_Endpoint=http://localhost:9001,
        s3_Endpoint=http://localhost:4566,
        sqs_Endpoint=http://localhost:4566,
        }"

# awslocal lambda update-function-code --function-name lambdaSendEmail --code S3Bucket="__local__",S3Key="$(pwd)"

# the sqs event triggered the lambda execution, need mapping those two services ahead
awslocal lambda create-event-source-mapping \
    --function-name lambdaSendEmail \
    --batch-size 1 \
    --event-source-arn arn:aws:sqs:ap-southeast-2:000000000000:AWVerificationEmailBasicPP

# invoke lambda function with testing event as payload.json, execution result output as response.json
awslocal lambda invoke --function-name lambdaSendEmail --payload fileb://payload.json --invocation-type Event response.json

# sleep 1
# Delete sqs queues
# awslocal sqs delete-queue --queue-url http://localhost:4566/000000000000/AWVerificationEmailBasicPP
# awslocal sqs delete-queue --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q

# send message to sqs queue by CLI
# awslocal --endpoint-url=http://localhost:4566 sqs send-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q --message-body 'Welcome to sandbox'
# awslocal --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q
