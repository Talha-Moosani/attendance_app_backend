import authService from "../../../../../../services/Admin/Admin"
import { serverErrorResponse, successResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import responses from "../../../../../../constants/Responses"
import { NextFunction, Request, Response } from "express"

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { first_name, last_name, password, user_name, user_type_id } = req.body
          const createdAdmin = await authService.register({first_name: first_name, last_name: last_name, user_name: user_name, password: password, user_type_id: user_type_id})

          if (!createdAdmin)
          {
            return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
          }
      
          return res.send(genericResponseByData(createdAdmin, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
    } catch (error) {
      next(error)
    }
  }

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { adminId } = req.params
      const { password } = req.body
  
      // update user password
      const passwordUpdated = await authService.updatePassword(password, Number(adminId))
  
      if (!passwordUpdated) {
        serverErrorResponse(res, responses.NOT_UPDATED)
        return
      }
  
      const responseData = { passwordReset: true }
      successResponse(res, responseData)
      return
    } catch (error) {
      next(error)
    }
  }

export default {register, resetPassword}

