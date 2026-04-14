import { actualizarNave, dibujarNave } from "./nave.js"
import { balas, actualizarBalas, dibujarBalas } from "./balas.js"
import { asteroides, crearAsteroide, actualizarAsteroides, dibujarAsteroides } from "./asteroides.js"
import { mouse, iniciarControles } from "./input.js"

var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600

iniciarControles(canvas)

for (var i = 0; i < 5; i++) {
  crearAsteroide(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    50
  )
}

function detectarColisiones() {
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

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  actualizarNave(mouse.x, mouse.y)
  actualizarBalas()
  actualizarAsteroides(canvas)
  detectarColisiones()
  dibujarNave(ctx)
  dibujarBalas(ctx)
  dibujarAsteroides(ctx)
  requestAnimationFrame(loop)
}

loop()