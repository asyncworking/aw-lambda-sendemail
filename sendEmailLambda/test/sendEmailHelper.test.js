const AWS = require("aws-sdk");
const sendEmailHelper = require( '../sendEmailHelper.js');

describe('sendEmailHelper Function', () => {
    it("function should return SQS message has been sent when given email template, destination email, user name, verification link", async () => {
        const emailTemplate = "wrong template string";
        const email = "test@test.com";
        const userName = "John Doe";
        const verificationLink = "some link string";

        const response = await sendEmailHelper.sendToEmail(emailTemplate, email, userName, verificationLink, AWS);
        expect(response).toEqual("Success: SQS message has been sent!");
    });
});
