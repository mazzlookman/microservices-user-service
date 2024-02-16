import supertest from "supertest";
import {web} from "../../src/app/web.js";
import {dummyToken} from "./token-create.test.js";

describe("Get token endpoint", () => {
    it('should can get token', async () => {
        const res = await supertest(web)
            .get(`/refresh-token?token=${dummyToken}`)

        expect(res.status).toBe(200)
        expect(res.body.data.id).toBeDefined()
    })

    it('should can get token', async () => {
        const res = await supertest(web)
            .get(`/refresh-token?token=${dummyToken}ngasal`)

        expect(res.status).toBe(400)
    })
})