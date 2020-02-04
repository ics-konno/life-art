let size = 20;
let geneSize = 255 * 3

let currentAge = []
let newAge = []

// [1,....,0....,0....]の255*3の大きさの配列
const goal = []
for (let i = 0; i < 255; i++) {
    goal.push(1)
}
for (let i = 0; i < 255 * 2; i++) {
    goal.push(0)
}


function setup() {
    createCanvas(710, 400)
    // background(0)
    noLoop()
    for (let i = 0; i < size; i++) {
        currentAge[i] = creageGenome(geneSize)
    }
    frameRate(5000)
}


function draw() {
    const elite = selection(currentAge)
    const progeny = []
    for (let i = 0; i < elite.length - 1; i++) {
        progeny.push(...cross(elite[i], elite[i + 1]))
    }
    newAge = nextGeneration(currentAge, elite, progeny)
    newAge.forEach((age, index) => {
        fill(...age.getColor())
        ellipse(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 30, 30)
    })
    currentAge = newAge
    newAge = []
}

function creageGenome(length) {
    const genome_list = []
    for (let i = 0; i < length; i++) {
        genome_list.push(Math.round(Math.random()))
    }
    return new Biont(genome_list)
}

class Biont {
    constructor(genome_list) {
        this.genome_list = genome_list
        this.evaluation = this.getEvaluate(goal)
    }

    getEvaluate(goal) {
        let score = 0
        for (let i = 0; i < this.genome_list.length; i++) {
            if (goal[i] === this.genome_list[i]) {
                score++
            }
        }
        return score / geneSize
    }

    getColor() {
        let c = 0
        let cArr = []
        for (let i = 0; i < this.genome_list.length; i++) {
            c += this.genome_list[i]
            if ((i + 1) % 255 === 0) {
                cArr.push(c)
                c = 0
            }
        }
        return cArr
    }
}

function selection(age) {
    const elite = age.sort((a, b) => {
        return b.getEvaluate(goal) - a.getEvaluate(goal)
    })
    return elite.slice(0, 20)
}

function cross(bios1, bios2) {
    const cross_one = Math.round(random(geneSize))
    const cross_two = Math.round(random(cross_one, geneSize))
    const one = bios1.genome_list
    const two = bios2.genome_list
    const progeny_one = [...one.slice(0, cross_one), ...two.slice(cross_one, cross_two), ...one.slice(cross_two, geneSize)]
    const progeny_two = [...two.slice(0, cross_one), ...one.slice(cross_one, cross_two), ...two.slice(cross_two, geneSize)]
    return [new Biont(progeny_one), new Biont(progeny_two)]
}


function nextGeneration(age, elite, progeny) {
    const sorted_age = age.sort((a, b) => {
        return a.getEvaluate(goal) - b.getEvaluate(goal)
    })
    sorted_age.splice(0, elite.length + progeny.length)
    sorted_age.push(...elite, ...progeny)
    return sorted_age
}

