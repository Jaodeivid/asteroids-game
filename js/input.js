import { disparar } from "./balas.js"

export var mouse = { x: 400, y: 300 }

export function iniciarControles(canvas) {
  canvas.addEventListener("mousemove", function(e) {
    var rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  })

  document.addEventListener("keydown", function(e) {
    if (e.key === " ") disparar()
  })

  canvas.addEventListener("click", function() {
    disparar()
  })
}