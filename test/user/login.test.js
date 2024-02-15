import supertest from "supertest";
import {web} from "../../src/app/web.js";

describe("Login user endpoint", () => {
    it("should can login", async () => {
        const res = await supertest(web)
            .post("/users/login")
            .send({
                email: "aqib@test.com",
                password: "123",
            })

        expect(res.status).toBe(200)
        expect(res.body.data.password).toBeUndefined()
    })

    it("should fail to login (wrong email)", async () => {
        const res = await supertest(web)
            .post("/users/login")
            .send({
                email: "aqib@test.com",
                password: "123",
            })

        expect(res.status).toBe(400)
    })

    it("should can't login (wrong password)", async () => {
        const res = await supertest(web)
            .post("/users/login")
            .send({
                email: "aqib@test.com",
                password: "123",
            })

        expect(res.status).toBe(400)
    })

    it("should can't login (request not valid)", async () => {
        const res = await supertest(web)
            .post("/users/login")
            .send({
                email: "",
                password: "",
            })

        expect(res.status).toBe(400)
    })
})