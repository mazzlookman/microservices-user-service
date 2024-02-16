import supertest from "supertest";
import {web} from "../../src/app/web.js";

export const dummyToken = "initoken$323bbmnabsd"

describe("Create new token endpoint", () => {
    it("should can create new token", async () => {
        const res = await supertest(web)
            .post("/refresh-token")
            .send({
                token: dummyToken,
                user_id: 4
            })

        expect(res.status).toBe(200)
        expect(res.body.data.id).toBeDefined()
    })

    it("should can't create new token (404)", async () => {
        const res = await supertest(web)
            .post("/refresh-token")
            .send({
                token: "initoken$323bbmnabsd",
                user_id: 4+101
            })

        expect(res.status).toBe(404)
    })

    it("should can't create new token (400)", async () => {
        const res = await supertest(web)
            .post("/refresh-token")
            .send({
                token: "",
                user_id: 4
            })

        expect(res.status).toBe(400)
    })
})