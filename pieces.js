// One 64×64 vector system, using the existing pawn's footprint as the reference.
// Explicit fills avoid platform-dependent emoji and font rendering.
const shapes = {
 p:'<circle cx="32" cy="15" r="7.5"/><path d="M25 25h14v5H25z"/><path d="M28 30h8c-1 8 2 13 7 18H21c5-5 8-10 7-18Z"/>',
 r:'<path d="M18 9h7v7h5V9h5v7h5V9h7v17H18Z"/><path d="M23 26h18v6H23Z"/><path d="M26 32h12l3 16H23Z"/>',
 n:'<path d="M23 48c0-8 3-14 11-21l-10 5-8-5 8-11 2-9 7 4 8 3c8 5 9 14 7 23l-5 11Z"/><path d="m24 17 7 2-4 5-7 2" fill="none"/>',
 b:'<path d="M32 7c-4 6-13 10-13 18 0 7 6 11 13 11s13-4 13-11C45 17 36 13 32 7Z"/><path d="m36 15-8 12" fill="none"/><path d="M27 36h10l4 12H23Z"/>',
 q:'<path d="m18 19 8 8 6-13 6 13 8-8-6 21H24Z"/><circle cx="17" cy="15" r="3.5"/><circle cx="32" cy="9.5" r="3.5"/><circle cx="47" cy="15" r="3.5"/><path d="M24 40h16v5H24Z"/><path d="M26 45h12l3 3H23Z"/>',
 k:'<path d="M29 6h6v6h6v6h-6v6h-6v-6h-6v-6h6Z"/><path d="M32 27c-6-7-17-4-16 5 0 5 5 10 9 13h14c4-3 9-8 9-13 1-9-10-12-16-5Z"/><path d="M24 43h16v5H24Z"/>',
};
const base='<path d="M21 48h22l3 5H18Z"/><path d="M18 53h28v4H18Z"/>';
export function pieceVisual(piece) {
 const white=piece.color==='w',type=shapes[piece.type]?piece.type:'p';
 const fill=white?'#fff9e9':'#202b32',stroke=white?'#29333a':'#101820';
 const detail=type==='n'?`<circle cx="36" cy="21" r="1.7" fill="${white?'#26392d':'#dbe4cf'}" stroke="none"/>`:'';
 return `<span aria-hidden="true" class="piece vector-piece ${white?'white':'black'}" data-piece="${piece.color}${type}"><svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true"><g fill="${fill}" stroke="${stroke}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${shapes[type]}${base}${detail}<path d="M21 54h22" fill="none" stroke="${white?'#d7cba9':'#52616b'}" stroke-width="1.2"/></g></svg></span>`;
}
