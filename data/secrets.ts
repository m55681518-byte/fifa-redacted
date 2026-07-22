export interface SecretDossier {
  id: string;
  year: number;
  title: string;
  description: string;
  classification: "TOP SECRET" | "CONFIDENTIAL" | "CLASSIFIED";
  mediaType: "youtube" | "image" | "tiktok" | "x";
  mediaUrl: string;
  thumbnailUrl: string;
  upvotes: number;
  comments: Comment[];
  hostNation: string;
  anthem: {
    title: string;
    artist: string;
    audioUrl: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export const secretDossiers: SecretDossier[] = [
  {
    id: "SEC-1966-001",
    year: 1966,
    title: "The Wembley Phantom Goal",
    description: "Declassified analysis reveals that Geoff Hurst's iconic World Cup Final goal never actually crossed the goal line. High-resolution photogrammetry from 1966 shows the ball striking the crossbar and bouncing down—on the line, not over it. The Soviet linesman Bakhramov's split-second decision remains one of football's greatest mysteries.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/NQqhZxCJm8A",
    thumbnailUrl: "https://images.unsplash.com/photo-1574629810360-3ef6e6e5f5f9?w=800&q=80",
    upvotes: 1284,
    comments: [
      { id: "c1", author: "DossierHunter", text: "The debate will never be settled. I've seen the enhanced footage—it's millimeters either way.", timestamp: "2026-03-12T14:23:00Z" },
      { id: "c2", author: "WembleyWhisper", text: "Bakhramov was a KGB plant. The fix was in.", timestamp: "2026-04-01T09:15:00Z" }
    ],
    hostNation: "England",
    anthem: { title: "World Cup Willie", artist: "The England Squad", audioUrl: "/audio/1966.mp3" }
  },
  {
    id: "SEC-1978-002",
    year: 1978,
    title: "Operation Argentina: The Dirty War Final",
    description: "Internal FIFA memos reveal the Argentine military junta pressured referees and match officials during the 1978 World Cup. Peru's shocking 6-0 loss to Argentina in the second round—a result that eliminated Brazil—was allegedly orchestrated by the Videla regime in exchange for political favors and financial guarantees.",
    classification: "TOP SECRET",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    upvotes: 967,
    comments: [
      { id: "c3", author: "HistoryBuff_78", text: "This is well-documented outside FIFA archives too. The junta used the World Cup as propaganda.", timestamp: "2026-02-28T16:45:00Z" }
    ],
    hostNation: "Argentina",
    anthem: { title: "El Mundial", artist: "Los Caracoles", audioUrl: "/audio/1978.mp3" }
  },
  {
    id: "SEC-1998-003",
    year: 1998,
    title: "The Pre-Final Injection Protocol",
    description: "Confidential medical logs suggest Ronaldo Nazário suffered a convulsive seizure hours before the 1998 World Cup Final. FIFA's medical team administered an undisclosed sedative cocktail that left the Brazilian star lethargic. The official line was an 'ankle injury'—but internal documents tell a different story.",
    classification: "CLASSIFIED",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/QsQNjSnV6TY",
    thumbnailUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
    upvotes: 2103,
    comments: [
      { id: "c4", author: "RonaldoTruth", text: "He was never the same after that night. The conspiracy runs deep.", timestamp: "2026-01-15T11:30:00Z" },
      { id: "c5", author: "ParisSaint", text: "France was unstoppable anyway. But we deserved to see the real R9.", timestamp: "2026-05-20T20:10:00Z" }
    ],
    hostNation: "France",
    anthem: { title: "The Cup of Life", artist: "Ricky Martin", audioUrl: "/audio/1998.mp3" }
  },
  {
    id: "SEC-2002-007",
    year: 2002,
    title: "The South Korea Shadow Refs",
    description: "Operational files detail systematic referee bias during the 2002 Round of 16 and quarterfinal matches involving South Korea. Italian and Spanish teams were eliminated following controversial decisions by officials Ecuador's Byron Moreno and Egypt's Gamal Al-Ghandour. Intercepted communications suggest diplomatic pressure from high-ranking FIFA officials.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/oCw1T1Y6F4M",
    thumbnailUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    upvotes: 1756,
    comments: [
      { id: "c6", author: "AzzurriFaithful", text: "Byron Moreno should have been banned for life. We were robbed.", timestamp: "2026-02-10T08:00:00Z" }
    ],
    hostNation: "South Korea & Japan",
    anthem: { title: "Let's Get Together", artist: "Lena Park", audioUrl: "/audio/2002.mp3" }
  },
  {
    id: "SEC-2006-004",
    year: 2006,
    title: "Zidane's Headbutt: The Provocation Transcript",
    description: "Lip-reading analysis and rogue audio from the 2006 Final reveal what Materazzi actually said to Zinédine Zidane. The intercepted track translates to a deeply personal insult regarding Zidane's sister. MATRIX records show FIFA initially attempted to scrub all audio evidence from broadcast archives.",
    classification: "CONFIDENTIAL",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/0Ykm5R_cMGg",
    thumbnailUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    upvotes: 3210,
    comments: [
      { id: "c7", author: "MarseilleMystic", text: "Materazzi knew exactly what to say. Zidane took the bait, but he took a stand too.", timestamp: "2026-04-05T22:00:00Z" }
    ],
    hostNation: "Germany",
    anthem: { title: "Time of Our Lives", artist: "Il Divo & Toni Braxton", audioUrl: "/audio/2006.mp3" }
  },
  {
    id: "SEC-2010-005",
    year: 2010,
    title: "The Vuvuzela Sonic Weapon Theory",
    description: "Acoustic analysis suggests the ubiquitous vuvuzela drone was not merely a cultural phenomenon. Classified sound engineering reports indicate the 127dB continuous hum was deliberately amplified at certain stadiums to disrupt team communications. South African security services deny involvement but the sonic signatures match known LRAD devices.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/KPMkLKm7sn0",
    thumbnailUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad2a?w=800&q=80",
    upvotes: 845,
    comments: [
      { id: "c8", author: "JoburgJive", text: "I was there. The noise was unbearable. Couldn't hear my own thoughts.", timestamp: "2026-03-01T13:00:00Z" },
      { id: "c9", author: "AudioAnalyst", text: "127dB sustained is a weapon. Period. The math doesn't lie.", timestamp: "2026-06-18T07:30:00Z" }
    ],
    hostNation: "South Africa",
    anthem: { title: "Waka Waka", artist: "Shakira", audioUrl: "/audio/2010.mp3" }
  },
  {
    id: "SEC-2014-006",
    year: 2014,
    title: "Maracanã Halftime: The Leaked Team Talk",
    description: "An off-grid recording device captured the Germany dressing room at halftime of the 7-1 semifinal against Brazil. The audio reveals then-assistant coach Hansi Flick producing a notepad with detailed second-half tactical adjustments that exploited Brazil's psychological collapse after Neymar's injury. The final 7-1 scoreline was no accident—it was surgical.",
    classification: "CLASSIFIED",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
    upvotes: 2891,
    comments: [
      { id: "c10", author: "MineirazoGhost", text: "7-1. I still can't believe it. Germany was cold-blooded.", timestamp: "2026-01-30T19:45:00Z" }
    ],
    hostNation: "Brazil",
    anthem: { title: "We Are One", artist: "Pitbull ft. Jennifer Lopez", audioUrl: "/audio/2014.mp3" }
  },
  {
    id: "SEC-2022-008",
    year: 2022,
    title: "The VAR Blackout Protocol",
    description: "Internal FIFA cybersecurity logs show the VAR system suffered a 14-minute 'unexplained outage' during the 2022 World Cup quarterfinal between Portugal and Morocco at a critical decision point. Forensic analysis points to a sophisticated RF jamming attack originating from within the stadium compound. The incident was logged but never publicly disclosed.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/hJNfWj8KjUs",
    thumbnailUrl: "https://images.unsplash.com/photo-1511882150382-4210563a7c6b?w=800&q=80",
    upvotes: 1534,
    comments: [
      { id: "c11", author: "TechTactician", text: "14 minutes is not an outage. That's a deliberate window.", timestamp: "2026-05-12T15:20:00Z" },
      { id: "c12", author: "LusailLeaks", text: "Morocco's run was magic. But this explains so much.", timestamp: "2026-06-01T10:00:00Z" }
    ],
    hostNation: "Qatar",
    anthem: { title: "Tukoh Taka", artist: "Nicki Minaj, Maluma & Myriam Fares", audioUrl: "/audio/2022.mp3" }
  },
  {
    id: "SEC-2026-009",
    year: 2026,
    title: "Halftime: The Concussion Cover-Up",
    description: "Whistleblower medical staff have leaked a halftime injury report from the 2026 World Cup group stage. A star forward was diagnosed with a grade 2 concussion but cleared to continue playing after a 'spirited discussion' in the tunnel. FIFA's independent medical panel was not informed until 72 hours later. The player's identity is redacted pending investigation.",
    classification: "TOP SECRET",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    upvotes: 412,
    comments: [],
    hostNation: "USA, Canada & Mexico",
    anthem: { title: "Dai Dai", artist: "Shakira & Burna Boy", audioUrl: "/audio/2026.mp3" }
  },
  {
    id: "SEC-1930-010",
    year: 1930,
    title: "The Montevideo Arrangement",
    description: "Declassified Uruguayan foreign ministry cables reveal that the 1930 World Cup was awarded to Uruguay through a series of backroom deals involving European boycotts. FIFA guaranteed Uruguay the final hosting spot in exchange for underwriting the entire tournament budget. The trophy engraving was ordered before the first ball was kicked.",
    classification: "CONFIDENTIAL",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    upvotes: 678,
    comments: [
      { id: "c13", author: "OldSchoolAnalyst", text: "Some things never change. Football politics is older than the World Cup itself.", timestamp: "2026-07-01T06:30:00Z" }
    ],
    hostNation: "Uruguay",
    anthem: { title: "La Celeste", artist: "Uruguayan National Band", audioUrl: "/audio/1930.mp3" }
  }
];

export const worldCupAnthems: Record<number, { title: string; artist: string; audioUrl: string }> = {};
secretDossiers.forEach((d) => {
  worldCupAnthems[d.year] = d.anthem;
});

export const worldCupYears = [
  1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974,
  1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014,
  2018, 2022, 2026
];
