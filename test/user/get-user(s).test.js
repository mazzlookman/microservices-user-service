import {web} from "../../src/app/web.js";
import supertest from "supertest";
import {prismaClient} from "../../src/app/prisma-client.js";

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

describe("Get users endpoint testing", () => {

    it("should can get users", async () => {
        const countUser = await prismaClient.user.count()
        const res = await supertest(web)
            .get("/users")

        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(countUser)
    })

    it("should can get users (ids in query)", async () => {
        const res = await supertest(web)
            .get("/users?id=2&id=3")

        expect(res.status).toBe(200)
        expect(res.body.data[0].id).toBe(2)
        expect(res.body.data[1].id).toBe(3)
    })
})