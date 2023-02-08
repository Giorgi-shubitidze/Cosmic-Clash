const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0 , 0, canvas.width, canvas.height)


const gravity = 0.2
class Sprite {
    constructor({position , velocity, color = "red"}) {
        this.position = position
        this.velocity = velocity
        this.width = 90
        this.height = 150
        this.attackBox = {
            position: this.position ,
            width: 150,
            height: 30
        }
        this.color = color
        this.isAttacking
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width , this.height)

        if (this.isAttacking) {
        c.fillStyle = "green"
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height
        )
        }
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}


const player = new Sprite({
    position: {
    x:0,
    y:0
    },
    velocity: {
        x: 0,
        y: 10
    },
})

const enemy = new Sprite({
    position: {
    x:400,
    y:100
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: "blue"
})


enemy.draw()

const keys  = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

let lastKey

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0 , 0, canvas.width, canvas.height)
    player.update()
    enemy.update()


    player.velocity.x = 0
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -3
    } else if (keys.d.pressed && lastKey === 'd' )  {
        player.velocity.x = 3
    }

    if (player.attackBox.position.x + player.attackBox.width >= 
        enemy.position.x && player.attackBox.position.x <= 
        enemy.position.x + enemy.width && player.attackBox.position.y + player.attackBox.height >=
        enemy.position.y && player.attackBox.position.y <= enemy.position.y + enemy.height &&
        player.isAttacking
    ) 
        {
        player.isAttacking = false
        console.log("hit")
    } 
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break

    }

    console.log(event)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break        
    }
    console.log(event)
})
