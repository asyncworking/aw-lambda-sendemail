
exports.default = {
  "Records": [
    {
      "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      "receiptHandle": "MessageReceiptHandle",
      "body": `{
        "templateType": "Verification",
        "templateS3Bucket": "aw-email-template",
        "templateS3Key": "verification_email_template_updated.html",
        "userName": "John Doe",
        "email": "johndoe@test.com",
        "verificationLink": "https://somecode.com"
      }`,
      "attributes": {
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "messageAttributes": {
      },
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:ap-southeast-2:000000000000:AWVerificationEmailBasicPP",
      "awsRegion": "ap-southeast-2"
    }
  ]
};