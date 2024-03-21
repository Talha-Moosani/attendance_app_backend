import { Op, Sequelize } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import fs from 'fs'
import path from "path";
import Classes from "../../models/Classes";
import Subject from "../../models/Subject";
import Teaching from "../../models/Teaching";
import Teacher from "../../models/Teacher";
import teacherService from "../teacher/Teacher";
//create 
export const getSubjectsByCid = async (cid:any) => {
 let data = [];
 
 let teacherName:any
 
    try {
      console.log("cid: ",cid)
//manually year is passed
   let teacherIDS:any  =await teacherService.viewByCid(cid,2024);

for (const teacherIDObj of teacherIDS) {

     teacherName = await Teacher.findOne({
        attributes: ['name'],
        where: {
            id: teacherIDObj.teacher_id
        }
    });
    let subject:any
    subject=await Subject.findOne({
        attributes:['name'],
        where:{
            id:teacherIDObj.subject_id
        }
      });
        data.push({
          teacher_id:teacherIDObj.teacher_id,
        name:teacherName.name,
          subject:teacherIDObj.subject_id,
        subject_name:subject.name
        })
     
}
   
return data;
    }
    
     catch (error) {
      throw error
    }
  };
  
  const subjectService = {
    getSubjectsByCid
}

export default subjectService