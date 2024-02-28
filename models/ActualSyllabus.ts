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

const ActualSyllabus = sequelize.define(
  "actual_syllabus",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    month_number: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    pages: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    subject_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'subjects',
        key:'id'
      }
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

// ActualSyllabus.sync({alter: true})

export default ActualSyllabus
