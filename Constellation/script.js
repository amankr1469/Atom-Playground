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
        this.acx = Math.random() > 0.5 ? 0.0006 : -0.0005;
        this.acy = Math.random() > 0.5 ? 0.0006 : -0.0005;
        this.color = `rgb(255, 255, 255)`;
        this.connected_to = [];
        this.radius_of_influence = 100;
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'white'; // color of the glow
        ctx.shadowBlur = 10; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0 ,2 * Math.PI);
        ctx.fill(); // fill the circle
        ctx.shadowColor = 'transparent'; // reset the shadow color after drawing the circle
        ctx.shadowBlur = 0; // reset the shadow blur after drawing the circle
        ctx.strokeStyle = 'rgb(255, 255, 255)'; // set the stroke color
        ctx.beginPath(); // start a new path for the lines
        for(let i = 0; i < this.connected_to.length; i++){
            let pos = this.connected_to[i].getPosition();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(pos.x, pos.y);
        }
        ctx.stroke(); // apply the stroke color
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

        this.connected_to = []; // Make the connected_to array empty every time the update function is called. So the previous connections are removed.

        for(let i=0; i<particle.length; i++){
            let p = particle[i];
            if(p !== this){
                let pos = p.getPosition();
                let dis = Math.sqrt((this.x - pos.x) ** 2 + (this.y - pos.y) ** 2);
                if(dis < this.radius_of_influence){
                    this.connected_to.push(p);
                }
            }
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
