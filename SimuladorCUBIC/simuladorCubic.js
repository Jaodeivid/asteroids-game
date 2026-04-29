let canvas = document.getElementById("grafica");
let ctx = canvas.getContext("2d");

let cwnd = 1;
let Wmax = 1;
let C = 0.4;
let beta = 0.7;
let t = 0;
let K = 0;
let RTT = 100;
let ssthresh = 20;

let data = [];
let running = false;

function calcularK() {
  return Math.cbrt(Wmax * (1 - beta) / C);
}

function actualizarCwnd() {
  t += RTT / 1000;
  let Wt = C * Math.pow((t - K), 3) + Wmax;
  cwnd += (Wt - cwnd) / cwnd;
  if (cwnd < 1) cwnd = 1;
}

function perdidaPaquete() {
  Wmax = cwnd;
  cwnd = cwnd * beta;
  t = 0;
  K = calcularK();
}

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "lime";

  for (let i = 0; i < data.length; i++) {
    let x = i;
    let y = canvas.height - data[i] * 5;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
}

function loop() {
  if (!running) return;
  actualizarCwnd();

  if (Math.random() < 0.5) {
    perdidaPaquete();
  }

  data.push(cwnd);

  if (data.length > canvas.width) {
    data.shift();
  }
  
  dibujar();
  setTimeout(loop, RTT);
}

function toggleSim() {
  running = !running;
  if (running) loop();
}
