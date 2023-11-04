import express from "express"
import mongoose from "mongoose"
import userRoutes from './routes/userRoutes.js'
import ngoRoutes from './routes/ngoRoutes.js'
import deliveryPersonRoutes from './routes/deliveryPersonRoutes.js'
import cors from 'cors'
import { PORT } from "./config.js"
import ExpressError from "./utils/ExpressError.js"
import 'dotenv/config'
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"

const app=express();
//middleware for parsing req body in json
app.use(express.json());
//middleware for user and ngo routes
app.use('/user',userRoutes);
app.use('/ngo',ngoRoutes);
app.use('/deliveryPerson',deliveryPersonRoutes);
//middleware for CORS policy
app.use(cors({
    origin:'http://localhost:3000/',
    methods:['GET','POST','PUT', 'DELETE'],
    allowedHeaders:['Content-Type'],
}));

const mongoDBURL=process.env.DB_URL;
//session
const secret = process.env.SECRET;

const store = MongoStore.create({
  mongoUrl: mongoDBURL,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret,
  }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.get("/",(req,res)=>{
    res.send("Hello Bhai, welcome to the home page");

})
app.all('*',(req,res,next)=>{
    next(new ExpressError("Page Not found",404))
})
app.use((err,req,res,next)=>{
    const {statusCode=500,message}=err; 
    if(!err.message)err.message='Something went wrong'
    res.status(statusCode).send(message);
})

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`App is listening at port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})
