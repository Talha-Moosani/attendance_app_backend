import { DataTypes, HasMany, Sequelize } from "sequelize"
import sequelize from "../config/db.config"
import Class from "./Classes"

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

const Student = sequelize.define(
  "students",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
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
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true,
  }
)

// Student.sync({alter: true})

export default Student
