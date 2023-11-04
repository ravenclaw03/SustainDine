import express from 'express'
const router=express.Router();
import Dp from '../models/deliveryperson.js'
import catchAsync from '../utils/catchAsync.js';
import ExpressError from '../utils/ExpressError.js';
import {DeliveryPersonSchema} from '../Schemas.js';

const validateDp=(req,res,next)=>{
    const {error}=DeliveryPersonSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
//Users routers
router.get('/show',catchAsync(async(req,res)=>{
    const Dps = await Dp.find({});
     return res.json({
        count:Dps.length,
        data: Dps
     });
}))
router.post('/new',validateDp,catchAsync(async(req,res)=>{
    const newDp= new Dp(req.body)
    await newDp.save();
    await res.send("User Created Successfully");
}))
router.get('/:id',catchAsync(async(req,res)=>{
    const dp= await Dp.findById(req.params.id);
    return res.json(dp);
}))
router.put('/:id',validateDp,catchAsync(async(req,res)=>{
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
    const result= await Dp.findByIdAndDelete(req.params.id);
    if(result)
    {
        res.send("Deleted successfully");
    }
    else{
        res.send("User not found")
    }
}))

export default router;