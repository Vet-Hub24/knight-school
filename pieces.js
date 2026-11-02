// Colin M. L. Burnett's professional Staunton vectors (GPL-2.0-or-later).
// Original editable SVG sources and attribution are in assets/pieces/.
export function pieceVisual(piece){
 const color=piece.color==='b'?'b':'w',type=['p','n','b','r','q','k'].includes(piece.type)?piece.type:'p';
 return `<span aria-hidden="true" class="piece staunton-piece ${color==='w'?'white':'black'}" data-piece="${color}${type}"><img src="./assets/pieces/${color}${type.toUpperCase()}.svg" alt="" width="45" height="45" draggable="false" decoding="sync"></span>`;
}
