import { DATEONLY, Op, Sequelize, where } from "sequelize";
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
export const getAssigned = async (cid:any,year:any) => {
 
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
  
  export const getAll=async()=>
  {
    try{ let query=`SELECT 
    subjects.id,
    subjects.name,
    subjects.period,
    subjects.class_id,
    teachers.id AS teacher_id,
    teachers.name AS teacher_name 
FROM 
    subjects  
LEFT JOIN 
    teachings ON subjects.id = teachings.subject_id AND teachings.year = YEAR(CURDATE())
LEFT JOIN 
    teachers ON teachings.teacher_id = teachers.id
WHERE 
    teachings.year = YEAR(CURDATE()) OR teachings.subject_id IS NULL;
` 
const [results,metadata]=await sequelize.query(query)

return results
    } catch{
      throw error
    }
  }

  export const assign=async(subject_id:any,class_id:any,teacher_id:any,year:any)=>
  {
    try{
const subject =await teacherService.assignSubject(subject_id,teacher_id,class_id,year)
return subject
    } catch{
      throw error
    }
  }
  export const getUnassigned=async(cid:any)=>
  {
    try{
let c=cid;
const query=`SELECT subjects.id AS subject_id, subjects.name AS subject_name, subjects.period
FROM subjects
LEFT JOIN teachings ON subjects.id = teachings.subject_id AND teachings.year = YEAR(CURRENT_DATE)
WHERE subjects.class_id =:c
AND teachings.subject_id IS NULL;`
const [results,metadata]=await sequelize.query(query,{
  replacements:{c}
}) 
if(results.length==0){
  return "all subjects assigned"
}
return results;
    } catch{
      throw error
    }
  }

  export const getByCid=async(cid:any)=>
  {
     let data=[]
    try{
data.push({
  'wo asbaq jink ustad ki tayeen ho chuki h':await getAssigned(cid,1),
  "wo asbaq jink ustad ki tayeen nhi hoi": await getUnassigned(cid)
})
return data
    } catch{
      throw error
    }
  }

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
  export const updateName=async(subject:any,newName:any)=>
  {
    try{
      console.log("in update name")

if(newName==null){
  return subject.dataValues.name
} else{
  const updated= await subject?.update({name:newName})
 return updated.dataValues.name
}

    } catch{
      throw error
    }
  }
  export const updatePeriod=async(subject:any,newPeriod:any)=>
  {
    try{
      console.log("in update period")

      if(newPeriod==null){
        return subject.dataValues.period
      } else{
        const updated= await subject?.update({period:newPeriod})
        return updated.dataValues.period
      }
    } catch{
      throw error
    }
  }
  export const updateTeacher=async(subject:any,newTeacher:any)=>
  {
    try{
      console.log("in update teacher")

      let da=new Date()
        let cda=da.getFullYear();
       let t= await Teaching.findOne({
          where:{
            subject_id:subject.dataValues.id,
            year:cda
          }
        })
        console.log("in update teacher",t?.dataValues.teacher_id)

      if(newTeacher==null){
        
        return t?.dataValues.teacher_id;
      } else{
        const updated= await t?.update({teacher_id:newTeacher});
        return updated?.dataValues.teacher_id
      }
    } catch{
      throw error
    }
  }

  export const updateDetails=async(subject_id:any,newName:any,newPeriod:any,newTeacher:any)=>
  {
    console.log("in update details")
    try{
const subject =await Subject.findByPk(subject_id)
return{
  id:subject?.dataValues.id,
  name:await updateName(subject,newName),
  period:await updatePeriod(subject,newPeriod),
  teacher:await updateTeacher(subject,newTeacher)
}
    } catch{
      throw error
    }
  }
  export const getSubject=async(id:any)=>{
    return (await Subject.findByPk(id));
  }
  const subjectService = {
    create, 
    getByCid,
    getAll,
    getUnassigned,
    getAssigned,
    assign,
    updateDetails,
    getSubject
}

export default subjectService