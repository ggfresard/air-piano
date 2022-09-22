import { Results } from "@mediapipe/hands"
import { HandPoints } from "./hands"
import { angleBetweenPoints } from "./utils"

interface HandBoolean {
    index: boolean
    middle: boolean
    ring: boolean
    pinky: boolean
    angles: {
        index: number
        middle: number
        ring: number
        pinky: number
    }
}

interface AngleResult {
    left?: HandBoolean
    right?: HandBoolean
}

interface AngleOptions {
    angleThreshold: number
}

export const angleHandler =
    (
        callback: (result: AngleResult, prevResult: AngleResult) => void,
        options?: AngleOptions
    ) =>
    (results: Results, prevResults: Results | null) => {
        const result = processAngleResult(
            results,
            options?.angleThreshold || 90
        )
        const prevResult = processAngleResult(
            prevResults || results,
            options?.angleThreshold || 90
        )
        callback(result, prevResult)
    }

const processAngleResult = (result: Results, angleThreshold: number) => {
    var angleResult: AngleResult = {}
    for (const [i, hand] of result.multiHandLandmarks.entries()) {
        var wrist = hand[HandPoints.WRIST]
        var index = hand[HandPoints.INDEX_FINGER_TIP]
        var indexPivot = hand[HandPoints.INDEX_FINGER_MCP]
        var indexAngle = angleBetweenPoints(index, indexPivot, wrist)
        var middle = hand[HandPoints.MIDDLE_FINGER_TIP]
        var middlePivot = hand[HandPoints.MIDDLE_FINGER_MCP]
        var middleAngle = angleBetweenPoints(middle, middlePivot, wrist)
        var ring = hand[HandPoints.RING_FINGER_TIP]
        var ringPivot = hand[HandPoints.RING_FINGER_MCP]
        var ringAngle = angleBetweenPoints(ring, ringPivot, wrist)
        var pinky = hand[HandPoints.PINKY_TIP]
        var pinkyPivot = hand[HandPoints.PINKY_MCP]
        var pinkyAngle = angleBetweenPoints(pinky, pinkyPivot, wrist)
        angleResult[
            result.multiHandedness[i].label.toLowerCase() as "right" | "left"
        ] = {
            index: indexAngle < angleThreshold,
            middle: middleAngle < angleThreshold,
            ring: ringAngle < angleThreshold,
            pinky: pinkyAngle < angleThreshold,
            angles: {
                index: indexAngle,
                middle: middleAngle,
                ring: ringAngle,
                pinky: pinkyAngle,
            },
        }
    }
    return angleResult
}
