import 'module-alias/register';
import server from '@/server';

const port: number = Number(process.env.PORT) || 8080;

server.listen(port, () => {
    console.log(`[${port}] server running`);
});
