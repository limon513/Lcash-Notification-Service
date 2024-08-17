const amqplib = require('amqplib');
const Logger  = require('./logger-config');
const { EmailService } = require('../services');
const serverConfig = require('./server-config');

let channel;
let connection;

async function connectQueue(){
    try {
        connection = await amqplib.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue('Lcash-Noti');
        channel.consume('Lcash-Noti',async (data) =>{
            const datastring = `${Buffer.from(data.content)}`;
            const dataObj = JSON.parse(datastring);
            console.log(dataObj);
            if(dataObj.senderEmail){
                await EmailService.sendEmail(serverConfig.GMAILMAIL,dataObj.senderEmail,'Transaction Info',dataObj.message);
            }
            if(dataObj.reciverEmail){
                await EmailService.sendEmail(serverConfig.GMAILMAIL,dataObj.reciverEmail,'Transaction Info',dataObj.message);
            }
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
        Logger.log({
            level:'info',
            message:error.message,
            label:__filename,
            errors:error,
        });
    }
}


module.exports = {
    connectQueue,
}