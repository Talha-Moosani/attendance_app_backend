import { DataTypes, Op, Sequelize } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import fs from 'fs'
import path from "path";
import Classes from "../../models/Classes";
import Subject from "../../models/Subject";
import Teacher from "../../models/Teacher";
import AttendanceStudents from "../../models/AttendanceStudent";
import AttendanceTeachers from "../../models/AttendanceTeacher";
import AttendanceType from "../../models/AttendanceType";

//create 
//name,student_id,subject_id,teacher_id,date
export const mark = async (teacher_id:any, teacher_attendance: any, studentData: any, subject_id: any) => {
        console.log("in service marks");
    try {
        if (!Array.isArray(studentData)) {
            console.error('Error: studentData is not an array or is undefined');
        }
       let  d=new Date();
        for (let i=0;i<studentData.length;i++) {
            // Insert attendance record for the current student
            console.log("student:",studentData[i].student_id);
            await AttendanceStudents.create({
                date:d,
                subject_id:subject_id,
                student_id: studentData[i].student_id,
                attendance_id: studentData[i].student_attendance
            });}
            console.log("marking teachers");
            await AttendanceTeachers.create({date:d,
teacher_id:teacher_id,subject_id:subject_id,attendance_id:teacher_attendance
            })
            return "attendance marked";
    }
     catch (error) {
        throw error
    }
};
// get attendance between dates for students
export const getWithinDatesS = async (startDate:any,endDate:any) => {

try {
  // let csd= new Date(startDate); 
  // let ced=new Date(endDate);
  // console.log("dates converetd");
 const attendanceWithindates= await AttendanceStudents.findAll({
  where:{
  date:{
    [Op.between]:[startDate,endDate],
  }
 }
}
)     
return attendanceWithindates;
}
catch (error) {
  throw error
}
};
// get attendance between dates for teachers

export const getWithinDatesT = async (startDate:any,endDate:any) => {

  try {
    
   const attendanceWithindates= await AttendanceTeachers.findAll({
    where:{
    date:{
      [Op.between]:[startDate,endDate],
    },
   }
  }
  )     
  return attendanceWithindates;}
  catch (error) {
    throw error
  }
  };

//update attendance if it is being marked again on same date for same subject
export const updateAttendance = async (teacher_id:any, teacher_attendance: any, studentData: any, subject_id: any) => {
 
  try {
    if (!Array.isArray(studentData)) {
        console.error('Error: studentData is not an array or is undefined');
    }
   let  d=new Date();
    for (let i=0;i<studentData.length;i++) {
        // Insert attendance record for the current student
        console.log("student:",studentData[i].student_id);
        await AttendanceStudents.create({
            date:d,
            subject_id:subject_id,
            student_id: studentData[i].student_id,
            attendance_id: studentData[i].student_attendance
        });}
        console.log("marking teachers");
        await AttendanceTeachers.create({date:d,
teacher_id:teacher_id,subject_id:subject_id,attendance_id:teacher_attendance
        })
        return "attendance marked";
}
 catch (error) {
    throw error
}
};

//get attendance by subject id and date
export const getBySidnDate = async (date:any, subject_id: any) => {
  
try {
  const studentsNteachers=await AttendanceStudents.findAll({
    where:{
    subject_id:subject_id,
    date:{
      [Op.eq]:date
    }
  }, include:[{
    model:AttendanceTeachers,required:true
  }]
})

return studentsNteachers;
}
catch (error) {
  throw error
}
};
// const teachers=await AttendanceTeachers.findAll({where:{
//   subject_id:subject_id,
//   date:{
//     [Op.eq]:date
//   }
// }})
//   export const updateClassName = async (oldname: string, newName: string) => {
//     try {
// const updateName=await Classes.update(
//     {name:newName},
//     {where:{name:oldname}}
//     ); return updateName
        
//     } catch (error) {
//         throw error;
//         console.log("no record found matching this name");
//     }
// };

  //view
//   export const viewClass = async (name: any) => {
//     try {
// const view=await Classes.findOne(
//     {where:{name:name}}
//     ); return view
        
//     } catch (error) {
//         throw error;
//         console.log("no record found matching this name");
//     }
// };
  //delete
//   export const deleteClass = async (name: any) => {
//     try {
// const deleteC=await Classes.destroy(
//     {where:{name:name},
//     force:true}
//     );
    
//     return deleteC;
        
//     } catch (error) {
//         throw error;
//         console.log("no record found matching this name");
//     }
// };
  const attendanceService = {
    mark,getWithinDatesS,getWithinDatesT,getBySidnDate
}

export default attendanceService