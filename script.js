const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
 
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/level 1/planet.png'
});

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 30
    }
});

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: "blue"
});



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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.drawImage(background.image, background.position.x, background.position.y, canvas.width, canvas.height);
    c.fillStyle = "black"
    c.fillRect(0 , 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()


    player.velocity.x = 0
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -6
    } else if (keys.d.pressed && lastKey === 'd' )  {
        player.velocity.x = 6
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
          keys.d.pressed = true;
          lastKey = event.key;
          break;
      
        case 'a':
          keys.a.pressed = true;
          lastKey = event.key;
          break;
      
        case 'w':
          player.jump();
          //player.velocity.y = -10;
          break;
      
        case 'k':
          player.attack();
          break;
        case 'l':
          player.shoot();
          break;
      }
  });

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        // case 'w':
        //     keys.w.pressed = false
        //     break        
        case 'k':
            player.attack();
            break;
        case 'l':
            player.stopShooting();
            break;
    }
    console.log(event)
})
