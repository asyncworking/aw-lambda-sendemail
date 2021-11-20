const AWS = require("aws-sdk");
const templateHelper = require( '../helpers/templateHelper.js');

describe('getTemplateHelper Function', () => {
    it("function should return template string stored in s3 mocked in localstack", async () => {
        const templateBucket = "aw-email-template";
        const templateKey = "verification_email_template_updated.html";
        const response = await templateHelper.getTemplateFromS3Bucket(templateBucket, templateKey, AWS);
        expect(response).toBeTruthy();
    });
});
