import pino from 'pino';

const Logger = pino({
    transport:{
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
        }
    }
})

export default Logger;