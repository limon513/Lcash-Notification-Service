const { StatusCodes } = require("http-status-codes");
const MAILER = require("../config/gmail-config");
const Logger = require("../config/logger-config");

async function sendEmail(from, to, subject, text){
    try {
        const response = await MAILER.sendMail({
            from:from,
            to:to,
            subject:subject,
            text:text,
        });
        return response;
    } catch (error) {
        Logger.log({
            level:'info',
            message:'No internet connection',
            label:__filename,
            errors:{msg:"get a intenet connection ,you broke",error}
        });
    }
}

module.exports = {
    sendEmail,
}