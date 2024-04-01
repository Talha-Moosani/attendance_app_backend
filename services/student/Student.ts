import { Op, Sequelize, where } from "sequelize";
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
import { error } from "console";
//create 
export const createStudent = async (sname: any) => {
  try {
    let student: any


    student = await Student.create({
      name: sname
    })

    // const students = Student.findAll({where:{name:'Ali Iqbal'}});
    return student
  } catch (error) {
    throw error
  }
};
//create student studying: will take name, of student and use create student to insert student in Stduent and then will use that 
// name to find student id from student to insert in studying, and will use class name for same purpose and year to populate studying.
export const createSS = async (sname: any, cname: any, year: any) => {
  try {
    let sid: any;
    let cid: any;
    sid = await createStudent(sname);
    console.log(sid.id)
    cid = await classService.viewClass(cname);
    let ss: any;
    ss = Studying.create({ student_id: Number(sid.id), class_id: Number(cid.id), year: Number(year) });

    return ss;
  } catch (error) {
    throw error
  }
};

//update


//view
// viewing students by name, class, year created
//by name
export const viewStudentByName = async (name: any) => {
  try {
    const students = await Student.findAll({
      where: { name: name }
    }); return students;

  } catch (error) {
    throw error
  }
};
//by class
export const getByCid = async (cid: any) => {
  let clID = cid
  try {
    const query = ` select students.id,students.name,studyings.year,classes.id as class_id,classes.name as class_name 
      from students
      left join studyings on students.id=studyings.student_id
       left join classes on studyings.class_id=classes.id
       where classes.id=:clID;`
    const [results, metadata] = await sequelize.query(query, {
      replacements: { clID }
    })
    return results;
  } catch {
    throw error
  }
};




//by year ceated
export const viewStudentsByYearCreated = async (year: any) => {
  try {
    const students = await Studying.findAll({
      where: { year: year }
    }); return students;

  } catch (error) {
    throw error
  }
};
export const getAll = async () => {
  try {
    const query = `
    select distinct students.id,students.name,studyings.year,classes.id as class_id,classes.name as class_name 
    from students
    left join studyings on students.id=studyings.student_id
     left join classes on studyings.class_id=classes.id;
`;

    const [results, metadata] = await sequelize.query(query);


    return results;

  } catch (error) {
    throw error
  }
}

export const updateName = async (sid:any, newName:any) => {
  try {
   let student= await getStudent(sid)
   if(newName==null){
    return student.name
   }else{
    return (await (await Student.findByPk(sid))?.update({name:newName}))?.dataValues.name
   }

  } catch (error) {
    throw error
  }
}

export const updateClass = async (sid:any, newClass:any, year:any) => {
  try {
   let student= await getStudent(sid)
   if(newClass!=null && year!=null){
    console.log("newclass: ",newClass, "new year:",year)
    return await Studying.create({student_id:sid,class_id:newClass,year:year})
   }else{
    return student.class_details 
   }

  } catch (error) {
    throw error
  }
}



export const updateDetails = async (sid: any, newName:any ,newCID: any, newYear: any) => {
  console.log("in update details")
  try {
    return {
      id:sid,
      name:await updateName(sid,newName),
      class_details:await updateClass(sid,newCID,newYear)
    }

  } catch (error) {
    throw error
  }
}
export const getStudent = async (student_id: any) => {
  return {
    id: student_id,
    name: (await Student.findByPk(student_id))?.dataValues.name,
    class_details:
      (await classService.getClass((await Studying.findOne({where: {
          student_id: student_id,
          year: (new Date()).getFullYear(),
        }}))?.dataValues.class_id))
  }
}
//delete
const studentService = {
  createSS, viewStudentByName, viewStudentsByYearCreated, getAll, getByCid, updateDetails,getStudent
}

export default studentService