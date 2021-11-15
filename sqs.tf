#Create SQS

resource "aws_sqs_queue" "cathy_first_sqs6" {
  name = "cathy_first_sqs6"
  delay_seconds             = 90
  max_message_size          = 2048
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
   redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.terraform_queue_deadletter6.arn
    maxReceiveCount     = 4
  })

  # tags {
  #   Environment = "uat"
  # }
}

resource "aws_sqs_queue" "terraform_queue_deadletter6" {
  name                        = "cathy_first_sqs6_deadletter"
  message_retention_seconds   = 86400
  visibility_timeout_seconds  = 60
}

resource "aws_sqs_queue_policy" "my_sqs_policy6" {
  queue_url = aws_sqs_queue.cathy_first_sqs6.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "${aws_sqs_queue.cathy_first_sqs6.arn}"
    },
     {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:ReceiveMessage",
      "Resource": "${aws_sqs_queue.cathy_first_sqs6.arn}"
    },
     {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:DeleteMessage",
      "Resource": "${aws_sqs_queue.cathy_first_sqs6.arn}"
    },
     {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:GetQueueAttributes",
      "Resource": "${aws_sqs_queue.cathy_first_sqs6.arn}"
    },
     {
         "Sid": "",
         "Effect": "Allow",
         "Action": [
             "logs:PutLogEvents",
             "logs:CreateLogStream",
             "logs:CreateLogGroup"
         ],
         "Resource": "*"
     },
     {
         "Sid": "",
         "Effect": "Allow",
         "Action": [
             "sqs:*"
         ],
         "Resource": "*"
     }
  ]
}
POLICY
}

# resource "aws_sqs_queue" "my_first_sqs" {
#   name = var.sqs_name
# }

# resource "aws_sqs_queue_policy" "my_sqs_policy" {
#   queue_url = aws_sqs_queue.my_first_sqs.id

#   policy = <<POLICY
# {
#   "Version": "2012-10-17",
#   "Id": "sqspolicy",
#   "Statement": [
#     {
#       "Sid": "First",
#       "Effect": "Allow",
#       "Principal": "*",
#       "Action": "sqs:SendMessage",
#       "Resource": "${aws_sqs_queue.my_first_sqs.arn}"
#     }
#   ]
# }
# POLICY
# }
