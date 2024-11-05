import app from './app';
import config from './backend/src/config/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log('Conectado ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
        process.exit(1); 
    }
}

async function startServer() {
    await connectToDatabase();

    const port = config.port || 3000;
    const server = app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });

    // Encerrar conexão Prisma ao finalizar o servidor
    process.on('SIGTERM', async () => {
        console.log('Encerrando servidor...');
        await prisma.$disconnect();
        server.close(() => {
            console.log('Servidor encerrado');
        });
    });

    process.on('SIGINT', async () => {
        console.log('Encerrando servidor...');
        await prisma.$disconnect();
        server.close(() => {
            console.log('Servidor encerrado');
        });
    });
}

startServer();
