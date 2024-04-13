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
import ExpectedSyllabus from "../../models/ExpectedSyllabus";
import ActualSyllabus from "../../models/ActualSyllabus";

//create syllabus
export const create =async(subject_id:any, month_number:any,pages:any,description:any)=>{
    try{
//month number, pages,description, subject_id,year
let syllabus=await ExpectedSyllabus.create({
    subject_id:subject_id,
    month_number:month_number,
    pages:pages,
    description:description,
    year:(new Date()).getFullYear()
})
return syllabus
    }catch{
        throw error
    }
}
//mark syllabus
export const mark =async(subject_id:any, pages:any,description:any)=>{
    try{
let syllabus=await ActualSyllabus.create({
    subject_id:subject_id,
    month_number:(new Date()).getMonth(),
    pages:pages,
    description:description,
    year:(new Date()).getFullYear()
})
return syllabus
    }catch{
        throw error
    }
}
//delete syllabus
export const deleteSyllabus = async(subject_id:any)=>{
    try{

    }catch{
        throw error
    }
}
//getReport
export const get =async(subject_id:any)=>{
    try{
return{
    'expected':await ExpectedSyllabus.findAll({where:{
    subject_id:subject_id,
    year:(new Date()).getFullYear()
    },attributes:['month_number','pages','description','year']}),

    'actual':await ActualSyllabus.findAll({where:{
        subject_id:subject_id,
        year:(new Date()).getFullYear()
        },attributes:['month_number','pages','description','year']}),
    //'remarks':
} 
    }
    catch{
        throw error
    }
}
// export const updateDetails=async(subject_id:any,newName:any,newPeriod:any,newTeacher:any)=>
//     {
//       console.log("in update details")
//       try{
//   const subject =await Subject.findByPk(subject_id)
//   return{
//     id:subject?.dataValues.id,
//     name:await updateName(subject,newName),
//     period:await updatePeriod(subject,newPeriod),
//     teacher:await updateTeacher(subject,newTeacher)
//   }
//       } catch{
//         throw error
//       }
//     }
const syllabusService={
    create,mark,get,deleteSyllabus
}

    export default syllabusService