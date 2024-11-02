import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

Process.on('SIGINT', async() => {
    await prisma.$disconnect();
    process.exit(0);
});

export default prisma;