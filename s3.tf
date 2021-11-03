resource "aws_s3_bucket" "onebucket" {
   bucket = "jk-tf-s3-test1"
   acl = "private"
   versioning {
      enabled = true
   }
   tags = {
     Name = "Bucket1"
     Environment = "uat"
   }
}
