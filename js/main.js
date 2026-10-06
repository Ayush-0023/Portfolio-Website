new Typed('#typed', {
    strings: [
        'From Bayes\' Theorem to production pipelines',
        'Debugging models, not just training them',
        'RAG pipelines that know what they don\'t know',
        'CNNs, MLOps, and everything between',
        'Six months of shift work, now shipping ML'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    loop: true
});

// ========================= //
// MOBILE NAV TOGGLE
// ========================= //

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    });
});


const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = 2.2;

        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width)
            this.vx *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.vy *= -1;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(0,212,255,0.8)";
        ctx.fill();
    }
}


for (let i = 0; i < 85; i++) {
    particles.push(new Particle());
}


function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(108,99,255,${1 - distance / 140})`;

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}


function mouseEffect() {

    if (!mouse.x || !mouse.y)
        return;

    particles.forEach((particle) => {

        let dx = particle.x - mouse.x;
        let dy = particle.y - mouse.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {

            ctx.beginPath();

            ctx.strokeStyle =
                `rgba(0,212,255,${1 - distance / 150})`;

            ctx.lineWidth = 1.5;

            ctx.moveTo(
                particle.x,
                particle.y
            );

            ctx.lineTo(
                mouse.x,
                mouse.y
            );

            ctx.stroke();
        }
    });
}


function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.update();
        particle.draw();
    });

    connectParticles();
    mouseEffect();

    requestAnimationFrame(animate);
}

animate();