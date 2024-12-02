import { NextApiRequest, NextApiResponse } from "next";
import { RedisRepository } from "@/redis/redis.repository";
import { handleBack } from "@/utils/handleError";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { param } = req.query as { param: string };
    console.log(param)
    try {
        let data;
        if(param === "latencystats") {
            data = await RedisRepository.call("latency", "latest");
            console.log(data)
        } else data = await RedisRepository.info(param);
        if (!data) throw new Error("Oops! Metrics not found");
        res.json({ message: "I got it!", data });
    } catch (error: unknown) {
        const errMssg = handleBack(error);
        res.status(500).json({ message: errMssg });
    }
};