import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        return res.json({
            code: 200,
            status: "OK",
            data: user,
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const user = await userService.login(req.body);
        return res.json({
            code: 200,
            status: "OK",
            data: user,
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = await userService.update(req.body, req.params.id);
        return res.json({
            code: 200,
            status: "OK",
            data: user,
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    update
}