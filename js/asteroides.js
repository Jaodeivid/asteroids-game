export var asteroides = []

export function crearAsteroide(x, y, tam) {
  asteroides.push({
    x: x,
    y: y,
    radio: tam,
    vel_x: (Math.random() - 0.5) * 3,
    vel_y: (Math.random() - 0.5) * 3,
    semilla: Math.random() * 10
  })
}

export function actualizarAsteroides(canvas) {
  asteroides.forEach(function(ast) {
    ast.x += ast.vel_x
    ast.y += ast.vel_y
    if (ast.x < 0) ast.x = canvas.width
    if (ast.x > canvas.width) ast.x = 0
    if (ast.y < 0) ast.y = canvas.height
    if (ast.y > canvas.height) ast.y = 0
  })
}

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