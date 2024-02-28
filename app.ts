import "./passport/JwtStrategy"
import "./passport/LocalStrategy"
import "./utils/auth.utils"
import "./models/Relations"

import cors, { CorsOptions } from "cors"
import createError from "http-errors"
import express from "express"
import path from "path"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import sequelize from "./config/db.config"
import { verifyUser } from "./utils/auth.utils"
import { handleErrors } from "./utils/errorHandling.utils"
import bodyParser from 'body-parser'
import publicRoutes from "./appdata/base-routes/Routes.public"
import privateRoutes from "./appdata/base-routes/Routes.private"
import passport from "passport"

dotenv.config()

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/uploads', (express.static(path.join(__dirname, "uploads"))))
// app.use('/uploads/csvs', (express.static(path.join(__dirname, "uploads/csvs"))))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())

const whitelistedDomains: string[] = ['http://localhost:5173']

const corsOptions: CorsOptions = {
  credentials: true,
  origin(requestOrigin, callback) {
    if (!requestOrigin) return callback(null, true)

    if (whitelistedDomains.indexOf(requestOrigin) === -1) {
      var msg = `${origin} does not have access to this server.`
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
}

//implementing cors
app.use(cors(corsOptions))
app.use('/api', publicRoutes)
app.use("/api", verifyUser, privateRoutes)
app.use(handleErrors)

// error handler

const initDB = async () => {
  // Check DB connection
  try {
    await sequelize.authenticate()
    //Uncomment for resetting the DB in dev environment
    await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
    console.log("Database connection has been established successfully.")
  } catch (error) {
    console.error(`Unable to connect to database: ${error}`)
  }
}

initDB()

export default app
