const Boid = []


function setup() {
    frameRate(20)
    createCanvas(window.innerWidth, window.innerHeight)
    background(255)
   noFill()
    stroke(255,255,255)
    for(let i = 0; i<30;i++){
        Boid.push(new Bird(200+random(500),200+random(600),2, 2,i))
    }
}


function draw() {
    background(0)
    Boid.forEach(bird => {
        bird.draw()
    })
}


class Bird {
    constructor(x, y, vx, vy, id) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.id = id

        this.v1 = createVector(0,0)
        this.v2 = createVector(0,0)
        this.v3 = createVector(0,0)
    }
    update(){
        const speed = 4
        this.vx += this.v1.x + 0.8*this.v2.x + 0.1*this.v3.x
        this.vy += this.v1.y + 0.8*this.v2.y + 0.1*this.v3.y

        const movement = Math.sqrt(this.vx*this.vx+this.vy*this.vy)
        if(movement > speed) {
            this.vx = (this.vx / movement) * speed
            this.vy = (this.vy / movement) * speed
        }
        this.x += this.vx
        this.y += this.vy
    }
    draw(){
        this.v1.set(0,0)
        this.v2.set(0,0)
        this.v3.set(0,0)
        this.center()
        this.avoid()
        this.average()
        this.update()
        ellipse(this.x, this.y, 10, 10)
        line(this.x, this.y, this.x + this.vx*3, this.y + this.vy*3)
    }
    center(){
        Boid.forEach(bird => {
            if(this.id !== bird.id){
                this.v1.x += bird.x
                this.v1.y += bird.y
            }
        })
        this.v1.x /= Boid.length -1
        this.v1.y /= Boid.length -1


        this.v1.x = (this.v1.x - this.x)/300
        this.v1.y = (this.v1.y - this.y)/300
    }
    avoid(){
        const DIST_THRESHOLD = 20
        Boid.forEach(bird => {
            if(dist(this.x, this.y, bird.x, bird.y) < DIST_THRESHOLD){
                this.v2.x -= (bird.x - this.x)
                this.v2.y -= (bird.y - this.y)
            }
        })
    }
    average(){
        Boid.forEach(bird => {
            if(this.id !== bird.id){
                this.v3.x += bird.vx
                this.v3.y += bird.vy
            }
        })
        this.v3.x /= Boid.length-1
        this.v3.y /= Boid.length-1
        this.v3.x = (this.v3.x - this.vx)/2
        this.v3.y = (this.v3.y - this.vy)/2
    }
}

