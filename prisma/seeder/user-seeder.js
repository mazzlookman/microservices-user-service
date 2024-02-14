import {prismaClient} from "../../src/app/prisma-client.js";
import bcrypt from "bcrypt";

const createManyUsers = async () => {
    const manyUsers = await prismaClient.user.createMany({
        data: [
            {
                name: "Aqib",
                email: "aqib@test.com",
                password: await bcrypt.hash("123", 10),
                profession: "Backend",
                avatar: "aqib.png",
                role: "admin",
            },
            {
                name: "Ucup",
                email: "ucup@test.com",
                password: await bcrypt.hash("123", 10),
                profession: "Frontend",
                avatar: "ucup.png",
            }
        ]
    });

    console.log(`Success insert ${manyUsers.count} users`);
}

createManyUsers()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClient.$disconnect()
        process.exit(1)
    });