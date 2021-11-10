# Create S3 bucket
resource "aws_s3_bucket" "b6" {
   bucket = "jk-tf-s3-test6"
   acl = "private"
   versioning {
      enabled = true
   }
   tags = {
     Name = "jk-tf-lambda"
     Environment = "Uat"
   }
}


# Upload zip to s3
resource "aws_s3_bucket_object" "object6" {
  bucket = "jk-tf-s3-test6"
  key    = "lambda-function/lambda-jk-tf-test6.zip"
  source = "../var/jenkins_home/workspace/pipeline_jk_lambda_tf/lambda-jk-tf-test6.zip" # its mean it depended on zip
  depends_on = [
    aws_s3_bucket.b6,
  ]
}