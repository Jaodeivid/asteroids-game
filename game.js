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

var asteroides = []

function crearAsteroide(x, y, tam) {
  asteroides.push({
    x: x,
    y: y,
    radio: tam,
    vel_x: (Math.random() - 0.5) * 3,
    vel_y: (Math.random() - 0.5) * 3,
    semilla: Math.random() * 10
  })
}
function dibujarAsteroides() {
  asteroides.forEach(function(ast) {
    ctx.beginPath()
    var puntos = 8
    for (var i = 0; i <= puntos; i++) {
      var angulo = (i / puntos) * Math.PI * 2
      var r = ast.radio * (0.85 + Math.sin(i * ast.semilla) * 0.15)
      var px = ast.x + Math.cos(angulo) * r
      var py = ast.y + Math.sin(angulo) * r
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.strokeStyle = "white"
    ctx.stroke()
  })
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
    }, 200)
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
  asteroides.forEach(function(ast) {
    ast.x += ast.vel_x
    ast.y += ast.vel_y

    if (ast.x < 0) ast.x = canvas.width
    if (ast.x > canvas.width) ast.x = 0
    if (ast.y < 0) ast.y = canvas.height
    if (ast.y > canvas.height) ast.y = 0
  })

  for (var i = asteroides.length - 1; i >= 0; i--) {
    for (var j = balas.length - 1; j >= 0; j--) {

      var dx = asteroides[i].x - balas[j].x
      var dy = asteroides[i].y - balas[j].y
      var dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < asteroides[i].radio) {

        var x = asteroides[i].x
        var y = asteroides[i].y
        var tam = asteroides[i].radio

        balas.splice(j, 1)
        asteroides.splice(i, 1)

        if (tam > 20) {
          crearAsteroide(x, y, tam / 1.7)
          crearAsteroide(x, y, tam / 1.7)
        }

        break
      }
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
  dibujarAsteroides()

  requestAnimationFrame(loop)
}

for (var i = 0; i < 5; i++) {
  crearAsteroide(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    50
  )
}
loop()