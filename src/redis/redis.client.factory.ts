import { Redis } from 'ioredis';

export class RedisClientFactory {
    private static instance: Redis;

    constructor() { }

    static getInstance(): Redis {
        if (!RedisClientFactory.instance) {
            RedisClientFactory.instance = new Redis({
                host: process.env.NEXT_PUBLIC_REDIS_HOST,
                port: Number(process.env.NEXT_PUBLIC_REDIS_PORT),
                ...(process.env.NEXT_PUBLIC_REDIS_USERNAME ? { username: process.env.NEXT_PUBLIC_REDIS_USERNAME } : {}),
                ...(process.env.NEXT_PUBLIC_REDIS_PASSWORD ? { password: process.env.NEXT_PUBLIC_REDIS_PASSWORD } : {}),
                retryStrategy: function (times: any) {
                    console.log(`HOST: ${process.env.NEXT_PUBLIC_REDIS_HOST}`);
                    console.log(`PORT: ${process.env.NEXT_PUBLIC_REDIS_PORT}`);
                    console.log(`Reintentando conexión a Redis. Intento número: ${times}`);
                    return Math.min(times * 1000, 3000);
                }
            });

            RedisClientFactory.instance.on('connect', () => {
                console.log('Connected to Redis');
            });

            RedisClientFactory.instance.on('error', (err: any) => {
                console.error('Redis error:', err.message);
                console.error('Error details:', err);
            });

            RedisClientFactory.instance.on('reconnecting', (time: any) => {
                console.log(`Reconnecting to Redis after ${time}ms...`);
            });
        }

        return RedisClientFactory.instance;
    }
}