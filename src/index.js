require("dotenv").config();
const AWS = require("aws-sdk");
const emailHelper = require("./helpers/emailHelper.js");
const templateHelper = require("./helpers/templateHelper.js");

AWS.config.update({
  region: process.env.region,
});

exports.handler = async (event) => {
  const {
    email,
    userName,
    companyName,
    companyOwnerName,
    verificationLink,
    templateType,
    templateS3Bucket,
    templateS3Key,
  } = JSON.parse(event.Records[0].body);

  const emailTemplateString = await templateHelper.getTemplateFromS3Bucket(
    templateS3Bucket,
    templateS3Key,
    AWS
  );

  const response = await emailHelper.sendToEmail(
    companyName,
    companyOwnerName,
    emailTemplateString,
    email,
    userName,
    verificationLink,
    templateType,
    AWS
  );
  
  return {
    statusCode: 200,
    body: {
      toAddress: email,
      userName: userName,
      templateType: templateType,
      sesResultId: response.sesResultId,
      sqsResultId: response.sqsResultId
    },
  };
};
