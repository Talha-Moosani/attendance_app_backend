import responses from "../../../../../../constants/Responses"
import studentService from "../../../../../../services/student/Student"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"
import teacherService from "../../../../../../services/teacher/Teacher"

export const create = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{name}=req.body;
      console.log(req.body)
      const resp = await teacherService.create(name);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const viewAll = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      //const{subject_id,class_id,teacher_id,year}=req.body;
      //console.log(req.body)
      const resp = await teacherService.viewAll("get all teachers");
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  export const assignSubject = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{subject_id,class_id,teacher_id,year}=req.body;
      console.log(req.body)
      const resp = await teacherService.assignSubject(subject_id,teacher_id,class_id,year);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const viewByCid = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{cid}=req.body;
      console.log(req.body)
      const resp = await teacherService.viewByCid(cid);
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
    create,assignSubject,viewAll,viewByCid
}