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

const Teaching = sequelize.define(
  "teaching",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    teacher_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'teachers',
        key:'id'
      }
    },
    class_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'classes',
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
    year:{
      allowNull:false,
      type:DataTypes.INTEGER
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

// Teaching.sync({alter: true})

export default Teaching
