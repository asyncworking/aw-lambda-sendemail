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
    verificationLink,
    templateType,
    templateS3Bucket,
    templateS3Key,
  } = event.Records[0].body;

  const emailTemplateString = await templateHelper.getTemplateFromS3Bucket(
    templateS3Bucket,
    templateS3Key,
    AWS
  );

  await emailHelper.sendToEmail(
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
      verificationLink: verificationLink,
    },
  };
};
