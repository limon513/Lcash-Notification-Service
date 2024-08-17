const Logger = require('../../config/logger-config');
const cron = require('node-cron');
//const { RequestService, TransferService, EmailService } = require('../../services');
//const { Enums, Utility } = require('../common');
const serverConfig = require('../../config/server-config');
const { QUEUE } = require('../../config');

function scheduleCrons() {

    cron.schedule('*/1 * * * *', async () => {
        try {
            const queue = QUEUE.connectQueue();
        } catch (error) {
            Logger.log({
                level:'info',
                message:'cron problem',
                label:__filename,
                errors:error,
            });
        }
    });

}

module.exports = {
    scheduleCrons,
}