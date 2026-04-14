import { actualizarNave, dibujarNave, respawnNave, nave } from "./nave.js"
import { balas, actualizarBalas, dibujarBalas } from "./balas.js"
import { asteroides, crearAsteroide, actualizarAsteroides, dibujarAsteroides } from "./asteroides.js"
import { mouse, iniciarControles } from "./input.js"
import { menuActivo as menuInicial, dibujarMenu, clickEnBoton } from "./menu.js"

var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600

var menuActivo = menuInicial

iniciarControles(canvas)

canvas.addEventListener("click", function(e) {
  if (menuActivo) {
    var rect = canvas.getBoundingClientRect()
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    if (clickEnBoton(x, y, canvas)) {
      menuActivo = false
      iniciarJuego()
    }
  }
})

function iniciarJuego() {
  for (var i = 0; i < 5; i++) {
    crearAsteroide(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      50
    )
  }
}

var espacioPresionado = false

document.addEventListener("keydown", function(e) {
  if (e.key === " ") espacioPresionado = true
})
document.addEventListener("keyup", function(e) {
  if (e.key === " ") espacioPresionado = false
})
window.addEventListener("blur", function() {
  espacioPresionado = false
})

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

function detectarColisionNave() {
  if (nave.invulnerable) return

  for (var i = 0; i < asteroides.length; i++) {
    var dx = asteroides[i].x - nave.x
    var dy = asteroides[i].y - nave.y
    var dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < asteroides[i].radio + 15) { 
      respawnNave(canvas)
      break 
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (menuActivo) {
    dibujarMenu(ctx, canvas)
  } else {
    actualizarNave(mouse.x, mouse.y, canvas)
    actualizarBalas(espacioPresionado)
    actualizarAsteroides(canvas)
    detectarColisiones()
    detectarColisionNave()
    dibujarNave(ctx)
    dibujarBalas(ctx)
    dibujarAsteroides(ctx)
  }

  requestAnimationFrame(loop)
}

loop()