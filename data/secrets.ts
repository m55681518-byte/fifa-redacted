import { additionalDossiers } from "./additional-dossiers";
import { getAnthem, type Anthem } from "./media";

/**
 * A citation backing a claim in a dossier.
 *
 * Every record in this archive concerns FIFA as an institution — decisions it
 * took, warnings it ignored, money it moved, reports it buried. All of it is
 * built from indictments, court judgments, official reports and admissions.
 * Nothing is invented. Where a matter is contested, the record says so and
 * cites the denial.
 */
export interface Source {
  title: string;
  publisher: string;
  url: string;
  year?: number;
}

/**
 * Evidentiary status of a record.
 *  - DOCUMENTED  proven in court, admitted, or established by official report
 *  - DISPUTED    credible allegations, denied or unproven
 *  - UNRESOLVED  open questions where the evidence genuinely runs out
 */
export type Classification = "DOCUMENTED" | "DISPUTED" | "UNRESOLVED";

/**
 * What kind of proof underpins a record. This is the axis a reader actually
 * cares about — a conviction and a denied allegation are not the same claim,
 * even when both are serious.
 */
export type EvidenceKind = "COURT" | "OFFICIAL" | "PRESS" | "ALLEGED" | "OPEN";

export const EVIDENCE_ORDER: EvidenceKind[] = [
  "COURT",
  "OFFICIAL",
  "PRESS",
  "ALLEGED",
  "OPEN",
];

export const EVIDENCE_LABEL: Record<EvidenceKind, string> = {
  COURT: "Convictions & admissions",
  OFFICIAL: "Official reports",
  PRESS: "Investigative reporting",
  ALLEGED: "Denied or unproven",
  OPEN: "No finding yet",
};

/** One-line description of what each tier actually means. */
export const EVIDENCE_NOTE: Record<EvidenceKind, string> = {
  COURT: "Established by court judgment, guilty plea, or explicit admission.",
  OFFICIAL: "Rests on an official report, published document or uncontested record.",
  PRESS: "Built from investigative journalism working from documents.",
  ALLEGED: "A credible allegation that is denied, unproven, or contested.",
  OPEN: "Forward-looking or unsettled; no finding has been established.",
};

export interface SecretDossier {
  id: string;
  year: number;
  title: string;
  /** One-line hook shown on the card face. */
  summary?: string;
  description: string;
  /** Free-form topic tags used by search and the filter bar. */
  tags?: string[];
  /** 1-5 strength of the documentary record behind the claim. */
  credibility?: number;
  /** The kind of proof behind the record. Drives the evidence filter. */
  evidence?: EvidenceKind;
  /**
   * People and organisations named in the record. Used to connect records to
   * each other — several figures recur across decades.
   */
  people?: string[];
  classification: Classification;
  /** Citations. Rendered in full inside the dossier modal. */
  sources?: Source[];
  /** The institutional failure in one line — what FIFA actually did wrong. */
  failure?: string;
  mediaType: "youtube" | "image" | "gallery";
  mediaUrl: string;
  thumbnailUrl: string;
  gallery: string[];
  upvotes: number;
  comments: Comment[];
  hostNation: string;
  hostFlag: string;
  anthem: Anthem | null;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export type SourceDossier = Omit<SecretDossier, "anthem">;

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80`;

export const secretDossiers: SourceDossier[] = [
  {
    id: "SEC-2015-001",
    year: 2015,
    title: "The Morning FIFA Was Raided",
    summary:
      "Swiss police walked into the Baur au Lac at dawn and arrested seven FIFA officials. The indictment ran to 47 counts.",
    failure:
      "FIFA was described by US prosecutors as a racketeering enterprise operating across two generations of leadership.",
    tags: ["indictment", "racketeering", "doj", "arrests"],
    credibility: 5,
    evidence: "COURT",
    people: ["FIFA", "US Department of Justice", "Sepp Blatter", "Jeffrey Webb", "Jack Warner", "Loretta Lynch"],
    classification: "DOCUMENTED",
    description:
      "On 27 May 2015, during FIFA's annual congress, Swiss police entered the Baur au Lac hotel in Zurich and arrested seven senior officials on behalf of the US Department of Justice. The indictment ran to 47 counts across 164 pages and named fourteen people — nine FIFA officials and five sports marketing executives — alleging bribes and kickbacks exceeding $150 million over more than two decades. Attorney General Loretta Lynch said the defendants had corrupted the business of worldwide football 'to serve their interests and to enrich themselves'. The DOJ's framing was the significant part: it charged the conduct under the Racketeer Influenced and Corrupt Organizations Act, the statute written for organised crime, and described FIFA as an enterprise in which 'two generations of soccer officials' had abused their positions. A second wave followed on 3 December 2015, when two more FIFA vice-presidents were arrested at the same hotel and sixteen further indictments were unsealed. More than forty officials and entities have since been charged or pleaded guilty. Sepp Blatter, re-elected president four days after the first raid, announced his resignation on 2 June.",
    sources: [
      {
        title: "Nine FIFA Officials and Five Corporate Executives Indicted for Racketeering Conspiracy and Corruption",
        publisher: "US Department of Justice",
        url: "https://web.archive.org/web/20160417221705/https:/www.justice.gov/opa/pr/nine-fifa-officials-and-five-corporate-executives-indicted-racketeering-conspiracy-and",
        year: 2015,
      },
      {
        title: "2015 FIFA corruption case",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/2015_FIFA_corruption_case",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1526232761682-d26e03ac148e"),
    thumbnailUrl: IMG("photo-1526232761682-d26e03ac148e"),
    gallery: [],
    upvotes: 4210,
    comments: [
      {
        id: "c-2015-1",
        author: "BrooklynDocket",
        text: "RICO. The statute built for the mafia, applied to the governing body of football. That's the whole story in one acronym.",
        timestamp: "2026-05-27T09:12:00Z",
      },
    ],
    hostNation: "Switzerland",
    hostFlag: "ch",
  },
  {
    id: "SEC-2013-002",
    year: 2013,
    title: "FIFA's Own Executive Wore a Wire",
    summary:
      "Chuck Blazer pleaded guilty to ten felonies and admitted taking bribes over two World Cup bids. He had been informing since 2011.",
    failure:
      "A sitting member of FIFA's executive committee took bribes on World Cup host selection for over a decade without detection.",
    tags: ["blazer", "informant", "bribery", "concacaf"],
    credibility: 5,
    evidence: "COURT",
    people: ["FIFA", "Chuck Blazer", "CONCACAF", "US Department of Justice"],
    classification: "DOCUMENTED",
    description:
      "Chuck Blazer sat on FIFA's executive committee from 1997 to 2013 and ran CONCACAF as general secretary for two decades. In a sealed Brooklyn courtroom in November 2013 he pleaded guilty to ten felonies including racketeering conspiracy, wire fraud, money laundering and six counts of tax evasion. The transcript, unsealed in June 2015, contains his admissions in his own words: that he agreed in 1992 to facilitate a bribe in connection with the selection of the 1998 World Cup host, and that he and others on the FIFA executive committee agreed to accept bribes in connection with South Africa's selection for 2010. He also admitted taking kickbacks on broadcast rights for five CONCACAF Gold Cup tournaments between 1996 and 2003, and failing to declare roughly $11 million in income. After US authorities confronted him over the unpaid tax, Blazer cooperated — reportedly wearing a concealed microphone to record other football officials at the 2012 London Olympics. The point for FIFA is not that Blazer was corrupt. It is that he sat at the top of the organisation for sixteen years while doing it, and it took the IRS rather than FIFA to find out.",
    sources: [
      {
        title: "Chuck Blazer: FIFA execs took bribes ahead of '98, '10 World Cups",
        publisher: "CNN",
        url: "https://www.cnn.com/2015/06/03/us/fifa-chuck-blazer-transcript",
        year: 2015,
      },
      {
        title: "Chuck Blazer worked undercover for U.S. informing on FIFA",
        publisher: "ESPN",
        url: "https://en.wikipedia.org/wiki/Chuck_Blazer",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1459865264687-595d652de67e"),
    thumbnailUrl: IMG("photo-1459865264687-595d652de67e"),
    gallery: [],
    upvotes: 2890,
    comments: [],
    hostNation: "United States",
    hostFlag: "us",
  },
  {
    id: "SEC-2012-003",
    year: 2012,
    title: "The ISL Files FIFA Fought to Keep Sealed",
    summary:
      "A FIFA president took kickbacks from the federation's own marketing partner. FIFA spent years in court trying to stop the documents being published.",
    failure:
      "FIFA made its cooperation with prosecutors conditional on the case against its own president being dropped.",
    tags: ["isl", "havelange", "kickbacks", "cover-up"],
    credibility: 5,
    evidence: "COURT",
    people: ["FIFA", "João Havelange", "Ricardo Teixeira", "ISL", "BBC Panorama"],
    classification: "DOCUMENTED",
    description:
      "ISL was FIFA's marketing partner until it collapsed in 2001 with debts of around $300 million. The bankruptcy triggered a Swiss criminal investigation which found the agency had paid close to $200 million in what a judge characterised as bribes to sports officials between 1989 and 2000. In July 2012, after the Swiss Supreme Court threw out an appeal by the men named, FIFA was compelled to publish the prosecutor's dossier. It showed that João Havelange, FIFA president from 1974 to 1998, received 1.5 million Swiss francs in 1997 while still in office, and that executive committee member Ricardo Teixeira received at least 12.74 million. Payments attributed to accounts connected to the two men totalled almost 22 million Swiss francs. Commercial bribery was not a crime in Switzerland at the time, and the criminal probe was closed in 2010 after 5.5 million francs was repaid — on condition the recipients' identities stayed secret. The prosecutor's report noted that FIFA had made its consent to that settlement conditional on proceedings against its former president being dropped, and described FIFA as 'a deficient organisation in its enterprise'. The dossier only became public because the BBC's Panorama team spent a year litigating for it.",
    sources: [
      {
        title: "Joao Havelange, ex-Fifa president, received huge sums in bribes",
        publisher: "BBC Sport",
        url: "https://www.bbc.com/sport/football/18804464",
        year: 2012,
      },
      {
        title: "FIFA names Havelange, Teixeira in kickbacks case",
        publisher: "Associated Press",
        url: "https://www.foxsports.com/stories/soccer/fifa-names-havelange-teixeira-in-kickbacks-case",
        year: 2012,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1522778119026-d647f0596c20"),
    thumbnailUrl: IMG("photo-1522778119026-d647f0596c20"),
    gallery: [],
    upvotes: 2340,
    comments: [
      {
        id: "c-2012-1",
        author: "ZugArchive",
        text: "Read that condition again. FIFA would cooperate, provided the case against its own former president went away.",
        timestamp: "2026-03-19T10:40:00Z",
      },
    ],
    hostNation: "Switzerland",
    hostFlag: "ch",
  },
  {
    id: "SEC-2010-004",
    year: 2010,
    title: "FIFA Knew Qatar Was Too Hot Before It Voted",
    summary:
      "Its own technical report called the summer heat a health risk and rated the bid high risk. It voted for Qatar anyway.",
    failure:
      "FIFA's evaluation ranked Qatar the weakest bid, then the executive committee chose it and spent five years reversing the consequences.",
    tags: ["qatar", "bidding", "heat", "technical-report"],
    credibility: 5,
    evidence: "OFFICIAL",
    people: ["FIFA", "Sepp Blatter", "Qatar"],
    classification: "DOCUMENTED",
    description:
      "FIFA published a technical evaluation of the 2018 and 2022 bids in November 2010, before the vote. On Qatar it was explicit: staging the tournament in June and July, 'the two hottest months of the year in this region, has to be considered as a potential health risk for players, spectators, officials and the FIFA family'. The operational risk assessment rated Qatar medium or high risk in eight of nine categories, and the report noted that the proposed stadium cooling technology did not yet exist at the scale required. Qatar received the worst overall ranking of any 2022 candidate. On 2 December 2010 the executive committee awarded it the tournament regardless, beating the United States 14-8 in the final round. Five years later FIFA abandoned the summer schedule and moved the tournament to November and December, disrupting every domestic league calendar in Europe. Blatter's own assessment, given to Swiss television in 2014: 'Of course, it was a mistake. You know, one makes a lot of mistakes in life. The technical report indicated clearly that it was too hot in summer, but despite that the executive committee decided with quite a big majority that the tournament would be in Qatar.'",
    sources: [
      {
        title: "Fifa warns of Qatar 2022 heat risk",
        publisher: "Al Jazeera",
        url: "https://www.aljazeera.com/sports/2010/11/17/fifa-warns-of-qatar-2022-heat-risk",
        year: 2010,
      },
      {
        title: "What happened to the Qatar World Cup's cooling technology?",
        publisher: "BBC News",
        url: "https://www.bbc.com/news/magazine-31608062",
        year: 2015,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1526232761682-d26e03ac148e"),
    thumbnailUrl: IMG("photo-1526232761682-d26e03ac148e"),
    gallery: [],
    upvotes: 3560,
    comments: [
      {
        id: "c-2010-1",
        author: "TechnicalReport",
        text: "The president said out loud that it was a mistake. Nobody resigned over it, nothing was re-run.",
        timestamp: "2026-04-30T14:22:00Z",
      },
    ],
    hostNation: "Qatar",
    hostFlag: "qa",
  },
  {
    id: "SEC-2014-005",
    year: 2014,
    title: "FIFA Buried Its Own Corruption Report",
    summary:
      "Michael Garcia investigated the 2018 and 2022 bids. FIFA published a 42-page summary he disowned, then sat on the 430-page report for three years.",
    failure:
      "FIFA commissioned an independent investigation, suppressed it, mischaracterised it, and released it only after a newspaper leak.",
    tags: ["garcia-report", "suppression", "bidding", "ethics"],
    credibility: 4,
    evidence: "OFFICIAL",
    people: ["FIFA", "Michael Garcia", "Hans-Joachim Eckert", "Qatar", "Russia"],
    classification: "DOCUMENTED",
    description:
      "FIFA appointed US attorney Michael Garcia to investigate the bidding for the 2018 and 2022 World Cups. He delivered a 430-page report in September 2014. FIFA published only a 42-page summary written by ethics judge Hans-Joachim Eckert, which concluded the problems identified were 'not suited to compromise the integrity' of the process. Garcia publicly disputed that characterisation of his own findings and resigned in protest. The full report stayed sealed until June 2017 — and appeared then only because the German newspaper Bild had begun printing extracts from a leaked copy less than 24 hours earlier. What it contained: three executive committee members flown by private jet, funded by the Qatari Football Association, to a party in Rio before the ballot; the equivalent of €1.8 million deposited into the bank account of an executive committee member's daughter in the months after the bid; and Garcia's finding that 'a number of executive committee members sought to obtain personal favors or benefits'. It found no evidence that Russia's bid team unduly influenced voters, while recording that Russia's leased bid computers had been destroyed and staff email accounts were never recovered. Separately, FIFA's ethics committee questioned whether the technical evaluation itself was compromised, after its chief inspector was found to have asked a Qatari academy for personal favours for family members.",
    sources: [
      {
        title: "FIFA publishes Michael Garcia report on 2018-2022 World Cup bidding",
        publisher: "Associated Press",
        url: "https://www.denverpost.com/2017/06/27/fifa-michael-garcia-report-world-cup-bidding/",
        year: 2017,
      },
      {
        title: "Garcia Report",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Garcia_Report",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1459865264687-595d652de67e"),
    thumbnailUrl: IMG("photo-1459865264687-595d652de67e"),
    gallery: [],
    upvotes: 3120,
    comments: [
      {
        id: "c-2014-1",
        author: "GarciaLeaks",
        text: "The investigator resigned over how his own report was summarised. Three years later a tabloid had to leak it.",
        timestamp: "2026-04-07T12:40:00Z",
      },
    ],
    hostNation: "Switzerland",
    hostFlag: "ch",
  },
  {
    id: "SEC-2015-006",
    year: 2015,
    title: "Two Million Francs, No Contract",
    summary:
      "FIFA paid its president's likely successor 2m Swiss francs for work done a decade earlier. Nobody could produce a written agreement.",
    failure:
      "The two most powerful men in football moved 2m francs of FIFA money with no documentation, months before a presidential election.",
    tags: ["blatter", "platini", "payment", "ethics-ban"],
    credibility: 4,
    evidence: "OFFICIAL",
    people: ["FIFA", "Sepp Blatter", "Michel Platini", "UEFA"],
    classification: "DOCUMENTED",
    description:
      "In January 2011, Michel Platini — then UEFA president — wrote to FIFA requesting backdated additional salary for advisory work performed between 1998 and 2002. Sepp Blatter authorised a payment of 2 million Swiss francs within weeks, as he prepared to campaign for re-election against Mohamed bin Hammam in a contest where Platini's influence over European voters mattered. No written agreement covering the sum was ever produced. Both men said an oral contract existed. FIFA's ethics committee rejected that explanation as unconvincing and in December 2015 banned both for eight years, later reduced on appeal — Blatter fined 50,000 francs, Platini 80,000. The ban ended Platini's campaign to succeed Blatter as FIFA president. Swiss prosecutors opened a criminal case, charging both men in November 2021 with fraud, mismanagement, misappropriation and forgery. Both were acquitted at trial in Bellinzona in July 2022, and cleared again on appeal in March 2025. The criminal case failed; the ethics finding — that FIFA's own president authorised a payment with no legal basis — was upheld by the Court of Arbitration for Sport and the Swiss Federal Tribunal.",
    sources: [
      {
        title: "Sepp Blatter, Michel Platini vow to appeal 8-year bans from FIFA",
        publisher: "CBC Sports",
        url: "https://www.cbc.ca/sports/soccer/blatter-platini-fifa-ban-1.3374214",
        year: 2015,
      },
      {
        title: "Former football chiefs Sepp Blatter, Michel Platini cleared of corruption",
        publisher: "The Athletic",
        url: "https://www.nytimes.com/athletic/6228938/2025/03/25/blatter-platini-trial-corruption-fifa/",
        year: 2025,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1543326727-cf6c39e8f84c"),
    thumbnailUrl: IMG("photo-1543326727-cf6c39e8f84c"),
    gallery: [],
    upvotes: 2670,
    comments: [
      {
        id: "c-2015b-1",
        author: "BellinzonaWatch",
        text: "Acquitted criminally, banned ethically. Both things are true and people pick whichever suits them.",
        timestamp: "2026-03-26T08:15:00Z",
      },
    ],
    hostNation: "Switzerland",
    hostFlag: "ch",
  },
  {
    id: "SEC-2021-007",
    year: 2021,
    title: "Nobody Agrees How Many Workers Died",
    summary:
      "Qatar counted 37 at stadium sites. The Guardian counted 6,500 across the country. The tournament chief said 400 to 500.",
    failure:
      "FIFA awarded a tournament to a state with a documented forced-labour system and put no worker-safety conditions in the hosting agreement.",
    tags: ["labour", "qatar", "human-rights", "kafala"],
    credibility: 3,
    evidence: "PRESS",
    people: ["FIFA", "Qatar", "Hassan Al-Thawadi", "The Guardian", "ILO"],
    classification: "DISPUTED",
    description:
      "In February 2021 The Guardian published an investigation using death records from the embassies and governments of India, Bangladesh, Nepal, Sri Lanka and Pakistan, counting at least 6,500 migrant worker deaths in Qatar between 2011 and 2020. The paper was explicit that not all could be attributed to World Cup construction. Qatar did not dispute the raw figure but called the framing misleading, noting it covers all foreign worker deaths from all causes over a decade and that only around 20% of migrant workers are in construction. Officially, Qatar recorded 37 deaths among labourers at World Cup stadium sites between 2014 and 2020, three classified as work-related. The International Labour Organization considers that an undercount: Qatar does not classify deaths from cardiac arrest or respiratory failure as work-related, though both are common presentations of heatstroke. The ILO recorded 50 foreign worker deaths and over 500 serious injuries in 2021 alone. In November 2022, tournament chief executive Hassan Al-Thawadi told TalkTV the figure for World Cup-connected projects was 'around 400, between 400 and 500' — far above any number Qatari officials had previously given. FIFA's own position is the institutional failure: it awarded the tournament in 2010, when the kafala sponsorship system was already documented by human rights organisations, and attached no binding labour conditions to the hosting agreement.",
    sources: [
      {
        title: "Revealed: 6,500 migrant workers have died in Qatar since World Cup awarded",
        publisher: "The Guardian",
        url: "https://www.theguardian.com/global-development/2022/nov/19/qatar-working-conditions-world-cup-guardian-reporting",
        year: 2021,
      },
      {
        title: "Qatar World Cup chief says between 400 and 500 migrant workers died",
        publisher: "CNN",
        url: "https://www.cnn.com/2022/11/29/football/qatar-world-cup-migrant-worker-deaths-spt-intl/index.html",
        year: 2022,
      },
      {
        title: "World Cup 2022: How has Qatar treated foreign workers?",
        publisher: "BBC News",
        url: "https://www.bbc.com/news/world-60867042",
        year: 2022,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1526232761682-d26e03ac148e"),
    thumbnailUrl: IMG("photo-1526232761682-d26e03ac148e"),
    gallery: [],
    upvotes: 3410,
    comments: [
      {
        id: "c5",
        author: "LabourWatch",
        text: "The gap between 37 and 6,500 is the whole story. Both numbers are real; they count different things, and nobody will reconcile them.",
        timestamp: "2026-06-11T15:05:00Z",
      },
    ],
    hostNation: "Qatar",
    hostFlag: "qa",
  },
  {
    id: "SEC-1921-008",
    year: 1921,
    title: "Football Banned Women for Fifty Years",
    summary:
      "53,000 watched a women's match at Goodison Park. Within a year the FA barred women from every affiliated ground.",
    failure:
      "The governing structure of football destroyed the women's game at its commercial peak and did not reverse the decision for half a century.",
    tags: ["womens-football", "ban", "the-fa", "institutional"],
    credibility: 5,
    evidence: "COURT",
    people: ["The Football Association", "Dick, Kerr Ladies", "Lily Parr"],
    classification: "DOCUMENTED",
    description:
      "On Boxing Day 1920, more than 53,000 people packed Goodison Park to watch Dick, Kerr Ladies play St Helens in a charity match, with thousands more locked outside. It was a record for a women's match that stood for over ninety years. Women's football had grown enormously during the First World War through factory teams, and by 1921 around 150 clubs existed, some drawing crowds of 45,000. On 5 December 1921 the Football Association barred women's matches from all affiliated grounds and instructed its referees not to officiate, declaring the game 'quite unsuitable for females and ought not to be encouraged'. It did not claim the power to stop women playing — it simply removed the stadiums, the officials and the legitimacy in a single decision. The stated concern was the handling of charitable receipts; the practical effect was to end mass-audience women's football. The ban ran until 1971. Thirty teams met in Liverpool days after the ruling to form the English Ladies' Football Association, and the game survived in parks and on borrowed pitches, but the audience never returned at that scale. The FA issued a form of apology in 2008, eighty-seven years later. FIFA did not stage a Women's World Cup until 1991 — sixty-one years after the men's tournament began.",
    sources: [
      {
        title: "Women's football: FA apologises for 1921 ban",
        publisher: "The Guardian",
        url: "https://www.theguardian.com/football/2008/feb/11/newsstory.womensfootball",
        year: 2008,
      },
      {
        title: "Kicking Down Barriers — the story of women's football in England",
        publisher: "The Football Association",
        url: "https://www.thefa.com/womens-girls-football/heritage/kicking-down-barriers",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1431324155629-1a6deb1dec8d"),
    thumbnailUrl: IMG("photo-1431324155629-1a6deb1dec8d"),
    gallery: [],
    upvotes: 2980,
    comments: [
      {
        id: "c-1921-1",
        author: "GoodisonArchive",
        text: "53,000 in 1920. The record stood for ninety years because the game was deliberately dismantled.",
        timestamp: "2026-02-08T09:30:00Z",
      },
    ],
    hostNation: "England",
    hostFlag: "gb-eng",
  },
];

/**
 * Full archive: institutional records plus the tournament-level cases, ordered
 * by year so the grid and timeline read chronologically.
 */
export const allDossiers: SecretDossier[] = [...secretDossiers, ...additionalDossiers]
  .map((d) => {
    // Anthems come only from the verified media registry. Any year without a
    // confirmed, embeddable official song gets null and the UI hides playback.
    const verified = getAnthem(d.year);
    return { ...d, anthem: verified };
  })
  .sort((a, b) => a.year - b.year);

export const worldCupAnthems: Record<number, Anthem> = {};
allDossiers.forEach((d) => {
  if (d.anthem) worldCupAnthems[d.year] = d.anthem;
});

export const worldCupYears = [
  1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974,
  1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014,
  2018, 2022, 2026,
];
