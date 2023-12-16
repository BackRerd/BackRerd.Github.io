document.addEventListener('DOMContentLoaded', function() {
	const canvas = document.getElementById('particleCanvas');
	const ctx = canvas.getContext('2d');
	const particles = [];

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	class Particle {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.size = Math.random() * 3 + 1;
			this.speedX = Math.random() * 2 - 1;
			this.speedY = Math.random() * 2 - 1;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;
			if (this.size > 0.2) this.size -= 0.1;
		}

		draw() {
			ctx.fillStyle = 'rgba(255,255,255,' + this.size + ')';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function createParticles(e) {
		const xPos = e.x;
		const yPos = e.y;

		for (let i = 0; i < 3; i++) {
			particles.push(new Particle(xPos, yPos));
		}
	}

	function animateParticles() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();
		}

		connectParticles();
		requestAnimationFrame(animateParticles);
	}

	function connectParticles() {
		for (let a = 0; a < particles.length; a++) {
			for (let b = a; b < particles.length; b++) {
				const distance = Math.sqrt(
					(particles[a].x - particles[b].x) ** 2 +
					(particles[a].y - particles[b].y) ** 2
				);

				if (distance < 30) {
					ctx.strokeStyle = 'rgba(255,255,255,' + (1 - distance / 30) + ')';
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(particles[a].x, particles[a].y);
					ctx.lineTo(particles[b].x, particles[b].y);
					ctx.stroke();
				}
			}
		}
	}

	document.addEventListener('mousemove', createParticles);
	animateParticles();
});