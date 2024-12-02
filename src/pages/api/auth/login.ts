import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt } from '@/lib/session'
import { handleBack } from '@/utils/handleError';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body as { username: string, password: string };

    try {
        if (!(username === "soporte" && password === "4321")) return res.status(401).json({ message: "Invalid credentials." });

        const encryptedSessionData = await encrypt(username);

        const cookie = serialize('session', encryptedSessionData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ sucess: true });
    } catch (error: unknown) {
        const errMssg = handleBack(error);
        res.status(500).json({ message: errMssg });
    }
};