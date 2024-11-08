import { NextApiRequest, NextApiResponse } from "next";
import { RedisRepository } from "@/redis/redis.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { scope, key } = req.query as { scope: string, key: string };
    const { member } = req.body as { member: string };

    try {
        const data = await RedisRepository.sismember(`cdc-${scope}`, key, member);
        if (!data) throw new Error("Oops! Not found on Redis");
        res.json({ message: "Is on Redis" });
    } catch (error: any) {
        const errMssg = error.message ? error.message : "Oops! Unknown error";
        res.status(500).json({ message: errMssg });
    }
};