import { Camera, CameraOptions } from "@mediapipe/camera_utils"
import { Hands, Options as HandOptions, Results } from "@mediapipe/hands"

export enum HandPoints {
    WRIST = 0,
    THUMB_CMC = 1,
    THUMB_MCP = 2,
    THUMB_IP = 3,
    THUMB_TIP = 4,
    INDEX_FINGER_MCP = 5,
    INDEX_FINGER_PIP = 6,
    INDEX_FINGER_DIP = 7,
    INDEX_FINGER_TIP = 8,
    MIDDLE_FINGER_MCP = 9,
    MIDDLE_FINGER_PIP = 10,
    MIDDLE_FINGER_DIP = 11,
    MIDDLE_FINGER_TIP = 12,
    RING_FINGER_MCP = 13,
    RING_FINGER_PIP = 14,
    RING_FINGER_DIP = 15,
    RING_FINGER_TIP = 16,
    PINKY_MCP = 17,
    PINKY_PIP = 18,
    PINKY_DIP = 19,
    PINKY_TIP = 20,
}

export interface Options {
    camera: CameraOptions
    hands: HandOptions
}

export class Hand {
    video: HTMLVideoElement
    camera: Camera
    hands: Hands
    prevResults: Results | null = null

    constructor(options?: Options) {
        this.video = document.createElement("video")
        this.video.width = options?.camera?.width ?? 1280
        this.video.height = options?.camera?.height ?? 720
        this.video.hidden = true
        document.body.appendChild(this.video)
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            },
        })
        this.hands.setOptions(
            options?.hands || {
                maxNumHands: 2,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
                modelComplexity: 1,
            }
        )
        this.camera = new Camera(this.video, {
            onFrame: async () => {
                await this.hands.send({ image: this.video })
            },
            width: options?.camera.width || 1280,
            height: options?.camera.height || 720,
            facingMode: options?.camera.facingMode || "user",
        })
        this.camera.start()
    }

    onResults(
        handler: (results: Results, prevResults: Results | null) => void
    ) {
        this.hands.onResults((results: Results) => {
            handler(results, this.prevResults)
            this.prevResults = results
        })
    }
}
