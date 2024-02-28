import passport from "passport"
import {ExtractJwt, Strategy, VerifiedCallback, StrategyOptions} from "passport-jwt"
import userService from "../services/User/User"
import { Request } from "express"

const cookieExtractor = (req: Request) => {
  let jwt = null 

  if (req && req.signedCookies) {
      jwt = req.signedCookies['token']
  }

  console.log("jwt =======> ", jwt)

  return jwt
}

const options: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'jdhdhd-kjfjdhrhrerj-uurhr-jjge'
} 

// Used by the authenticated requests to deserialize the user i.e., to fetch user details from the JWT.
const deserializeUser = async (jwt_payload: any, done: VerifiedCallback) => {
  console.log("jwt_payload =>" + JSON.stringify(jwt_payload))
  try {
    // if (!(Date.now() >= Number(jwt_payload.exp) * 1000))
    // {
    //   // console.log("exp => ", exp)
    //   return done("token expired", false)
    // }
    let user = await userService.getUserById(jwt_payload.id)

      if (user) {
        return done(null, user)
      } else {
        return done("Unauthorized", false)
      }
  } catch (error) {
    done(error, false)
  }
}

passport.use("jwt", new Strategy(options, deserializeUser))