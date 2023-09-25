import express from "express"
import {PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose"
import userRoutes from './routes/userRoutes.js'
import ngoRoutes from './routes/ngoRoutes.js'
import cors from 'cors'
import ExpressError from "./utils/ExpressError.js"
const app=express();
//middleware for parsing req body in json
app.use(express.json());
//middleware for user and ngo routes
app.use('/user',userRoutes);
app.use('/ngo',ngoRoutes);
//middleware for CORS policy
app.use(cors({
    origin:'http://localhost:3000/',
    methods:['GET','POST','PUT', 'DELETE'],
    allowedHeaders:['Content-Type'],
}));


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
