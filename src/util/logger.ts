import { winstonLogger } from './customLogger'

export class Logger {

  public static error(message:string, errorStackTrace?:Object, errorSource?:string, additionalErrorLogData?:Object):any  {
    const erroLogObject = {
      TimeStamp: Date.now(),
      Level:'error',
      Message: message,
      Error: errorStackTrace,
      ErrorLocation:errorSource,
      AdditionalErrorInfo: additionalErrorLogData
    }
    winstonLogger.error(erroLogObject)
  }

  public static debug(message:string, infoLog?:Object, infoSource?:string, additionalInfoLogData?:object): any {
    const infoLogObject = {
      TimeStamp: Date.now(),
      Level: 'debug',
      Message: message,
      Info: infoLog,
      InfoSource: infoSource,
      AdditionalInfoLogData: additionalInfoLogData
    }
    winstonLogger.debug(infoLogObject)
  }

  public static info(message:string, infoLog?: Object, infoSource?: string, additionalInfoLogData?: object): any {
    const infoLogObject = {
      TimeStamp: Date.now(),
      Level: 'info',
      Message: message,
      Info: infoLog,
      InfoSource: infoSource,
      AdditionalInfoLogData: additionalInfoLogData
    }
    winstonLogger.info(infoLogObject)
  }

}
