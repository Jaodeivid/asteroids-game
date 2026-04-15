export var menuGameOverActivo = false
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
    var bx = canvas.width / 2 - 100
    var by = canvas.height / 2
    var bw = 200
    var bh = 55
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 2
    ctx.strokeRect(bx, by, bw, bh)
    ctx.fillStyle = "white"
    ctx.font = "bold 20px 'Arial'"
    ctx.textAlign = "center"
    ctx.fillText("RESTART", canvas.width / 2, by + 35)
}
export function clickEnBotonRestart(x, y, canvas) {
  var bx = canvas.width / 2 - 100
  var by = canvas.height / 2
  var bw = 200
  var bh = 55
  return x >= bx && x <= bx + bw && y >= by && y <= by + bh
}