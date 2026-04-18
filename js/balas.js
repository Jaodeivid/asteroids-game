import { nave } from "./nave.js"
export var balas = []
var puedoDisparar = true
export var laserSound = document.getElementById("laserSound")
export function disparar() {
  if (puedoDisparar) {
    laserSound.currentTime = 0
    laserSound.play()
    balas.push({
      x: nave.x,
      y: nave.y,
      vel_x: Math.cos(nave.angulo) * 6,
      vel_y: Math.sin(nave.angulo) * 6,
      vida: 80
    })
    puedoDisparar = false
    setTimeout(function() {
      puedoDisparar = true
    }, 200)
  }
}
export function actualizarBalas() {
  balas.forEach(function(bala) {
    bala.x += bala.vel_x
    bala.y += bala.vel_y
    bala.vida--
  })
  for (var i = balas.length - 1; i >= 0; i--) {
    if (balas[i].vida <= 0) balas.splice(i, 1)
  }
}
export function dibujarBalas(ctx) {
  balas.forEach(function(bala) {
    ctx.beginPath()
    ctx.arc(bala.x, bala.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "orange"
    ctx.fill()
  })
}