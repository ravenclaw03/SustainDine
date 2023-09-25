import express from 'express';
const router=express.Router();
import Ngo from '../models/ngo.js'
import catchAsync from '../utils/catchAsync.js';
import ExpressError from '../utils/ExpressError.js';
import { ngoSchema } from '../Schemas.js';

const validateNgo=(req,res,next)=>{
    const {error}=ngoSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
//Ngos routers
router.get('/show',catchAsync(async(req,res)=>{
    const ngos = await Ngo.find({});
     return res.json({
        count:ngos.length,
        data: ngos
     });
}))

router.post('/new',validateNgo,catchAsync(async(req,res)=>{
    const newNgo= new Ngo(req.body);
    await newNgo.save();
    await res.send("NGO created successfully");
}))
router.get('/:id',catchAsync(async(req,res)=>{
    const ngo= await Ngo.findById(req.params.id);
    return res.json(ngo);
}))
router.put('/:id',validateNgo,catchAsync(async(req,res)=>{
    const result= await Ngo.findByIdAndUpdate(req.params.id,req.body);
    if(result)
    {
        res.send("Updated successfully");
    }
    else{
        res.send("Ngo not found")
    }
}))
router.delete('/:id',catchAsync(async(req,res)=>{
    const result= await Ngo.findByIdAndDelete(req.params.id);
    if(result)
    {
        res.send("Deleted successfully");
    }
    else{
        res.send("Ngo not found")
    }
}))

export default router;