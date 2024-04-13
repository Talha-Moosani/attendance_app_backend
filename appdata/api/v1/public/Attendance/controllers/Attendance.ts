import responses from "../../../../../../constants/Responses"
import attendanceService from "../../../../../../services/attendance/Attendance"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"
import json2xls from "json2xls"
const XLSX = require('xlsx');
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
  /*
  export const getReport= async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request recieved');
      const{class_id,student_id,teacher_id,subject_id}=req.body;
      console.log(req.body)
      const resp = await attendanceService.getReport(student_id,class_id,teacher_id,subject_id);
      console.log(resp)
      
      const wb = XLSX.utils.book_new(); // Create a workbook
    const ws = await XLSX.utils.json_to_sheet(resp); // Convert data to a sheet
  
    // Set HTTP headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  
    // Write the workbook to the response
    XLSX.write(res, wb, { bookType: 'xlsx', type: 'buffer' });
  
    // End the response
    res.end();
  
    //   const xlsBuffer = convertJsonToExcel(resp);

    //   // Set headers for Excel file download
    //   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    //   res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    //   res.setHeader('Content-Length', xlsBuffer.length); // Set content length

    //   // Send Excel buffer as response
    //  // End the response with the buffer
    //   // Send Excel buffer as response
    // res.send(xlsBuffer);
    //   console.log("refreshToken => " + token)
  
    //   res.clearCookie("token", COOKIE_OPTIONS)
   // return{ resp,'success':true}
      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }

  */
  export const getReport= async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request recieved');
      const{class_id,student_id,teacher_id,subject_id}=req.body;
      console.log(req.body)
      const resp = await attendanceService.getReport(student_id,class_id,teacher_id,subject_id);
      console.log(resp)

// // Assume 'resp' contains the JSON data received from the server

// // Convert JSON data to XLSX format using SheetJS (xlsx)
// const wb = XLSX.utils.book_new();
// const ws = XLSX.utils.json_to_sheet(resp);
// XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
// const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

// // Convert binary string to Blob
// const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

// // Create temporary download link and trigger download
// const downloadLink = document.createElement('a');
// downloadLink.href = URL.createObjectURL(blob);
// downloadLink.download = 'data.xlsx'; // File name
// document.body.appendChild(downloadLink);
// downloadLink.click();
// document.body.removeChild(downloadLink);

// // Utility function to convert binary string to array buffer
// function s2ab(s:any) {
//   const buf = new ArrayBuffer(s.length);
//   const view = new Uint8Array(buf);
//   for (let i = 0; i < s.length; i++) {
//     view[i] = s.charCodeAt(i) & 0xff;
//   }
//   return buf;
// }


      return res.send(genericResponseByData(resp,{'success':true}))
    } catch (error) {
      console.log(error)

      next(error)
    }
  }


export default {
    mark,getWithinDatesS,getWithinDatesT,getByCidnDate,getByCid,verifyByCid,getReport
}