import './style.css'

// 1. Find the <div id="app"></div> in index.html
const app = document.querySelector<HTMLDivElement>('#app');

// 2. If app doesn't exist, throw an error
if (!app) {
throw new Error('#app element not found in index.html');
}

// 3. Create a new canvas element
const canvas = document.createElement('canvas');
canvas.width = 900//window.innerWidth;
canvas.height = 500//window.innerHeight;
app.appendChild(canvas);

const context = canvas.getContext('2d');
if (!context) {
    throw new Error('Failed to get canvas context');
}

const carHeight = 50;
let carY = 0
function drawScene() {
    if (!context) {
        throw new Error('Failed to get canvas context');
    }

    // 4. Draw a rectangle that represents the road
    context.fillStyle = 'gray';
    const roadWidth = 200;
    const roadX = (canvas.width - roadWidth) / 2;
    context.fillRect(roadX, 0, roadWidth, canvas.height);

    // 5. Draw the lane dividers
    context.fillStyle = 'yellow';
    const laneDividerWidth = 10;
    const laneDividerX = roadX + roadWidth / 2 - laneDividerWidth / 2;
    const laneDividerHeight = 50;
    for (let i = 25; i < canvas.height; i += 100) {
        const laneDividerY = i;
        context.fillRect(laneDividerX, laneDividerY, laneDividerWidth, laneDividerHeight);
    }
    
    // 6. Draw the car
    context.fillStyle = 'blue';
    const carWidth = 25;
    const carX = (roadX + laneDividerX) / 2 - carWidth / 2;
    context.fillRect(carX, carY, carWidth, carHeight)
}

const carSpeed = 2
function tick() {
    if (carY > canvas.height + carHeight) {
        carY = -carHeight
    }
    carY += carSpeed
    drawScene()
    requestAnimationFrame(tick)
}

drawScene()
requestAnimationFrame(tick)