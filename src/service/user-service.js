import {validate} from "../validation/validation.js";
import {loginUserRequest, registerUserRequest} from "../validation/user-validation.js";
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

const login = async (request) => {
    const payload = validate(loginUserRequest, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            profession: true,
            avatar: true,
            role: true,
        }
    });

    if (!user) {
        throw new ResponseError(400, "Bad Request", "Username or password is wrong");
    }

    const isValidPassword = await bcrypt.compare(payload.password, user.password);
    if (!isValidPassword) {
        throw new ResponseError(400, "Bad Request", "Username or password is wrong");
    }

    delete user.password;
    console.log(user)
    return user
}

export default {
    register,
    login
}