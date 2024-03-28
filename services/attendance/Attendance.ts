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
import { error } from "console";
import Class from "../../models/Classes";
import Studying from "../../models/Studying";

//create 
//name,student_id,subject_id,teacher_id,date
export const mark = async ( teacher_id: any, teacher_attendance: any, studentData: any, subject_id: any, period:any) => {
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
            sequelize.col('period'),
            Op.eq,
            period
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
          status:'updated'
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
        attendance_id: teacher_attendance,
        period:period
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
              sequelize.col('period'),
              Op.eq,
              period
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
          attendance_id: studentData[i].student_attendance,
          period:period
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
    // const updated_record=await getByCid(class_id);;
    // data.push({
    //   updated_record
    // });
    return data;
  }
  catch (error) {
      throw error;
    }
  };

  export const getByCid=async(cid:any)=>{
    const classId = cid; // Example value, replace with user input or any other source

    const query = `
        SELECT
            classes.id AS class_id,
            classes.name AS class_name,
            students.id AS student_id,
            students.name AS student_name,
            studyings.year,
            attendance_students.attendance_id AS attendance,
            subjects.id AS subject_id,
            subjects.name AS in_subject,
            subjects.period AS for_period,
            attendance_students.date
        FROM
            classes
        LEFT JOIN
            studyings ON classes.id = studyings.class_id
        LEFT JOIN
            students ON studyings.student_id = students.id
        LEFT JOIN
            attendance_students ON students.id = attendance_students.student_id
        LEFT JOIN
            subjects ON attendance_students.subject_id = subjects.id
        WHERE
            classes.id = :classId;
    `;

try {
  const [results, metadata] = await sequelize.query(query, {
    replacements: { classId },
});
if(results.length==0){
  return "no students in this class"
}
  else return results;
  } catch (error) {
      throw error
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
export const verifyByCid=async (cid:any)=>{
  console.log("verifybycid")
  try{
// take class id, first get subjects for that cid, then for each subject get students, get the current date, then for each subject
//for all students check whether all of them have their attendance id>0, if yes  true and return ,  else false 
let data=[]
const subjects=await Subject.findAll({
  attributes:['id','name','period'],
  where:{
    class_id:cid
  }
})

for (const sid of subjects) {
  let s = sid.dataValues.id; // Accessing the subject_id attribute of the subject instance
  console.log(s);
  // all attendaances present for provided subject id and on current date
let query=`SELECT * FROM attendance_students where DATE(date) = CURDATE() and subject_id=:s;
`
const results=await sequelize.query(query,{
  replacements:{s},
  model:AttendanceStudents,
  mapToModel:true
})
// no data for provided subject today i.e no attendance marked
if(results.length==0){
data.push({
  subject_id:sid.dataValues.id,
  subject_name:sid.dataValues.name,
  period:sid.dataValues.period,
  attendance_status:'not marked'
})
}
else{
  data.push({
    subject_id:sid.dataValues.id,
    subject_name:sid.dataValues.name,
    period:sid.dataValues.period,
    attendance_status:'marked'
  })

}
}

return data;

  }catch{
    throw error
  }
}
// takes subject id, student id, attendance type as input where type would be by default from the start of year till today and incase
// a input is provided then go for monthly 

export const getStDateS=async(student_id:any)=>{
  // student id has values date,period,subjectid,classid is null

  try{
let data=[]
const query=` select  attendance_students.period,
SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
  SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
  SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
from attendance_students
where attendance_students.student_id=:sid and DATE(date)<=curdate()
group by period
`
let sid=student_id
const[results,metadata]=await sequelize.query(query,{
  replacements:{sid}
}) 
return results;
  }catch{
    throw error
  }
}
export const getStMonthS=async(student_id:any,m:any)=>{
  // student id,date has values ,period,subjectid,classid is null

  try{
let data=[]
const query=` SELECT 
attendance_students.period,
SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
FROM 
attendance_students
WHERE 
attendance_students.student_id = :sid 
AND MONTH(date) = :month
AND YEAR(date) = YEAR(CURDATE())  
GROUP BY 
period;

`
let sid=student_id;
let month=m;
const[results,metadata]=await sequelize.query(query,{
  replacements:{sid,month}
}) 
return results;
  }catch{
    throw error
  }
}

export const getStPeriodS=async(student_id:any,p:any)=>{
  // student id,date has values ,period,subjectid,classid is null

  try{
let data=[]
const query=` SELECT 
student_id,period,
SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
FROM 
attendance_students
WHERE 
attendance_students.student_id = :sid 
AND attendance_students.period = :period
AND DATE(date) <= CURDATE()  -- Filter dates until the current date
GROUP BY 
student_id,period;

`
let sid=student_id;
let period=p;
const[results,metadata]=await sequelize.query(query,{
  replacements:{sid,period}
}) 
return results;
  }catch{
    throw error
  }
}


export const getStatsS = async (period:any, subject_id:any, student_id:any, type:any) => {
  if (period && subject_id && student_id && type) {
      // Combination 1: All parameters have values

  } else if (period && subject_id && student_id && !type) {
      // Combination 2: period, subject_id, student_id have values, type is null
  } else if (period && subject_id && !student_id && type) {
      // Combination 3: period, subject_id, type have values, student_id is null
  } else if (period && subject_id && !student_id && !type) {
      // Combination 4: period, subject_id have values, student_id and type are null
  } else if (period && !subject_id && student_id && type) {
      // Combination 5: period, student_id, type have values, subject_id is null
  } else if (period && !subject_id && student_id && !type) {
      // Combination 6: period, student_id have values, subject_id and type are null
  } else if (!period && subject_id && student_id && type) {
      // Combination 7: subject_id, student_id, type have values, period is null
  } else if (!period && subject_id && student_id && !type) {
      // Combination 8: subject_id, student_id have values, period and type are null
  } else {
      // Handle the case where all parameters are null or unexpected combination
  }
}

  


  const attendanceService = {
    mark, getWithinDatesS, getWithinDatesT, getBySidnDate,getByCid,verifyByCid, getStatsS
  }

  export default attendanceService