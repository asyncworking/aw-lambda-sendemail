console.log('Loading function');
const AWS = require("aws-sdk");

const SSM = new AWS.SSM();
exports.handler = function(event, context) {
  AWS.config.update({ region: "ap-southeast-2" });
  console.log('Handling confirmation email to', event);
  //const source="";
 // const ssm = new (require('aws-sdk/clients/ssm'))();
  const data = SSM.getParameter({
    "Name": "AW_OFFICIAL_EMAIL"
   }).promise().then(function(data) {
   //   console.log('parameter: ' + data.Parameter.Value);
  const source = data.Parameter.Value;
     const email = event.Records[0].messageAttributes.email.stringValue;
  const userName = event.Records[0].messageAttributes.userName.stringValue;
  const verificationLink = event.Records[0].messageAttributes.verificationLink.stringValue;
  
  console.log('EMAIL IS: ', email);
  // Create sendEmail params
  console.log(JSON.stringify(data)); 
  
  const params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<!DOCTYPE html>\r\n    <html>\r\n      <head>\r\n        <title>Demo Title<\/title>\r\n      <\/head>\r\n      <body>\r\n        <p>Hi ${userName},<\/p >\r\n        <p>Please click the link below to verify ${email}.<\/p >\r\n        <a href= ${verificationLink}>Click here!<\/a >\r\n      <\/body>\r\n    <\/html>`,
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Thanks for registering with AsyncWorking!"
      }
    },
    Source: source,
  };

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(data => {
      context.done(null, "Success");
    })
    .catch(err => {
      console.error(err, err.stack);
      context.done(null, "Failed");
    });
    });
  
  

};