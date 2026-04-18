export var nave = {
  x: 400,
  y: 300,
  angulo: 0,
  vel_x: 0,
  vel_y: 0,
  velocidad: 3,
  vidas: 3,
  invulnerable: false,
  timerInvulnerable: 0
}
var teclasPresionadas = new Set()
export function registrarTeclaDown(key) {
  teclasPresionadas.add(key)
}
export function registrarTeclaUp(key) {
  teclasPresionadas.delete(key)
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
  nave.vel_x = 0
  nave.vel_y = 0
  var arriba = teclasPresionadas.has("w") || teclasPresionadas.has("ArrowUp")
  var abajo = teclasPresionadas.has("s") || teclasPresionadas.has("ArrowDown")
  var izq = teclasPresionadas.has("a") || teclasPresionadas.has("ArrowLeft")
  var der = teclasPresionadas.has("d") || teclasPresionadas.has("ArrowRight")
  if (arriba && !abajo) nave.vel_y = -nave.velocidad
  if (abajo && !arriba) nave.vel_y =  nave.velocidad
  if (izq   && !der)   nave.vel_x = -nave.velocidad
  if (der   && !izq)   nave.vel_x =  nave.velocidad
  nave.x += nave.vel_x
  nave.y += nave.vel_y
  if (nave.x < 0) nave.x = canvas.width
  if (nave.x > canvas.width) nave.x = 0
  if (nave.y < 0) nave.y = canvas.height
  if (nave.y > canvas.height) nave.y = 0
  if (nave.invulnerable) {
    nave.timerInvulnerable--
    if (nave.timerInvulnerable <= 0) nave.invulnerable = false
  }
}