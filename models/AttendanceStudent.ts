import { DataTypes, Sequelize } from "sequelize"
import sequelize from "../config/db.config"

// // Generate and save password hash
// const hashPassword = async (user: any) => {
//   try {
//     user.password = await bcrypt.hash(
//       user.password,
//       parseInt(process.env.SALT_ROUNDS!!, 10)
//     )
//   } catch (error) {
//     console.error(error)
//   }
// }

const AttendanceStudents = sequelize.define(
  "attendance_students",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    student_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'students',
        key:'id'
      }
    },
    subject_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'subjects',
        key:'id'
      }
    },
    attendance_id:{
      type: DataTypes.INTEGER,
      references:{
        model:'attendance_types',
        key:'id'
      }
    }, 
    date:{
      allowNull:false,
      type:DataTypes.DATE
    },
    createdAt: {
      field: "created_at",
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },
    period:{
      field:"period",
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue:null
    }
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true,
  }
)

//AttendanceStudents.sync({alter: true})

export default AttendanceStudents
