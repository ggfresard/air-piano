import { angleHandler } from "./handlers"
import { Hand } from "./hands"
import { playNote } from "./utils"

var hands
const display = document.getElementById("display") as HTMLDivElement

document.addEventListener("DOMContentLoaded", () => {
    hands = new Hand()
    hands.onResults(
        angleHandler((result, prevResult) => {
            var info = ""
            if (result.right) {
                info += `<div style="${
                    result.right.pinky ? "color: green" : "color: red"
                }"><div>DO</div></div>`
                info += `<div style="${
                    result.right.ring ? "color: green" : "color: red"
                }"><div>RE</div></div>`
                info += `<div style="${
                    result.right.middle ? "color: green" : "color: red"
                }"><div>MI</div></div>`
                info += `<div style="${
                    result.right.index ? "color: green" : "color: red"
                }"><div>FA</div></div>`
                result.right.pinky && !prevResult?.right?.pinky && playNote(0)
                result.right.ring && !prevResult?.right?.ring && playNote(1)
                result.right.middle && !prevResult?.right?.middle && playNote(2)
                result.right.index && !prevResult?.right?.index && playNote(3)
            }
            if (result.left) {
                info += `<div style="${
                    result.left.index ? "color: green" : "color: red"
                }"><div>SOL</div></div>`
                info += `<div style="${
                    result.left.middle ? "color: green" : "color: red"
                }"><div>LA</div></div>`
                info += `<div style="${
                    result.left.ring ? "color: green" : "color: red"
                }"><div>SI</div></div>`
                info += `<div style="${
                    result.left.pinky ? "color: green" : "color: red"
                }"><div>DO</div></div>`
                result.left.index && !prevResult?.left?.index && playNote(4)
                result.left.middle && !prevResult?.left?.middle && playNote(5)
                result.left.ring && !prevResult?.left?.ring && playNote(6)
                result.left.pinky && !prevResult?.left?.pinky && playNote(7)
            }

            display.innerHTML = info
        })
    )
})
