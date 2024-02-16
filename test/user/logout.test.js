import supertest from "supertest";
import {web} from "../../src/app/web.js";

describe("Logout user endpoint", () => {
    it("should can logout", async () => {
        const res = await supertest(web)
            .post("/users/logout")
            .send({
                user_id: 4
            })

        console.log(res.body.data)
        expect(res.status).toBe(200)
    })
})