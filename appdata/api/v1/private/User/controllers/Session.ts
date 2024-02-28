import responses from "../../../../../../constants/Responses"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.signedCookies
      console.log("refreshToken => " + token)
  
      res.clearCookie("token", COOKIE_OPTIONS)
      return
    } catch (error) {
      next(error)
    }
  }

export default {
    logout
}