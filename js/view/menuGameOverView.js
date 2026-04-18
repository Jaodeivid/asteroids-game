export var menuGameOverActivo = false
var BOTON = { x: -100, y: 0, w: 200, h: 55 }
export function activarGameOver() {
  menuGameOverActivo = true
}
export function desactivarGameOver() {
  menuGameOverActivo = false
}
export function dibujarMenuGameOver(ctx, canvas) {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "white"
  ctx.font = "bold 80px 'Arial'"
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 60)
  var bx = canvas.width / 2 + BOTON.x
  var by = canvas.height / 2 + BOTON.y
  ctx.strokeStyle = "yellow"
  ctx.lineWidth = 2
  ctx.strokeRect(bx, by, BOTON.w, BOTON.h)
  ctx.fillStyle = "orange"
  ctx.font = "bold 20px 'Arial'"
  ctx.textAlign = "center"
  ctx.fillText("REINTENTAR", canvas.width / 2, by + 35)
}
export function clickEnBotonRestart(x, y, canvas) {
  var bx = canvas.width / 2 + BOTON.x
  var by = canvas.height / 2 + BOTON.y
  return x >= bx && x <= bx + BOTON.w && y >= by && y <= by + BOTON.h
}