import responses from "../../../../../../constants/Responses"
import classService from "../../../../../../services/class/Class"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../../utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"
import syllabusService from "../../../../../../services/syllabus/Syllabus"

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
       console.log('Request recieved')
      const {month_number,description,pages,subject_id} = req.body
      console.log(req.body)
      const resp = await syllabusService.create(subject_id,month_number,pages,description);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  export const mark = async (req: Request, res: Response, next: NextFunction) => {
    try {
       console.log('Request recieved')
      const {month_number,description,pages,subject_id} = req.body
      console.log(req.body)
      const resp = await syllabusService.mark(subject_id,pages,description);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
       console.log('Request recieved')
      const {subject_id} = req.body
      console.log(req.body)
      const resp = await syllabusService.get(subject_id);
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
    create,mark,get

}
