import { guardarEnRanking, obtenerPuntos, resetearPuntos } from "./puntajeView.js"

export var menuGameOverActivo = false
var nombre = ""
var ranking = []
var puntajeFinal = 0
var guardado = false
var BOTON = { x: -100, y: 0, w: 200, h: 55 }
function capturaKey(e) {
  if (guardado) return
  var key = e.key
  if (key === "Backspace") {
    nombre = nombre.slice(0, -1)
    return
  }
  if (/^[a-zA-Z0-9]$/.test(key) && nombre.length < 3) {
    nombre += key.toUpperCase()
  }
  if (key === "Enter" && nombre.length === 3) {
    ranking = guardarEnRanking(nombre, puntajeFinal)
    guardado = true
  }
}
export function activarGameOver() {
  menuGameOverActivo = true
  nombre = ""
  guardado = false
  puntajeFinal = obtenerPuntos()   // captura el puntaje aquí
  document.addEventListener("keydown", capturaKey)
}
export function desactivarGameOver() {
  menuGameOverActivo = false
  document.removeEventListener("keydown", capturaKey)
  resetearPuntos()
  nombre = ""
  guardado = false
}
export function dibujarMenuGameOver(ctx, canvas) {
  var cx = canvas.width / 2
  var cy = canvas.height / 2
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "white"
  ctx.font = "bold 80px 'Arial'"
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER", cx, cy - 140)
  ctx.font = "bold 26px 'Courier New', monospace"
  ctx.fillStyle = "White"
  ctx.textAlign = "center"
  ctx.fillText("SCORE: " + String(puntajeFinal).padStart(6, "0"), cx, cy - 88)
  if (!guardado) {
    // Instrucción
    ctx.font = "18px 'Arial'"
    ctx.fillStyle = "White"
    ctx.textAlign = "center"
    ctx.fillText("INGRESA TU NOMBRE (3 LETRAS)", cx, cy - 45)
    // Caja input
    var bw = 180, bh = 56
    var bx = cx - bw / 2
    var by = cy - 32
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.strokeRect(bx, by, bw, bh)
    // Letras
    var mostrar = nombre
    if (nombre.length < 3) {
      mostrar = mostrar.padEnd(3, " ")
    }
    ctx.font = "bold 38px 'Courier New', monospace"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText(mostrar.split("").join(" "), cx, by + 40)
    // Instrucción Enter
    if (nombre.length === 3) {
      ctx.font = "14px 'Arial'"
      ctx.fillStyle = "yellow"
      ctx.textAlign = "center"
      ctx.fillText("[ ENTER ] para guardar", cx, cy + 50)
    }
  } else {
    ctx.font = "bold 20px 'Arial'"
    ctx.textAlign = "center"
    ctx.fillStyle = "yellow"
    ctx.fillText("TOP 3", cx, cy - 30)
    var colores = ["#ffd700", "#c0c0c0", "#cd7f32"]
    for (var i = 0; i < ranking.length; i++) {
      var entrada = ranking[i]
      ctx.font = "bold 22px 'Courier New', monospace"
      ctx.textAlign = "center"
      ctx.fillStyle = colores[i]
      ctx.fillText(
        (i+1)+".  "+entrada.nombre+"   "+String(entrada.puntos).padStart(6, "0"),
        cx,
        cy + 10 + i * 36
      )
    }
    var rbx = cx + BOTON.x
    var rby = cy + BOTON.y + 110
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 2
    ctx.strokeRect(rbx, rby, BOTON.w, BOTON.h)
    ctx.fillStyle = "orange"
    ctx.font = "bold 20px 'Arial'"
    ctx.textAlign = "center"
    ctx.fillText("REINTENTAR", cx, rby + 35)
  }
}
export function clickEnBotonRestart(x, y, canvas) {
  if (!guardado) return false
  var bx = canvas.width / 2 + BOTON.x
  var by = canvas.height / 2 + BOTON.y + 110
  return x >= bx && x <= bx + BOTON.w && y >= by && y <= by + BOTON.h
}