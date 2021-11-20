const AWS = require("aws-sdk");
const emailHelper = require( '../helpers/emailHelper.js');

describe('sendEmailHelper Function', () => {
    it("function should return SQS message has been sent when given email template, destination email, user name, verification link", async () => {
        const emailTemplate = "wrong template string";
        const email = "test@test.com";
        const userName = "John Doe";
        const verificationLink = "some link string";
        const templateType = "Verification";
        const companyName = "company A";
        const companyOwnerName = "CEO Alice";

        const response = await emailHelper.sendToEmail(companyName, companyOwnerName, emailTemplate, email, userName, verificationLink, templateType, AWS);
        expect(response).toHaveProperty("email");
        expect(response).toHaveProperty("emailType");
        expect(response).toHaveProperty("timeSent");
        expect(response).toHaveProperty("sesResultId");
        expect(response).toHaveProperty("sqsResultId");
    });
});
