import * as winston from 'winston'

export const winstonLogger =  winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console()
    ]
  })
