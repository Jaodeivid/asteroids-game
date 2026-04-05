var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600

var nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0
}
var balas = []
var puedoDisparar = true
var mouseX = canvas.width / 2
var mouseY = canvas.height / 2

function crearEstrellas() {
  for (var i = 0; i < 100; i++) {
    var estrella = document.createElement("div")
    var tamanio = Math.random() * 2 + 1 + "px"
    estrella.style.position = "fixed"
    estrella.style.width = tamanio
    estrella.style.height = tamanio
    estrella.style.background = "white"
    estrella.style.borderRadius = "50%"
    estrella.style.left = Math.random() * 100 + "%"
    estrella.style.top = Math.random() * 100 + "%"
    document.body.appendChild(estrella)
  }
}
function disparar() {
  if (puedoDisparar) {
    balas.push({
      x: nave.x,
      y: nave.y,
      vel_x: Math.cos(nave.angulo) * 6,
      vel_y: Math.sin(nave.angulo) * 6,
      vida: 80
    })
    puedoDisparar = false
    setTimeout(function() {
      puedoDisparar = true
    }, 300)
  }
}
function dibujarNave() {
  ctx.save()
  ctx.translate(nave.x, nave.y)
  ctx.rotate(nave.angulo)
  ctx.strokeStyle = "yellow"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(20, 0)
  ctx.lineTo(-15, -12)
  ctx.lineTo(-15, 12)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
function dibujarBalas() {
  balas.forEach(function(bala) {
    ctx.beginPath()
    ctx.arc(bala.x, bala.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "orange"
    ctx.fill()
  })
}

function update() {
  nave.angulo = Math.atan2(mouseY - nave.y, mouseX - nave.x)
  balas.forEach(function(bala) {
    bala.x += bala.vel_x
    bala.y += bala.vel_y
    bala.vida--
  })
  for (var i = balas.length - 1; i >= 0; i--) {
    if (balas[i].vida <= 0) {
      balas.splice(i, 1)
    }
  }
}

canvas.addEventListener("mousemove", function(e) {
  var rect = canvas.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
})
document.addEventListener("keydown", function(e) {
  if (e.key === " ") {
    disparar()
  }
})
canvas.addEventListener("click", function() {
  disparar()
})

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  update()
  dibujarNave()
  dibujarBalas()
  requestAnimationFrame(loop)
}

crearEstrellas()
loop()