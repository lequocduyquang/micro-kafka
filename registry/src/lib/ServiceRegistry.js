const semver = require('semver');
const _ = require('lodash');

class ServiceRegistry {
    constructor({ log, redisClient }) {
        this.log = log;
        this.redisClient = redisClient;
        this.timeout = 10;
    }

    async register(name, version, ip, port) {
        const key = `service|${name}|${version}|${ip}|${port}`;
        await this.cleanup(key);
        const cachedService = await this.redisClient.get(key);

        if (_.isNil(cachedService)) {
            let service = {};
            service.timestamp = Math.floor(new Date() / 1000);
            service.ip = ip;
            service.port = port;
            service.name = name;
            service.version = version;
            await this.redisClient.set(key, JSON.stringify(service));
            this.log.debug(`Added services ${name}, version ${version} at ${ip}:${port}`);
            return key;
        }
        const parsedCachedService = JSON.parse(cachedService);
        parsedCachedService.timestamp = Math.floor(new Date() / 1000);
        this.log.debug(`Updated services ${name}, version ${version} at ${ip}:${port}`);
        this.redisClient.set(key, JSON.stringify(parsedCachedService));
        return key;
    }

    async unregister(name, version, ip, port) {
        const key = `service|${name}|${version}|${ip}|${port}`;
        await this.redisClient.del(key);
        return key;
    }

    async get(name, version) {
        await this.cleanup();

        let services = [];
        let items = await this.redisClient.keys(`service|${name}|*`);
        for (let i = 0; i < items.length; i++) {
            services.push(items[i]);
        }
        const candidates = Object.values(services)
            .filter(service => service.split('|')[1] === name 
                        && semver.satisfies(service.split('|')[2], version));
    
        return JSON.parse(await this.redisClient.get(candidates[Math.floor(Math.random() * candidates.length)]));
    }
    

    async cleanup(key) {
        const now = Math.floor(new Date() / 1000);
        const cachedService = await this.redisClient.get(key);
        const parsedCachedService = JSON.parse(cachedService);

        if (parsedCachedService && parsedCachedService.timestamp + this.timeout < now) {
            await this.redisClient.del(key);
            this.log.debug(`Removed service ${key}`);
        }
    }
}

module.exports = ServiceRegistry;
