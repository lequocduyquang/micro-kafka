const http = require('http');
const config = require('./config/index')[process.env.NODE_ENV || 'development'];

const log = config.log();
const app = require('./src/app')(config);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);

server.on('listening', () => {
    log.info(`Listening on port ${server.address().port}`);
});

