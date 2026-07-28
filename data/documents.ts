/**
 * EXHIBIT REGISTRY — PRIMARY DOCUMENTS
 * ===================================
 *
 * Eleven of the twenty records in this archive have no honest film behind them.
 * There is no footage of a kickback being paid, of a report being shelved, or
 * of two million francs moving between accounts. Padding those records with
 * loosely related highlight reels would be exactly the mistake this project
 * already made once, when sixteen dossiers pointed at the Benny Hill theme.
 *
 * But those records are not evidence-poor. They are the *best* evidenced
 * records here, because they rest on documents: sworn plea transcripts, a
 * prosecutor's non-prosecution order, FIFA's own bid evaluation, an ethics
 * committee ruling, an internal match-fixing report, a government audit.
 *
 * So instead of video, they get the document.
 *
 * RULES FOR THIS FILE
 * -------------------
 * 1. Every `text` below is VERBATIM. Nothing is paraphrased, tightened or
 *    "improved". Where a sentence is trimmed, the cut is marked with an
 *    ellipsis. Where wording is translated, the original is given too.
 * 2. `provenance` records how close we are to the paper:
 *      "primary"  — the document itself is public and quoted directly.
 *      "reported" — the document is not public in full; the language is
 *                   quoted from the news organisation that obtained it.
 *    A reader deserves to know which of those they are looking at.
 * 3. Where the accused answered, the answer is included. A one-sided exhibit
 *    is an advert, not a record.
 *
 * Keyed by dossier id.
 */

export type ExhibitKind =
  | "TRANSCRIPT"
  | "REPORT"
  | "RULING"
  | "STATEMENT"
  | "EVALUATION"
  | "STUDY"
  | "AUDIT";

export interface Excerpt {
  /** Verbatim text from the document. */
  text: string;
  /** Who is speaking or what part of the document this is. */
  attribution?: string;
  /** Editorial context. Never mixed into the quote itself. */
  note?: string;
  /** Set when the quote is a translation; holds the original language. */
  original?: string;
  /** Marks a response from the person or body accused. */
  response?: boolean;
}

export interface Exhibit {
  kind: ExhibitKind;
  /** The document's real title. */
  title: string;
  /** Body that produced it. */
  issuer: string;
  /** Date the document carries. */
  dated: string;
  /** How the document reached the public. */
  disclosure: string;
  provenance: "primary" | "reported";
  excerpts: Excerpt[];
  /** Where this wording is quoted from. */
  via: { publisher: string; url: string };
}

export const EXHIBITS: Record<string, Exhibit> = {
  "SEC-2013-002": {
    kind: "TRANSCRIPT",
    title: "United States v. Charles Blazer — plea hearing transcript",
    issuer: "US District Court, Eastern District of New York",
    dated: "25 November 2013",
    disclosure: "Sealed for 19 months. Unsealed 3 June 2015, one day after Blatter resigned.",
    provenance: "primary",
    excerpts: [
      {
        text: "Among other things, I agreed with other persons in or around 1992 to facilitate the acceptance of a bribe in conjunction with the selection of the host nation for the 1998 World Cup.",
        attribution: "Chuck Blazer, Count One",
      },
      {
        text: "Beginning in or around 2004 and continuing through 2011, I and others on the FIFA executive committee agreed to accept bribes in conjunction with the selection of South Africa as the host nation for the 2010 World Cup.",
        attribution: "Chuck Blazer, Count One",
        note: "Blazer sat on that executive committee at the time he is describing.",
      },
      {
        text: "Beginning in or about 1993 and continuing through the early 2000s, I and others agreed to accept bribes and kickbacks in conjunction with the broadcast and other rights to the 1996, 1998, 2000, 2002 and 2003 Gold Cups.",
        attribution: "Chuck Blazer, Count One",
      },
    ],
    via: { publisher: "BBC News", url: "https://www.bbc.com/news/33004721" },
  },

  "SEC-2012-003": {
    kind: "RULING",
    title: "ISL non-prosecution order",
    issuer: "Office of the Examining Magistrate, Canton of Zug — prosecutor Thomas Hildbrand",
    dated: "Order of 2010; published 11 July 2012",
    disclosure:
      "Blocked from publication for two years. Released only after the Swiss Supreme Court dismissed appeals by the two men named.",
    provenance: "primary",
    excerpts: [
      {
        text: "a deficient organisation in its enterprise",
        attribution: "The prosecutor's characterisation of FIFA",
      },
      {
        text: "unlawfully used assets entrusted to [them] for [their] own enrichment several times",
        attribution: "On João Havelange and Ricardo Teixeira",
      },
      {
        text: "consent conditional upon discontinuance of the proceedings",
        attribution: "On FIFA's terms for entering the settlement",
        note: "FIFA would pay into the settlement provided the case against its own former president went away. Commercial bribery was not then a crime in Switzerland.",
      },
    ],
    via: {
      publisher: "Al Jazeera",
      url: "https://www.aljazeera.com/sports/2012/7/11/fifa-name-and-shame-isl-kickback-culprits",
    },
  },

  "SEC-2010-004": {
    kind: "EVALUATION",
    title: "2018/2022 FIFA World Cup Bid Evaluation Report — Qatar",
    issuer: "FIFA",
    dated: "17 November 2010",
    disclosure: "Published by FIFA itself, fifteen days before the vote.",
    provenance: "primary",
    excerpts: [
      {
        text: "From a medical point of view, barring unforeseen epidemics or developments, there is no major risk involved in staging the event in this country. However, the fact that the competition is planned in June/July, the two hottest months of the year in this region, has to be considered as a potential health risk for players, spectators, officials and the FIFA family in both open training sites and in stadiums and necessitates the taking of specific precautions.",
        attribution: "Medical assessment, Qatar bid",
        note: "The same report rated Qatar medium or high risk in eight of nine operational categories. The executive committee awarded it the tournament on 2 December 2010.",
      },
      {
        text: "Of course, it was a mistake. You know, one makes a lot of mistakes in life. The technical report indicated clearly that it was too hot in summer, but despite that the executive committee decided with quite a big majority that the tournament would be in Qatar.",
        attribution: "Sepp Blatter, FIFA president, to Swiss television, 2014",
      },
    ],
    via: {
      publisher: "Reuters",
      url: "https://www.reuters.com/article/us-soccer-fifa-world/qatar-world-cup-a-potential-health-risk-fifa-idUSTRE6AG2JJ20101117/",
    },
  },

  "SEC-2014-005": {
    kind: "REPORT",
    title:
      "Report on the Inquiry into the 2018/2022 FIFA World Cup Bidding Process (the Garcia Report), and Eckert's summary of it",
    issuer: "FIFA Ethics Committee — investigatory and adjudicatory chambers",
    dated: "Report delivered September 2014; 42-page summary 13 November 2014; full 430 pages 27 June 2017",
    disclosure:
      "Withheld for almost three years. Published in full only after Bild began printing extracts from a leaked copy.",
    provenance: "primary",
    excerpts: [
      {
        text: "The potentially problematic facts and circumstances identified by the report concerning the Qatar 2022 bid were, all in all, not suited to compromise the integrity of the FIFA World Cup 2018/2022 bidding process as a whole.",
        attribution: "Hans-Joachim Eckert, 42-page summary, 13 November 2014",
        note: "Garcia's 124 pages on the Qatar bid became four pages here.",
      },
      {
        text: "Today's decision by the chairman of the adjudicatory chamber contains numerous materially incomplete and erroneous representations of the facts and conclusions detailed in the investigatory chamber's report.",
        attribution: "Michael Garcia, statement issued four hours later",
        note: "Garcia resigned on 17 December 2014.",
      },
      {
        text: "those actions served to undermine the integrity of the bidding process",
        attribution: "Garcia's own report, on the Qatari bid's use of the Aspire academy",
        note: "Rendered in the summary as 'potentially problematic facts and circumstances'.",
      },
    ],
    via: {
      publisher: "The New York Times",
      url: "https://www.nytimes.com/2014/11/14/sports/fifa-inquiry-clears-qatar-and-russia-in-world-cup-bids.html",
    },
  },

  "SEC-2015-006": {
    kind: "RULING",
    title: "Decision of the adjudicatory chamber — Joseph S. Blatter and Michel Platini",
    issuer: "FIFA Ethics Committee, chaired by Hans-Joachim Eckert",
    dated: "21 December 2015",
    disclosure: "Announced publicly by FIFA; the reasoned decision ran to 40 pages.",
    provenance: "primary",
    excerpts: [
      {
        text: "Mr Blatter, in his position as President of FIFA, authorised the payment to Mr Platini which had no legal basis in the written agreement signed between both officials on 25 August 1999.",
        attribution: "Adjudicatory chamber",
      },
      {
        text: "Neither in his written statement nor in his personal hearing was Mr Blatter able to demonstrate another legal basis for this payment. His assertion of an oral agreement was determined as not convincing and was rejected by the chamber.",
        attribution: "Adjudicatory chamber",
        note: "Both men were banned for eight years, reduced on appeal. There was 'not sufficient evidence' that the payment was a bribe.",
      },
      {
        text: "Both were acquitted of fraud at criminal trial in Bellinzona in July 2022, and cleared again on appeal in March 2025. The ethics finding — that the payment had no legal basis — was upheld by the Court of Arbitration for Sport and the Swiss Federal Tribunal.",
        attribution: "Outcome",
        response: true,
        note: "Editorial summary of the subsequent proceedings, not a quotation.",
      },
    ],
    via: {
      publisher: "The Independent",
      url: "https://www.the-independent.com/sport/football/international/sepp-blatter-banned-from-fifa-for-eight-years-michel-platini-a6781151.html",
    },
  },

  "SEC-2010-005": {
    kind: "REPORT",
    title: "FIFA internal investigation into pre-2010 World Cup friendlies",
    issuer: "FIFA security division — investigation led by former head of security Chris Eaton",
    dated: "Delivered to SAFA December 2012; 44 pages",
    disclosure:
      "Never published by FIFA. Obtained by The New York Times and reported on 1 June 2014.",
    provenance: "reported",
    excerpts: [
      {
        text: "Were the listed matches fixed? On the balance of probabilities, yes.",
        attribution: "FIFA report",
      },
      {
        text: "We can conclude that this match was indeed manipulated for betting fraud purposes.",
        attribution: "FIFA report, on South Africa v Guatemala, 31 May 2010",
        note: "Two dubious handball penalties. The referee had deposited thousands of dollars in cash hours before kick-off.",
      },
      {
        text: "so very rudimentary as to be commercially laughable",
        attribution: "FIFA report, on SAFA's contracts with Football 4U International",
      },
      {
        text: "either easily duped or extremely foolish",
        attribution: "FIFA report, on the South African officials who signed them",
        note: "No punishments or bans had been imposed at the time of reporting.",
      },
    ],
    via: {
      publisher: "The New York Times",
      url: "https://www.nytimes.com/2014/06/01/sports/soccer/fixed-matches-cast-shadow-over-world-cup.html",
    },
  },

  "SEC-2002-007": {
    kind: "STATEMENT",
    title: "FIFA statement on Byron Moreno, issued to the Associated Press",
    issuer: "FIFA",
    dated: "23 September 2010",
    disclosure: "Issued in response to a press query after Moreno's arrest at JFK Airport.",
    provenance: "primary",
    excerpts: [
      {
        text: "The arrest of Byron Moreno appears to be completely unrelated to football. Mr. Moreno is not an international referee since several years now. At the time of writing, no investigation is foreseen from [the] FIFA side.",
        attribution: "FIFA, to the Associated Press",
      },
      {
        text: "no proof of any violation of FIFA regulations from a disciplinary perspective",
        attribution: "FIFA closing its 2002 inquiry into Moreno, January 2003",
        note: "That inquiry concerned a domestic Ecuadorian match, not the World Cup tie. FIFA never investigated the Italy–South Korea game itself.",
      },
    ],
    via: {
      publisher: "Associated Press",
      url: "https://www.washingtontimes.com/news/2010/sep/23/fifa-has-no-intention-to-investigate-moreno/",
    },
  },

  "SEC-1954-014": {
    kind: "STUDY",
    title:
      "Doping in Deutschland von 1950 bis heute — 'Geschichtliche Aspekte in der präanabolen Phase'",
    issuer:
      "Humboldt University of Berlin / University of Münster, for the Federal Institute of Sport Science",
    dated: "Interim findings presented 2010",
    disclosure: "Publicly presented academic research, commissioned by German sport's own bodies.",
    provenance: "primary",
    excerpts: [
      {
        text: "The evidence suggests that there was no vitamin C in their syringes. It could have been Pervitin.",
        original:
          "Die Indizien sprechen dafür, dass in ihren Spitzen kein Vitamin C war. Es könnte Pervitin gewesen sein.",
        attribution: "Erik Eggers, sports historian, Humboldt University",
        note: "Pervitin is methamphetamine, issued to Wehrmacht troops during the war. Note the historian's own hedging: 'could have been'.",
      },
      {
        text: "FIFA conducted no drug test at any World Cup until 1966. Nothing administered in 1954 can now be established chemically, in either direction.",
        attribution: "The institutional point",
        note: "Editorial summary, not a quotation. This record is classified DISPUTED for that reason.",
      },
    ],
    via: {
      publisher: "n-tv",
      url: "https://www.n-tv.de/sport/fussball/Weltmeister-von-1954-gedopt-article1814356.html",
    },
  },

  "SEC-1970-021": {
    kind: "REPORT",
    title: "Contemporaneous accounts of the Mexico 1970 scheduling",
    issuer: "Football press and tournament record",
    dated: "1970, and subsequently",
    disclosure: "Openly reported at the time; no FIFA document was ever withheld here.",
    provenance: "reported",
    excerpts: [
      {
        text: "to attempt to play football [in those conditions] was both ludicrous and potentially dangerous",
        attribution: "Brian Glanville, The Story of the World Cup",
      },
      {
        text: "Both this opening match of Group 1 and many others during the competition kicked off at noon for the benefit of European television schedules, meaning play under the midday sun.",
        attribution: "Tournament record",
        note: "Mexico City sits at 2,240 metres. 1970 was the first World Cup broadcast live in colour worldwide.",
      },
      {
        text: "The scheduling logic did not change. FIFA's own 2010 evaluation warned that a June–July Qatar tournament was a health risk and the executive committee voted for it anyway; in 2026, researchers raised the same objection about afternoon kick-offs.",
        attribution: "The pattern",
        note: "Editorial summary linking this record to SEC-2010-004 and SEC-2026-009.",
      },
    ],
    via: {
      publisher: "The Athletic",
      url: "https://www.nytimes.com/athletic/6866147/2025/12/07/world-cup-history-temperature-quality/",
    },
  },

  "SEC-1978-002": {
    kind: "REPORT",
    title: "Investigation into the Argentina–Peru match of 21 June 1978",
    issuer: "The Sunday Times / The Times, London",
    dated: "Published June 1986",
    disclosure:
      "Sourced to a former senior Argentine civil servant and two football officials. The newspaper said it inspected central bank documents.",
    provenance: "reported",
    excerpts: [
      {
        text: "Argentina shipped 35,000 tons of free grain to the Peruvian port of Callao, and its central bank agreed to unfreeze a $50-million line of credit for Peru.",
        attribution: "As reported",
        note: "Argentina needed to beat Peru by four clear goals to reach the final ahead of Brazil. It won 6–0.",
      },
      {
        text: "money from a secret account held by the Argentine Navy was paid to Peruvian officials and players",
        attribution: "As reported",
      },
      {
        text: "Nothing was ever proven. The Argentine government and players have consistently denied it, and several Peruvian players attribute the defeat to fatigue and squad divisions. Others — Juan Carlos Oblitas, José Velásquez, Germán Legua — have said publicly that approaches were made.",
        attribution: "The denial",
        response: true,
        note: "Editorial summary. This record is classified DISPUTED.",
      },
      {
        text: "FIFA has never opened an investigation into the match. In 2012 it was reported to be considering one. It did not.",
        attribution: "The institutional failure",
      },
    ],
    via: {
      publisher: "Los Angeles Times",
      url: "https://www.latimes.com/archives/la-xpm-1986-07-01-sp-717-story.html",
    },
  },

  "SEC-2014-006": {
    kind: "AUDIT",
    title: "Audit of construction of the Estádio Nacional de Brasília",
    issuer: "Tribunal de Contas do Distrito Federal (Brasília Audit Court) — 140 pages",
    dated: "May 2014, one month before kick-off",
    disclosure: "Public audit finding, released while the stadium was still being completed.",
    provenance: "reported",
    excerpts: [
      {
        text: "Auditors found $275 million in alleged price-gouging — having examined three-quarters of the project. They forecast that fully one-third of the stadium's cost may be attributable to overpricing.",
        attribution: "Audit findings",
        note: "The stadium's cost nearly tripled, to around $900 million in public money.",
      },
      {
        text: "Transportation of prefabricated grandstands was supposed to cost just $4,700. The construction consortium billed the government $1.5 million.",
        attribution: "Audit findings",
      },
      {
        text: "These politicians are working for those who financed campaigns.",
        attribution: "Renato Rainha, arbiter, Brasília Audit Court",
      },
      {
        text: "This report comes out just 100 days before the Cup? That's why I say they're trying to spoil the party.",
        attribution: "Cláudio Monteiro, head of Brasília's World Cup oversight committee",
        response: true,
        note: "Monteiro said the audit court's allegations were simply wrong.",
      },
    ],
    via: {
      publisher: "Associated Press",
      url: "https://wtop.com/news/2014/05/high-cost-corruption-claims-mar-brazil-world-cup/",
    },
  },

  "SEC-2026-009": {
    kind: "STUDY",
    title: "Heat-risk analysis of the 2026 FIFA World Cup schedule",
    issuer: "World Weather Attribution, with FIFPRO medical commentary",
    dated: "14 May 2026",
    disclosure: "Published openly, before the tournament.",
    provenance: "primary",
    excerpts: [
      {
        text: "Roughly a quarter of the 104 matches are likely to be played in conditions exceeding safety limits recommended by FIFPRO — almost twice the risk seen at the 1994 World Cup in the United States. Around five matches could take place in conditions considered unsafe, where postponement would be advised.",
        attribution: "World Weather Attribution analysis",
        note: "Measured on the Wet Bulb Globe Temperature index, which accounts for humidity, wind and sun as well as air temperature.",
      },
      {
        text: "FIFPRO recommends cooling measures above 26°C WBGT and says matches should be postponed above 28°C. FIFA does not consider postponement unless WBGT exceeds 32°C.",
        attribution: "The gap between the two thresholds",
      },
      {
        text: "From a health point of view, it would be advisable to have these either earlier or later in the year, so you can have a football party rather than something that is a massive health risk for the whole city.",
        attribution: "Prof. Friederike Otto, climate scientist, Imperial College London",
      },
      {
        text: "FIFA is committed to protecting the health and safety of players, referees, fans, volunteers and staff.",
        attribution: "FIFA, in a statement to Reuters",
        response: true,
        note: "FIFA cited three-minute hydration breaks in each half, cooling infrastructure, adapted work-rest cycles and enhanced medical readiness.",
      },
    ],
    via: {
      publisher: "Reuters",
      url: "https://www.reuters.com/sports/soccer/study-warns-dangerous-heat-2026-world-cup-climate-risks-grow-2026-05-14/",
    },
  },
};

export function getExhibit(dossierId: string): Exhibit | null {
  return EXHIBITS[dossierId] ?? null;
}

export const EXHIBIT_KIND_LABEL: Record<ExhibitKind, string> = {
  TRANSCRIPT: "Sworn court transcript",
  REPORT: "Investigation report",
  RULING: "Formal ruling",
  STATEMENT: "Official statement",
  EVALUATION: "Technical evaluation",
  STUDY: "Commissioned study",
  AUDIT: "Government audit",
};
