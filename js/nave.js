export var nave = {
  x: 400,
  y: 300,
  angulo: 0,
  vel_x: 0,
  vel_y: 0,
  velocidad: 3,
  invulnerable: false,
  timerInvulnerable: 0
}

var historialX = []
var historialY = []

var teclasArriba = ["w", "ArrowUp"]
var teclasBajo   = ["s", "ArrowDown"]
var teclasIzq    = ["a", "ArrowLeft"]
var teclasDer    = ["d", "ArrowRight"]

export function registrarTeclaDown(key) {
  if (teclasArriba.includes(key) || teclasBajo.includes(key)) {
    if (!historialY.includes(key)) historialY.push(key)
  }
  if (teclasIzq.includes(key) || teclasDer.includes(key)) {
    if (!historialX.includes(key)) historialX.push(key)
  }
}

export function registrarTeclaUp(key) {
  historialY = historialY.filter(function(k) { return k !== key })
  historialX = historialX.filter(function(k) { return k !== key })
}

export function respawnNave(canvas) {
  nave.x = canvas.width / 2
  nave.y = canvas.height / 2
  nave.vel_x = 0
  nave.vel_y = 0
  nave.invulnerable = true
  nave.timerInvulnerable = 120
}

export function actualizarNave(mouseX, mouseY, canvas) {
  nave.angulo = Math.atan2(mouseY - nave.y, mouseX - nave.x)

  var ultimaY = historialY[historialY.length - 1]
  if (teclasArriba.includes(ultimaY))    
    nave.vel_y = -nave.velocidad
  else if (teclasBajo.includes(ultimaY)) 
    nave.vel_y = nave.velocidad
  else                                    
    nave.vel_y = 0

  var ultimaX = historialX[historialX.length - 1]
  if (teclasIzq.includes(ultimaX))       
    nave.vel_x = -nave.velocidad
  else if (teclasDer.includes(ultimaX))  
    nave.vel_x = nave.velocidad
  else                                    
    nave.vel_x = 0

  nave.x += nave.vel_x
  nave.y += nave.vel_y

  if (nave.x < 0) nave.x = canvas.width
  if (nave.x > canvas.width) nave.x = 0
  if (nave.y < 0) nave.y = canvas.height
  if (nave.y > canvas.height) nave.y = 0

  if (nave.invulnerable) {
    nave.timerInvulnerable--
    if (nave.timerInvulnerable <= 0) {
      nave.invulnerable = false
    }
  }
}

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