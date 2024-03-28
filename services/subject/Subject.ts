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
import { error } from "console";
//create 
export const getSubjectsByCid = async (cid:any,year:any) => {
 
    try {
      const c=cid;
      const y=year;
      let query:any
      if(year==1){
      query=` SELECT teachers.id AS teacher_id, teachers.name AS teacher_name, subjects.id AS subjects_id, subjects.name AS subject_name, subjects.period
      FROM subjects
      LEFT JOIN teachings ON subjects.id = teachings.subject_id
      LEFT JOIN teachers ON teachings.teacher_id = teachers.id
      WHERE subjects.class_id =:c AND teachings.year = YEAR(CURRENT_DATE)
       `}
       else{
query=` SELECT teachers.id AS teacher_id, teachers.name AS teacher_name, subjects.id AS subjects_id, subjects.name AS subject_name, subjects.period
FROM subjects
LEFT JOIN teachings ON subjects.id = teachings.subject_id
LEFT JOIN teachers ON teachings.teacher_id = teachers.id
WHERE subjects.class_id =:c AND teachings.year=:y
 `
       }
      const[results,metadata]=await sequelize.query(query,{
        replacements:{
          c,y
        }
      })
      return results;

    }
    
     catch (error) {
      throw error
    }
  };
  
//   export const getAll=async()=>
//   {
//     try{
// const subjects =await Subject.findAll(
  
// );
// return subjects
//     } catch{
//       throw error
//     }
//   }

  export const create=async(name:any, class_id:any,period:any)=>
{
  
    try{
      console.log("in create")
const subject =await Subject.create(
  {
    name:name,
    class_id:class_id,
    period:period
  }

);
return subject
    } catch{
      throw error
    }
  }
  const subjectService = {
    getSubjectsByCid, create
    //, getAll
    //, getUnassigned
}

export default subjectService