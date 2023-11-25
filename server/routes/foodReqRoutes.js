import express from 'express'
const router=express.Router();
import FoodReq from '../models/foodReq.js';
import User from '../models/user.js'
import catchAsync from '../utils/catchAsync.js';
import ExpressError from '../utils/ExpressError.js';


router.get('/showactv',catchAsync(async(req,res)=>{
    const FoodReqs = await FoodReq.find({isAccepted:false});
     return res.status(200).json({
        count:FoodReqs.length,
        data: FoodReqs
     });
}))
router.get('/showall',catchAsync(async(req,res)=>{
    const FoodReqs = await FoodReq.find({});
     return res.status(200).json({
        count:FoodReqs.length,
        data: FoodReqs
     });
}))
router.post('/new',catchAsync(async(req,res)=>{
    const newFoodReq= new FoodReq(req.body)
    newFoodReq.isAccepted=false;

    await newFoodReq.save();
    return res.status(200).json(newFoodReq);
}))
router.put('/close/:id',catchAsync(async(req,res)=>{
    const foodreq= await FoodReq.findById(req.params.id);
    foodreq.isAccepted=true;
    await foodreq.save();
    return res.status(200).json(foodreq);
}))
router.put('/:id',catchAsync(async(req,res)=>{
    const result= await FoodReq.findByIdAndUpdate(req.params.id,req.body);
    if(result)
    {
        return res.status(200).json(result)
    }
    else{
        return res.status(404).json("Request not found")
    }
}))
router.delete('/:id',catchAsync(async(req,res)=>{
    const result= await FoodReq.findByIdAndDelete(req.params.id);
    if(result)
    {
        return res.status(200).json(result)
    }
    else{
        return res.status(404).json("Request not found")
    }
}))

export default router;