import { NextApiRequest, NextApiResponse } from "next";
import { RedisRepository } from "@/redis/redis.repository";
import { handleBack } from "@/utils/handleError";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { key, value, ttl, scope } = req.body as { key: string, value: string, ttl: number | undefined, scope: string };

    if (!key || !value || !ttl) return res.status(400).json({ message: "Oops! Required data missing" });

    try {
        if (!ttl) RedisRepository.set(`cdc-${scope}`, key, value);
        else RedisRepository.setWithExpiry(`cdc-${scope}`, key, value, ttl);

        res.json({ message: "Success" });
    } catch (error: unknown) {
        const errMssg = handleBack(error);
        res.status(500).json({ message: errMssg });
    }
};