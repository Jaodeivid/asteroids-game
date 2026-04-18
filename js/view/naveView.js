import { nave } from "../model/nave.js"
var corazonImg = new Image()
corazonImg.src = "assets/corazon-removebg-preview.png"
export function dibujarNave(ctx) {
  if (nave.invulnerable && Math.floor(nave.timerInvulnerable / 10) % 2 === 0) return
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
export function dibujarVidas(ctx) {
  for (var i = 0; i < nave.vidas; i++) {
    ctx.drawImage(corazonImg, 10 + i * 40, 10, 30, 30)
  }
}