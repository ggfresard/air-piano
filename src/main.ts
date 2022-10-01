import { angleHandler } from "./handlers"
import { Hand } from "./hands"
import { playNote } from "./utils"

var hands
const display = document.getElementById("display") as HTMLDivElement
document.addEventListener("keydown", (e) => {
    console.log(e)
})

var last: {
    left: { index: boolean; middle: boolean }
    right: { index: boolean; middle: boolean }
}

document.addEventListener("DOMContentLoaded", () => {
    hands = new Hand()
    hands.onResults(
        angleHandler(
            (result, prevResult) => {
                var info = ""
                var state = {
                    right: {
                        index: false,
                        middle: false,
                    },
                    left: {
                        index: false,
                        middle: false,
                    },
                }
                if (result.right) {
                    info += `<div style="${
                        result.right.pinky ? "color: green" : "color: red"
                    }"><div>4</div></div>`
                    info += `<div style="${
                        result.right.ring ? "color: green" : "color: red"
                    }"><div>3</div></div>`
                    info += `<div style="${
                        result.right.middle ? "color: green" : "color: red"
                    }"><div>2</div></div>`
                    info += `<div style="${
                        result.right.index ? "color: green" : "color: red"
                    }"><div>1</div></div>`
                    state.right.index = !!result.right.index
                    state.right.middle = !!result.right.middle

                    // result.right.pinky && !prevResult?.right?.pinky && playNote(0)
                    // result.right.ring && !prevResult?.right?.ring && playNote(1)
                    // result.right.middle && !prevResult?.right?.middle && playNote(2)
                    // result.right.index && !prevResult?.right?.index && playNote(3)
                }
                if (result.left) {
                    info += `<div style="${
                        result.left.index ? "color: green" : "color: red"
                    }"><div>1</div></div>`
                    info += `<div style="${
                        result.left.middle ? "color: green" : "color: red"
                    }"><div>2</div></div>`
                    info += `<div style="${
                        result.left.ring ? "color: green" : "color: red"
                    }"><div>3</div></div>`
                    info += `<div style="${
                        result.left.pinky ? "color: green" : "color: red"
                    }"><div>4</div></div>`
                    state.left.index = !!result.left.index
                    state.left.middle = !!result.left.middle

                    // result.left.index && !prevResult?.left?.index && playNote(4)
                    // result.left.middle && !prevResult?.left?.middle && playNote(5)
                    // result.left.ring && !prevResult?.left?.ring && playNote(6)
                    // result.left.pinky && !prevResult?.left?.pinky && playNote(7)
                }
                !isSame(state, last) && sendKeys(state)
                last = state

                display.innerHTML = info
            },
            {
                angleThreshold: 70,
            }
        )
    )
})

var sendKeys = (state: any) => {
    fetch(`http://localhost:3000/api/state`, {
        method: "POST",
        body: JSON.stringify(state),
    })
}

var upKey = (key: string) => {
    fetch(`http://localhost:3000/api/up/${key}`)
}
var isSame = (
    a: {
        left: { index: boolean; middle: boolean }
        right: { index: boolean; middle: boolean }
    },
    b: {
        left: { index: boolean; middle: boolean }
        right: { index: boolean; middle: boolean }
    }
) => {
    return (
        a?.left?.index === b?.left?.index &&
        a?.left?.middle === b?.left?.middle &&
        a?.right?.index === b?.right?.index &&
        a?.right?.middle === b?.right?.middle
    )
}
