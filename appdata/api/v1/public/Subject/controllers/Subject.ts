import responses from "../../../../../../constants/Responses"
import studentService from "../../../../../../services/student/Student"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"
import subjectService from "../../../../../../services/subject/Subject"

export const getSubjectsByCid = async (req: Request, res: Response, next: NextFunction) => {

    try {
      let resp:any
      console.log('Request recieved');
      const{cid,year}=req.body;
      console.log(req.body)
      if (year==null){
       resp = await subjectService.getSubjectsByCid(cid,1);
      console.log(resp)
    }else{
       resp = await subjectService.getSubjectsByCid(cid,year);
      console.log(resp)
    }
    
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const create = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{name,cid,period}=req.body;
      console.log(req.body)
      const resp = await subjectService.create(name,cid,period);
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
    getSubjectsByCid,create
}