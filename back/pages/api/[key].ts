// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { exec } from "child_process"
import robot from "robotjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //get key from url
    const { key } = req.query

    if (typeof key === "string") {
        key && robot.keyToggle(key, "down")
    }

    res.status(200).json({ key })
}
