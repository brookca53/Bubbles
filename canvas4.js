var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

console.log(canvas);

var mouse = {
	x: undefined,
	y: undefined
}

var maxMouse = 150;
var minMouse = -150;
var maxRadius = 50;
// var minRadius = 2;

var colorArray = [
	'#ff8000',   // orange
	'#0000ff',   // blue
	'#00bb00',   // Green
	'#33ffff',   // lt blue
	'#ff0000',   // red
	'#ff3399',   // Pink
	'#99ff99',   // pea green
	'#000000',   // black
	'#6611aa',   // Purple
	'#99ccff',   // lt blue
	'yellow',
];

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
		// console.log(mouse);
	})

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		// c.stroke();
		c.fill();
	}

	this.update = function() {
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0) { this.dx = -this.dx; }
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0) { this.dy = -this.dy; }

		this.x += this.dx;
		this.y += this.dy;

		// Interactivity
		if(mouse.x - this.x < maxMouse && mouse.x - this.x > minMouse &&
		   mouse.y - this.y < maxMouse && mouse.y - this.y > minMouse	) {
			if(this.radius < maxRadius) { this.radius += 1; }
		} else if(this.radius > this.minRadius) {
			this.radius -= 1;
		}

		if(mouse.x < 15 || mouse.y < 15 || mouse.x > innerWidth - 15 || mouse.y > innerHeight - 15) {
			if(this.radius > this.minRadius) {
				this.radius -= 1;
			}
		}

		this.draw();
	}

}

var circleArray = [];

for(var i = 0; i < 1000; i++) {
	var radius = Math.random() * 3 + 1;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5)*2;
	var dy = (Math.random() - 0.5)*2;

	circleArray.push(new Circle(x, y, dx, dy, radius));
}


function animate() {

	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	
	for(var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}


animate();










