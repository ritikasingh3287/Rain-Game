const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let raindrops = [];
let score = 0;
let rainActive = true;

document.getElementById('score').innerText = `Score: ${score}`;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Raindrop(x, y, speed, size, color) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.size = size;
  this.color = color;
}

Raindrop.prototype.update = function() {
  if (rainActive) {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
      this.color = getRandomColor(); 
      score++;
      document.getElementById('score').innerText = `Score: ${score}`;
    }
  }
};

Raindrop.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Raindrop.prototype.increaseSize = function() {
  this.size *= 2;
};

function createRaindrops() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 5 + 2;
    const size = Math.random() * 3 + 1;
    const color = getRandomColor();
    raindrops.push(new Raindrop(x, y, speed, size, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  raindrops.forEach(drop => {
    drop.update();
    drop.draw();
  });
  requestAnimationFrame(animate);
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomColor();
  setTimeout(changeBackgroundColor, 5000); 
}

function toggleRain() {
  rainActive = !rainActive;
  document.getElementById('toggle-rain').innerText = rainActive ? 'Stop Rain' : 'Start Rain';
}

canvas.addEventListener('dblclick', function(event) {
  const x = event.clientX;
  const y = event.clientY;

  raindrops.forEach(drop => {
    const distance = Math.sqrt((drop.x - x) ** 2 + (drop.y - y) ** 2);
    if (distance < drop.size) {
      drop.increaseSize();
    }
  });
});

document.getElementById('toggle-rain').addEventListener('click', toggleRain);

createRaindrops();
animate();
changeBackgroundColor();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
