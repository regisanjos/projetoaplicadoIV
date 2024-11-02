import app from './app';
import config from './backend/src/config/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log('Conectado ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); 
    }
}

const startServer = async () => {
    await connectToDatabase();

    app.listen(config.port, () => {
        console.log(`Servidor rodando na porta ${config.port}`);
    });
};

startServer();