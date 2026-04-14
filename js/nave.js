export var nave = {
  x: 400,
  y: 300,
  angulo: 0
}

export function actualizarNave(mouseX, mouseY) {
  nave.angulo = Math.atan2(mouseY - nave.y, mouseX - nave.x)
}

export function dibujarNave(ctx) {
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