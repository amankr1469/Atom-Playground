const canvas = document.createElement('canvas');
document.body.append(canvas);

const canvas_width = window.innerWidth;
const canvas_height = window.innerHeight;

canvas.width = canvas_width;
canvas.height = canvas_height;

const ctx = canvas.getContext('2d'); // 2d rendering context

class Particle {
    constructor() {
        this.x = Math.floor(Math.random() * canvas_width);
        this.y = Math.floor(Math.random() * canvas_height);
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
        this.x += Math.random() * 2 - 1;
        this.y += Math.random() * 2 - 1;
    }
}

const particle = [];

for (let i = 0; i < 1000; i++) {
    particle.push(new Particle());
}

function animation() {
    for(let i = 0; i < particle.length; i++) {
        particle[i].draw();
        particle[i].update();
    }
    requestAnimationFrame(animation);
    // requestAnimationFrame is a method that tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
    //It is preferred over the use of setInterval() or setTimeout() because it is more efficient and provides a smoother animation.
}

animation();

// let cursor_loc = {
//     x: 0,
//     y: 0,
// };

// window.onmousemove = (e) => {
//     cursor_loc.x = e.clientX; // clientX is the x-coordinate of the mouse pointer, relative to the left edge of the content area.
//     cursor_loc.y = e.clientY; // clientY is the y-coordinate of the mouse pointer, relative to the top edge of the content area.
// }
