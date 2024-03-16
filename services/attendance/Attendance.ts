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
export const mark = async (teacher_id: DataTypes.IntegerDataType, teacher_attendance: DataTypes.IntegerDataType, studentData: { student_id: typeof DataTypes.INTEGER, 
    student_attendance: typeof DataTypes.INTEGER, }[], subject_id: DataTypes.IntegerDataType) => {
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
    }
     catch (error) {
        throw error
    }
};

  
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
    mark
}

export default attendanceService