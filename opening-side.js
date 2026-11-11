// The named system's side is separate from the side to move or the drill side.
export function openingSide(name='') {
 const n=name.replace(/[’‘]/g,"'");
 if (/Queen's Gambit (?:Accepted|Declined)|\b(?:Defense|Defence|Modern Benoni|Benko Gambit)\b/i.test(n))
  return {side:'b',label:'Black defense',opponent:'White plays against it',explanation:'Black chooses this defense; White plays against it. Learn the plans and replies for both colors.'};
 if (/Stonewall Attack|Evans|Colle|Four Knights|Nimzo-Larsen|Italian|Ruy Lopez|Scotch|Vienna|King's Gambit|Queen's Gambit|London|English Opening|Réti|Reti|Catalan|Trompowsky|Bird's|King's Indian Attack/i.test(n))
  return {side:'w',label:'White opening',opponent:'Black plays against it',explanation:"White chooses this opening or setup; Black plays against it. Learn the plans and replies for both colors."};
 return {side:'both',label:'Opening study · both sides',opponent:'Follow White and Black',explanation:'This reference studies the moves of both colors. The side to move is shown separately on the board.'};
}
