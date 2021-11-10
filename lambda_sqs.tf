resource "aws_lambda_event_source_mapping" "example" { 
event_source_arn = "${aws_sqs_queue.cathy_first_sqs6.arn}" 
enabled          = true
function_name = "${aws_lambda_function.example6.arn}" 
depends_on = [
    aws_sqs_queue.cathy_first_sqs6,
    aws_lambda_function.example6,
    aws_sqs_queue_policy.my_sqs_policy6,
  ]
} 

