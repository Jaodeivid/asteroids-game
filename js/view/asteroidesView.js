import { asteroides } from "../model/asteroides.js"
export function dibujarAsteroides(ctx) {
  asteroides.forEach(function(ast) {
    ctx.beginPath()
    var puntos = 8
    for (var i = 0; i <= puntos; i++) {
      var angulo = (i / puntos) * Math.PI * 2
      var r = ast.radio * (0.85 + Math.sin(i * ast.semilla) * 0.15)
      var px = ast.x + Math.cos(angulo) * r
      var py = ast.y + Math.sin(angulo) * r
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.strokeStyle = "white"
    ctx.stroke()
  })
}