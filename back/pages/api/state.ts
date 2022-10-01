// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import robot from "robotjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "OPTIONS") {
        return res.status(200).send("ok")
    }
    if (req.method === "POST") {
        var state = JSON.parse(req.body) as {
            left: { index: boolean; middle: boolean }
            right: { index: boolean; middle: boolean }
        }
        robot.keyToggle("q", state.right?.index ? "down" : "up")
        robot.keyToggle("1", state.right?.middle ? "down" : "up")
        robot.keyToggle("e", state.left?.index ? "down" : "up")
        robot.keyToggle("3", state.left?.middle ? "down" : "up")
    }
    res.status(200).send("ok")
}
