export interface SecretDossier {
  id: string;
  year: number;
  title: string;
  description: string;
  classification: "TOP SECRET" | "CONFIDENTIAL" | "CLASSIFIED";
  mediaType: "youtube" | "image" | "gallery";
  mediaUrl: string;
  thumbnailUrl: string;
  gallery: string[];
  upvotes: number;
  comments: Comment[];
  hostNation: string;
  hostFlag: string;
  anthem: {
    title: string;
    artist: string;
    youtubeId: string;
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
    description: "Declassified analysis reveals that Geoff Hurst's iconic World Cup Final goal never actually crossed the goal line. High-resolution photogrammetry from 1966 shows the ball striking the crossbar and bouncing down—on the line, not over it. The Soviet linesman Bakhramov's split-second decision remains one of football's greatest mysteries. Enhanced footage from six angles confirms the ball's trajectory, yet FIFA's official archives have classified all but two frames of the original broadcast negative. The question persists: was it a goal, or was it the most consequential optical illusion in sporting history?",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/NQqhZxCJm8A",
    thumbnailUrl: "https://images.unsplash.com/photo-1574629810360-3ef6e6e5f5f9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574629810360-3ef6e6e5f5f9?w=800&q=80",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
    ],
    upvotes: 1284,
    comments: [
      { id: "c1", author: "DossierHunter", text: "The debate will never be settled. I've seen the enhanced footage—it's millimeters either way.", timestamp: "2026-03-12T14:23:00Z" },
      { id: "c2", author: "WembleyWhisper", text: "Bakhramov was a KGB plant. The fix was in.", timestamp: "2026-04-01T09:15:00Z" },
    ],
    hostNation: "England",
    hostFlag: "gb-eng",
    anthem: { title: "World Cup Willie", artist: "The England Squad", youtubeId: "NQqhZxCJm8A" },
  },
  {
    id: "SEC-1978-002",
    year: 1978,
    title: "Operation Argentina: The Dirty War Final",
    description: "Internal FIFA memos reveal the Argentine military junta pressured referees and match officials during the 1978 World Cup. Peru's shocking 6-0 loss to Argentina in the second round—a result that eliminated Brazil—was allegedly orchestrated by the Videla regime in exchange for political favors and financial guarantees totaling over $50 million in today's currency. Whistleblower accounts from within the Argentine Football Association detail covert meetings where match outcomes were discussed as matters of national security, not sport.",
    classification: "TOP SECRET",
    mediaType: "gallery",
    mediaUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    upvotes: 967,
    comments: [
      { id: "c3", author: "HistoryBuff_78", text: "This is well-documented outside FIFA archives too. The junta used the World Cup as propaganda.", timestamp: "2026-02-28T16:45:00Z" },
    ],
    hostNation: "Argentina",
    hostFlag: "ar",
    anthem: { title: "El Mundial", artist: "Los Caracoles", youtubeId: "r3H7a8xUwE0" },
  },
  {
    id: "SEC-1998-003",
    year: 1998,
    title: "The Pre-Final Injection Protocol",
    description: "Confidential medical logs suggest Ronaldo Nazário suffered a convulsive seizure hours before the 1998 World Cup Final. FIFA's medical team administered an undisclosed sedative cocktail that left the Brazilian star lethargic and disoriented during the match against France. The official line was an 'ankle injury'—but internal documents from the Brazilian camp tell a different story. Teammates have since come forward describing a hotel room emergency at 4 PM, a rushed medical assessment by tournament doctors rather than Brazil's own staff, and Ronaldo's pale, glazed expression in the tunnel before kickoff.",
    classification: "CLASSIFIED",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/QsQNjSnV6TY",
    thumbnailUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    ],
    upvotes: 2103,
    comments: [
      { id: "c4", author: "RonaldoTruth", text: "He was never the same after that night. The conspiracy runs deep.", timestamp: "2026-01-15T11:30:00Z" },
      { id: "c5", author: "ParisSaint", text: "France was unstoppable anyway. But we deserved to see the real R9.", timestamp: "2026-05-20T20:10:00Z" },
    ],
    hostNation: "France",
    hostFlag: "fr",
    anthem: { title: "La Copa de la Vida", artist: "Ricky Martin", youtubeId: "dOQY6W-A_bA" },
  },
  {
    id: "SEC-2002-007",
    year: 2002,
    title: "The South Korea Shadow Refs",
    description: "Operational files detail systematic referee bias during the 2002 Round of 16 and quarterfinal matches involving South Korea. Italian and Spanish teams were eliminated following controversial decisions by officials Ecuador's Byron Moreno and Egypt's Gamal Al-Ghandour. Intercepted communications suggest diplomatic pressure from high-ranking FIFA officials to ensure the co-host's deep run. Moreno's now-infamous disqualification of Francesco Totti for diving, and the disallowed golden goal against Spain, remain textbook cases of match manipulation. Both referees were quietly retired from international duty within months.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/oCw1T1Y6F4M",
    thumbnailUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1511882150382-4210563a7c6b?w=800&q=80",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad2a?w=800&q=80",
    ],
    upvotes: 1756,
    comments: [
      { id: "c6", author: "AzzurriFaithful", text: "Byron Moreno should have been banned for life. We were robbed.", timestamp: "2026-02-10T08:00:00Z" },
    ],
    hostNation: "South Korea",
    hostFlag: "kr",
    anthem: { title: "Let's Get Together", artist: "Lena Park", youtubeId: "bYW2y7GMEVg" },
  },
  {
    id: "SEC-2006-004",
    year: 2006,
    title: "Zidane's Headbutt: The Provocation Transcript",
    description: "Lip-reading analysis and rogue audio from the 2006 Final reveal what Materazzi actually said to Zinédine Zidane. The intercepted track translates to a deeply personal insult regarding Zidane's sister. MATRIX records show FIFA initially attempted to scrub all audio evidence from broadcast archives and instructed broadcasters worldwide to destroy raw feeds from the incident. A single copy survived in a German TV station's vault, leaked years later by a whistleblower. The transcript shows Materazzi taunted Zidane for 90 seconds before the French captain finally snapped.",
    classification: "CONFIDENTIAL",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/0Ykm5R_cMGg",
    thumbnailUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-3ef6e6e5f5f9?w=800&q=80",
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    ],
    upvotes: 3210,
    comments: [
      { id: "c7", author: "MarseilleMystic", text: "Materazzi knew exactly what to say. Zidane took the bait, but he took a stand too.", timestamp: "2026-04-05T22:00:00Z" },
    ],
    hostNation: "Germany",
    hostFlag: "de",
    anthem: { title: "Time of Our Lives", artist: "Il Divo & Toni Braxton", youtubeId: "9Ik3YsqhHrM" },
  },
  {
    id: "SEC-2010-005",
    year: 2010,
    title: "The Vuvuzela Sonic Weapon Theory",
    description: "Acoustic analysis of the 2010 World Cup reveals the vuvuzela's 127dB drone caused measurable communication breakdowns on the pitch. UEFA and FIFA internal reports documented that players in South Africa struggled with basic verbal coordination, with several teams filing formal complaints about inadequate acoustic mitigation. Post-tournament studies linked the sustained noise levels to temporary hearing threshold shifts among midfielders and referees. FIFA's own safety guidelines for stadium noise were quietly revised in 2011, though the organization has never publicly acknowledged the 2010 tournament as a catalyst.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/KPMkLKm7sn0",
    thumbnailUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad2a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad2a?w=800&q=80",
      "https://images.unsplash.com/photo-1511882150382-4210563a7c6b?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    upvotes: 845,
    comments: [
      { id: "c8", author: "JoburgJive", text: "I was there. The noise was unbearable. Couldn't hear my own thoughts.", timestamp: "2026-03-01T13:00:00Z" },
      { id: "c9", author: "AudioAnalyst", text: "127dB sustained is a weapon. Period. The math doesn't lie.", timestamp: "2026-06-18T07:30:00Z" },
    ],
    hostNation: "South Africa",
    hostFlag: "za",
    anthem: { title: "Waka Waka", artist: "Shakira", youtubeId: "pRpeEdMmmQ0" },
  },
  {
    id: "SEC-2014-006",
    year: 2014,
    title: "Maracanã Halftime: The Leaked Team Talk",
    description: "An off-grid recording device captured the Germany dressing room at halftime of the 7-1 semifinal against Brazil. The audio reveals then-assistant coach Hansi Flick producing a notepad with detailed second-half tactical adjustments that exploited Brazil's psychological collapse after Neymar's injury. The final 7-1 scoreline was no accident—it was surgical. The recording, hidden in a fire extinguisher casing by a stadium electrician, captures Flick's chillingly precise instructions: overload the right flank where Marcelo was isolated, press Thiago Silva high to force errors, and target Fernandinho's positioning after the 60th minute when his fitness dropped.",
    classification: "CLASSIFIED",
    mediaType: "gallery",
    mediaUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
      "https://images.unsplash.com/photo-1511882150382-4210563a7c6b?w=800&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    ],
    upvotes: 2891,
    comments: [
      { id: "c10", author: "MineirazoGhost", text: "7-1. I still can't believe it. Germany was cold-blooded.", timestamp: "2026-01-30T19:45:00Z" },
    ],
    hostNation: "Brazil",
    hostFlag: "br",
    anthem: { title: "We Are One", artist: "Pitbull ft. Jennifer Lopez", youtubeId: "6L6XqW6pJ4I" },
  },
  {
    id: "SEC-2022-008",
    year: 2022,
    title: "The VAR Blackout Protocol",
    description: "Internal FIFA cybersecurity logs show the VAR system suffered a 14-minute 'unexplained outage' during the 2022 World Cup quarterfinal between Portugal and Morocco at a critical decision point. Forensic analysis points to a sophisticated RF jamming attack originating from within the stadium compound. The incident was logged but never publicly disclosed. Three independent cybersecurity firms contracted by FIFA concluded the jammer was military-grade, operating on the 5.8GHz band used by the VAR wireless transmission system. FIFA's official report blamed 'interference from broadcast equipment'—a claim no broadcast engineer on site corroborated.",
    classification: "TOP SECRET",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/hJNfWj8KjUs",
    thumbnailUrl: "https://images.unsplash.com/photo-1511882150382-4210563a7c6b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511882150382-4210563a7c6b?w=800&q=80",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad2a?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    upvotes: 1534,
    comments: [
      { id: "c11", author: "TechTactician", text: "14 minutes is not an outage. That's a deliberate window.", timestamp: "2026-05-12T15:20:00Z" },
      { id: "c12", author: "LusailLeaks", text: "Morocco's run was magic. But this explains so much.", timestamp: "2026-06-01T10:00:00Z" },
    ],
    hostNation: "Qatar",
    hostFlag: "qa",
    anthem: { title: "Tukoh Taka", artist: "Nicki Minaj, Maluma & Myriam Fares", youtubeId: "LiCBgXMFC-Q" },
  },
  {
    id: "SEC-2026-009",
    year: 2026,
    title: "Halftime: The Concussion Cover-Up",
    description: "Whistleblower medical staff have leaked a halftime injury report from the 2026 World Cup group stage. A star forward was diagnosed with a grade 2 concussion following a collision in the 38th minute but was cleared to continue playing after a 'spirited discussion' in the tunnel between team doctors and tournament medical officers. FIFA's independent medical panel was not informed until 72 hours later. The player's identity is redacted pending investigation, but match footage shows the athlete stumbling visibly upon rising from the tackle. The leaked report recommends an overhaul of in-game concussion protocols, recommendations FIFA has declined to implement.",
    classification: "TOP SECRET",
    mediaType: "gallery",
    mediaUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-3ef6e6e5f5f9?w=800&q=80",
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
    ],
    upvotes: 412,
    comments: [],
    hostNation: "United States",
    hostFlag: "us",
    anthem: { title: "Dai Dai", artist: "Shakira & Burna Boy", youtubeId: "k72jJfR9Z2I" },
  },
  {
    id: "SEC-1930-010",
    year: 1930,
    title: "The Montevideo Arrangement",
    description: "Declassified Uruguayan foreign ministry cables reveal that the 1930 World Cup was awarded to Uruguay through a series of backroom deals involving European boycotts. FIFA guaranteed Uruguay the final hosting spot in exchange for underwriting the entire tournament budget and constructing the Centenario Stadium. The trophy engraving was ordered before the first ball was kicked. Cables show FIFA officials privately acknowledged that Uruguay's bid was the only financially viable option after European federations refused to travel across the Atlantic. The tournament's existence was itself a gamble—and the cables suggest FIFA knew Uruguay would win before a single match was played.",
    classification: "CONFIDENTIAL",
    mediaType: "gallery",
    mediaUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-3ef6e6e5f5f9?w=800&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    ],
    upvotes: 678,
    comments: [
      { id: "c13", author: "OldSchoolAnalyst", text: "Some things never change. Football politics is older than the World Cup itself.", timestamp: "2026-07-01T06:30:00Z" },
    ],
    hostNation: "Uruguay",
    hostFlag: "uy",
    anthem: { title: "La Celeste", artist: "Uruguayan National Band", youtubeId: "XuLx6VYW3Uk" },
  },
];

export const worldCupAnthems: Record<number, { title: string; artist: string; youtubeId: string }> = {};
secretDossiers.forEach((d) => {
  worldCupAnthems[d.year] = d.anthem;
});

export const worldCupYears = [
  1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974,
  1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014,
  2018, 2022, 2026,
];
