import responses from "../../../../../../constants/Responses"
import studentService from "../../../../../../services/student/Student"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{sname,cname,year}=req.body;
      console.log(req.body)
      const resp = await studentService.createSS(sname,cname,year);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }



  export const getAll = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      
      console.log(req.body)
      const resp = await studentService.getAll();
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const getByCid = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{cid}=req.body
      console.log(req.body)
      const resp = await studentService.getByCid(cid);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const updateDetails = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{sid,newClass,newName,newYear}=req.body
      console.log(req.body)
      const resp = await studentService.updateDetails(sid,newName,newClass,newYear);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  export const getStudent = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{sid}=req.body
      console.log(req.body)
      const resp = await studentService.getStudent(sid);
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
    createStudent,getAll,getByCid,updateDetails,getStudent
}