#!/bin/bash

# Get the ID of the latest created container (must be LocalStack)
containerId=$(docker ps -l -q)
# Inspect the container and get IP address
localIPAddress=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $containerId)
echo "Localstack container IP is $localIPAddress"

# Create sqs queue
awslocal sqs create-queue --queue-name AWVerificationEmailBasicPP
awslocal sqs create-queue --queue-name AW_RECEIVE_Q
awslocal sqs create-queue --queue-name AWRECEIVEQ

# Create S3 bucket
awslocal s3api create-bucket --bucket aw-email-template --region ap-southeast-2
awslocal s3 cp email_template.txt s3://aw-email-template
# awslocal s3api put-bucket-cors --bucket aw-email-template --cors-configuration file://cors.json
# awslocal s3api put-bucket-acl --bucket aw-email-template --acl public-read
# aws s3api put-object-acl --bucket aw-email-template --key email_template.txt --acl bucket-owner-full-control
# awslocal s3api put-object-acl --bucket aw-email-template --key email_template.txt --acl public-read

# awslocal s3api get-bucket-cors --bucket aw-email-template
# awslocal s3api head-object --bucket aw-email-template --key email_template.txt

## Check bucket created exists
# awslocal s3api list-buckets --query "Buckets[].Name"
## Check Object created exists
# awslocal s3 ls s3://aw-email-template/email_template.txt --recursive --human-readable --summarize
## Check value of S3 Bucket key
# awslocal s3api get-object --bucket aw-email-template --key email_template.txt output.txt

sleep 1
# Create lambda
# In order to mount a local folder, ensure that LAMBDA_REMOTE_DOCKER is set to false then set the S3 bucket name to __local__ or BUCKET_MARKER_LOCAL if it is set, and the S3 key to your local path:
# --code S3Bucket="__local__",S3Key="/my/local/lambda/folder" 
# OR 
# zip your lambda function and use the zip instead of mount to local folder

zip -r -D function.zip sending_email.js
#awslocal lambda delete-function --function-name lambdaSendEmail
awslocal lambda create-function --function-name lambdaSendEmail \
--zip-file fileb://function.zip \
--runtime nodejs12.x \
--memory-size 128 \
--handler sending_email.handler \
--role anyrole
--code S3Bucket="__local__",S3Key="$(pwd)" \

# awslocal lambda update-function-code --function-name lambdaSendEmail --code S3Bucket="__local__",S3Key="$(pwd)"

sleep 1
# awslocal lambda list-functions --endpoint http://127.0.0.1:4566
# Update lambda configuration
awslocal lambda update-function-configuration --function-name lambdaSendEmail \
    --environment "Variables={
        accessKeyId=test, secretAccessKey=test, region=ap-southeast-2}"

sleep 1
awslocal lambda create-event-source-mapping \
    --function-name lambdaSendEmail \
    --batch-size 1 \
    --event-source-arn arn:aws:sqs:ap-southeast-2:000000000000:AWVerificationEmailBasicPP


awslocal lambda invoke --function-name lambdaSendEmail --payload fileb://payload.json --invocation-type Event response.json

# sleep 1
# Delete sqs queues
# awslocal sqs purge-queue --queue-url http://localhost:4566/000000000000/AWVerificationEmailBasicPP
# awslocal sqs purge-queue --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q

# Create sqs by CLI
# awslocal --endpoint-url=http://localhost:4566 sqs send-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q --message-body 'Welcome to sandbox'
# awslocal --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/AW_RECEIVE_Q