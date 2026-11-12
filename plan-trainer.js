export const planTrainerLessons=[
  {
    "id": "plan-italian",
    "courseId": "family-0",
    "planning": true,
    "title": "Italian: prepare the central break",
    "prefix": "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O",
    "idea": "Both kings are safe. White\u2019s c3 pawn supports d4, but the e4 pawn also needs protection. Improve your position before opening central lines.",
    "white": "Coordinate the rook and knights, then calculate a supported d4 break.",
    "black": "Keep e5 defended and look for a sound ...d5 break or pressure against e4.",
    "choices": [
      {
        "move": "Re1",
        "label": "Improve the rook and reinforce e4",
        "kind": "recommended",
        "why": "Re1 places a rook behind e4. The example develops the remaining knights next: White prepares d4 rather than assumes it wins immediately. Black also improves pieces and can seek central counterplay.",
        "line": [
          "Re1",
          "Re8",
          "Nbd2",
          "Nd7"
        ]
      },
      {
        "move": "h3",
        "label": "Prevent a pin before developing",
        "kind": "playable",
        "why": "h3 stops a bishop coming to g4, but spends time without developing a piece. It is a playable preventive choice; compare its value with Black\u2019s chance to improve a piece. A quiet move needs a concrete purpose.",
        "line": [
          "h3",
          "Be6"
        ]
      },
      {
        "move": "Bxf7+",
        "label": "Sacrifice because the bishop points at f7",
        "kind": "caution",
        "why": "Bxf7+ gives check, but Black can answer ...Rxf7. White has given a bishop for a pawn without a forced follow-up shown here. A bishop pointing toward the king is an attacking resource, not proof that a sacrifice works.",
        "line": [
          "Bxf7+",
          "Rxf7"
        ]
      }
    ]
  },
  {
    "id": "plan-french",
    "courseId": "family-3",
    "planning": true,
    "title": "French: support the pawn chain",
    "prefix": "e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6",
    "idea": "White has more space, while Black attacks d4 with c5 and Nc6. The d4 pawn supports e5. White should develop and account for central exchanges before launching a flank attack.",
    "white": "Develop the bishops, secure the king, and preserve support for the advanced center.",
    "black": "Coordinate pressure on d4; compare captures with maintaining tension and improving pieces.",
    "choices": [
      {
        "move": "Bd3",
        "label": "Develop while preparing king safety",
        "kind": "recommended",
        "why": "Bd3 develops toward h7 and clears f1 for castling. After ...cxd4, Nxd4 restores the pawn balance while centralizing a knight. The center has changed: reassess pressure on e5 instead of following a fixed attacking recipe.",
        "line": [
          "Bd3",
          "cxd4",
          "Nxd4"
        ]
      },
      {
        "move": "Be3",
        "label": "Develop another defender of d4",
        "kind": "playable",
        "why": "Be3 develops the c1 bishop and reinforces d4. It is another useful plan. White still needs to develop f1 and secure the king; defending the center should not become an excuse to leave the king in the middle.",
        "line": [
          "Be3",
          "cxd4",
          "Nxd4"
        ]
      },
      {
        "move": "h4",
        "label": "Start a flank attack immediately",
        "kind": "caution",
        "why": "h4 gains kingside space but does not add support to d4 or develop a piece. After ...cxd4, Nxd4 is possible, but White still has to complete development. This is a strategic tradeoff, not a claim of a forced tactical loss.",
        "line": [
          "h4",
          "cxd4",
          "Nxd4"
        ]
      }
    ]
  },
  {
    "id": "plan-queens-gambit",
    "courseId": "family-12",
    "planning": true,
    "title": "Queen\u2019s Gambit: create central counterplay",
    "prefix": "d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3",
    "idea": "Black is castled and White is nearly developed. The d5 pawn is supported by e6. Black should consider challenging d4 while checking how exchanges change the pawn structure.",
    "white": "Complete development and castling, then compare the resulting central structure.",
    "black": "Challenge White\u2019s center or prepare that challenge with development instead of waiting passively.",
    "choices": [
      {
        "move": "c5",
        "label": "Challenge d4 before White finishes the setup",
        "kind": "recommended",
        "why": "...c5 attacks d4 with a flank pawn. White can develop Bd3, and ...Nc6 adds pressure while improving a piece. This is a coordinated plan, not a forced pawn win. White should check captures and king safety before choosing the structure.",
        "line": [
          "c5",
          "Bd3",
          "Nc6"
        ]
      },
      {
        "move": "Nbd7",
        "label": "Develop before choosing the break",
        "kind": "playable",
        "why": "...Nbd7 develops and supports the f6 knight. White can develop Bd3 while Black prepares ...c5. The same central idea can be reached with a different move order; compare the opponent\u2019s resources rather than memorizing one sequence.",
        "line": [
          "Nbd7",
          "Bd3",
          "c5"
        ]
      },
      {
        "move": "h6",
        "label": "Ask the bishop before central counterplay",
        "kind": "caution",
        "why": "...h6 asks the g5 bishop to decide where to go, but it also spends a tempo on a flank pawn. After Bh4, Black can still play ...c5. The move is not automatically bad; the question is whether the bishop question is more urgent than central development.",
        "line": [
          "h6",
          "Bh4",
          "c5"
        ]
      }
    ]
  },
  {
    "id": "plan-ruy",
    "courseId": "family-1",
    "title": "Ruy Lopez: prepare the center",
    "idea": "White has castled and defended e4 with Re1. The bishop on b3 is active, but White still needs development and preparation for d4.",
    "planning": true,
    "prefix": "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6",
    "white": "Maintain pressure on the defender of e5 while building toward c3 and d4. Preserve the bishop when it has useful long-term diagonals, and use Re1 to support the e-pawn.",
    "black": "Keep e5 adequately defended, develop, and gain space with ...a6 and ...b5 when useful. Prepare central counterplay rather than spending every tempo chasing the bishop.",
    "choices": [
      {
        "move": "c3",
        "label": "Prepare d4 with pawn support",
        "kind": "recommended",
        "why": "c3 supports a later d4 break, but temporarily takes c3 away from the b1 knight. Black castles while White prepares d4: neither side is required to cooperate with the eventual break.",
        "line": [
          "c3",
          "O-O",
          "d4"
        ]
      },
      {
        "move": "Nc3",
        "label": "Develop the knight first",
        "kind": "playable",
        "why": "Nc3 develops and reinforces e4 without another pawn move. It blocks the c-pawn\u2019s route to c3 for now. White chooses a different development order rather than commits an opening error.",
        "line": [
          "Nc3",
          "O-O"
        ]
      },
      {
        "move": "h3",
        "label": "Prevent a pin before central preparation",
        "kind": "caution",
        "why": "h3 prevents ...Bg4, but White has spent a tempo without developing or supporting d4. Black can castle. The plan needs a concrete reason; it is not a proven tactical blunder.",
        "line": [
          "h3",
          "O-O"
        ]
      }
    ]
  },
  {
    "id": "plan-sicilian",
    "courseId": "family-2",
    "title": "Sicilian: develop before attacking",
    "idea": "White\u2019s knight on d4 is active and e4 is supported by Nc3. Black has played ...a6 and can consider ...b5. King placement and development should guide the next plan.",
    "planning": true,
    "prefix": "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6",
    "white": "Use the lead in central space and active development. In the Open Sicilian, coordinate pieces before choosing a kingside attack or positional pressure on d5.",
    "black": "Use the half-open c-file, central pawn majority, and ...d5 break. In the Najdorf setup, ...a6 controls b5 and leaves flexible choices such as ...e5 or ...e6.",
    "choices": [
      {
        "move": "Be3",
        "label": "Develop and support the central knight",
        "kind": "recommended",
        "why": "Be3 develops a bishop while defending d4. Black can play ...e5 to attack that knight; Nb3 then keeps it safe. React to central counterplay before following any automatic attacking setup.",
        "line": [
          "Be3",
          "e5",
          "Nb3"
        ]
      },
      {
        "move": "Be2",
        "label": "Prepare a quieter king shelter",
        "kind": "playable",
        "why": "Be2 clears f1 for castling without committing the c1 bishop yet. Black develops ...e6 and White castles. A quieter plan is playable; activity and king safety matter more than choosing an aggressive label.",
        "line": [
          "Be2",
          "e6",
          "O-O"
        ]
      },
      {
        "move": "Bc4",
        "label": "Aim at f7 before checking pawn tempos",
        "kind": "caution",
        "why": "Bc4 develops actively but lets ...b5 gain space with an attack on the bishop. Bb3 keeps the bishop safe. This illustrates a tempo tradeoff, not a forced loss or an automatically unsound bishop move.",
        "line": [
          "Bc4",
          "b5",
          "Bb3"
        ]
      }
    ]
  },
  {
    "id": "plan-caro",
    "courseId": "family-4",
    "title": "Caro-Kann: decide the central tension",
    "idea": "Black\u2019s ...c5 challenges d4, the support of White\u2019s advanced e5 pawn. White should decide how to handle that tension while completing king safety.",
    "planning": true,
    "prefix": "e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5",
    "white": "Use extra central space while developing smoothly. Decide whether to hold e5 or change the center before launching a wing attack.",
    "black": "Develop the light-squared bishop before ...e6, then challenge White\u2019s center with ...c5. Solid structure should support activity, not replace it.",
    "choices": [
      {
        "move": "dxc5",
        "label": "Exchange and reassess the center",
        "kind": "recommended",
        "why": "dxc5 changes the pawn chain. Black can recover with ...Bxc5, developing the f8 bishop. White then castles. Reassess the new structure rather than pretend the old d4\u2013e5 chain is unchanged.",
        "line": [
          "dxc5",
          "Bxc5",
          "O-O"
        ]
      },
      {
        "move": "O-O",
        "label": "Secure the king before resolving tension",
        "kind": "playable",
        "why": "Castling is a useful alternative. If Black exchanges on d4, Nxd4 recaptures while centralizing a knight. White\u2019s plan changes with the structure; castling does not promise a particular attack.",
        "line": [
          "O-O",
          "cxd4",
          "Nxd4"
        ]
      },
      {
        "move": "h4",
        "label": "Start flank play while the center is tense",
        "kind": "caution",
        "why": "h4 gains space but does not resolve pressure on d4 or secure the king. Black can meet it with ...h5. This is a commitment to inspect rather than a claim that every h-pawn advance loses.",
        "line": [
          "h4",
          "h5"
        ]
      }
    ]
  },
  {
    "id": "plan-slav",
    "courseId": "family-13",
    "title": "Slav: recover material with development",
    "idea": "Black has taken c4 and developed the light-squared bishop. White\u2019s a4 discourages ...b5 support. Recovering the pawn and completing development now fit together.",
    "planning": true,
    "prefix": "d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5",
    "white": "Develop and maintain central pressure. If Black captures c4, recover it without allowing an easy ...b5 pawn chain.",
    "black": "Support d5 with ...c6 while keeping the c8 bishop free. Time captures and bishop development carefully.",
    "choices": [
      {
        "move": "e3",
        "label": "Open the bishop\u2019s recapture route",
        "kind": "recommended",
        "why": "e3 opens f1 so White can recover c4 with Bxc4. Black supports the center with ...e6. White gains a developing recapture, but must still secure the king and watch Black\u2019s central counterplay.",
        "line": [
          "e3",
          "e6",
          "Bxc4"
        ]
      },
      {
        "move": "Ne5",
        "label": "Centralize a knight before recovering",
        "kind": "playable",
        "why": "Ne5 creates central activity, but the c4 pawn is still Black\u2019s extra material. Black can develop ...Nbd7 to contest the knight. Activity must justify delaying the straightforward recapture plan.",
        "line": [
          "Ne5",
          "Nbd7"
        ]
      },
      {
        "move": "g4",
        "label": "Chase the bishop without counting captures",
        "kind": "caution",
        "why": "g4 attacks the f5 bishop, but ...Bxg4 simply captures that pawn in this example. Before chasing an active piece, check whether it can capture the pawn instead of retreating.",
        "line": [
          "g4",
          "Bxg4"
        ]
      }
    ]
  },
  {
    "id": "plan-kings-indian",
    "courseId": "family-15",
    "title": "King\u2019s Indian: let the center guide counterplay",
    "idea": "Both kings are safe and the d4\u2013e5 tension remains unresolved. Black can develop while asking White whether to close the center. Flank plans depend on that decision.",
    "planning": true,
    "prefix": "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O",
    "white": "Use central space and development. If the center closes with d5, prepare queenside expansion while watching Black\u2019s kingside attack.",
    "black": "Develop the g7 bishop, castle, and challenge the center. In locked structures, ...f5 can start kingside play if tactically sound.",
    "choices": [
      {
        "move": "Nc6",
        "label": "Develop while pressuring the center",
        "kind": "recommended",
        "why": "...Nc6 develops against d4. White can advance d5 and Black can retreat ...Ne7. The closed center then changes which slower flank plans are plausible; do not launch a pawn attack before identifying the structure.",
        "line": [
          "Nc6",
          "d5",
          "Ne7"
        ]
      },
      {
        "move": "exd4",
        "label": "Exchange and choose a more open structure",
        "kind": "playable",
        "why": "...exd4 releases the central tension. Nxd4 centralizes White\u2019s knight. This chooses a different structure from a closed King\u2019s Indian; evaluate piece activity instead of copying a closed-center attacking recipe.",
        "line": [
          "exd4",
          "Nxd4"
        ]
      },
      {
        "move": "h5",
        "label": "Push a flank pawn before central clarification",
        "kind": "caution",
        "why": "...h5 gains space but commits a king-shelter pawn before the center is resolved. White can continue with h3. The point is to calculate central and king-safety consequences, not assume every flank advance is a blunder.",
        "line": [
          "h5",
          "h3"
        ]
      }
    ]
  },
  {
    "id": "plan-london",
    "courseId": "family-18",
    "title": "London: finish development before forcing play",
    "idea": "Black has challenged d4 with ...c5. White\u2019s king remains in the center while the bishop on d3 points toward h7. Compare king safety, development and an unsupported sacrifice.",
    "planning": true,
    "prefix": "d4 d5 Nf3 Nf6 Bf4 e6 e3 Bd6 Bg3 O-O Bd3 c5",
    "white": "Develop the bishop outside the e3 pawn chain, support d4, and prepare an e4 break when the pieces can support it.",
    "black": "Challenge the center with ...c5 or ...e5 when possible, and create queenside play instead of letting White repeat a setup uncontested.",
    "choices": [
      {
        "move": "O-O",
        "label": "Secure the king and keep central options",
        "kind": "recommended",
        "why": "Castling secures White\u2019s king while the center is tense. Black develops ...Nc6 and White reinforces d4 with c3. The setup responds to central pressure instead of assuming the bishop on d3 creates a winning attack.",
        "line": [
          "O-O",
          "Nc6",
          "c3"
        ]
      },
      {
        "move": "Nbd2",
        "label": "Develop toward an eventual e4 break",
        "kind": "playable",
        "why": "Nbd2 develops toward a later e4 break. After ...Nc6 adds pressure on d4, White castles. This is another development order, not permission to push e4 without checking exchanges.",
        "line": [
          "Nbd2",
          "Nc6",
          "O-O"
        ]
      },
      {
        "move": "Bxh7+",
        "label": "Sacrifice because a bishop points at the king",
        "kind": "caution",
        "why": "Bxh7+ sacrifices a bishop for a pawn after ...Kxh7. No forced recovery is shown here. Before choosing a Greek-gift style sacrifice, calculate escape squares and the defenders instead of relying on the bishop\u2019s diagonal alone.",
        "line": [
          "Bxh7+",
          "Kxh7"
        ]
      }
    ]
  },
  {
    "id": "plan-english",
    "courseId": "family-19",
    "title": "English: challenge an active central knight",
    "idea": "Black\u2019s knight occupies d5 while White\u2019s bishop has reached g2. The long diagonal is useful only with development and central pressure. White should compare ways to question Black\u2019s activity.",
    "planning": true,
    "prefix": "c4 e5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nc6",
    "white": "Use c4 and a fianchetto to control d5. Choose a central or queenside expansion based on Black\u2019s structure.",
    "black": "Take useful central space, develop, and challenge the flank setup with timely central play.",
    "choices": [
      {
        "move": "Nf3",
        "label": "Develop and add central pressure",
        "kind": "recommended",
        "why": "Nf3 develops and attacks e5. Black can clear f8 with ...Be7 while White castles. Coordinate the bishop and knight with king safety before starting a flank attack.",
        "line": [
          "Nf3",
          "Be7",
          "O-O"
        ]
      },
      {
        "move": "d3",
        "label": "Support a flexible center first",
        "kind": "playable",
        "why": "d3 opens the c1 bishop and controls e4. Black can develop ...Be7. White has a flexible center but still needs to develop the g1 knight and castle; flexibility should not become delayed development.",
        "line": [
          "d3",
          "Be7"
        ]
      },
      {
        "move": "Bxd5",
        "label": "Trade the fianchetto bishop for the knight",
        "kind": "caution",
        "why": "Bxd5 removes the active knight but gives up the bishop White spent time fianchettoing. After ...Qxd5, compare the queen\u2019s activity and the weakened light squares. Exchanging an active target can still have a strategic cost.",
        "line": [
          "Bxd5",
          "Qxd5"
        ]
      }
    ]
  }
];
export function mixedPlanOrder(random=Math.random){const ids=planTrainerLessons.map(d=>d.id);for(let i=ids.length-1;i>0;i--){const j=Math.max(0,Math.min(i,Math.floor(random()*(i+1))));[ids[i],ids[j]]=[ids[j],ids[i]]}return ids}
