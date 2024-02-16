import {validate} from "../validation/validate-schema.js";
import {loginUserRequest, registerUserRequest, updateUserRequest} from "../validation/user/schema.js";
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
    return user
}

const update = async (request, userId) => {
    const payload = validate(updateUserRequest, request)
    const {name, email, password, profession, avatar} = payload

    userId = parseInt(userId)

    const findById = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            email: true
        }
    })

    if (!findById) {
        throw new ResponseError(404, "Not Found", "User not found")
    }

    const findByEmail = await prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true
        }
    })

    if (email !== findById.email && findByEmail) {
        throw new ResponseError(409, "Conflict", "Email already exists");
    }

    const fixPayloadToUpdate = {}
    if (name) {
        fixPayloadToUpdate.name = name
    }

    if (email) {
        fixPayloadToUpdate.email = email
    }

    if (password) {
        fixPayloadToUpdate.password = await bcrypt.hash(password, 10)
    }

    if (profession) {
        fixPayloadToUpdate.profession = profession
    }

    if (avatar) {
        fixPayloadToUpdate.avatar = avatar
    }

    return prismaClient.user.update({
        data: fixPayloadToUpdate,
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            profession: true,
            avatar: true
        }
    })
}

const getUser = async (userId) => {
    userId = parseInt(userId)
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            profession: true,
            avatar: true,
            role: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found")
    }

    return user
}

const getUsers = async (Ids) => {
    const query = {
        select: {
            id: true,
            name: true,
            email: true,
            profession: true,
            avatar: true,
            role: true
        }
    }

    if (Ids.length) {
        query.where = {
            id : {
                in: Ids
            }
        }
    }

    console.log(query)

    const users = await prismaClient.user.findMany(query)

    if (!users) {
        throw new ResponseError(404, "Not Found", "No users found")
    }

    return users
}

const logout = async (userId) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found")
    }

    return prismaClient.$executeRaw`delete from refresh_tokens where user_id=${userId}`
}

export default {
    register,
    login,
    update,
    getUser,
    getUsers,
    logout
}