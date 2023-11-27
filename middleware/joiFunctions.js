const Joi = require('joi');

const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    jobTitle: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    subscribe: Joi.string().required(),
    companyName: Joi.string().required(),
    phoneNumber: Joi.string(),
    googleToken: Joi.string().required()
})

const signUpValidate = (req,res,next)=>{
    const { error } = signupSchema.validate(req.body)
    if (error)  return res.status(400).json({ message: 'Validation error', error: error.details });
    next()
}

module.exports = signUpValidate