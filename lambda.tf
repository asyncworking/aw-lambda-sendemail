# resource "aws_lambda_function" "example6" {
#   function_name = "ServerlessExampleCathy6"

#   # The bucket name as created earlier with "aws s3api create-bucket"
#   s3_bucket = "jk-tf-s3-test6"
#   s3_key    = "lambda-functions/lambda-jk-tf-test6.zip"

#   # "main" is the filename within the zip file (main.js) and "handler"
#   # is the name of the property under which the handler function was
#   # exported in that file/*  */.
#   handler = "src/main.handler"
#   runtime = "nodejs14.x"
#   role=aws_iam_role.lambda_exec6.arn
#   depends_on = [
#     aws_s3_bucket.b6,
#     # aws_s3_bucket_object.object6,
#   ]
# }

# # IAM role which dictates what other AWS services the Lambda function
# # may access.
# resource "aws_iam_role" "lambda_exec6" {
#   name = "serverless_example_lambda_cathy6"
#   # Each Lambda function must have an associated IAM role which dictates what access it has to other AWS services.
#   # The above configuration specifies a role with no access policy,
#   # effectively giving the function no access to any AWS services,
#   # since our example application requires no such access.
#   assume_role_policy=<<EOF
# {
#  "Version": "2012-10-17",
#  "Statement": [
#      {
#      "Action": "sts:AssumeRole",
#      "Principal": {
#        "Service": "lambda.amazonaws.com"
#      },
#      "Effect": "Allow",
#      "Sid": ""
#      }
#  ]
# }
# EOF
# }

 