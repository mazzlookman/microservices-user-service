import {web} from "../../src/app/web.js";
import supertest from "supertest";

describe("Get user endpoint testing", () => {

    it("should can get user", async () => {
        const res = await supertest(web)
            .get("/users/1")

        expect(res.status).toBe(200)
        expect(res.body.data.id).toBeDefined()
    })

    it("should can't get user (404)", async () => {
        const res = await supertest(web)
            .get(`/users/1${+100}`)

        expect(res.status).toBe(404)
        expect(res.body.data).toBeUndefined()
    })
})