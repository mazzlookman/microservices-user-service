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

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.id);
        return res.json({
            code: 200,
            status: "OK",
            data: user,
        });
    } catch (e) {
        next(e);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const Ids = []
        if (req.query.id) {
            req.query.id.map((v) => {
                Ids.push(parseInt(v))
            })
        }

        const user = await userService.getUsers(Ids);
        return res.json({
            code: 200,
            status: "OK",
            data: user,
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.body.user_id);
        return res.json({
            code: 200,
            status: "OK",
            data: {
                is_logged_out: true
            },
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    update,
    getUser,
    getUsers,
    logout
}