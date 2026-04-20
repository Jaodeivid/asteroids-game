const STORAGE_KEY = "asteroides_ranking"
var puntos = 0

export function resetearPuntos() {
  puntos = 0
}

export function sumarPuntos(cantidad) {
  puntos += cantidad
}

export function obtenerPuntos() {
  return puntos
}

export function puntosSegunRadio(radio) {
  if (radio >= 37) return 10
  if (radio >= 20) return 20
  return 50
}

export function obtenerRanking() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export function guardarEnRanking(nombre, puntos) {
  var ranking = obtenerRanking()
  ranking.push({ nombre: nombre.toUpperCase().slice(0, 3), puntos: puntos })
  ranking.sort(function(a, b) { return b.puntos - a.puntos })
  ranking = ranking.slice(0, 3)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ranking))
  } catch (e) { /* silencioso */ }
  return ranking
}

export function dibujarPuntaje(ctx, canvas) {
  ctx.save()
  ctx.font = "bold 22px 'Courier New', monospace"
  ctx.fillStyle = "White"
  ctx.textAlign = "left"
  ctx.shadowColor = "#9c2ba7"
  ctx.shadowBlur = 8
  ctx.fillText("SCORE  " + String(puntos).padStart(6, "0"), canvas.width - 180, 30)
  ctx.restore()
}