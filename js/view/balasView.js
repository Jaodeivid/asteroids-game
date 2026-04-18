import { balas } from "../model/balas.js"
export function dibujarBalas(ctx) {
  balas.forEach(function(bala) {
    ctx.beginPath()
    ctx.arc(bala.x, bala.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "orange"
    ctx.fill()
  })
}