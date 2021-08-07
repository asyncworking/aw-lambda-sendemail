const AWS = require("aws-sdk");
const getTemplateHelper = require( '../getTemplateHelper.js');

describe('getTemplateHelper Function', () => {
    it("function should return template string stored in s3 mocked in localstack", async () => {
        const response = await getTemplateHelper.getTemplateFromS3Bucket(AWS);
        expect(response).toBeTruthy();
    });
});
