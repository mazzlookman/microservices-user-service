import {validate} from "../validation/validation.js";
import {registerUserRequest} from "../validation/user-validation.js";
import {prismaClient} from "../app/prisma-client.js";
import {ResponseError} from "../exception/response-error.js";
import bcrypt from "bcrypt";
const register = async (request) => {
    const payload = validate(registerUserRequest, request);

    const userCount = await prismaClient.user.count({
        where: {
            email: payload.email,
        }
    });

    if (userCount !== 0) {
        throw new ResponseError(409, "Conflict", "Email already exists");
    }

    payload.password = await bcrypt.hash(payload.password, 10);

    return prismaClient.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
}

export default {
    register
}