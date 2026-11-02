// Classic Staunton chess pieces (Lichess cburnett SVG artwork).
// SVGs are stored locally to work with free GitHub Pages hosting.
export function pieceVisual(piece) {
 const color=piece.color==="w"?"w":"b";
 const type=({p:"P",r:"R",n:"N",b:"B",q:"Q",k:"K"})[piece.type]||"P";
 return `<span class="piece vector-piece ${color==="w"?"white":"black"}" data-piece="${color}${type.toLowerCase()}"><img class="staunton-piece" src="./assets/pieces/${color}${type}.svg" alt="" draggable="false" decoding="async"></span>`;
}
