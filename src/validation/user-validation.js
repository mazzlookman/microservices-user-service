import Joi from "joi";

const registerUserRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(3),
    profession: Joi.string().optional()
})

const loginUserRequest = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(3)
})

const updateUserRequest = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).optional(),
    profession: Joi.string().optional(),
    avatar: Joi.string().optional()
})

export {
    registerUserRequest,
    loginUserRequest,
    updateUserRequest
}