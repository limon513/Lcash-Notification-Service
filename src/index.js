const {server_config,Logger} = require('./config');
const express = require('express');
const apiRoutes = require('./routes');
const CronJobs = require('./utils/crons/cron-jobs');
const app = express();

app.use('/api',apiRoutes);

CronJobs.scheduleCrons();

app.listen(server_config.PORT, ()=>{
    console.log(`Server Started at ${server_config.PORT}`);
    Logger.log({
        level:'info',
        message:'Server Up and Running!',
        label:__filename,
        errors:{msg:'something'}
    });
});