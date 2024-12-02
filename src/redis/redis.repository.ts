import { RedisClientFactory } from './redis.client.factory';

export class RedisRepository {
    constructor() { }

    static async set(prefix: string, key: string, value: string): Promise<void> {
        await RedisClientFactory.getInstance().set(`${prefix}:${key}`, value);
    }

    static async get(prefix: string, key: string): Promise<string | null> {
        return await RedisClientFactory.getInstance().get(`${prefix}:${key}`);
    }

    static async hset(prefix: string, key: string, field: string, value: string): Promise<void> {
        await RedisClientFactory.getInstance().hset(`${prefix}:${key}`, field, value);
    }

    static async hget(prefix: string, key: string, field: string): Promise<string | null | number> {
        return await RedisClientFactory.getInstance().hget(`${prefix}:${key}`, field);
    }

    static async sadd(prefix: string, key: string, value: string): Promise<string | null | number> {
        return await RedisClientFactory.getInstance().sadd(`${prefix}:${key}`, value);
    }

    static async sismember(prefix: string, key: string, member: string): Promise<string | null | number> {
        return await RedisClientFactory.getInstance().sismember(`${prefix}:${key}`, member);
    }

    static async del(keys: string[]): Promise<void> {
        await RedisClientFactory.getInstance().del(keys);
    }

    static async setWithExpiry(prefix: string, key: string, value: string, expiry: number): Promise<void> {
        await RedisClientFactory.getInstance().set(`${prefix}:${key}`, value, 'EX', expiry);
    }

    static async expire(prefix: string, key: string, expiry: number): Promise<void> {
        await RedisClientFactory.getInstance().expire(`${prefix}:${key}`, expiry);
    }

    static async info(param: string): Promise<string> {
        return await RedisClientFactory.getInstance().info(param);
    }

    static async call(param1: string, param2: string): Promise<string> {
        const data = await RedisClientFactory.getInstance().call(param1, param2);
        console.log(data)
        return String(data);
    }
}