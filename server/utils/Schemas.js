import Joi from "joi";
const userSchema=Joi.object({
        fullName: Joi.string().alphanum().required(),
        password:Joi.string().required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        address: Joi.string().required(),
        contact:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        type: Joi.number().required(),
        latitude:Joi.number().required(),
        longitude:Joi.number().required(),
    })
const ngoSchema=Joi.object({
    name:Joi.string().alphanum().required(),
    pincode: Joi.string().length(6).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    address: Joi.string().required(),
    contact:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    latitude:Joi.number().required(),
    longitude:Joi.number().required(),
})
const deliveryPersonSchema=Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    fullName: Joi.string().alphanum().required(),
    contact:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    latitude:Joi.number().required(),
    longitude:Joi.number().required(),

})
const foodReqSchema=Joi.object({
    type:Joi.string().required(),
    numberOfPlates:Joi.number().required(),
    latitude:Joi.number().required(),
    longitude:Joi.number().required(),
})
export {ngoSchema,deliveryPersonSchema,foodReqSchema,userSchema}