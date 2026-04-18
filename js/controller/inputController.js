import { disparar } from "../model/balas.js"
import { registrarTeclaDown, registrarTeclaUp } from "../model/nave.js"
export var mouse = { x: 0, y: 0 }
export function iniciarControles(canvas) {
  canvas.addEventListener("mousemove", function(e) {
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