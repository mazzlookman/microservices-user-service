import Joi from "joi";

const registerUserRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(3),
    profession: Joi.string().optional()
});

export {
    registerUserRequest
}