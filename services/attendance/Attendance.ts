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
import exp from "constants";
import teacherService from "../teacher/Teacher";
import subjectService from "../subject/Subject";
import classService from "../class/Class";
import json2xls from 'json2xls';
const XLSX = require('xlsx');//create 
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
}/**
 * 
 * @param fileName name of workbook
 * @param listRN a list having objects where each object is pair of resp and name
 */
 export const jts=async(fileName:any,listRN:any)=>{
  
// // Assume 'resp' contains the JSON data received from the server
const workbook = XLSX.utils.book_new();
for( let i=0;i<listRN.length;i++){
  const ws = XLSX.utils.json_to_sheet(listRN.at(i).resp);
  XLSX.utils.book_append_sheet(workbook, ws, (listRN.at(i).name));
}
XLSX.writeFile(workbook, fileName, { compression: true });
return "file downloaded"

 } 
 export const monthTOname= async (list:unknown[])=>{

  const resultWithMonthNames = list.map((item:any) => {
    const monthNames = [
        "", // Months are 1-based, so index 0 is unused
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const monthNumber = item.month;
    if (monthNumber >= 1 && monthNumber <= 12) {
        item.month = monthNames[monthNumber];
    } else {
        item.month = "Invalid Month";
    }

    return item;
});
console.log(resultWithMonthNames)
return resultWithMonthNames
 }
export const getStudentReport=async(student:any)=>{
  try {
    
    if(student==null){
      return "null"
    }else{
   let s= await studentService.getStudent(student)

   let listRN=[]
    let sid=student
    let query1=`SELECT 
    period,
    SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
    SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
    SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
    FROM 
    attendance_students
    WHERE 
    attendance_students.student_id =:sid
    AND DATE(date) <= CURDATE() and year(date)=year(curdate()) -- Filter dates until the current date
    GROUP BY 
    student_id,period order by  period asc;
    `
    const [results1,metadata1]=await sequelize.query(
      query1,
      {replacements:{sid},
      raw:true}
    )
listRN.push({resp:results1,name:"period wise hazri till today"})
    
    
    
      
      let query2=`SELECT month(date) as month,
      period,
      SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
      SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
      SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
  FROM 
      attendance_students
  WHERE 
      attendance_students.student_id =:sid
      AND DATE(date) <= CURDATE() -- Filter dates until the current date
      AND YEAR(date) = YEAR(CURDATE()) -- Filter by current year
  GROUP BY 
      YEAR(date), month(date), period
      order by month(date), period asc;
  `
  const [results,metadata]=await sequelize.query(query2,{replacements:{sid},raw:true})
 
listRN.push({resp:await(monthTOname(results)),name:"hr period ki month wise hazri"})

    let query3=`SELECT 
    SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
    SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
    SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
    FROM 
    attendance_students
    WHERE 
    attendance_students.student_id =:sid
    AND DATE(date) <= CURDATE() and year(date)=year(curdate()) -- Filter dates until the current date
    GROUP BY 
    student_id;
    `
 const[results3,metadata2]=await sequelize.query(query3,{replacements:{sid},raw:true})

listRN.push({resp:results3,name:"total hazri"})

 
      
  let query4=`SELECT 
  month(date) AS month,
 
  SUM(CASE WHEN attendance_students.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
  SUM(CASE WHEN attendance_students.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
  SUM(CASE WHEN attendance_students.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
FROM 
  attendance_students
WHERE 
  attendance_students.student_id =:sid
  AND DATE(date) <= CURDATE() -- Filter dates until the current date
  AND YEAR(date) = YEAR(CURDATE()) -- Filter by current year
  
GROUP BY 
  student_id,month(date)
  order by month(date) asc;
`
const [results4,metadata4]=await sequelize.query(query4,{replacements:{sid},raw:true})
const str="Student"+s.id+"_"+s.name.replace(/\s/g, '')+".xlsx"
console.log(str)
listRN.push({resp:await(monthTOname(results4)),name:"hr month ki total hazri"})
let check=jts(str,listRN)
console.log(check)
 return {path: 'C:\\Users\\aliiq\\attendance_app_backend\\attendance_app_backend\\'+str}
  }
  }catch{
    throw error
  }
}
export const getSubjectReport=async(subject:any)=>{
  try {
    if(subject==null){
      return "null"
    }else{
   let s= await subjectService.getSubject(subject)

  }
  }catch{
    throw error
  }
}
export const getTeacherReport=async(teacher:any)=>{
  // for each class teacher is teaching in get attendance till today and for each month 
  try {
    if(teacher==null){
      return "null"
    }else{
      let t= (await teacherService.getTeaching(teacher))
      let data=[]
      let listRN=[]
      let tid=teacher
      let query1=`select classes.id as class_id, classes.name as class_name, subjects.period, subjects.name as subject_name, 
      SUM(CASE WHEN attendance_teachers.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
          SUM(CASE WHEN attendance_teachers.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
          SUM(CASE WHEN attendance_teachers.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
      from 
      attendance_teachers join teachers on attendance_teachers.teacher_id=teachers.id join subjects on attendance_teachers.subject_id=subjects.id join classes on classes.id=subjects.class_id
      WHERE 
          attendance_teachers.teacher_id =:tid
          AND DATE(date) <= CURDATE() -- Filter dates until the current date
          AND YEAR(date) = YEAR(CURDATE()) -- Filter by current year
      group by attendance_teachers.teacher_id,attendance_teachers.subject_id order by class_id asc;`
    const[results1,metadata1]=await sequelize.query(query1,{replacements:{tid}})
    
listRN.push({resp:results1,name:"hazri apni kitab k ghnte mn"})

    
      
      
        let query2=`select month(date) as month,classes.id as class_id, classes.name as class_name, subjects.id as subject_id, subjects.name as subject_name, subjects.period,
        SUM(CASE WHEN attendance_teachers.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
            SUM(CASE WHEN attendance_teachers.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
            SUM(CASE WHEN attendance_teachers.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
        from 
        attendance_teachers join teachers on attendance_teachers.teacher_id=teachers.id join subjects on attendance_teachers.subject_id=subjects.id join classes on classes.id=subjects.class_id
        WHERE 
            attendance_teachers.teacher_id =:tid 
            
            AND DATE(date) <= CURDATE() -- Filter dates until the current date
            AND YEAR(date) = YEAR(CURDATE()) -- Filter by current year
        group by attendance_teachers.teacher_id,attendance_teachers.subject_id , month(date) order by month(date), class_id asc;
    `
    const [results2,metadata2]=await sequelize.query(query2,{replacements:{tid},raw:true})
    
listRN.push({resp:await(monthTOname(results2)),name:"hazri apni kitab ki mahanawar"})

      
      let query3=`select 
      SUM(CASE WHEN attendance_teachers.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
          SUM(CASE WHEN attendance_teachers.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
          SUM(CASE WHEN attendance_teachers.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
      from 
      attendance_teachers
      WHERE 
          attendance_teachers.teacher_id =:tid 
          AND DATE(date) <= CURDATE() -- Filter dates until the current date
          AND YEAR(date) = YEAR(CURDATE()) -- Filter by current year
      group by attendance_teachers.teacher_id;`
      const [results3,metadata3]=await sequelize.query(query3,{replacements:{tid},raw:true})
     
      listRN.push({resp:results3,name:"total hazri aj tk"})
      
      
      
        let query4=`select month(date) as month,
        SUM(CASE WHEN attendance_teachers.attendance_id = 1 THEN 1 ELSE 0 END) AS present,
            SUM(CASE WHEN attendance_teachers.attendance_id = 2 THEN 1 ELSE 0 END) AS absent,
            SUM(CASE WHEN attendance_teachers.attendance_id = 3 THEN 1 ELSE 0 END) AS 'leave'
        from 
        attendance_teachers
        WHERE 
            attendance_teachers.teacher_id =:tid
            AND DATE(date) <= CURDATE() -- Filter dates until the current date
            AND YEAR(date) = YEAR(CURDATE()) -- Filter by current year
        group by attendance_teachers.teacher_id, month(date) order by month(date) asc;
    `
    const [results4,metadata4]=await sequelize.query(query4,{replacements:{tid},raw:true})
    const str="Teacher"+tid+"_"+t.name.replace(/\s/g, '')+".xlsx"
console.log(str)
listRN.push({resp:await(monthTOname(results4)),name:"hr maheene ki total hazri"})
let check=jts(str,listRN)
console.log(check)
      
return {path: 'C:\\Users\\aliiq\\attendance_app_backend\\attendance_app_backend\\'+str}
    
    }
   
  }catch{
    throw error
  }
}
export const getClassReport=async(classe:any)=>{
  try {
    if(classe==null){
      return "no report "
    }else{
      let c= await classService.getClass(classe)
    }
  }catch{
    throw error
  }
}

export const getReport = async (student_id:any,class_id:any,teacher_id:any,subject_id:any) => {
  try{

return {
  "class ki hazri ki report":await getClassReport(class_id),
  "student ki hazri ki report":await getStudentReport(student_id),
 "teacher ki hazri ki report": await getTeacherReport(teacher_id),
  // "kitab k hisab se hazri ki report":await getSubjectReport(subject_id)
}
  }catch{
    throw error
  }
}

  


  const attendanceService = {
    mark, getWithinDatesS, getWithinDatesT, getBySidnDate,getByCid,verifyByCid,getReport,monthTOname,jts
  }

  export default attendanceService