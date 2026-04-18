export var menuActivo = true
var fondo = new Image()
fondo.src = "./assets/fondo.png"
var BOTON = { x: -100, y: 0, w: 200, h: 55 }
export function dibujarMenu(ctx, canvas) {
  if (fondo.complete) {
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height)
  } else {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  ctx.fillStyle = "white"
  ctx.font = "bold 80px 'Arial'"
  ctx.textAlign = "center"
  ctx.fillText("ASTEROIDS", canvas.width / 2, canvas.height / 2 - 60)
  var bx = canvas.width / 2 + BOTON.x
  var by = canvas.height / 2 + BOTON.y
  ctx.strokeStyle = "yellow"
  ctx.lineWidth = 2
  ctx.strokeRect(bx, by, BOTON.w, BOTON.h)
  ctx.fillStyle = "orange"
  ctx.font = "bold 24px 'Arial'"
  ctx.textAlign = "center"
  ctx.fillText("JUGAR", canvas.width / 2, by + 37)
}
export function clickEnBoton(x, y, canvas) {
  var bx = canvas.width / 2 + BOTON.x
  var by = canvas.height / 2 + BOTON.y
  return x >= bx && x <= bx + BOTON.w && y >= by && y <= by + BOTON.h
}