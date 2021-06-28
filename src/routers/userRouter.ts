import * as express from 'express'
import UserController from '../controllers/user.controller'

export default class UserRouter {

  public expressRouter = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private readonly info = '/info'

  initializeRoutes() {
    this.expressRouter.post(`${this.info}/register`, UserController.validateCreateUserRequest, UserController.registerUser)
    this.expressRouter.post(`${this.info}/login`, UserController.validateLoginCredentials, UserController.primaryAuthentication)
    this.expressRouter.put(`${this.info}/update/:email`, UserController.validateToken, UserController.validateUpdateUserRequest, UserController.updateUser)
    this.expressRouter.get(`${this.info}/fetchUsers`, UserController.validateToken, UserController.getUsers)
  }
}
