#!/bin/bash

# Create sqs queue
awslocal sqs create-queue --queue-name AWVerificationEmailBasicPP --region ap-southeast-2

awslocal sqs create-queue --queue-name AWRECEIVEQ --region ap-southeast-2


# Create S3 bucket
awslocal s3api create-bucket --bucket aw-email-template --region ap-southeast-2

awslocal s3 cp end_to_end_test/s3_bucket_local/verification_email_template.txt s3://aw-email-template

# Delete S3 bucket force
# awslocal s3 rb s3://aw-email-template --force

# Create lambda
# Zip your lambda function before deployment
zip -r new-function.zip src/index.js node_modules/dotenv src/helpers/templateHelper.js src/helpers/emailHelper.js

# delete the lambda function created before for local test
# awslocal lambda delete-function --function-name lambdaSendEmail --region ap-southeast-2

sleep 1
# create the lambda function 
awslocal lambda create-function --function-name lambdaSendEmail \
--zip-file "fileb://new-function.zip" \
--runtime nodejs12.x \
--memory-size 128 \
--handler index.handler \
--timeout 10 \
--region ap-southeast-2 \
--role anyrole

# aws lambda create-function --function-name new-function \
# --zip-file "fileb://new-function.zip" \
# --runtime nodejs12.x \
# --memory-size 128 \
# --handler index.handler \
# --timeout 10 \
# --role "arn:aws:iam::251160855904:role/service-role/sending_email_permission"

# update function code
# aws lambda update-function-code \
#     --function-name  local-function \
#     --cli-connect-timeout 600 \
#     --region ap-southeast-2 \
#     --zip-file fileb://new-function.zip
# update the lambda function configuration with env variables
awslocal lambda update-function-configuration --function-name lambdaSendEmail --region ap-southeast-2 \
    --environment "Variables={
        region='ap-southeast-2',
        accessKeyId=test,
        secretAccessKey=test,
        sourceEmail=info@asyncworking.com,
        sqsQueueUrl=https://0.0.0.0:4566/000000000000/AWRECEIVEQ,
        ses_Endpoint=https://0.0.0.0:9001,
        s3_Endpoint=https://0.0.0.0:4566,
        sqs_Endpoint=https://0.0.0.0:4566,
        }"

# awslocal lambda update-function-code --function-name lambdaSendEmail --code S3Bucket="__local__",S3Key="$(pwd)"

# the sqs event triggered the lambda execution, need mapping those two services ahead
awslocal lambda create-event-source-mapping \
    --function-name lambdaSendEmail \
    --batch-size 1 \
    --region ap-southeast-2 \
    --event-source-arn arn:aws:sqs:ap-southeast-2:000000000000:AWVerificationEmailBasicPP

# invoke lambda function with testing event as payload.json, execution result output as response.json
awslocal lambda invoke --function-name lambdaSendEmail --region ap-southeast-2 --payload fileb://end_to_end_test/payload.json --invocation-type Event response.json

# sleep 1
# Delete sqs queues
# awslocal sqs delete-queue --queue-url http://localhost:4566/000000000000/AWVerificationEmailBasicPP
# awslocal sqs delete-queue --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q

# send message to sqs queue by CLI
# awslocal --endpoint-url=http://localhost:4566 sqs send-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q --message-body 'Welcome to sandbox'
# awslocal --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q


# Todo: unit test - test message result as expected
# awslocal sqs send-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q --message-body "TestMessage" --region ap-southeast-2
# awslocal sqs receive-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q --region ap-southeast-2
