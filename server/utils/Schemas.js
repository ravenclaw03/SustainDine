import Joi from "joi";
const generalSchema=Joi.object({
        fullName: Joi.string().alphanum().required(),
        password:Joi.string().required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        address: Joi.string().required(),
        contact:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        type: Joi.number().required(),
        latitude:Joi.number().required(),
        longitude:Joi.number().required(),
    })
const foodReqSchema=Joi.object({
    type:Joi.string().required(),
    numberOfPlates:Joi.number().required(),
    latitude:Joi.number().required(),
    longitude:Joi.number().required(),
})
export {foodReqSchema,generalSchema}