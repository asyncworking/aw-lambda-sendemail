#!/bin/bash

# Get the ID of the latest created container (must be LocalStack)
containerId=$(docker ps -l -q)
# Inspect the container and get IP address
localIPAddress=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $containerId)
echo "Localstack container IP is $localIPAddress"

# Create sqs queue
awslocal sqs create-queue --queue-name AWRECEIVEQ

# Create lambda
# zip -r -D function.zip sqs-localtest.js
awslocal lambda delete-function --function-name SQSTest

sleep 1

awslocal lambda create-function --function-name SQSTest \
--code S3Bucket="__local__",S3Key="$(pwd)" \
--runtime nodejs12.x \
--memory-size 128 \
--handler sqs-localtest.handler \
--role anyrole

# awslocal lambda update-function-code --function-name SQSTest --code S3Bucket="__local__",S3Key="$(pwd)"

sleep 1
awslocal lambda invoke --function-name SQSTest response.json
# --payload fileb://payload.json  