let size = 500;
let geneSize = 255 * 3

let generation = 0

let currentAge = []
let newAge = []

let colorMode = "RGB"

// [1,....,0....,0....]の255*3の大きさの配列
let goal = []
// for (let i = 0; i < 255; i++) {
//     goal.push(1)
// }
// for (let i = 0; i < 255 * 2; i++) {
//     goal.push(0)
// }

function change() {
    clear()
    for (let i = 0; i < size; i++) {
        currentAge[i] = creageGenome(geneSize)
    }
    generation = 0
    goal = []
    for (let i=0;i<255*3;i++){
        goal.push(Math.round(Math.random()))
    }
    console.log(goal)
}


function setup() {
    createCanvas(710, 400)
    background(255)
    // noLoop()
    noStroke()



    button = createButton("change")
    button.position(20,20)
    button.mousePressed(change)
    change()
}


function draw() {


    if(generation < 300) {
        const elite = selection(currentAge)
        const progeny = []
        for (let i = 0; i < elite.length - 1; i++) {
            progeny.push(...cross(elite[i], elite[i + 1]))
        }
        newAge = nextGeneration(currentAge, elite, progeny)
        newAge.forEach((age, index) => {
            const angle = random(TWO_PI)
            fill(...age.getColor())
            ellipse(710 / 2 + random(300 - generation) * cos(angle), 400 / 2 + random(300 - generation) * sin(angle), 20, 20)
        })
        generation += 2
        currentAge = newAge
        newAge = []
    }
}

function creageGenome(length) {
    const genome_list = []
    for (let i = 0; i < length; i++) {
        genome_list.push(Math.round(Math.random()+0.3))
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
    return elite.slice(0, 2)
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

