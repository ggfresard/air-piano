import { NormalizedLandmark } from "@mediapipe/hands"

export const angleBetweenPoints = (
    p1: NormalizedLandmark,
    p2: NormalizedLandmark,
    p3: NormalizedLandmark
) => {
    var v1 = [p1.x - p2.x, p1.y - p2.y, p1.z - p2.z]
    var v2 = [p3.x - p2.x, p3.y - p2.y, p3.z - p2.z]
    var v1Mag = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2])
    var v1Norm = [v1[0] / v1Mag, v1[1] / v1Mag, v1[2] / v1Mag]
    var v2Mag = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2])
    var v2Norm = [v2[0] / v2Mag, v2[1] / v2Mag, v2[2] / v2Mag]
    var dot =
        v1Norm[0] * v2Norm[0] + v1Norm[1] * v2Norm[1] + v1Norm[2] * v2Norm[2]
    return Math.acos(dot) * (180 / Math.PI)
}

const frequencies = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    349.23, // F4
    392.0, // G4
    440.0, // A4
    493.88, // B4
    523.25, // C5
]

const audioCtx = new AudioContext()

export const playNote = (note: number) => {
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()
    oscillator.type = "triangle"
    oscillator.frequency.value = frequencies[note]
    gainNode.gain.exponentialRampToValueAtTime(
        0.00001,
        audioCtx.currentTime + 1
    )
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    oscillator.start(0)
}
