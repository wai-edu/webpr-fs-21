
const radius = 10;
const ball = {x:Math.random() * 400, y:0, dx: 5, dy: 1};
let   old  = {x: ball.x, y: ball.y};
const gravity = 1;

function start() {
    const canvas  = document.getElementById("canvas");

    canvas.style.backgroundColor = '#FFDF00';

    const context = canvas.getContext("2d");
    context.fillStyle = "black";

    const bounds = { x: canvas.width, y: canvas.height };

    setInterval(() => {
        nextBoard(bounds);
    }, 1000 / 20);

    const render = () => {
        display(context);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function nextBoard(bounds) {
    // keep old ball values for the sake of efficient clearing of the old display
    old = {x: ball.x, y: ball.y};

    // handle ball is hitting the bounds
    //   reverse direction
    if (ball.x - radius <= 0) {
        ball.dx = Math.abs(ball.dx);
    } else if (ball.x + radius >= bounds.x) {
        ball.dx = Math.abs(ball.dx) * -1;
    }

    //   lose some energy relative to the current inertia (only velocity varies)

    // calculate new position
    ball.x = Math.max(radius, Math.min(bounds.x - radius, ball.x + ball.dx));
    ball.y = Math.min(bounds.y - radius, ball.y + ball.dy);

    // calculate any changes in velocity due to gravitational pull or medium resistance
    if (ball.y + radius >= bounds.y) {
        ball.dy = Math.min(0, (Math.abs(ball.dy) - gravity * 2) * -1);
        ball.dx *= 0.95;
    } else {
        ball.dy += gravity;
    }
}

function display(context) {
    context.clearRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}

