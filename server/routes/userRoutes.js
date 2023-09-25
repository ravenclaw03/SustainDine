import express from 'express'
const router=express.Router();
import User from '../models/user.js'
import catchAsync from '../utils/catchAsync.js';
import ExpressError from '../utils/ExpressError.js';
import {userSchema} from '../Schemas.js';

const validateUser=(req,res,next)=>{
    const {error}=userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
//Users routers
router.get('/show',catchAsync(async(req,res)=>{
    const users = await User.find({});
     return res.json({
        count:users.length,
        data: users
     });
}))
router.post('/new',validateUser,catchAsync(async(req,res)=>{
    const newUser= new User(req.body)
    await newUser.save();
    await res.send("User Created Successfully");
}))
router.get('/:id',catchAsync(async(req,res)=>{
    const user= await User.findById(req.params.id);
    return res.json(user);
}))
router.put('/:id',validateUser,catchAsync(async(req,res)=>{
    const result= await User.findByIdAndUpdate(req.params.id,req.body);
    if(result)
    {
        res.send("Updated successfully");
    }
    else{
        res.send("User not found")
    }
}))
router.delete('/:id',catchAsync(async(req,res)=>{
    const result= await User.findByIdAndDelete(req.params.id);
    if(result)
    {
        res.send("Deleted successfully");
    }
    else{
        res.send("User not found")
    }
}))

export default router;