import type { SourceDossier } from "./secrets";

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80`;

/**
 * Tournament-level records. Split into its own module purely to keep
 * `secrets.ts` reviewable; both arrays are merged in `data/secrets.ts`.
 *
 * These are the cases that played out on the pitch — but each is framed by
 * what the governing body did about it, or failed to. Every record cites
 * reporting, court records, official documents or academic work.
 */
export const additionalDossiers: SourceDossier[] = [
  {
    id: "SEC-1954-014",
    year: 1954,
    title: "There Were No Drug Tests Until 1966",
    summary:
      "West Germany's players were injected with what officials called vitamin C. A Humboldt University study concluded it was methamphetamine.",
    failure:
      "FIFA ran World Cups for 36 years with no anti-doping regime at all, so nothing from this era can ever be tested or proven.",
    tags: ["doping", "germany", "pervitin", "no-testing"],
    credibility: 2,
    evidence: "ALLEGED",
    people: ["Ernst Wilhelm Gebhardt", "DFB", "Humboldt University", "Erik Eggers"],
    classification: "DISPUTED",
    description:
      "West Germany's 3-2 win over Hungary is the founding myth of postwar German football. Team doctor Ernst Wilhelm Gebhardt injected several players before the final; officials said it was vitamin C to aid recovery. A 2010 study by sports historian Erik Eggers, part of the Humboldt University 'Doping in Germany' project commissioned by the German Olympic Sports Confederation, concluded the injections likely contained Pervitin — the methamphetamine issued to Wehrmacht soldiers during the war. Eggers's central point is blunt: vitamin C is not injected. The supporting evidence is circumstantial but consistent. The injections were administered secretly. They became known only because several players subsequently contracted jaundice, a pattern matching a shared needle. Winger Richard Herrmann died of cirrhosis at 39, eight years later. An 800-page follow-up in 2013 described a systematic, state-tolerated West German doping programme running two decades. The institutional point: FIFA conducted no drug tests at a World Cup until 1966, so nothing from 1954 can be established chemically. The DFB has never formally responded.",
    sources: [
      {
        title: "Heroes of '54 may have been boosted by drugs",
        publisher: "The Irish Times",
        url: "https://www.irishtimes.com/sport/heroes-of-54-may-have-been-boosted-by-drugs-1.669293",
        year: 2010,
      },
      {
        title: "West Germany's culture of doping kept under wraps",
        publisher: "World Soccer",
        url: "https://www.worldsoccer.com/keir-radnedge/west-germanys-culture-of-doping-kept-under-wraps-341986",
        year: 2013,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1517927033932-b3d18e61fb3a"),
    thumbnailUrl: IMG("photo-1517927033932-b3d18e61fb3a"),
    gallery: [],
    upvotes: 1103,
    comments: [
      {
        id: "c-1954-1",
        author: "BernWatcher",
        text: "The Humboldt report was commissioned by Germany's own sports authorities. People treat this as fringe — it isn't.",
        timestamp: "2026-04-22T13:30:00Z",
      },
    ],
    hostNation: "Switzerland",
    hostFlag: "ch",
  },
  {
    id: "SEC-1962-023",
    year: 1962,
    title: "Police Entered the Pitch Four Times",
    summary:
      "The Battle of Santiago. FIFA's response was to let the referee invent yellow and red cards eight years later.",
    failure:
      "FIFA had no mechanism to control on-field violence; the disciplinary tool that fixed it came from a referee's own initiative.",
    tags: ["violence", "refereeing", "chile", "cards"],
    credibility: 5,
    evidence: "COURT",
    people: ["FIFA", "Ken Aston", "Leonel Sánchez", "BBC"],
    classification: "DOCUMENTED",
    description:
      "Chile against Italy on 2 June 1962 is the most violent match in World Cup history. English referee Ken Aston sent off two Italian players and police were required on the pitch four separate times. Italy's Humberto Maschio had his nose broken by a punch from Leonel Sánchez, who was not sent off; Sánchez had earlier landed a punch on Mario David in full view of the crowd. The buildup mattered: two Italian journalists had published articles disparaging Santiago and Chilean poverty, which Chilean newspapers amplified for days. When the BBC broadcast the highlights, David Coleman introduced them as 'the most stupid, appalling, disgusting and disgraceful exhibition of football, possibly in the history of the game'. The lasting consequence came from Aston personally, not from FIFA. Reflecting on how hard it was to communicate decisions across a language barrier, he devised the yellow and red card system — reportedly while stopped at a traffic light. It was introduced at the 1970 World Cup and is now universal in world sport.",
    sources: [
      {
        title: "Battle of Santiago (1962 FIFA World Cup)",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Battle_of_Santiago_(1962_FIFA_World_Cup)",
      },
      {
        title: "Remembering the brutality and chaos of the 1962 Battle of Santiago",
        publisher: "Daily Mirror",
        url: "https://www.mirror.co.uk/sport/football/world-cup-battle-santiago-the-3207021",
        year: 2014,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1518091043644-c1d4457512c6"),
    thumbnailUrl: IMG("photo-1518091043644-c1d4457512c6"),
    gallery: [],
    upvotes: 1533,
    comments: [
      {
        id: "c-1962-1",
        author: "AstonFan",
        text: "Red and yellow cards exist because of this match. A referee fixed what the governing body hadn't.",
        timestamp: "2026-01-19T18:25:00Z",
      },
    ],
    hostNation: "Chile",
    hostFlag: "cl",
  },
  {
    id: "SEC-1970-021",
    year: 1970,
    title: "Noon Kick-Offs at 2,240 Metres",
    summary:
      "Matches were played in direct midday sun at altitude so European television could show them in the evening.",
    failure:
      "FIFA scheduled around broadcast markets rather than player safety — a pattern it has repeated at every subsequent tournament.",
    tags: ["player-safety", "broadcasting", "mexico", "altitude"],
    credibility: 4,
    evidence: "OFFICIAL",
    people: ["FIFA", "Franz Beckenbauer"],
    classification: "DOCUMENTED",
    description:
      "Mexico 1970 was the first World Cup broadcast live and in colour worldwide, and the scheduling reflected it. Several matches kicked off at noon local time, in direct sun, at altitudes reaching 2,240 metres in Mexico City — timings that aligned with European prime time. Players and medical staff objected publicly at the time. The semi-final between Italy and West Germany, later called the Game of the Century, went to extra time in these conditions and both sides were visibly incapacitated by the end; Franz Beckenbauer played on with a dislocated shoulder strapped to his body after West Germany had used all its substitutions. The precedent has held. FIFA's own 2010 technical report warned that a June-July tournament in Qatar posed a health risk, and it awarded it anyway. In 2026, sports medicine researchers raised the same objection about afternoon fixtures in Dallas, Houston, Kansas City and Monterrey. The scheduling logic has not changed in fifty-six years.",
    sources: [
      {
        title: "1970 FIFA World Cup",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/1970_FIFA_World_Cup",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1571019613454-1cb2f99b2d8b"),
    thumbnailUrl: IMG("photo-1571019613454-1cb2f99b2d8b"),
    gallery: [],
    upvotes: 812,
    comments: [],
    hostNation: "Mexico",
    hostFlag: "mx",
  },
  {
    id: "SEC-1978-002",
    year: 1978,
    title: "FIFA Gave the Tournament to a Junta",
    summary:
      "Argentina needed four goals against Peru. They got six. FIFA never investigated.",
    failure:
      "FIFA staged a World Cup for a military dictatorship and opened no inquiry into the most suspicious result in its history.",
    tags: ["match-fixing", "argentina", "peru", "dictatorship"],
    credibility: 2,
    evidence: "ALLEGED",
    people: ["FIFA", "Jorge Videla", "Henry Kissinger", "Héctor Chumpitaz", "The Sunday Times"],
    classification: "DISPUTED",
    description:
      "Argentina went into their final second-round match needing to beat Peru by four clear goals to reach the final ahead of Brazil. They won 6-0. In June 1986 The Sunday Times reported, citing a former senior Argentine civil servant and two football officials, that Argentina's junta had shipped 35,000 tons of free grain to the Peruvian port of Callao and that its central bank released a US$50 million line of frozen Peruvian credit. The paper said it had inspected supporting documents held by the Argentine central bank. Separately, General Jorge Videla — leader of the junta — entered the Peru dressing room before kick-off with former US Secretary of State Henry Kissinger. Kissinger's office later said he had 'no recollection' of it. Peru's captain Héctor Chumpitaz described Videla giving a speech on 'Latin American brotherhood'; midfielder Juan Carlos Oblitas called his presence 'terrible'. Midfielder José Velásquez told Channel 4: 'Were we pressured? Yes, we were pressured.' In 2012 former Peruvian senator Genaro Ledesma testified to a Buenos Aires judge that the result was traded as part of Operation Condor, with Videla accepting 13 Peruvian political prisoners. Nothing has been proven in court, and FIFA has never opened an inquiry — into the result, or into staging the tournament in a country whose government was disappearing its own citizens.",
    sources: [
      {
        title: "There Is No Scoffing at Argentina's Triumph",
        publisher: "Los Angeles Times",
        url: "https://www.latimes.com/archives/la-xpm-1986-07-01-sp-717-story.html",
        year: 1986,
      },
      {
        title: "Peru, Pelé and Grimsby: Henry Kissinger and his curious football legacy",
        publisher: "The Guardian",
        url: "https://www.theguardian.com/football/2023/nov/30/henry-kissinger-football-peru-pele-grimsby-catenaccio",
        year: 2023,
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1522778119026-d647f0596c20"),
    thumbnailUrl: IMG("photo-1522778119026-d647f0596c20"),
    gallery: [],
    upvotes: 1892,
    comments: [
      {
        id: "c2",
        author: "RosarioArchive",
        text: "The photograph of Videla inside the Peru dressing room exists. Whatever else is disputed, that part isn't.",
        timestamp: "2026-04-01T09:15:00Z",
      },
    ],
    hostNation: "Argentina",
    hostFlag: "ar",
  },
  {
    id: "SEC-1982-017",
    year: 1982,
    title: "FIFA Rejected the Protest, Then Changed the Rule",
    summary:
      "Two teams stopped playing for eighty minutes to engineer a result. FIFA found no wrongdoing and quietly rewrote the schedule format.",
    failure:
      "FIFA dismissed Algeria's protest as unprovable, then amended the regulations in a way that conceded the point.",
    tags: ["collusion", "algeria", "rule-change", "gijon"],
    credibility: 5,
    evidence: "COURT",
    people: ["FIFA", "Horst Hrubesch", "Algeria"],
    classification: "DOCUMENTED",
    description:
      "West Germany needed to beat Austria by one or two goals to advance; Austria could afford to lose by that margin. Algeria, who had beaten West Germany earlier in the group, had already played their final match and would be eliminated by exactly that result. Horst Hrubesch scored in the tenth minute. For the remaining eighty minutes both sides passed the ball sideways with no attempt to attack. Spectators waved white handkerchiefs; an Austrian commentator urged viewers to switch off and a German commentator refused to keep describing the match. Algeria filed a formal protest. FIFA rejected it on the grounds that no explicit agreement between the teams could be proven — the standard that makes collusion effectively unpunishable. It then amended the tournament regulations so that the final round of group matches kicks off simultaneously, a rule applied at every World Cup since. The rule change is generally read as the admission the ruling refused to make.",
    sources: [
      {
        title: "Disgrace of Gijón",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Disgrace_of_Gij%C3%B3n",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1551958219-acbc608c6377"),
    thumbnailUrl: IMG("photo-1551958219-acbc608c6377"),
    gallery: [],
    upvotes: 2011,
    comments: [
      {
        id: "c-1982-1",
        author: "DZ_Football",
        text: "Algeria beat West Germany that tournament and still went home. The rule change is the confession.",
        timestamp: "2026-06-02T10:15:00Z",
      },
    ],
    hostNation: "Spain",
    hostFlag: "es",
  },
  {
    id: "SEC-1986-018",
    year: 1986,
    title: "The Goal FIFA Let Stand",
    summary:
      "Maradona punched the ball into the net. The linesman saw it and was barred by protocol from saying so.",
    failure:
      "FIFA's officiating rules of the era prevented an assistant from overruling a referee, and it took 32 more years to adopt video review.",
    tags: ["maradona", "refereeing", "england", "var"],
    credibility: 5,
    evidence: "COURT",
    people: ["FIFA", "Diego Maradona", "Peter Shilton", "Ali Bin Nasser", "Bogdan Dochev"],
    classification: "DOCUMENTED",
    description:
      "In the 51st minute of the quarter-final against England in Mexico City, Diego Maradona rose with goalkeeper Peter Shilton and put the ball into the net with his left fist. Tunisian referee Ali Bin Nasser, unsighted, gave the goal after looking to Bulgarian linesman Bogdan Dochev, who did not intervene. Dochev said in later interviews that FIFA protocol of the era prohibited him from overruling the referee on that call. Maradona's own description — the goal was scored 'a little with the head of Maradona and a little with the hand of God' — became its name, and he admitted the handball explicitly in 2005. Four minutes later he ran roughly 60 metres past five England players to score what a 2002 FIFA poll named the Goal of the Century. The institutional point sits with the first goal. Video replay technology existed in 1986 and was already used in other sports. FIFA resisted video assistant referees for another three decades, introducing VAR at a World Cup only in 2018.",
    sources: [
      {
        title: "Argentina v England (1986 FIFA World Cup)",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Argentina_v_England_(1986_FIFA_World_Cup)",
      },
      {
        title: "Diego Maradona Hand of God",
        publisher: "FIFA",
        url: "https://www.fifa.com/en/articles/diego-maradona-argentina-england-hand-of-god-1986",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1571019613454-1cb2f99b2d8b"),
    thumbnailUrl: IMG("photo-1571019613454-1cb2f99b2d8b"),
    gallery: [],
    upvotes: 2847,
    comments: [
      {
        id: "c-1986-1",
        author: "ElDiego10",
        text: "Two goals four minutes apart, the worst and the best in the history of the tournament. Only him.",
        timestamp: "2026-02-11T07:50:00Z",
      },
    ],
    hostNation: "Mexico",
    hostFlag: "mx",
  },
  {
    id: "SEC-1994-020",
    year: 1994,
    title: "A Player Was Murdered and Football Moved On",
    summary:
      "Andrés Escobar was shot ten days after an own goal. His team had received death threats before the tournament.",
    failure:
      "Colombia's squad reported threats before and during the tournament. No protective mechanism existed, and none was created afterwards.",
    tags: ["colombia", "escobar", "cartel", "player-safety"],
    credibility: 5,
    evidence: "COURT",
    people: ["Andrés Escobar", "Francisco Maturana", "Gallón brothers", "Humberto Muñoz Castro"],
    classification: "DOCUMENTED",
    description:
      "Colombia arrived at USA 94 among the favourites. Before the tournament, coach Francisco Maturana received a faxed threat instructing him not to field midfielder Gabriel 'Barrabás' Gómez; Gómez did not play. Maturana later said he was told to drop the player or the whole squad would be killed. In the match against the United States on 22 June, defender Andrés Escobar deflected a cross into his own net. Colombia lost 2-1 and were eliminated. On 2 July, in a car park outside a Medellín bar where he had been taunted about the goal, Escobar was shot six times. Humberto Muñoz Castro, a driver working for the Gallón brothers — drug traffickers with substantial sums wagered on the match — confessed and was sentenced to 43 years. He served roughly eleven and was released for good behaviour. The Gallóns were cleared. Prosecutor Jesús Albeiro Yepes has said publicly that he never understood why the case against them was archived. More than 120,000 people attended the funeral. A national squad reported credible death threats to tournament organisers and played anyway; no player-protection protocol emerged from it.",
    sources: [
      {
        title: "Murder of soccer player after own-goal 20 years ago still resonates in Colombia",
        publisher: "Associated Press",
        url: "https://www.foxnews.com/world/murder-of-soccer-player-after-own-goal-20-years-ago-still-resonates-in-colombia",
        year: 2014,
      },
      {
        title: "Andrés Escobar",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Andr%C3%A9s_Escobar",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1526232761682-d26e03ac148e"),
    thumbnailUrl: IMG("photo-1526232761682-d26e03ac148e"),
    gallery: [],
    upvotes: 3102,
    comments: [
      {
        id: "c-1994-1",
        author: "MedellinArchive",
        text: "He wrote a newspaper column days before he was killed asking people not to let it end in bitterness. Then it did.",
        timestamp: "2026-03-28T14:00:00Z",
      },
    ],
    hostNation: "United States",
    hostFlag: "us",
  },
  {
    id: "SEC-1998-003",
    year: 1998,
    title: "Ronaldo Had a Seizure Hours Before the Final",
    summary:
      "He was left off the team sheet, then restored to it. There was no independent medical authority who could have stopped him playing.",
    failure:
      "FIFA had no independent match-day medical protocol; the decision to play a footballer hours after a convulsive seizure rested entirely with his own federation.",
    tags: ["medical", "brazil", "ronaldo", "protocol"],
    credibility: 4,
    evidence: "OFFICIAL",
    people: ["FIFA", "Ronaldo", "Mário Zagallo", "Roberto Carlos", "Nike", "CBF"],
    classification: "DOCUMENTED",
    description:
      "On the afternoon of the 1998 final, Ronaldo suffered a convulsive seizure at Brazil's hotel while resting in the room he shared with Roberto Carlos. Teammates ran in; accounts describe players holding his tongue clear. He remembered nothing and was told afterwards. He was taken for tests, which found nothing. In his own account, given to FIFA years later, he insisted on playing: 'Are they crazy? How can I not play in the final if I'm here and I'm well?' Coach Mário Zagallo initially left him out — a team sheet without his name reached the press — then restored him. Brazil lost 3-0 to France and Ronaldo was, by widespread contemporary account, mentally absent. A Brazilian congressional inquiry in 2000-01 examined the CBF's commercial arrangements including its Nike contract and found no evidence the sponsor forced the decision. What the episode exposes is structural: no independent tournament doctor had authority to overrule a national federation on a player's fitness. That gap persisted for years, and FIFA's concussion protocols remained a subject of criticism from players' unions well into the 2020s.",
    sources: [
      {
        title: "Ronaldo tells the true story of the France 1998 Final",
        publisher: "FIFA",
        url: "https://www.youtube.com/watch?v=lI-HyvRpEcc",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1489944440615-453fc2b6a9a9"),
    thumbnailUrl: IMG("photo-1489944440615-453fc2b6a9a9"),
    gallery: [],
    upvotes: 2140,
    comments: [
      {
        id: "c3",
        author: "SelecaoFiles",
        text: "He tells it himself on camera. That's not a conspiracy theory, that's testimony.",
        timestamp: "2026-05-02T11:10:00Z",
      },
    ],
    hostNation: "France",
    hostFlag: "fr",
  },
  {
    id: "SEC-2002-007",
    year: 2002,
    title: "FIFA Investigated the Referee and Did Nothing",
    summary:
      "Byron Moreno eliminated Italy amid uproar. FIFA imposed no penalty. Eight years later he was jailed for smuggling heroin.",
    failure:
      "FIFA reviewed the officiating, declined to act, and had no mechanism to audit a referee whose career then collapsed into criminality.",
    tags: ["refereeing", "south-korea", "italy", "accountability"],
    credibility: 3,
    evidence: "PRESS",
    people: ["FIFA", "Byron Moreno", "Francesco Totti", "Franco Carraro"],
    classification: "DOCUMENTED",
    description:
      "In the 2002 round of 16, Ecuadorian referee Byron Moreno sent off Francesco Totti for an alleged dive in the penalty area during extra time and disallowed a 111th-minute Damiano Tommasi goal that would have put Italy through. South Korea won 2-1 with a golden goal. Moreno later admitted the Tommasi goal should have stood. FIFA investigated and imposed no penalty. His subsequent career collapsed. In 2003 Ecuadorian authorities suspended him for 20 matches after he added around 12 unrecorded minutes of stoppage time to a domestic match, during which Liga de Quito overturned a deficit. He resigned soon after. On 20 September 2010 he was arrested at John F. Kennedy Airport in New York with ten plastic bags containing roughly six kilograms of heroin strapped to his body. He pleaded guilty, served two and a half years and was deported in December 2012. None of this proves the 2002 match was corrupt. Italian federation president Franco Carraro's assessment was that Moreno's performance was 'either due to incompetence or some other ulterior motive' — and FIFA's own review distinguished between neither.",
    sources: [
      {
        title: "Infamous soccer ref gets prison in heroin case",
        publisher: "CBS News",
        url: "https://www.cbsnews.com/news/infamous-soccer-ref-gets-prison-in-heroin-case/",
        year: 2011,
      },
      {
        title: "Byron Moreno",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Byron_Moreno",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1508098682722-e99c43a406b2"),
    thumbnailUrl: IMG("photo-1508098682722-e99c43a406b2"),
    gallery: [],
    upvotes: 2560,
    comments: [
      {
        id: "c4",
        author: "AzzurriArchive",
        text: "FIFA looked at it and shrugged. Eight years later US customs found six kilos on him.",
        timestamp: "2026-02-14T08:40:00Z",
      },
    ],
    hostNation: "South Korea",
    hostFlag: "kr",
  },
  {
    id: "SEC-2010-005",
    year: 2010,
    title: "A Convicted Fixer Supplied the Referees",
    summary:
      "A match-fixing syndicate appointed officials for pre-tournament friendlies in the host country. Nothing in FIFA's system stopped it.",
    failure:
      "A known criminal organisation was able to supply referees to a World Cup host association weeks before the tournament without triggering any safeguard.",
    tags: ["match-fixing", "south-africa", "perumal", "safeguards"],
    credibility: 4,
    evidence: "OFFICIAL",
    people: ["FIFA", "Wilson Raj Perumal", "Football4U", "SAFA"],
    classification: "DOCUMENTED",
    description:
      "In the weeks before the 2010 World Cup, South Africa's federation allowed a company called Football4U — controlled by the Singaporean match-fixing operative Wilson Raj Perumal — to appoint match officials for a series of pre-tournament exhibition matches, including games involving the host nation. FIFA's own investigation, reported in 2012, concluded several of these friendlies were manipulated. Perumal was later convicted in Finland for fixing matches there and became a cooperating witness, describing a syndicate that had penetrated national federations across several continents. None of the manipulated fixtures were World Cup matches. The significance is what it revealed about the safeguards: a known criminal enterprise supplied referees to the host association of a World Cup, in the immediate run-up to the tournament, and no vetting process caught it. Separately, Chuck Blazer admitted in his 2013 guilty plea that he and other FIFA executive committee members accepted bribes in connection with South Africa's selection as host.",
    sources: [
      {
        title: "Wilson Raj Perumal",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Wilson_Raj_Perumal",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1551958219-acbc608c6377"),
    thumbnailUrl: IMG("photo-1551958219-acbc608c6377"),
    gallery: [],
    upvotes: 1460,
    comments: [],
    hostNation: "South Africa",
    hostFlag: "za",
  },
  {
    id: "SEC-2014-006",
    year: 2014,
    title: "The Stadiums Brazil Could Not Use",
    summary:
      "Around $3bn of public money built arenas in cities with no top-flight football. FIFA required the stadiums; the host paid for them.",
    failure:
      "FIFA's hosting requirements mandated venue standards and tax exemptions while the public cost and the empty stadiums fell entirely on the host.",
    tags: ["brazil", "stadiums", "public-spending", "protests"],
    credibility: 5,
    evidence: "OFFICIAL",
    people: ["FIFA", "Brazil"],
    classification: "DOCUMENTED",
    description:
      "Brazil spent an estimated $3 billion of largely public money on twelve World Cup stadiums, several in cities without a top-division club to inherit them. The Arena da Amazônia in Manaus, built in the rainforest at around $300 million, hosted four matches and has struggled ever since to find regular tenants. The Estádio Nacional in Brasília, the most expensive at roughly $550 million, has been used for purposes including a bus depot. The spending triggered the largest protests Brazil had seen in decades, beginning during the 2013 Confederations Cup, with demonstrators contrasting stadium budgets against hospitals and schools. The structure of the arrangement is the institutional issue: FIFA sets minimum venue requirements, and Brazil passed a General World Cup Law granting FIFA and its commercial partners broad tax exemptions for the tournament. The governing body took the revenue; the host absorbed the construction debt and the disused arenas. On the pitch, Brazil were eliminated 7-1 by Germany in the semi-final — the heaviest defeat in their history.",
    sources: [
      {
        title: "2014 FIFA World Cup",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/2014_FIFA_World_Cup",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1489944440615-453fc2b6a9a9"),
    thumbnailUrl: IMG("photo-1489944440615-453fc2b6a9a9"),
    gallery: [],
    upvotes: 1330,
    comments: [],
    hostNation: "Brazil",
    hostFlag: "br",
  },
  {
    id: "SEC-2026-009",
    year: 2026,
    title: "48 Teams, 104 Matches, One Warning Ignored Again",
    summary:
      "The largest tournament ever staged, in a summer where researchers had already flagged the heat risk at several venues.",
    failure:
      "FIFA expanded the tournament by 60% against objections from player unions and leagues, and scheduled afternoon matches in cities already flagged for heat risk.",
    tags: ["usa", "expansion", "heat", "player-welfare"],
    credibility: 1,
    evidence: "OPEN",
    people: ["FIFA", "Morocco"],
    classification: "UNRESOLVED",
    description:
      "The 2026 tournament, hosted jointly by the United States, Canada and Mexico, is the first with 48 teams and 104 matches — up from 64, an increase of over 60%. It was awarded in June 2018, when the United bid defeated Morocco. The expansion drew sustained objection on two fronts. Player unions and domestic leagues warned about fixture congestion in an already saturated calendar, arguing FIFA was adding matches to a schedule its own medical advisers considered full. Separately, climate scientists and sports medicine researchers raised concerns before the tournament about heat exposure at venues where June and July afternoon conditions in Dallas, Houston, Kansas City and Monterrey can exceed safe wet-bulb thresholds for sustained exertion. This is the same tension documented at Mexico 1970 and formally recorded in FIFA's own 2010 Qatar evaluation. Whether the 2026 scheduling produced measurable harm is not yet established, which is why this record is marked unresolved rather than documented.",
    sources: [
      {
        title: "2026 FIFA World Cup",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup",
      },
    ],
    mediaType: "gallery",
    mediaUrl: IMG("photo-1431324155629-1a6deb1dec8d"),
    thumbnailUrl: IMG("photo-1431324155629-1a6deb1dec8d"),
    gallery: [],
    upvotes: 980,
    comments: [],
    hostNation: "United States",
    hostFlag: "us",
  },
];
