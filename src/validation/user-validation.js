import Joi from "joi";

const registerUserRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(3),
    profession: Joi.string().optional()
});

const loginUserRequest = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(3)
})

export {
    registerUserRequest,
    loginUserRequest
}