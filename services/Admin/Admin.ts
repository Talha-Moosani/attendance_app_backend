import User from "../../models/User";

export const register = async (userInfo: { first_name: string, last_name: string, user_name: string, password: string, user_type_id: number}) => {
  try {
    const admin = await User.create({
      user_name: userInfo.user_name.toLowerCase(),
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      password: userInfo.password,
      user_type_id: userInfo.user_type_id
    })
    if (!admin) {
      return
    }

    return {
      admin: admin.dataValues
    }
  } catch (error) {
    return error
  }
}

export const updatePassword = async (newPassword: string, adminId: number) => {
  try {
    const user = await User.update(
      { password: newPassword },
      {
        where: { id: adminId },
        individualHooks: true
      }
    )

    if (!user) {
      return false
    }

    return true
  } catch (error) {
    console.error(error)
  }
}

export default {
    register,
    updatePassword
}
