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
import attendanceService, { jts } from "../attendance/Attendance";
import { getAssignedExpected } from "../../appdata/api/v1/public/Syllabus/controllers/Syllabus";

//create syllabus
export const create = async (subject_id: any, month_number: any, pages: any, description: any) => {
    try {
        //month number, pages,description, subject_id,year
        let syllabus = await ExpectedSyllabus.create({
            subject_id: subject_id,
            month_number: month_number,
            pages: pages,
            description: description,
            year: (new Date()).getFullYear()
        })
        return syllabus
    } catch {
        throw error
    }
}
//mark syllabus
export const mark = async (subject_id: any, pages: any, description: any) => {
    try {
        let sy=await ActualSyllabus.findOne({where:{
            subject_id: subject_id,
            month_number: (new Date()).getMonth(),
            year: (new Date()).getFullYear()
        }})
        if(sy==null){
            await ActualSyllabus.create({
                subject_id: subject_id,
                month_number: (new Date()).getMonth(),
                pages: pages,
                description: description,
                year: (new Date()).getFullYear()
            })
            return "syllabus created"   
        }else{
            sy.update({
                pages:pages,description:description})
        return "syllabus updated"
            }
        
    } catch {
        throw error
    }
}
//delete syllabus
export const deleteSyllabus = async (subject_id: any) => {
    try {

    } catch {
        throw error
    }
}
export const  getExpected=async(class_id:any)=>{
let query1=`SELECT 
es.subject_id, 
s.name AS subject_name, 
es.month_number AS month, es.pages AS pages_expected, es.description AS description_expected
FROM 
expected_syllabuses es
LEFT JOIN 
subjects s ON s.id = es.subject_id 
WHERE s.class_id =:class_id AND es.year = YEAR(CURDATE())  -- Include rows where year is null
ORDER BY 
es.month_number;`
let listRN=[]
const[results1,metadata]=await sequelize.query(query1,{replacements:{class_id},raw:true})
        listRN.push({resp:await attendanceService.monthTOname(results1),name:"expected assigned"})
let query2=`SELECT s.id AS subject_id, s.name AS subject_name
FROM subjects s
WHERE s.class_id =:class_id
AND (s.id, s.name) NOT IN (
    SELECT es.subject_id, subj.name
    FROM expected_syllabuses es
    LEFT JOIN actual_syllabuses ac ON es.month_number = ac.month_number AND es.subject_id = ac.subject_id
    LEFT JOIN subjects subj ON subj.id = es.subject_id
    LEFT JOIN classes cls ON subj.class_id = cls.id
    WHERE cls.id = 9
    AND es.year = YEAR(CURDATE())
    AND ac.year = YEAR(CURDATE())
);
`
const[results2,metadata1]=await sequelize.query(query2,{replacements:{class_id},raw:true})
        listRN.push({resp:results2,name:"expected unassigned"})
        await attendanceService.jts("class"+class_id+"_syllabus_assignment_report.xlsx",listRN)
        return {path: 'C:\\Users\\aliiq\\attendance_app_backend\\attendance_app_backend\\'+"class"+class_id+"_syllabus_assignment_report.xlsx"}

}
//getReport
export const get = async (class_id: any) => {
    try {
        let query=` select expected_syllabuses.subject_id, subjects.name, expected_syllabuses.month_number as month ,expected_syllabuses.pages 
        as pages_expected, expected_syllabuses.description
        as description_expected, actual_syllabuses.pages  as pages_actual, actual_syllabuses.description as description_actual
        from expected_syllabuses 
        left join actual_syllabuses using (month_number,subject_id) left join subjects on subjects.id=expected_syllabuses.subject_id 
        left join classes on subjects.class_id=classes.id where subjects.class_id=:class_id and expected_syllabuses.year=year(curdate()) 
        and actual_syllabuses.year=year(curdate()) 
        order by month;
        `
        const[results,metadata]=await sequelize.query(query,{replacements:{class_id},raw:true})
        let converted=await attendanceService.monthTOname(results)
        await attendanceService.jts("class"+class_id+"_syllabus_report.xlsx",[{resp:converted,name:"report"}])
        return {path: 'C:\\Users\\aliiq\\attendance_app_backend\\attendance_app_backend\\'+"class"+class_id+"_syllabus_report.xlsx"}

    }
    catch {
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
const syllabusService = {
    create, mark, get, deleteSyllabus,getExpected
}

export default syllabusService