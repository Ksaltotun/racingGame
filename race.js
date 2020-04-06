const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
const car = new Image();

background.src = 'background.png';
car.src = 'car.png';

ctx.font = '50px arial'
ctx.fillStyle = 'black';

function calcTroublePosition () {
    return 120 + Math.round(Math.random() * 600);
}

let carPosition = 350;
let yTrouble = 0;
let xTrouble = calcTroublePosition();
let animation;
let score = 0;

function drawScena() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(car, carPosition, 600);
}

function moveCarLeft(event) {
    if (carPosition > 130) {
        ctx.clearRect(0, 0, 800, 600);
        carPosition -= 20;
        drawScena();
    }
    
}

function moveCarRight() {
    if (carPosition < 600) {
        ctx.clearRect(0, 0, 800, 600);
        carPosition += 20;
        drawScena();
    }
}

function moveCar(event) {
    if (event.key === 'a') {
        moveCarLeft();
    } else if (event.key === 'd') {
        moveCarRight();
    }
}

function drawScore(){
    ctx.clearRect(0, 0, 800, 600);
    drawScena();
    ctx.fillText(score, 0, 700);
}

function drawTroble() {
    ctx.clearRect(0, 0, 800, 600);
    drawScena();
    drawScore();
    ctx.fillRect(xTrouble, yTrouble, 100, 100);
    yTrouble += 10;
    if (yTrouble > 800) {
        yTrouble = -5;
        xTrouble = calcTroublePosition();
        score += 1;
    }
    
    animation = requestAnimationFrame(drawTroble);
    if ((carPosition >= xTrouble - 100 && carPosition <= xTrouble + 100) && yTrouble > 500) {
        cancelAnimationFrame(animation);
    }
}



function drawAll() {
    drawScena();
    animation = requestAnimationFrame(drawTroble);
}

setTimeout(drawAll, 300);

document.addEventListener('keypress', moveCar)