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

export default {
    register
}