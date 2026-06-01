// Server-side stamp→team→confederation mapping for stats
export const stampTeamMap: Record<string, string> = {
  MEX: "MEX", RSA: "RSA", KOR: "KOR", CZE: "CZE",
  CAN: "CAN", BIH: "BIH", QAT: "QAT", SUI: "SUI",
  BRA: "BRA", MAR: "MAR", HAI: "HAI", SCO: "SCO",
  USA: "USA", PAR: "PAR", AUS: "AUS", TUR: "TUR",
  GER: "GER", CUW: "CUW", CIV: "CIV", ECU: "ECU",
  NED: "NED", JPN: "JPN", SWE: "SWE", TUN: "TUN",
  BEL: "BEL", EGY: "EGY", IRN: "IRN", NZL: "NZL",
  ESP: "ESP", CPV: "CPV", KSA: "KSA", URU: "URU",
  FRA: "FRA", SEN: "SEN", IRQ: "IRQ", NOR: "NOR",
  ARG: "ARG", ALG: "ALG", AUT: "AUT", JOR: "JOR",
  POR: "POR", COD: "COD", UZB: "UZB", COL: "COL",
  ENG: "ENG", CRO: "CRO", GHA: "GHA", PAN: "PAN",
};

export const teamConfederation: Record<string, string> = {
  MEX: "CONCACAF", RSA: "CAF", KOR: "AFC", CZE: "UEFA",
  CAN: "CONCACAF", BIH: "UEFA", QAT: "AFC", SUI: "UEFA",
  BRA: "CONMEBOL", MAR: "CAF", HAI: "CONCACAF", SCO: "UEFA",
  USA: "CONCACAF", PAR: "CONMEBOL", AUS: "AFC", TUR: "UEFA",
  GER: "UEFA", CUW: "CONCACAF", CIV: "CAF", ECU: "CONMEBOL",
  NED: "UEFA", JPN: "AFC", SWE: "UEFA", TUN: "CAF",
  BEL: "UEFA", EGY: "CAF", IRN: "AFC", NZL: "OFC",
  ESP: "UEFA", CPV: "CAF", KSA: "AFC", URU: "CONMEBOL",
  FRA: "UEFA", SEN: "CAF", IRQ: "AFC", NOR: "UEFA",
  ARG: "CONMEBOL", ALG: "CAF", AUT: "UEFA", JOR: "AFC",
  POR: "UEFA", COD: "CAF", UZB: "AFC", COL: "CONMEBOL",
  ENG: "UEFA", CRO: "UEFA", GHA: "CAF", PAN: "CONCACAF",
};

export const confederationNames: Record<string, string> = {
  UEFA: "Europa", CONMEBOL: "Sudamérica", CONCACAF: "Norteamérica",
  CAF: "África", AFC: "Asia", OFC: "Oceanía",
};
