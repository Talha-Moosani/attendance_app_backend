import passport from "passport"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {Request, Response, NextFunction, CookieOptions} from 'express'
import { unauthorizedResponse } from "../services/Response/Response"
import Responses from "../constants/Responses"

export const verifyUserOnLogin = passport.authenticate("user-local", {
  session: false
})

export const getJwt = (user: any) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: process.env.SESSION_EXPIRY
  })
}

export const getRefreshToken = (user: any) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET  as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
  return refreshToken
}

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  signed: true,
  maxAge: eval(process.env.COOKIE_EXPIRY as string),
  sameSite: "lax"
}

export const comparePassword = async (password: string, passwordToCompareWith: string) => {
  try {
    return await bcrypt.compare(password, passwordToCompareWith)
  } catch (error) {
    console.error(error)
  }
}


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    {
      session: false
    },
    (err: any, user?: Express.User | false | null, info?: object | string | Array<string | undefined> | any) => {
      if (err) {
        // if (err == "token expired")
        // {
        //   res.redirect('/login')
        // }
        unauthorizedResponse(res, err)
        return
      } else if (!user) {
        console.log("Hellloooooooo")
        unauthorizedResponse(res, info.message)
        return
      } else {
        req.user = user
        console.log("User found!")
        console.log("req.user => " + JSON.stringify(req.user))
        next()
        return
      }
    }
  )(req, res, next)
}
