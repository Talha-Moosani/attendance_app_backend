import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
  "attendance_app",
  "root",
  "YES",
  {
    host: "localhost",
    dialect: 'mysql', 
    logging: false, // Set to true to enable console logging
  }
);

export default sequelize;
