import supertest from "supertest";
import {web} from "../../src/app/web.js";

describe("Register user endpoint", () => {
    it("should can register", async () => {
        const res = await supertest(web)
            .post("/users")
            .send({
                name: "Mario",
                email: "mario@test.com",
                password: "123",
                profession: "Hidup"
            })

        expect(res.status).toBe(200);
    })

    it("should fail to register (400)",async () => {
        const res = await supertest(web)
            .post("/users")
            .send({
                name: "",
                email: "mario@test.com",
                password: "123",
                profession: "Hidup"
            })

        expect(res.status).toBe(400);
    })

    it("should error duplicate email (409)",async () => {
        const res = await supertest(web)
            .post("/users")
            .send({
                name: "Teguh",
                email: "mario@test.com",
                password: "123",
                profession: "Hidup"
            })

        expect(res.status).toBe(409);
    })
})