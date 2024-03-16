// import responses from "../../../../../../constants/Responses"
// import classService from "../../../../../../services/class/Class"
// import jwt from "jsonwebtoken"
// import { getJwt, COOKIE_OPTIONS } from "../../../../../../utils/auth.utils"
// import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse, genericResponseByData } from "../../../../../../services/Response/Response"
// import { NextFunction, Request, Response } from "express"

// export const createClass = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Request recieved')
//       const classDetails = req.body
//       console.log(req.body)
//       const resp = await classService.createClass(classDetails);
//       console.log(resp)
      

//     //   console.log("refreshToken => " + token)
  
//     //   res.clearCookie("token", COOKIE_OPTIONS)
//       return res.send(genericResponseByData(resp,{'success':true}))
//     } catch (error) {
//       console.log(error)

//       next(error)
//     }
//   }


//   export const updateClassName = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Request recieved')
//       //const classDetails = req.body
//       const{oldName,newName}=req.body;
      
//       console.log("old name=",oldName+"new name=",newName);
//       const resp = await classService.updateClassName(oldName,newName);
//       console.log(resp)
      

//     //   console.log("refreshToken => " + token)
  
//     //   res.clearCookie("token", COOKIE_OPTIONS)
//       return res.send(genericResponseByData(resp,{'success':true}))
//     } catch (error) {
//       console.log(error)

//       next(error)
//     }
//   }

//   export const viewClass = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Request recieved')
//       //const classDetails = req.body
//       const{name}=req.body;
      
//       console.log("name: ",name);
//       const resp = await classService.viewClass(name);
//       console.log(resp)
      

//     //   console.log("refreshToken => " + token)
  
//     //   res.clearCookie("token", COOKIE_OPTIONS)
//       return res.send(genericResponseByData(resp,{'success':true}))
//     } catch (error) {
//       console.log(error)

//       next(error)
//     }
//   }

//   export const deleteClass = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Request recieved')
//       //const classDetails = req.body
//       const{name}=req.body;
      
//       console.log("name: ",name);
//       const resp = await classService.deleteClass(name);
//       console.log(resp)
      

//     //   console.log("refreshToken => " + token)
  
//     //   res.clearCookie("token", COOKIE_OPTIONS)
//       return res.send(genericResponseByData(resp,{'success':true}))
//     } catch (error) {
//       console.log(error)

//       next(error)
//     }
//   }


// export default {
//     createClass,updateClassName,viewClass,deleteClass

// }