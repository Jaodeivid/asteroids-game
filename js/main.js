import { actualizarNave, dibujarNave, respawnNave, nave, dibujarVidas } from "./nave.js"
import { balas, actualizarBalas, dibujarBalas } from "./balas.js"
import { asteroides, crearAsteroide, actualizarAsteroides, dibujarAsteroides, reiniciarAsteroides } from "./asteroides.js"
import { mouse, iniciarControles } from "./input.js"
import { menuActivo as menuInicial, dibujarMenu, clickEnBoton } from "./menu.js"
import { menuGameOverActivo, dibujarMenuGameOver, activarGameOver, desactivarGameOver, clickEnBotonRestart } from "./menuGameOver.js"
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600
var menuActivo = menuInicial
var explosionSound = document.getElementById("explosionSound")
iniciarControles(canvas)
canvas.addEventListener("click", function(e) {
  var rect = canvas.getBoundingClientRect()
  var x = e.clientX - rect.left
  var y = e.clientY - rect.top
  if (menuActivo) {
    if (clickEnBoton(x, y, canvas)) {
      menuActivo = false
      iniciarJuego()
    }
  } else if (menuGameOverActivo) {
    if (clickEnBotonRestart(x, y, canvas)) {
      desactivarGameOver()
      reiniciarAsteroides()
      nave.vidas = 3
      iniciarJuego()
    }
  }
})
function iniciarJuego() {
  for (var i = 0; i < 5; i++) {
    var lado = Math.floor(Math.random() * 4)
    var margen = 50
    var x, y
    if (lado === 0) {
      x = Math.random() * canvas.width
      y = -margen
    } else if (lado === 1) {
      x = Math.random() * canvas.width
      y = canvas.height + margen
    } else if (lado === 2) {
      x = -margen
      y = Math.random() * canvas.height
    } else {
      x = canvas.width + margen
      y = Math.random() * canvas.height
    }
    var tam = Math.random() * 40 + 17
    crearAsteroide(x, y, tam)
  }
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
function detectarColisionNave() {
  if (nave.invulnerable) return
  for (var i = 0; i < asteroides.length; i++) {
    var dx = asteroides[i].x - nave.x
    var dy = asteroides[i].y - nave.y
    var dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < asteroides[i].radio + 15) {
      explosionSound.currentTime = 0
      explosionSound.play()
      nave.vidas--
      if (nave.vidas <= 0) {
        activarGameOver()
        break
      }
      respawnNave(canvas)
      break
    }
  }
}
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (menuActivo) {
    dibujarMenu(ctx, canvas)
  } else if (menuGameOverActivo) {
    dibujarMenuGameOver(ctx, canvas)
  } else {
    actualizarNave(mouse.x, mouse.y, canvas)
    actualizarBalas()
    actualizarAsteroides(canvas)
    detectarColisiones()
    detectarColisionNave()
    dibujarNave(ctx)
    dibujarBalas(ctx)
    dibujarAsteroides(ctx)
    dibujarVidas(ctx)
  }
  requestAnimationFrame(loop)
}
loop()