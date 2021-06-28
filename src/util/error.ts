import * as crypto from 'crypto'
import * as joi from 'joi'

interface ErrorBody {
    name: string,
    statusCode: number,
    message: string,
    details?: any,
    debugId?: string
}

export function handleError(error: any): ErrorBody {
    const debugID = crypto.randomBytes(16).toString('hex')
    return {
        statusCode: error?.statusCode || 500,
        name: error?.name || 'SERVER_ERR',
        message: error?.message || 'Internal Server Error.',
        details: error?.trace,
        debugId: debugID
    }
}

export function formJoiValidationError(err: joi.ValidationError): any {
    return err.details.map(err => {
      return {
        field: err.context.key,
        value: err.context.value,
        issue: err.message,
        location: err.path.join('/')
      }
    })
  }
