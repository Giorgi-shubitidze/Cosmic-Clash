class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.width = 90;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height);
    }
 
    update() {
        this.draw();
    }
}

class Bullet {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.width = 10;
        this.height = 10;
    }

    draw() {
        c.fillStyle = "white";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


class Fighter {
    constructor({ position, velocity, color = "red" }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 90;
        this.height = 150;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y + this.height
            },
            width: 150,
            height: 30
        };
        this.color = color;
        this.isAttacking = false;
        this.bullets = [];
        this.canJump = true;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            c.fillStyle = "green";
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
        this.bullets.forEach(bullet => bullet.draw());
    }

    shoot() {
        if (!this.isShooting) {
          this.isShooting = true;
          this.intervalId = setInterval(() => {
            const bulletPosition = {
              x: this.position.x + this.width / 2 - 5,
              y: this.position.y + this.height / 2 - 5
            };
            const bulletVelocity = {
              x: this.velocity.x > 0 ? 10 : -10,
              y: 0
            };
            const bullet = new Bullet(bulletPosition, bulletVelocity);
            this.bullets.push(bullet);
          }, 200);
        }
      }
      
    stopShooting() {
        clearInterval(this.intervalId);
        this.isShooting = false;
    }

    update() {
        this.draw();

    if (this.position.x < 0) {
        this.position.x = 0;
    } else if (this.position.x + this.width > canvas.width) {
        this.position.x = canvas.width - this.width;
    }

    if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = 0;
    } else if (this.position.y + this.height > canvas.height - 270) {
        this.position.y = canvas.height - 270 - this.height;
        this.velocity.y = 0;
        this.canJump = true;
    } else {
        this.velocity.y += gravity;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.attackBox.position.x = this.position.x;
    this.attackBox.position.y = this.position.y + this.height;

    this.bullets.forEach(bullet => bullet.update());
    this.bullets = this.bullets.filter(bullet => bullet.position.y > 0);
    }

    attack() {
        this.isAttacking = true;
    }    

    jump() {
        if (this.canJump) {
          this.velocity.y = -10;
          this.canJump = false;
        }
    }
}