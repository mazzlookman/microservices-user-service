import {validate} from "../validation/validate-schema.js";
import {createTokenRequest} from "../validation/token/schema.js";
import {prismaClient} from "../app/prisma-client.js";
import {ResponseError} from "../exception/response-error.js";

const create = async (request) => {
    const payload = validate(createTokenRequest, request)
    const {token, user_id} = payload

    const user = await prismaClient.user.findUnique({
        where: {
            id: user_id
        }
    })

    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found")
    }

    return prismaClient.refreshToken.create({
        data: {
            token: token,
            user_id: user_id
        },
        select: {
            id: true,
            token: true
        }
    })
}

const getToken = async (token) => {
    token = await prismaClient.refreshToken.findFirst({
        where: {
            token: token
        },
        select: {
            id: true,
            token: true,
            user_id: true
        }
    })

    if (!token) {
        throw new ResponseError(401, "Unauthorized", "Invalid token")
    }

    return token
}

export default {
    create,
    getToken
}