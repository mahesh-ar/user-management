import { Logger } from './../util/logger'
import * as express from 'express'
import * as joi from 'joi'
import UserServices from '../services/user.service'
import { UserInfo } from '../interfaces/userData.interface'
import { formJoiValidationError } from '../util/error'

export default class UserController {

  public static registerUser = async (request: express.Request, response: express.Response) => {
    try {
      const result = await UserServices.registerUser(request.body as UserInfo)
      response.json(result)
    } catch (err) {
      response.status(err.statusCode || 500).send(err)
    }
  }
  public static primaryAuthentication = async (request: express.Request, response: express.Response) => {
    try {
      const result = await UserServices.primaryAuthentication(request.body)
      response.json(result)
    } catch (err) {
      response.status(err.statusCode || 500).send(err)
    }
  }
  public static updateUser = async (request: express.Request, response: express.Response) => {
    try {
      const result = await UserServices.updateUser(request.params.email, request.body)
      response.json(result)
    } catch (err) {
      response.status(err.statusCode).send(err)
    }
  }
  public static getUsers = async (request: express.Request, response: express.Response) => {
    try {
      const result = await UserServices.getUsers()
      response.json(result)
    } catch (err) {
      response.status(err.statusCode || 500).send(err)
    }
  }
  public static validateCreateUserRequest = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const schema = joi.object().keys({
        name: joi.string().required(),
        mobile: joi.number().required(),
        email: joi.string().required(),
        password: joi.string().required()
      }).unknown()
      const { error } = joi.validate(request.body, schema, { abortEarly: false })
      if (error) {
        throw {
        statusCode: 400,
        name: 'BODY_VALIDATION_ERR',
        // tslint:disable-next-line:no-duplicate-string
        message: 'The request Body could not be valided. See details',
        details: formJoiValidationError(error)
      }
      } else {
        next()
      }
    } catch (err) {
      response.status(err.statusCode).send(err)
    }
  }
  public static validateLoginCredentials = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const schema  = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
      }).unknown()
      const { error } = joi.validate(request.body, schema, { abortEarly: false })
      if (error) {
        throw {
        statusCode: 400,
        name: 'BODY_VALIDATION_ERR',
        message: 'The request Body could not be valided. See details',
        details: formJoiValidationError(error)
      }
      } else {
        next()
      }
    } catch (err) {
      response.status(err.statusCode).send(err)
    }
  }
  public static validateToken = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      Logger.info('Inside validateToken controller')
      const schema = joi.object().keys({
        authorization: joi.string().required()
      }).unknown()
      const { error } = joi.validate(request.headers, schema, { abortEarly: false })
      if (error) {
        console.log('Joi error = ', error.message)
        throw {
          statusCode: 400,
          name: 'HEADER_VALIDATION_ERR',
          message: 'The request Headers could not be valided. See details',
          details: formJoiValidationError(error)
        }
      } else {
        await UserServices.accessTokenValidation(request.headers.authorization)
        next()
      }
    } catch (err) {
      Logger.error('Error in validateToken', err)
      response.status(err.statusCode).send(err)
    }
  }
  public static validateUpdateUserRequest = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const schema = joi.object().keys({
        name: joi.string(),
        mobile: joi.number().allow(null)
      }).or(['name', 'mobile']).unknown()
      const { error } = joi.validate(request.body, schema, { abortEarly: false })
      if (error) {
        throw {
        statusCode: 400,
        name: 'BODY_VALIDATION_ERR',
        message: 'The request Body could not be valided. See details',
        details: formJoiValidationError(error)
      }
      } else {
        next()
      }
    } catch (err) {
      response.status(err.statusCode).send(err)
    }
  }
}
