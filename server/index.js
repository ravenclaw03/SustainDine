import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import deliveryPersonRoutes from "./routes/deliveryPersonRoutes.js";
import mongoAuthRoutes from "./routes/mongoAuthRoutes.js"
import googleAuthRoutes from "./routes/googleAuthRoutes.js"
import foodReqRoutes from "./routes/foodReqRoutes.js"
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./auth/mongoAuth.js"
import "./auth/googleAuth.js"

const app = express();
//middleware for parsing req body in json
app.use(express.json());
//middleware for CORS policy
app.use(cors());

const mongoDBURL = process.env.DB_URL;
//session
const secret = process.env.SECRET ;
const store = MongoStore.create({
  mongoUrl: mongoDBURL,
  dbName:'foodApp',
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
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
//session middleware
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  next();
})
//home route
app.get("/", (req, res) => {
  res.send("Hello Bhai, welcome to the home page");
});

//middlewares for routes
app.use("/",mongoAuthRoutes);
app.use("/auth",googleAuthRoutes);
app.use("/user", userRoutes);
app.use("/ngo", ngoRoutes);
app.use("/deliveryPerson", deliveryPersonRoutes);
app.use("/foodReq",foodReqRoutes)

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).send(message);
});

//mongodb connection
const optionsdb={
  dbName:'foodApp'
}
const port=process.env.PORT;
mongoose.connect(mongoDBURL,optionsdb)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
