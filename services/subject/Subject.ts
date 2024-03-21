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
 
 let teacherNames:any
    try {
      console.log("cid: ",cid)

   let teacherIDS:any  =await teacherService.viewByCid(cid);
    console.log("first teacher id: ",teacherIDS[0].teacher_id," his subject: ",teacherIDS[0].subject_id)

for (const teacherIDObj of teacherIDS) {

    const teacherName = await Teacher.findOne({
        attributes: ['name'],
        where: {
            id: teacherIDObj.teacher_id
        }
    });
    
    if (teacherName) {
        data.push({
          teacher_id:teacherIDObj.teacher_id,
          ,
          subject:teacherIDObj.subject_id
        })
    } else {
        // Handle the case where teacher with given ID is not found
        teacherNames.push(null); // Or any placeholder value you prefer
    }
}

// // Now teacherNames array will contain names corresponding to each teacher_id in teacherIDs

//         const subjects=await Subject.findAll({
//             where:{class_id:cid}
//         });return subjects
   
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