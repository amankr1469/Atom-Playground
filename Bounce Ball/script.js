const canvas = document.createElement('canvas');
document.body.append(canvas);

const canvas_width = window.innerWidth;
const canvas_height = window.innerHeight;

canvas.width = canvas_width;
canvas.height = canvas_height;

const ctx = canvas.getContext('2d');

class Particle {
    constructor() {
        this.x = Math.floor(Math.random() * canvas_width);
        this.y = Math.floor(Math.random() * canvas_height);
        this.vx = 0;
        this.vy = 0;
        this.acx = Math.random() > 0.5 ? 0.02 : -0.02;
        this.acy = Math.random() > 0.5 ? 0.02 : -0.02;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        let r = Math.floor(Math.random() * 255) + 1;
        let g = Math.floor(Math.random() * 255) + 1;
        let b = Math.floor(Math.random() * 255) + 1;
        return `rgb(${r}, ${g}, ${b})`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0 ,2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.vx += this.acx; 
        this.vy += this.acy;
        this.x += this.vx;
        this.y += this.vy;    

        if(this.x >= canvas_width || this.x <= 0){
            this.vx = -this.vx;
        }
        if(this.y >= canvas_width || this.y <= 0){
            this.vy = -this.vy;
        }
    }
}

const particle = [];

for (let i = 0; i < 100; i++) {
    particle.push(new Particle());
}

function animation() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    for(let i = 0; i < particle.length; i++) {
        particle[i].draw();
        particle[i].update();
    }
    requestAnimationFrame(animation);
}

animation();
