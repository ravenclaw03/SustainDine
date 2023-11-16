import Joi from "joi";
// const userSchema=Joi.object({
//         username:Joi.string()
//                 .token()
//                 .min(3)
//                 .max(30)
//                 .required(),
//         firstName: Joi.string().alphanum().required(),
//         lastName:Joi.string().alphanum().required(),
//         address: Joi.string().required(),
//         contact:Joi.string().length(10).pattern(/^[0-9]+$/).required()

//     })
export const ngoSchema=Joi.object({
    name:Joi.string().alphanum().required(),
    pincode: Joi.string().length(6).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    address: Joi.string().required(),
    contact:Joi.string().length(10).pattern(/^[0-9]+$/).required()

})
const DeliveryPersonSchema=Joi.object({
    username:Joi.string()
            .token()
            .min(3)
            .max(30)
            .required(),
    firstName: Joi.string().alphanum().required(),
    lastName:Joi.string().alphanum().required(),
    contact:Joi.string().length(10).pattern(/^[0-9]+$/).required()

})

//export {userSchema,ngoSchema,}