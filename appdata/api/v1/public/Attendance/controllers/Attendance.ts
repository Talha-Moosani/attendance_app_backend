import responses from "../../../../../../constants/Responses"
import attendanceService from "../../../../../../services/attendance/Attendance"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"

export const mark = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{subject_id,teacher_id,teacher_attendance,studentData,period}=req.body;
      console.log(req.body)
      const resp = await attendanceService.mark(teacher_id,teacher_attendance,studentData,subject_id,period);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  export const getWithinDatesT = async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{startDate,endDate}=req.body;
      console.log(req.body)
      const resp = await attendanceService.getWithinDatesT(startDate,endDate);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  export const getWithinDatesS= async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{startDate,endDate}=req.body;
      console.log(req.body)
      const resp = await attendanceService.getWithinDatesS(startDate,endDate);
      console.log(resp)

      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const verifyByCid= async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{cid}=req.body;
      console.log(req.body)
      const resp = await attendanceService.verifyByCid(cid);
      console.log(resp)

      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const getByCidnDate= async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{class_id,date}=req.body;
      console.log(req.body)
      const resp = await attendanceService.getBySidnDate(date,class_id);
      console.log(resp)
      

    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  export const getByCid= async (req: Request, res: Response, next: NextFunction) => {

    try {
      console.log('Request recieved');
      const{cid}=req.body;
      console.log(req.body)
      const resp = await attendanceService.getByCid(cid);
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
    mark,getWithinDatesS,getWithinDatesT,getByCidnDate,getByCid,verifyByCid
}