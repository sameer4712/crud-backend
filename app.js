import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
import userRoutes from './Routes/userRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import session from 'express-session'
dotenv.config()

const app = express();

app.use(express.json())
app.use(express.static("Uploads"))
app.use(express.urlencoded({ extended: true }));

app.use(session(
    {
        secret: "this_is_the_session",
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
            mongoUrl: process.env.dburi,
            collectionName: "session"
        })
    }))

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next()
})


app.use("/user",userRoutes)
app.use("/admin",adminRoutes)

mongoose.connect(process.env.dburi).then(() => {
    app.listen((process.env.port), () => {
        console.log("connected");

    })
})