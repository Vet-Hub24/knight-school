export const teachCourses=[
  {
    "id": "family-0",
    "name": "Italian Game",
    "intro": "Start here: development and a safe king.",
    "plain": "Keep the bishop aimed at f7, but build a center before attacking. c3 supports d4; d3 keeps e4 defended while pieces develop.",
    "deep": "A central break is a pawn move that challenges the enemy pawn structure. Before d4, count attackers and defenders of e4 and d4. After castling, consider Re1 and bringing the b1 knight into play. Black can equalize by completing development and preparing ...d5.",
    "prefix": "e4 e5 Nf3 Nc6",
    "main": "Bc4",
    "alternative": "Bb5 a6",
    "comparison": "Bb5 is the Ruy Lopez, a sound alternative rather than a mistake. It attacks the defender of e5 instead of aiming directly at f7. After ...a6 the bishop must choose whether to retreat or exchange.",
    "question": "Why prepare c3 before d4?",
    "choices": [
      "To support the central pawn advance",
      "To guarantee a checkmate on f7",
      "Because bishops must move twice"
    ],
    "answer": 0
  },
  {
    "id": "family-1",
    "name": "Ruy Lopez",
    "intro": "Build patient pressure without grabbing poisoned pawns.",
    "plain": "Bb5 pressures the knight defending e5. Keep developing rather than assuming that pressure wins a pawn immediately.",
    "deep": "After ...a6 and ...b5, the bishop can stay useful from b3. Re1 supports e4; c3 and d4 can build a large center. Black often prepares ...d5. A bishop pair means keeping both bishops, which can become valuable when lines open.",
    "prefix": "e4 e5 Nf3 Nc6 Bb5 a6",
    "main": "Ba4",
    "alternative": "Bxc6 dxc6",
    "comparison": "Exchanging on c6 is playable and changes the lesson. Black gets doubled c-pawns but keeps two bishops. Doubled pawns are two friendly pawns on one file; they are not automatically losing. Compare activity as well as structure.",
    "question": "What should White assess after Bxc6 dxc6?",
    "choices": [
      "Only the number of Black pawns",
      "Pawn structure and Black’s bishop pair",
      "A forced immediate win"
    ],
    "answer": 1
  },
  {
    "id": "family-2",
    "name": "Sicilian Defense",
    "intro": "Learn the imbalance, not a forced attacking recipe.",
    "plain": "Black uses ...c5 to contest d4. In an Open Sicilian the c-pawn trades for White’s d-pawn, creating different plans on each side.",
    "deep": "Black’s half-open c-file has no black pawn and can become a rook route. White gains active central pieces. The ...d5 break can free Black, but must be calculated. Opposite-side castling can allow pawn attacks; it does not remove the need to defend your own king.",
    "prefix": "e4 c5",
    "main": "Nf3",
    "alternative": "c3 d5",
    "comparison": "c3 is the Alapin, a sound different structure. After ...d5 White must resolve central tension before assuming d4 will be easy. This is a choice of structure, not a refutation of c3.",
    "question": "What is the purpose of ...c5?",
    "choices": [
      "To contest d4 and create unequal structures",
      "To force White to castle queenside",
      "To win e4 immediately"
    ],
    "answer": 0
  },
  {
    "id": "family-3",
    "name": "French Defense",
    "intro": "Recognize pawn chains and attack their support.",
    "plain": "...e6 supports ...d5. When White advances e5, Black must seek counterplay rather than accept a permanently cramped position.",
    "deep": "A pawn chain is a diagonal group of supporting pawns. ...c5 attacks d4, the support behind e5. ...f6 may challenge the head of the chain, but exposes lines near Black’s king. The c8 bishop needs a route to activity; exchanges and pawn breaks can create one.",
    "prefix": "e4 e6 d4 d5",
    "main": "Nc3",
    "alternative": "e5 c5",
    "comparison": "The Advance variation gains space immediately. Black answers by challenging d4 with ...c5. White should support the center and develop; pushing more pawns without pieces can turn space into targets.",
    "question": "Why is ...c5 thematic?",
    "choices": [
      "It always wins a bishop",
      "It attacks support at d4",
      "It prevents every kingside attack"
    ],
    "answer": 1
  },
  {
    "id": "family-4",
    "name": "Caro-Kann Defense",
    "intro": "Solid structure with an active light-squared bishop.",
    "plain": "...c6 supports ...d5. In the Advance line Black can develop the c8 bishop before ...e6 closes its original diagonal.",
    "deep": "Black spends a tempo on ...c6, so must later develop and contest the center. A tempo is one move’s worth of time. ...c5 challenges d4; the right moment depends on whether Black can recover central pawns safely. Do not confuse a sound pawn structure with permission to wait.",
    "prefix": "e4 c6 d4 d5",
    "main": "e5",
    "alternative": "exd5 cxd5",
    "comparison": "The Exchange variation removes the e-pawn/d-pawn tension. Both sides can develop naturally; White can choose c4 later for a different pawn structure. This is a sound alternative to advancing e5.",
    "question": "Why often play ...Bf5 before ...e6?",
    "choices": [
      "To bring the bishop outside the pawn chain",
      "Because Black cannot castle",
      "To force White to trade queens"
    ],
    "answer": 0
  },
  {
    "id": "family-12",
    "name": "Queen’s Gambit",
    "intro": "Use a flank pawn to challenge the center.",
    "plain": "c4 attacks d5. White wants central influence, useful development, and a structure that offers a clear plan.",
    "deep": "In the Declined line, ...e6 reinforces d5 but restricts the c8 bishop. Black can seek ...c5 or ...e5. If exchanges give White a queenside pawn minority, a minority attack uses fewer pawns to create a weak enemy pawn; it is a plan for the right structure, not every Queen’s Gambit position.",
    "prefix": "d4 d5",
    "main": "c4",
    "alternative": "Nf3 Nf6",
    "comparison": "Nf3 is sound and keeps options open. Delaying c4 leaves Black’s d5 pawn less challenged for now. White may transpose later, but should not mistake a comfortable setup for central pressure.",
    "question": "What does c4 challenge?",
    "choices": [
      "The pawn on d5",
      "The rook on h8",
      "A forced mate"
    ],
    "answer": 0
  },
  {
    "id": "family-13",
    "name": "Slav Defense",
    "intro": "Support the center without locking in the bishop.",
    "plain": "...c6 defends d5 while leaving the c8 bishop’s diagonal open. The cost is that the b8 knight cannot use c6 immediately.",
    "deep": "After ...dxc4, Black must choose between developing and trying to hold an extra pawn. ...b5 gains space but can become a target after a4. A developing move has value only if the piece is safe and its new square serves a job.",
    "prefix": "d4 d5 c4",
    "main": "c6",
    "alternative": "e6 Nc3",
    "comparison": "...e6 leads toward Queen’s Gambit Declined structures. It supports d5 directly but closes the c8 bishop’s diagonal until Black creates another route. Both choices are sound; they involve different development problems.",
    "question": "What is one benefit of ...c6 rather than ...e6?",
    "choices": [
      "It wins c4 by force",
      "It leaves the c8 bishop’s diagonal open",
      "It develops a knight"
    ],
    "answer": 1
  },
  {
    "id": "family-15",
    "name": "King’s Indian Defense",
    "intro": "Learn counterplay against a large center.",
    "plain": "Black develops behind the pawns and then challenges White’s center with ...e5 or ...c5. Waiting without a break gives White too much freedom.",
    "deep": "A fianchetto places a bishop on g7 after ...g6. Its diagonal can be strong, but central pawns may block it. In closed structures Black may seek kingside play while White expands on the queenside. First identify whether the center is actually closed; do not launch ...f5 automatically.",
    "prefix": "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6",
    "main": "Nf3",
    "alternative": "f3 O-O",
    "comparison": "f3 is a Sämisch-style setup. It supports e4 and prepares development but takes f3 away from the knight. White must choose where the king belongs based on Black’s counterplay. It is not an automatic attack.",
    "question": "Why must Black eventually challenge the center?",
    "choices": [
      "To obtain activity rather than stay cramped",
      "To guarantee a kingside mate",
      "Because fianchetto bishops cannot defend"
    ],
    "answer": 0
  },
  {
    "id": "family-18",
    "name": "London System",
    "intro": "A familiar setup still needs decisions.",
    "plain": "Develop Bf4 outside the e3 pawn chain, support the center, and watch Black’s threats instead of repeating a fixed pattern.",
    "deep": "White often prepares e4 with pieces and pawns. Black can challenge d4 with ...c5 or play actively on the queenside. If ...Bd6 challenges the bishop, decide whether retreating keeps useful pressure or whether an exchange helps. Familiarity saves thinking time, but never replaces checking threats.",
    "prefix": "d4 d5 Nf3 Nf6",
    "main": "Bf4",
    "alternative": "c4 e6",
    "comparison": "c4 is a sound Queen’s Gambit approach instead of the London. It challenges d5 immediately. Bf4 prioritizes development first; neither setup excuses ignoring Black’s central play.",
    "question": "Before repeating a London setup move, what matters most?",
    "choices": [
      "Whether your opponent has a concrete threat",
      "Keeping exactly the same move order forever",
      "Moving every pawn first"
    ],
    "answer": 0
  },
  {
    "id": "family-19",
    "name": "English Opening",
    "intro": "Control the center from the flank.",
    "plain": "c4 controls d5 without committing the d-pawn. White can develop flexibly but must eventually decide how to contest the center.",
    "deep": "After ...e5, Black gains central space. White can pressure d5 with Nc3 and a bishop on g2. A transposition is reaching the same position by a different move order. Identify the resulting structure rather than relying on the opening’s label; a later d4 may change the whole plan.",
    "prefix": "c4 e5 Nc3 Nf6",
    "main": "g3",
    "alternative": "Nf3 Nc6",
    "comparison": "Nf3 develops directly and keeps bishop placement flexible. g3 prepares Bg2, taking another pawn move before the bishop develops. Both are playable; compare immediate central needs before choosing a setup.",
    "question": "What does 1.c4 control?",
    "choices": [
      "d5",
      "h7",
      "A guaranteed extra pawn"
    ],
    "answer": 0
  }
];
