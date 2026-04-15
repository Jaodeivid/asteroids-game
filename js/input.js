import { disparar } from "./balas.js"
import { registrarTeclaDown, registrarTeclaUp } from "./nave.js"
export var mouse = { x: 0, y: 0 }
export function iniciarControles(canvas) {
  canvas.addEventListener("mousemove", function(e) {
    mouse.x = canvas.width / 2
    mouse.y = canvas.height / 2
    var rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  })
  document.addEventListener("keydown", function(e) {
    registrarTeclaDown(e.key)
  })
  document.addEventListener("keyup", function(e) {
    registrarTeclaUp(e.key)
  })
  canvas.addEventListener("click", function() {
    disparar()
  })
}