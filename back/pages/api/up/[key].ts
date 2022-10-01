import robot from "robotjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //get key from url
    const { key } = req.query

    if (typeof key === "string") {
        key && robot.keyToggle(key, "up")
    }

    res.status(200).json({ key })
}
