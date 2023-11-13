import express from 'express'
const router=express.Router();
import DeliveryPerson from '../models/deliveryperson.js'
import catchAsync from '../utils/catchAsync.js';
import ExpressError from '../utils/ExpressError.js';
//import {DeliveryPersonSchema} from '../Schemas.js';

const validateDeliveryPerson=(req,res,next)=>{
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
    const DeliveryPersons = await DeliveryPerson.find({});
     return res.json({
        count:DeliveryPersons.length,
        data: DeliveryPersons
     });
}))
router.post('/new',validateDeliveryPerson,catchAsync(async(req,res)=>{
    const newDeliveryPerson= new DeliveryPerson(req.body)
    await newDeliveryPerson.save();
    await res.send("User Created Successfully");
}))
router.get('/:id',catchAsync(async(req,res)=>{
    const DeliveryPerson= await DeliveryPerson.findById(req.params.id);
    return res.json(DeliveryPerson);
}))
router.put('/:id',validateDeliveryPerson,catchAsync(async(req,res)=>{
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
    const result= await DeliveryPerson.findByIdAndDelete(req.params.id);
    if(result)
    {
        res.send("Deleted successfully");
    }
    else{
        res.send("User not found")
    }
}))

export default router;