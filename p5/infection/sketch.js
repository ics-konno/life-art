let start
let O
let N = 100
let B = 0.0015
let k = 12
let D = 2
let S = 99, I = 1, R = 0

let Si = S, Ii = I, Ri = I

let statusArr = []
let balls = []

function setup() {
    createCanvas(710, 400)
    background(255)
    // noLoop()
    noStroke()
    textSize(20)

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i * j < 100) {
                balls.push(new Ball(i * 20, j * 20, 20, "S"))
            } else {
                balls.push(new Ball(i * 20, j * 20, 20, "I"))
            }
        }
    }
    balls.forEach(ball => ball.draw())

    start = millis()
}


function draw() {
    if (millis() - start > 500) {
        clear()

        S = Si -(B * k * Si * Ii)
        I = Ii + (B * k * Si * Ii - Ii / D)
        R =  Ri + (Ii / D)
        S = round(S)
        I = round(I)
        R = round(R)
        statusArr = []
        for (let i = 0; i < S; i++) {
            statusArr.push("S")
        }
        for (let j = 0; j < I; j++) {
            statusArr.push("I")
        }
        for (let k = 0; k < R; k++) {
            statusArr.push("R")
        }
        text("S:" + (S), 250, 50)
        text("I:" + (I), 250, 80)
        text("R:" + (R), 250, 110)
        console.log(statusArr)
        changeStatus(balls, statusArr)

        Si = S
        Ii = I
        Ri = R

        start = millis()
    }

}

class Ball {
    constructor(x, y, r, status) {
        this.x = x
        this.y = y
        this.r = r
        this.status = status
    }

    draw() {
        let c
        if (this.status === "S") {
            c = 0
        } else if (this.status === "I") {
            c = 100
        } else if (this.status === "R") {
            c = 200
        }
        fill(c)
        ellipse(this.x + 20, this.y + 20, this.r, this.r)
    }

    update(newStatus) {
        this.status = newStatus
    }
}

function changeStatus(balls, statusArr) {
    balls.forEach((ball, index) => {
        ball.update(statusArr[index])
        ball.draw()
    })
}