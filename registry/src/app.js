const express = require('express');
const app = express();

const ServiceRegistry = require('./lib/ServiceRegistry');
const redisClient = require('./lib/redis');

module.exports = (config) => {
    const log = config.log();

    const serviceRegistry = new ServiceRegistry({
        log,
        redisClient,
    });

    app.get('/ping', (req, res) => {
        res.send('pong');
    });

    app.put('/register/:servicename/:serviceversion/:serviceport', async (req, res) => {
        const { servicename, serviceversion, serviceport } = req.params;
        const serviceip = req.socket.remoteAddress.includes('::') ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress;

        const serviceKey = await serviceRegistry.register(servicename, serviceversion, serviceip, serviceport);
        return res.json({ result: serviceKey });
    });

    app.delete('/register/:servicename/:serviceversion/:serviceport', async (req, res) => {
        const { servicename, serviceversion, serviceport } = req.params;
        const serviceip = req.socket.remoteAddress.includes('::') ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress;

        const serviceKey = await serviceRegistry.unregister(servicename, serviceversion, serviceip, serviceport);
        return res.json({ result: serviceKey });
    });

    app.get('/find/:servicename/:serviceversion', async (req, res) => {
        const { servicename, serviceversion } = req.params;
        const svc = await serviceRegistry.get(servicename, serviceversion);
        if (!svc) return res.status(404).json({ result: 'Service not found' });
        return res.json(svc);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        // Log out the error to the console
        log.error(error);
        return res.json({
            error: {
                message: error.message,
            },
        });
    });

    return app;
}