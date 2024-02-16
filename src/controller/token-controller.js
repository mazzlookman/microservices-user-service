import tokenService from "../service/token-service.js";

const create = async (req, res, next) => {
    try {
        const token = await tokenService.create(req.body)
        return res.json({
            code: 200,
            status: "OK",
            data: token,
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create
}