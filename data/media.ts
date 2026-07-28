/**
 * VERIFIED MEDIA REGISTRY
 * =======================
 *
 * Every YouTube id below was checked programmatically before being committed:
 *   1. the video resolves via the oEmbed endpoint (it exists and is public), and
 *   2. an actual IFrame API player, instantiated on a non-YouTube origin,
 *      reaches a playing/buffering/cued state rather than firing onError.
 *
 * Step 2 matters: the watch page's `playableInEmbed` flag is not trustworthy.
 * Several FIFA and VEVO uploads advertise it as true and then fail with error
 * 150 ("embedding disabled by owner") the moment they are embedded elsewhere.
 * Only a real embed attempt settles it.
 *
 * Nothing is guessed. If a year has no entry here, the UI hides the relevant
 * control rather than falling back to unrelated audio — an earlier revision of
 * this file used a single placeholder id for sixteen dossiers, and that
 * placeholder turned out to be the Benny Hill theme.
 *
 * Re-verify with: node tools/embedcheck.mjs <id> [...]
 */

export interface Anthem {
  title: string;
  artist: string;
  youtubeId: string;
}

export type FootageKind = "documentary" | "highlights" | "interview" | "archive";

export interface Footage {
  youtubeId: string;
  /** Title as it appears on YouTube. */
  title: string;
  /** Uploading channel, shown as an attribution line. */
  channel: string;
  kind: FootageKind;
}

/**
 * Official tournament songs.
 *
 * FIFA tournaments had no official song before 1962, so 1930-1958 are absent by
 * design. 1978 (Morricone) and 1982 (Domingo) do have official songs, but no
 * upload of either could be verified as both live and embeddable, so they are
 * omitted rather than substituted.
 */
export const ANTHEMS: Record<number, Anthem> = {
  1962: {
    title: "El Rock del Mundial",
    artist: "Los Ramblers",
    youtubeId: "e_yafwjcf-w",
  },
  1966: {
    title: "World Cup Willie",
    artist: "Lonnie Donegan",
    youtubeId: "mzaMjM4Ra7o",
  },
  1970: {
    title: "Fútbol México 70",
    artist: "Los Hermanos Zavala",
    youtubeId: "hP-mIP_wBmc",
  },
  1974: {
    title: "Fußball ist unser Leben",
    artist: "West Germany squad",
    youtubeId: "v19ZyiZpSEw",
  },
  1986: {
    title: "El Mundo Unido por un Balón",
    artist: "Juan Carlos Abara",
    youtubeId: "QObypeSVz3Y",
  },
  1990: {
    title: "Un'estate italiana",
    artist: "Gianna Nannini & Edoardo Bennato",
    youtubeId: "RPYnKEDwH3s",
  },
  1994: {
    title: "Gloryland",
    artist: "Daryl Hall & Sounds of Blackness",
    youtubeId: "9lyNR0UMVic",
  },
  1998: {
    title: "The Cup of Life (La Copa de la Vida)",
    artist: "Ricky Martin",
    youtubeId: "11x7crPnOF4",
  },
  2002: {
    title: "Boom",
    artist: "Anastacia",
    youtubeId: "_ZvgnRT8pEo",
  },
  2006: {
    title: "The Time of Our Lives",
    artist: "Il Divo & Toni Braxton",
    youtubeId: "4aOxDHqWyK0",
  },
  2010: {
    title: "Waka Waka (This Time for Africa)",
    artist: "Shakira ft. Freshlyground",
    youtubeId: "pRpeEdMmmQ0",
  },
  2014: {
    title: "We Are One (Ole Ola)",
    artist: "Pitbull, Jennifer Lopez & Claudia Leitte",
    youtubeId: "YlQoXdIzOU8",
  },
  2018: {
    title: "Live It Up",
    artist: "Nicky Jam, Will Smith & Era Istrefi",
    youtubeId: "V15BYnSr0P8",
  },
  2026: {
    title: "Dai Dai",
    artist: "Shakira & Burna Boy",
    youtubeId: "fcnDmrtj6Sk",
  },
  2022: {
    // The official song (Hayya Hayya) is uploaded by FIFA with embedding
    // disabled, so it fails with error 150 on any third-party origin. The Fan
    // Festival anthem is the tournament's other designated track and does
    // embed, so it stands in here.
    title: "Tukoh Taka",
    artist: "Nicki Minaj, Maluma & Myriam Fares",
    youtubeId: "Alyw9cQz0Es",
  },
};

/**
 * Genuine documentary, broadcast-highlight and interview footage of the real
 * events behind each dossier.
 *
 * These are presented as exactly what they are — public journalism and archive
 * material — and are never framed as leaked or intercepted. The dossier text is
 * fiction; this footage is not, and the UI keeps that boundary explicit.
 *
 * Keyed by dossier id. An entry whose key matches no dossier silently never
 * renders, so tools/mediaaudit.mjs fails the build on orphans — a 1966
 * highlights entry sat dead in this file until that check was added.
 */
export const FOOTAGE: Record<string, Footage> = {
  "SEC-2015-001": {
    youtubeId: "KXGtktZr__0",
    title: "Attorney General Loretta Lynch announces the FIFA indictment",
    channel: "ABC 7 News — WJLA",
    kind: "archive",
  },
  "SEC-2021-007": {
    youtubeId: "I0EsOFDA6uM",
    title: "Qatar's World Cup workers: 'We may as well just die here'",
    channel: "The Guardian",
    kind: "documentary",
  },
  "SEC-1921-008": {
    youtubeId: "uB2lcFCgWg8",
    title: "The pioneering Dick, Kerr Ladies — and the 1921 ban",
    channel: "National Football Museum",
    kind: "documentary",
  },
  "SEC-1994-020": {
    youtubeId: "iljYpPDBNBs",
    title: "The own goal that cost Andrés Escobar his life",
    channel: "Qxir",
    kind: "documentary",
  },
  "SEC-1962-023": {
    youtubeId: "Cuc99de1i_Q",
    title: "The Battle of Santiago — the World Cup's most violent match",
    channel: "Full Time Football",
    kind: "documentary",
  },
  "SEC-1982-017": {
    youtubeId: "M0mHp3iyWGg",
    title: "The worst World Cup match: a game so bad FIFA had to investigate",
    channel: "Secret Base",
    kind: "documentary",
  },
  "SEC-1986-018": {
    youtubeId: "_lBIikA5Bx4",
    title: "The Hand of God — Diego Maradona, 1986",
    channel: "Football Chronicles",
    kind: "documentary",
  },
  "SEC-1998-003": {
    youtubeId: "oTQKaopKTmU",
    title: "The 1998 final and the mystery of Ronaldo's collapse",
    channel: "Footchampion",
    kind: "documentary",
  },
};

export function getAnthem(year: number): Anthem | null {
  return ANTHEMS[year] ?? null;
}

export function getFootage(dossierId: string): Footage | null {
  return FOOTAGE[dossierId] ?? null;
}
