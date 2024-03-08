import { Op, Sequelize } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import fs from 'fs'
import path from "path";
import Classes from "../../models/Classes";
import Subject from "../../models/Subject";
//create 
export const getSubjectsByCid = async (cid:any) => {
    try {
        const subjects=await Subject.findAll({
            where:{class_id:cid}
        });return subjects
    //   let classes: any
    //   const { name } = classDetails
      
    //       classes = await Classes.create({
    //         name : name
    //       })
      
    //       // const classs = classes.findAll({where:{name:'Ali Iqbal'}});
    //   return classes
    } catch (error) {
      throw error
    }
  };
  
  const subjectService = {
    getSubjectsByCid
}

export default subjectService