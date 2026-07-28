/**
 * Per-record hero imagery, keyed by dossier id.
 *
 * Keyed by id rather than year because several records share a year — the
 * 2015 raid and the Blatter/Platini payment, for instance — and each needs a
 * distinct image.
 *
 * Two provenances, kept explicit so the UI can label each one:
 *  - "archive"   real photographs from Wikimedia Commons under a licence that
 *                permits reuse. Attribution travels with the record.
 *  - "generated" period-styled illustrations for years where no freely
 *                licensed photograph of the relevant scene exists.
 *
 * Regenerate the Commons half with tools/commons_fetch.py.
 */

export type ImageProvenance = "archive" | "generated";

export interface DossierImage {
  src: string;
  provenance: ImageProvenance;
  /** Attribution line, shown on archive photographs. */
  credit?: string;
  /** Link to the Commons file page. */
  source?: string;
  license?: string;
}

export const DOSSIER_IMAGES: Record<string, DossierImage> = {
  "SEC-1921-008": {
    src: "/dossiers/rec-1921.png",
    provenance: "archive",
    credit: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Dick-kerr-ladies-st-helens-ladies.png",
  },
  "SEC-1954-014": { src: "/dossiers/1954.jpg", provenance: "generated" },
  "SEC-1962-023": { src: "/dossiers/1962.jpg", provenance: "generated" },
  "SEC-1970-021": { src: "/dossiers/1970.jpg", provenance: "generated" },
  "SEC-1978-002": {
    src: "/dossiers/1978.jpg",
    provenance: "archive",
    credit: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Argentina_1978_papelitos.jpg",
  },
  "SEC-1982-017": {
    src: "/dossiers/1982.jpg",
    provenance: "archive",
    credit: "Ricardo López",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Spain_v_yugoslavia_1982_02.jpg",
  },
  "SEC-1986-018": {
    src: "/dossiers/1986.jpg",
    provenance: "archive",
    credit: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Maradona_shilton_mano_dios.jpg",
  },
  "SEC-1994-020": {
    src: "/dossiers/1994.jpg",
    provenance: "archive",
    credit: "Jphill19",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:1994_FIFA_World_Cup_USA_Ball_II.jpg",
  },
  "SEC-1998-003": {
    src: "/dossiers/1998.jpg",
    provenance: "archive",
    credit: "Archives nationales",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Tribune_pr%C3%A9sidentielle_finale_France_Br%C3%A9sil_football_12_juillet_1998.jpg",
  },
  "SEC-2002-007": {
    src: "/dossiers/2002.jpg",
    provenance: "archive",
    credit: "ijs",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Seoul_Plaza_2002_FIFA_World_Cup.jpg",
  },
  "SEC-2010-004": {
    src: "/dossiers/2010.jpg",
    provenance: "archive",
    credit: "Patrick de Laive",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_2010_Netherlands_Japan.jpg",
  },
  "SEC-2010-005": {
    src: "/dossiers/2010.jpg",
    provenance: "archive",
    credit: "Patrick de Laive",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_2010_Netherlands_Japan.jpg",
  },
  "SEC-2012-003": {
    src: "/dossiers/rec-2012.jpg",
    provenance: "archive",
    credit: "MCaviglia digimen.ch",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:FIFA-Headquarter.jpg",
  },
  "SEC-2013-002": {
    src: "/dossiers/rec-2013.jpg",
    provenance: "archive",
    credit: "Robert Breitinger",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Zentralbibliothek_Z%C3%BCrich_-_Hotel_Baur_au_Lac_-_991129108349705501.jpg",
  },
  "SEC-2014-005": {
    src: "/dossiers/2014.jpg",
    provenance: "archive",
    credit: "Danilo Borges/copa2014.gov.br",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Germany_and_Argentina_face_off_in_the_final_of_the_World_Cup_2014_-2014-07-13_(5).jpg",
  },
  "SEC-2014-006": {
    src: "/dossiers/2014.jpg",
    provenance: "archive",
    credit: "Danilo Borges/copa2014.gov.br",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Germany_and_Argentina_face_off_in_the_final_of_the_World_Cup_2014_-2014-07-13_(5).jpg",
  },
  "SEC-2015-001": {
    src: "/dossiers/2015.jpg",
    provenance: "archive",
    credit: "Albinfo",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:FIFA_20150604.jpg",
  },
  "SEC-2015-006": {
    src: "/dossiers/rec-2015b.jpg",
    provenance: "archive",
    credit: "NL-HaNA, ANEFO / neg. stroken, 1945-1989, 2.24.01.06, item number 253-8731",
    license: "CC BY-SA 3.0 nl",
    source: "https://commons.wikimedia.org/wiki/File:Sepp_Blatter_%26_Jo%C3%A3o_Havelange.jpg",
  },
  "SEC-2021-007": {
    src: "/dossiers/rec-2021.jpg",
    provenance: "archive",
    credit: "Adam Jones from Kelowna, BC, Canada",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Construction_Workers_-_Doha_-_Qatar_(33790967794).jpg",
  },
  "SEC-2026-009": {
    src: "/dossiers/2026.jpg",
    provenance: "archive",
    credit: "Kaisersauce1",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Levi%27s_Stadium_2026_FIFA_World_Cup_Australia_v._Paraguay.jpg",
  },
};

export function getDossierImage(id: string): DossierImage | null {
  return DOSSIER_IMAGES[id] ?? null;
}
