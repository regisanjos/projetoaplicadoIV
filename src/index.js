const app = require('./app');
const config = require('./config/config');
const { PrismaClient } = require('@prisma/client');

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

async function shutdown(server) {
    console.log('Encerrando servidor...');
    try {
        await prisma.$disconnect();
    } catch (error) {
        console.error('Erro ao desconectar do banco de dados:', error.message);
    } finally {
        server.close(() => {
            console.log('Servidor encerrado');
        });
    }
}

async function startServer() {
    await connectToDatabase();

    const port = config.port || 3000;
    const server = app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });

    // Eventos para encerrar o servidor
    process.on('SIGTERM', () => shutdown(server));
    process.on('SIGINT', () => shutdown(server));
}

startServer();
