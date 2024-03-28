import { Op, Sequelize } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import fs from 'fs'
import path from "path";
import Classes from "../../models/Classes";
import Subject from "../../models/Subject";
import Teacher from "../../models/Teacher";
import Teaching from "../../models/Teaching";
import { error } from "console";
import Class from "../../models/Classes";
//create 
export const create = async (name: any) => {

  try {
    const teacher = await Teacher.create({
      name: name
    }); return teacher

  } catch (error) {
    throw error
  }
};
// teacher id, class id, subject id, year
export const assignSubject = async (subject_id: any, teacher_id: any, class_id: any, year: any) => {
  try {
    const teacher = await Teaching.create({
      subject_id: subject_id, teacher_id: teacher_id, class_id: class_id, year: year
    });
    return teacher;
  } catch (error) {
    throw error
  }
};
export const viewAll = async (command: any) => {
  try {
    const query = `
    SELECT
        teachers.id,
        teachers.name,
        teachings.year,
        subjects.id AS subject_id,
        subjects.name AS subject_name,
        subjects.period,
        classes.id AS class_id,
        classes.name AS class_name
    FROM
        teachers
    LEFT JOIN
        teachings ON teachers.id = teachings.teacher_id
    LEFT JOIN
        subjects ON teachings.subject_id = subjects.id
    LEFT JOIN
        classes ON teachings.class_id = classes.id;
`;

const [results, metadata] = await sequelize.query(query);
    
    
    return results;

  }
  catch (error) {
    throw error
  }
};

export const viewByCid = async (cid: any, year: any) => {
  try {
    //Add year in where
    const teachers = await Teaching.findAll({
      where: {
        year: year,
        class_id: cid
      }
    });
    return teachers;

  }
  catch (error) {
    throw error
  }
};

const teacherService = {
  create, assignSubject, viewAll, viewByCid
}

export default teacherService