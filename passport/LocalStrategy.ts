import passport from "passport"
import { VerifiedCallback } from "passport-jwt"
import { Request } from "express"
import { IStrategyOptionsWithRequest, Strategy, VerifyFunctionWithRequest } from "passport-local"
import userService from "../services/User/User"
import responses from "../constants/Responses"
import { comparePassword } from "../utils/auth.utils"
import { serverErrorResponse, notFoundResponse } from "../services/Response/Response"

const options: IStrategyOptionsWithRequest = {
  usernameField: "user_name",
  passwordField: "password",
  passReqToCallback: true,
}

// This function contains passport conditions that validates a user
const authenticateUser: VerifyFunctionWithRequest = async (req: Request, username: string, password: string, done: VerifiedCallback) => {
  try {
      const user = await userService.getUserByUserName(username)  
      if (user) {
        console.log("user =====> ", user)

          // Here password is compared and validated
          const passwordsMatch = await comparePassword(password, user.password)
          if (passwordsMatch) {
            done(null, user)
          } else {
            serverErrorResponse(req.res, responses.GENERIC_LOGIN_FAILED_ERROR)
          }
      }
      // If no user exist return not found message
      else {
        notFoundResponse(req.res, responses.GENERIC_LOGIN_FAILED_ERROR)
      }
  } catch (error: any) {
    console.log("error local strategy...", error)
    serverErrorResponse(req, error)
  }
}

passport.use("user-local", new Strategy(options, authenticateUser))

