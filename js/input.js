import { disparar } from "./balas.js"
import { registrarTeclaDown, registrarTeclaUp } from "./nave.js"

export var mouse = { x: 400, y: 300 }

export function iniciarControles(canvas) {
  canvas.addEventListener("mousemove", function(e) {
    var rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  })

  document.addEventListener("keydown", function(e) {
    if (e.key === " ") return
    registrarTeclaDown(e.key)
  })

  document.addEventListener("keyup", function(e) {
    registrarTeclaUp(e.key)
  })

  window.addEventListener("blur", function() {
    ["w","s","a","d","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].forEach(function(k) {
      registrarTeclaUp(k)
    })
  })

  canvas.addEventListener("click", function() {
    disparar()
  })
}