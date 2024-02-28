import responses from "../../../../../../constants/Responses";
import { getJwt, COOKIE_OPTIONS, getRefreshToken } from "../../../../../../utils/auth.utils";
import { successResponse } from "../../../../../../services/Response/Response";

import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";
import { getUserById } from "../../../../../../services/User/User";

const login: RequestHandler = async (req, res, next) => {
  try {
    
    const user = await getUserById(req.user?.id)
    // Remove users password from memory
    req.user!.password = undefined
    console.log("req.user after logging in => ", req.user)
    const jwtToken = getJwt({
      id: req.user!.id,
      user_name: req.user!.user_name,
      user_type: req.user!.user_role_id
    })

    const responseData = {
      jwtToken: jwtToken,
      user: { ...user }
    }

    res.cookie("token", `${jwtToken}`, COOKIE_OPTIONS)
    return successResponse(res, responseData)
  } catch (error) {
    next(error)
  }
}

export default {
  login
};
