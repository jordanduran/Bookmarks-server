const winston = require('winston');


const logger  = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'info.log' })
    ]
})

if(!['production', 'test'].includes(NODE_ENV)) {
    logger.add(new winston.transports.Console({
        format: winston.formate.simple()
    }));
}

module.exports = logger