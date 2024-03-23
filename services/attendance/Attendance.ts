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
import studentService from "../student/Student";

//create 
//name,student_id,subject_id,teacher_id,date
export const mark = async (class_id: any, teacher_id: any, teacher_attendance: any, studentData: any, subject_id: any) => {
  let data = []
  console.log("in service marks");
  try {
    if (!Array.isArray(studentData)) {
      console.error('Error: studentData is not an array or is undefined');
    }
    //aj ki tareekh
    let currentDate = new Date();
    let newDate = currentDate.toISOString().split('T')[0];
    //for teachers
    const teacher = await AttendanceTeachers.findOne({
      where:
        [
          sequelize.where(
            sequelize.fn('STR_TO_DATE', sequelize.col('date'), '%Y-%m-%d'),
            Op.eq,
            sequelize.fn('STR_TO_DATE', newDate, '%Y-%m-%d'),

          ),
          sequelize.where(
            sequelize.col('subject_id'),
            Op.eq,
            subject_id
          ),
          sequelize.where(
            sequelize.col('teacher_id'),
            Op.eq,
            teacher_id,
          ),
          sequelize.where(
            sequelize.col('attendance_id'),
            Op.ne,
            null
          ),
        ]
    });

    //console.log("number of such instances: ", existingAttendance)

    if (teacher != null) {
      // If attendance record exists, update it
      console.log("in if condition teacher updating record")
      await teacher.update({ attendance_id: teacher_attendance });
      data.push({
        teacher_record: {
          teacher_id:teacher_id,
          teacher_attendance:teacher_attendance,
          status:'inserted'
        }
      })
      console.log("teacher ki hazri updated")
    }
    else {
      //     // If attendance record doesn't exist, create a new one
      console.log("instance teacher present: false")
      const newValue = await AttendanceTeachers.create({
        date: currentDate,
        subject_id: subject_id,
        teacher_id: teacher_id,
        attendance_id: teacher_attendance
      });
      data.push({
        teacher_record: {
          teacher_id:teacher_id,
          teacher_attendance:teacher_attendance,
          status:'inserted'
        }
      })
      console.log("teacher ki hazri lg gyi")
    }

    for (let i = 0; i < studentData.length; i++) {

      // Check if there's an existing attendance record for the student and subject for the current date
      const existingAttendance = await AttendanceStudents.findOne({
        where:
          [
            sequelize.where(
              sequelize.fn('STR_TO_DATE', sequelize.col('date'), '%Y-%m-%d'),
              Op.eq,
              sequelize.fn('STR_TO_DATE', newDate, '%Y-%m-%d'),

            ),
            sequelize.where(
              sequelize.col('subject_id'),
              Op.eq,
              subject_id
            ),
            sequelize.where(
              sequelize.col('student_id'),
              Op.eq,
              studentData[i].student_id
            ),
            sequelize.where(
              sequelize.col('attendance_id'),
              Op.ne,
              null
            ),
          ]
      });

      //console.log("number of such instances: ", existingAttendance)

      if (existingAttendance != null) {
        // If attendance record exists, update it
        console.log("in if condition")
        await existingAttendance.update({ attendance_id: studentData[i].student_attendance });
        data.push({
          student_record: {
            student_id: studentData[i].student_id,
            student_attendance: studentData[i].student_attendance,
            status: 'updated'
          }
        });
      }
      else {
        //     // If attendance record doesn't exist, create a new one
        console.log("instance present: false")
        const newValue = await AttendanceStudents.create({
          date: currentDate,
          subject_id: subject_id,
          student_id: studentData[i].student_id,
          attendance_id: studentData[i].student_attendance
        });
        data.push({
          student_record: {
            student_id: studentData[i].student_id,
            student_attendance: studentData[i].student_attendance,
            status: 'inserted'
          }
        })
        

      }
    }
    const updated_record=await studentService.viewStudentsByClassId(class_id);;
    data.push({
      updated_record
    });
    return data;
  }
  catch (error) {
      throw error;
    }
  };


  // get attendance between dates for students
  export const getWithinDatesS = async (startDate: any, endDate: any) => {

    try {
      // let csd= new Date(startDate); 
      // let ced=new Date(endDate);
      // console.log("dates converetd");
      const attendanceWithindates = await AttendanceStudents.findAll({
        where: [
          sequelize.where(
            sequelize.col('date'),
            Op.gte,
            sequelize.fn('STR_TO_DATE', startDate + ' 00:00', '%Y-%m-%d %H:%i')
          ),
          sequelize.where(
            sequelize.col('date'),
            Op.lte,
            sequelize.fn('STR_TO_DATE', endDate + ' 23:59', '%Y-%m-%d %H:%i')
          )
        ]
      }
      )
      return attendanceWithindates;
    }
    catch (error) {
      throw error
    }
  };
  // get attendance between dates for teachers

  export const getWithinDatesT = async (startDate: any, endDate: any) => {

    try {

      const attendanceWithindates = await AttendanceTeachers.findAll({
        where: [
          sequelize.where(
            sequelize.col('date'),
            Op.gte,
            sequelize.fn('STR_TO_DATE', startDate + ' 00:00', '%Y-%m-%d %H:%i')
          ),
          sequelize.where(
            sequelize.col('date'),
            Op.lte,
            sequelize.fn('STR_TO_DATE', endDate + ' 23:59', '%Y-%m-%d %H:%i')
          )
        ]
      }
      )
      return attendanceWithindates;
    }
    catch (error) {
      throw error
    }
  };

  //update attendance if it is being marked again on same date for same subject
  export const updateAttendance = async (teacher_id: any, teacher_attendance: any, studentData: any, subject_id: any) => {

    try {
      if (!Array.isArray(studentData)) {
        console.error('Error: studentData is not an array or is undefined');
      }
      let d = new Date();
      for (let i = 0; i < studentData.length; i++) {
        // Insert attendance record for the current student
        console.log("student:", studentData[i].student_id);
        await AttendanceStudents.create({
          date: d,
          subject_id: subject_id,
          student_id: studentData[i].student_id,
          attendance_id: studentData[i].student_attendance
        });
      }
      console.log("marking teachers");
      await AttendanceTeachers.create({
        date: d,
        teacher_id: teacher_id, subject_id: subject_id, attendance_id: teacher_attendance
      })
      return "attendance marked";
    }
    catch (error) {
      throw error
    }
  };

  //get attendance by class id and date
  export const getBySidnDate = async (date: any, class_id: any) => {
    let cd = new Date(date);
    console.log("in attendance service ", date, " class id is: ", class_id)

    try {
      const attendanceRecords = await AttendanceStudents.findAll({
        include: [{
          model: Subject,
          where: { class_id: class_id }
        }],
        where: {
          date: {
            [Op.eq]: cd // Assuming 'date' is the column name in the AttendanceStudents table
          }
        }
      });
      return attendanceRecords;
    } catch (error) {
      console.error("Error retrieving attendance:", error);
      throw error;
    }
  }

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
    mark, getWithinDatesS, getWithinDatesT, getBySidnDate
  }

  export default attendanceService