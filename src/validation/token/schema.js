import Joi from "joi";

const createTokenRequest = Joi.object({
    token: Joi.string().required(),
    user_id: Joi.number().required()
})

export {
    createTokenRequest
}