import { Op, Sequelize } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import fs from 'fs'
import path from "path";
import Classes from "../../models/Classes";
//create 
export const createClass = async (classDetails: any) => {
    try {
      let classes: any
      const { name } = classDetails
      
          classes = await Classes.create({
            name : name
          })
      
          // const classs = classes.findAll({where:{name:'Ali Iqbal'}});
      return classes
    } catch (error) {
      throw error
    }
  };
  
  export const updateClassName = async (oldname: string, newName: string) => {
    try {
const updateName=await Classes.update(
    {name:newName},
    {where:{name:oldname}}
    ); return updateName
        
    } catch (error) {
        throw error;
        console.log("no record found matching this name");
    }
};

  //view
  export const viewClass = async (name: any) => {
    try {
const view=await Classes.findOne(
    {where:{name:name}}
    ); return view
        
    } catch (error) {
        throw error;
        console.log("no record found matching this name");
    }
};
export const viewAll = async (message:any) => {
  try {
const view=await Classes.findAll(
  ); return view
      
  } catch (error) {
      throw error;
      
  }
};
  //delete
  export const deleteClass = async (name: any) => {
    try {
const deleteC=await Classes.destroy(
    {where:{name:name},
    force:true}
    );
    
    return deleteC;
        
    } catch (error) {
        throw error;
        console.log("no record found matching this name");
    }
};
  const classService = {
    createClass,
    updateClassName,viewClass,deleteClass,viewAll
}

export default classService