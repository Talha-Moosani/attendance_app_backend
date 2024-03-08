import responses from "../../../../../../constants/Responses"
import studentService from "../../../../../../services/student/Student"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request recieved')
      const studentDetails = req.body
      console.log(req.body)
      const resp = await studentService.createStudent(studentDetails);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

export default {
    createStudent
}