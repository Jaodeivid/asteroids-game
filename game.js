const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600
const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0,
  velocidadRotacion: 0.1
}
const keys = {}
document.addEventListener("keydown", function(e) {
  keys[e.key] = true
})
document.addEventListener("keyup", function(e) {
  keys[e.key] = false
})
function dibujarNave() {
  ctx.save()
  ctx.translate(nave.x, nave.y)
  ctx.rotate(nave.angulo)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(20, 0)
  ctx.lineTo(-15, -12)
  ctx.lineTo(-15, 12)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
function update() {
  if (keys["ArrowLeft"])  nave.angulo -= nave.velocidadRotacion
  if (keys["ArrowRight"]) nave.angulo += nave.velocidadRotacion
}
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  update()
  dibujarNave()
  requestAnimationFrame(loop)
}
loop()