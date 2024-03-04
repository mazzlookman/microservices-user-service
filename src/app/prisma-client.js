import {PrismaClient} from "@prisma/client";

const optionsArg = {}

if (process.env.ENV === "dev") {
   optionsArg.errorFormat = "pretty"
   optionsArg.log = ["query","info", "warn", "error"]
}

export const prismaClient = new PrismaClient(optionsArg);