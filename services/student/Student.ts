import { Op, Sequelize } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import fs from 'fs'
import path from "path";
import Student from "../../models/Student";
import Studying from "../../models/Studying";
import classService from "../class/Class";
import Class from "../../models/Classes";
import AttendanceStudents from "../../models/AttendanceStudent";
//create 
export const createStudent = async (sname:any) => {
    try {
      let student: any
      
      
          student = await Student.create({
            name : sname
          })
      
          // const students = Student.findAll({where:{name:'Ali Iqbal'}});
      return student
    } catch (error) {
      throw error
    }
  };
//create student studying: will take name, of student and use create student to insert student in Stduent and then will use that 
// name to find student id from student to insert in studying, and will use class name for same purpose and year to populate studying.
  export const createSS= async (sname : any, cname: any , year: any ) => {
    try { let sid:any;
      let cid: any;
      sid= await createStudent(sname);
       console.log(sid.id)
cid=await classService.viewClass(cname);
let ss:any; 
ss=Studying.create({student_id:Number(sid.id),class_id:Number(cid.id),year:Number(year)});

      return ss;
    } catch (error) {
      throw error
    }
  };

  //update


  //view
  // viewing students by name, class, year created
  //by name
  export const viewStudentByName = async (name:any) => {
    try {
      const students= await Student.findAll({
        where:{name:name}
      }) ;return students;
     
    } catch (error) {
      throw error
    }
  };
//by class
  export const viewStudentsByClassId = async (cid:any) => {
   
      

try {

  const studentsByClassId = await Class.findAll({
    where:{id:cid},
   attributes:[['name','class_name']],
   
    include: [
        {
            model: Studying,
            required: true,
            attributes:['class_id','student_id','year'],
            include: [
                {
                  attributes:[['name','student_name']],
                    model: Student,
                    required: true,
                    include:[
                     { model: AttendanceStudents,
                      required:true,
                      where:{
                        id:"student_id"
                      },
                        attributes:[['attendance_id','student_attendance']]
                     }
                    ]
                }
            ]
        }
    ]
}); return studentsByClassId
    } catch (error) {
      throw error
    }
  };




//by year ceated
  export const viewStudentsByYearCreated = async (year:any) => {
   try{ 
    const students=await Studying.findAll({
      where:{year:year}
    });return students;
 
    } catch (error) {
      throw error
    }
  };

  //delete
  const studentService = {
    createSS,viewStudentsByClassId,viewStudentByName,viewStudentsByYearCreated
}

export default studentService