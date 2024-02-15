import supertest from "supertest";
import {web} from "../../src/app/web.js";

describe("Update user's profile endpoint", () => {
    it("should can update user (same email)", async () => {
        const res = await supertest(web)
            .patch("/users/4")
            .send({
                name: "Mario Teguh",
                email: "mario@test.com",
                password: "123",
                profession: "Still Alive"
            })

        expect(res.status).toBe(200)
    })

    it("should can update user (different email)", async () => {
        const res = await supertest(web)
            .patch("/users/4")
            .send({
                name: "Mario Teguh",
                email: "marite@test.com",
                // password: "123",
                // profession: "Sad Boy"
                avatar: "sadboy.png"
            })

        expect(res.status).toBe(200)
    })

    it("should fail to update user (400)", async () => {
        const res = await supertest(web)
            .patch(`/users/4`)
            .send({
                name: "Mario Teguh",
                // email format not valid
                email: "maritetest.com",
                password: 123,
                profession: "Still Alive"
            })

        expect(res.status).toBe(400)
    })

    it("should fail to update user (404)", async () => {
        const res = await supertest(web)
            .patch(`/users/4${+10}`)
            .send({
                name: "Mario Teguh",
                email: "marite@test.com",
                password: "123",
                profession: "Still Alive"
            })

        expect(res.status).toBe(404)
    })

    it("should fail to update user (409)", async () => {
        const res = await supertest(web)
            .patch(`/users/4`)
            .send({
                name: "Mario Teguh",
                // using another user's email in the database
                email: "aqib@test.com",
                password: "123",
                profession: "Still Alive"
            })

        expect(res.status).toBe(409)
    })
})