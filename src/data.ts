import { Team, Stamp } from "./types";

export const teams: Team[] = [
  { id: "usa", name: "Estados Unidos", flag: "🇺🇸", group: "A", confederation: "CONCACAF" },
  { id: "mex", name: "México", flag: "🇲🇽", group: "A", confederation: "CONCACAF" },
  { id: "sen", name: "Senegal", flag: "🇸🇳", group: "A", confederation: "CAF" },
  { id: "ned", name: "Países Bajos", flag: "🇳🇱", group: "A", confederation: "UEFA" },
  { id: "arg", name: "Argentina", flag: "🇦🇷", group: "B", confederation: "CONMEBOL" },
  { id: "jpn", name: "Japón", flag: "🇯🇵", group: "B", confederation: "AFC" },
  { id: "gha", name: "Ghana", flag: "🇬🇭", group: "B", confederation: "CAF" },
  { id: "ukr", name: "Ucrania", flag: "🇺🇦", group: "B", confederation: "UEFA" },
  { id: "bra", name: "Brasil", flag: "🇧🇷", group: "C", confederation: "CONMEBOL" },
  { id: "mar", name: "Marruecos", flag: "🇲🇦", group: "C", confederation: "CAF" },
  { id: "kor", name: "Corea del Sur", flag: "🇰🇷", group: "C", confederation: "AFC" },
  { id: "swe", name: "Suecia", flag: "🇸🇪", group: "C", confederation: "UEFA" },
  { id: "fra", name: "Francia", flag: "🇫🇷", group: "D", confederation: "UEFA" },
  { id: "uru", name: "Uruguay", flag: "🇺🇾", group: "D", confederation: "CONMEBOL" },
  { id: "egy", name: "Egipto", flag: "🇪🇬", group: "D", confederation: "CAF" },
  { id: "aus", name: "Australia", flag: "🇦🇺", group: "D", confederation: "AFC" },
  { id: "eng", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "E", confederation: "UEFA" },
  { id: "col", name: "Colombia", flag: "🇨🇴", group: "E", confederation: "CONMEBOL" },
  { id: "nga", name: "Nigeria", flag: "🇳🇬", group: "E", confederation: "CAF" },
  { id: "chn", name: "China", flag: "🇨🇳", group: "E", confederation: "AFC" },
  { id: "ger", name: "Alemania", flag: "🇩🇪", group: "F", confederation: "UEFA" },
  { id: "crc", name: "Costa Rica", flag: "🇨🇷", group: "F", confederation: "CONCACAF" },
  { id: "alg", name: "Argelia", flag: "🇩🇿", group: "F", confederation: "CAF" },
  { id: "irn", name: "Irán", flag: "🇮🇷", group: "F", confederation: "AFC" },
  { id: "esp", name: "España", flag: "🇪🇸", group: "G", confederation: "UEFA" },
  { id: "ecu", name: "Ecuador", flag: "🇪🇨", group: "G", confederation: "CONMEBOL" },
  { id: "civ", name: "Costa de Marfil", flag: "🇨🇮", group: "G", confederation: "CAF" },
  { id: "qat", name: "Catar", flag: "🇶🇦", group: "G", confederation: "AFC" },
  { id: "por", name: "Portugal", flag: "🇵🇹", group: "H", confederation: "UEFA" },
  { id: "chi", name: "Chile", flag: "🇨🇱", group: "H", confederation: "CONMEBOL" },
  { id: "cmr", name: "Camerún", flag: "🇨🇲", group: "H", confederation: "CAF" },
  { id: "ksa", name: "Arabia Saudita", flag: "🇸🇦", group: "H", confederation: "AFC" },
  { id: "ita", name: "Italia", flag: "🇮🇹", group: "I", confederation: "UEFA" },
  { id: "per", name: "Perú", flag: "🇵🇪", group: "I", confederation: "CONMEBOL" },
  { id: "tun", name: "Túnez", flag: "🇹🇳", group: "I", confederation: "CAF" },
  { id: "can", name: "Canadá", flag: "🇨🇦", group: "I", confederation: "CONCACAF" },
  { id: "bel", name: "Bélgica", flag: "🇧🇪", group: "J", confederation: "UEFA" },
  { id: "par", name: "Paraguay", flag: "🇵🇾", group: "J", confederation: "CONMEBOL" },
  { id: "mlt", name: "Mali", flag: "🇲🇱", group: "J", confederation: "CAF" },
  { id: "nzl", name: "Nueva Zelanda", flag: "🇳🇿", group: "J", confederation: "OFC" },
  { id: "cro", name: "Croacia", flag: "🇭🇷", group: "K", confederation: "UEFA" },
  { id: "bol", name: "Bolivia", flag: "🇧🇴", group: "K", confederation: "CONMEBOL" },
  { id: "rsa", name: "Sudáfrica", flag: "🇿🇦", group: "K", confederation: "CAF" },
  { id: "pan", name: "Panamá", flag: "🇵🇦", group: "K", confederation: "CONCACAF" },
  { id: "den", name: "Dinamarca", flag: "🇩🇰", group: "L", confederation: "UEFA" },
  { id: "ven", name: "Venezuela", flag: "🇻🇪", group: "L", confederation: "CONMEBOL" },
  { id: "zam", name: "Zambia", flag: "🇿🇲", group: "L", confederation: "CAF" },
  { id: "uae", name: "Emiratos Árabes", flag: "🇦🇪", group: "L", confederation: "AFC" },
];

const playerNames: Record<string, string[]> = {
  usa: ["Turner", "Dest", "Ream", "Carter-Vickers", "A.Robinson", "McKennie", "Musah", "Reyna", "Pulisic", "Balogun", "Weah", "Aaronson"],
  mex: ["Ochoa", "J.Sánchez", "Montes", "Vásquez", "Gallardo", "Álvarez", "Chávez", "Lozano", "Pineda", "Jiménez", "Vega", "Antuna"],
  sen: ["E.Mendy", "Jakobs", "Koulibaly", "Niakhaté", "A.Diallo", "P.Sarr", "L.Camara", "Gueye", "Mané", "Jackson", "I.Sarr", "Diatta"],
  ned: ["Verbruggen", "Dumfries", "De Ligt", "Van Dijk", "Aké", "De Jong", "Koopmeiners", "Reijnders", "Gakpo", "Depay", "Simons", "Malen"],
  arg: ["E.Martínez", "Molina", "Romero", "Otamendi", "Tagliafico", "De Paul", "E.Fernández", "Mac Allister", "Messi", "La.Martínez", "Álvarez", "Di María"],
  jpn: ["Suzuki", "Sugawara", "Itakura", "Tomiyasu", "H.Ito", "Endo", "Morita", "Kamada", "Mitoma", "Kubo", "Ueda", "Doan"],
  gha: ["Ati-Zigi", "Lamptey", "Djiku", "Amartey", "Mensah", "Partey", "Kudus", "A.Ayew", "J.Ayew", "Williams", "Semenyo", "Salisu"],
  ukr: ["Lunin", "Konoplya", "Zabarnyi", "Matviyenko", "Mykolenko", "Zinchenko", "Sudakov", "Malinovskyi", "Mudryk", "Dovbyk", "Yaremchuk", "Tsygankov"],
  bra: ["Alisson", "Danilo", "Marquinhos", "Gabriel", "Lodi", "Bruno G.", "Joelinton", "Paquetá", "Vinícius Jr", "Rodrygo", "Raphinha", "Endrick"],
  mar: ["Bono", "Hakimi", "Aguerd", "Saiss", "Mazraoui", "Amrabat", "Ounahi", "Ziyech", "Boufal", "En-Nesyri", "Akhomach", "El Khannouss"],
  kor: ["S.Kim", "M.Kim", "Y.Lee", "K.Hwang", "J.Lee", "S.Hwang", "Y.Jo", "S.Park", "H.Son", "H.Hwang", "J.Park", "G.Lee"],
  swe: ["Olsen", "Holm", "Lindelöf", "Hien", "Gudmundsson", "Cajuste", "Olsson", "Forsberg", "Kulusevski", "Isak", "Gyökeres", "Elanga"],
  fra: ["Maignan", "Koundé", "Saliba", "Upamecano", "T.Hernandez", "Tchouaméni", "Camavinga", "Griezmann", "Mbappé", "Giroud", "Dembele", "Kolo Muani"],
  uru: ["Rochet", "Nández", "R.Araujo", "Bueno", "Olivera", "Valverde", "Bentancur", "De Arrascaeta", "Pellistri", "Núñez", "Suárez", "M.Satriano"],
  egy: ["El Shenawy", "Hany", "Hegazy", "Abdelmonem", "Hamdi", "Fathi", "Elneny", "Sayed", "Salah", "Mostafa", "Trezeguet", "Marmoush"],
  aus: ["Ryan", "Atkinson", "Souttar", "Rowles", "Behich", "Irvine", "Baccus", "Metcalfe", "Goodwin", "Duke", "Boyle", "McGree"],
  eng: ["Pickford", "Walker", "Stones", "Maguire", "Shaw", "Rice", "Bellingham", "Foden", "Saka", "Kane", "Palmer", "Mainoo"],
  col: ["Vargas", "Muñoz", "Cuesta", "Mina", "Mojica", "Lerma", "Carrascal", "James", "L.Díaz", "Borré", "J.Arias", "Sinisterra"],
  nga: ["Uzoho", "Aina", "Bassey", "Ajayi", "Z.Sanusi", "Iwobi", "Ndidi", "Aribo", "Chukwueze", "Osimhen", "Lookman", "Boniface"],
  chn: ["Junling", "Tyias", "Chenjie", "Shenchao", "Lei", "Shangyuan", "Xi", "Liangming", "W.Lei", "Yuning", "L.Liangming", "Haoyang"],
  ger: ["Ter Stegen", "Kimmich", "Rüdiger", "Schlotterbeck", "Raum", "Gündogan", "Goretzka", "Musiala", "Sané", "Havertz", "Wirtz", "Füllkrug"],
  crc: ["Navas", "Fuller", "Waston", "Calvo", "Oviedo", "Borges", "Tejeda", "Aguilera", "Campbell", "Ugalde", "Zamora", "Madrigal"],
  alg: ["Zeghba", "Atal", "Mandi", "Tougai", "Ait-Nouri", "Bentaleb", "Bennacer", "Mahrez", "Belaïli", "Slimani", "Gouiri", "Amoura"],
  irn: ["Beiranvand", "Moharrami", "Kanaani", "Khalilzadeh", "Mohammadi", "Ezatolahi", "Noorafkan", "Taremi", "Jahanbakhsh", "Azmoun", "Ghoddos", "Sayyadmanesh"],
  esp: ["Simón", "Carvajal", "Le Normand", "Laporte", "Grimaldo", "Rodri", "Pedri", "Olmo", "Yamal", "Morata", "N.Williams", "Oyarzabal"],
  ecu: ["Galíndez", "Preciado", "F.Torres", "Pacho", "Estupiñán", "Caicedo", "Gruezo", "Páez", "Plata", "Valencia", "Minda", "Sarmiento"],
  civ: ["Fofana", "Aurier", "Ndicka", "Kossounou", "Konan", "Kessié", "Sangaré", "Fofana", "Pépé", "Haller", "Boga", "Adingra"],
  qat: ["Barsham", "Khoukhi", "A.Hassan", "Salman", "Ahmed", "Hatem", "Waad", "Al Haydos", "Afif", "Ali", "Abdulla", "Al-Rawi"],
  por: ["Diogo Costa", "Cancelo", "R.Dias", "Inácio", "N.Mendes", "Palhinha", "B.Fernandes", "Vitinha", "Leão", "C.Ronaldo", "B.Silva", "G.Ramos"],
  chi: ["Cortés", "Isla", "Medel", "Díaz", "Suazo", "Aránguiz", "Núñez", "Vidal", "Aravena", "Brereton", "Osorio", "Dávila"],
  cmr: ["Onana", "Tchatchoua", "Castelletto", "Wooh", "Tolo", "Anguissa", "Kunde", "Nguemaleu", "Choupo-Moting", "Aboubakar", "Mbeumo", "Nkoudou"],
  ksa: ["Al-Owais", "Al-Shahrani", "Al-Boleahi", "Tambakti", "Al-Ghannam", "Al-Dawsari", "Otayf", "Kanno", "S.Al-Dawsari", "Al-Buraikan", "Al-Shehri", "Hamed"],
  ita: ["Donnarumma", "Di Lorenzo", "Bastoni", "Acerbi", "Dimarco", "Barella", "Frattesi", "Chiesa", "Raspadori", "Scamacca", "Zaccagni", "Politano"],
  per: ["Gallese", "Advíncula", "Zambrano", "Abram", "López", "Cartagena", "Yotún", "Peña", "Flores", "Lapadula", "Reyna", "Grimaldo"],
  tun: ["Dahmen", "Dräger", "Talbi", "Bronn", "Abdi", "Skhiri", "Laïdouni", "Ben Slimane", "Msakni", "Jaziri", "Achouri", "Jouini"],
  can: ["St.Clair", "Johnston", "Cornelius", "Miller", "Laryea", "Eustáquio", "Koné", "David", "Buchanan", "Larin", "Davies", "Osorio"],
  bel: ["Casteels", "Castagne", "Faes", "Vertonghen", "Theate", "Onana", "Tielemans", "De Bruyne", "Doku", "Lukaku", "Bakayoko", "Trossard"],
  par: ["Fernández", "Rojas", "Balbuena", "Alderete", "Espinoza", "Villasanti", "Almirón", "Sánchez", "Romero", "Ávalos", "L.Sosa", "Galarza"],
  mlt: ["Diarra", "H.Traoré", "Kouyaté", "Cissé", "Coulibaly", "Doucouré", "Samassékou", "Haidara", "Diaby", "M.Traoré", "Koïta", "Doumbia"],
  nzl: ["Crocombe", "Bindon", "Pijnaker", "Cacace", "Sutton", "Bell", "Garbett", "Stamenic", "McCowatt", "Wood", "Barbarouses", "Just"],
  cro: ["Livakovic", "Stanisic", "Sutalo", "Gvardiol", "Sosa", "Modric", "Brozovic", "Kovacic", "Kramaric", "Perisic", "Pasalic", "Majer"],
  bol: ["Viscarra", "Medina", "Quinteros", "Haquin", "Sagredo", "Villarroel", "Justiniano", "R.Vaca", "Algarañaz", "Moreno", "Ramallo", "H.Vaca"],
  rsa: ["Williams", "Mudau", "Kekana", "Mvala", "Modiba", "Mokoena", "Zwane", "Maseko", "Tau", "Makgopa", "Mofokeng", "Mailula"],
  pan: ["Mejía", "Murillo", "Escobar", "Córdoba", "Blackman", "Godoy", "Carrasquilla", "Bárcenas", "Yanis", "Fajardo", "Waterman", "Rodríguez"],
  den: ["Schmeichel", "Kristensen", "Andersen", "Christensen", "Mæhle", "Højbjerg", "Eriksen", "Hjulmand", "Damsgaard", "Højlund", "Olsen", "Lindstrøm"],
  ven: ["Romo", "González", "Ferraresi", "Osorio", "Makoun", "Herrera", "Cásseres", "Soteldo", "Savarino", "Rondón", "Bello", "Córdova"],
  zam: ["Mulenga", "Banda", "Chilongoshi", "Musonda", "Kapumbu", "Chama", "Kangwa", "Bwalya", "Daka", "Mbewe", "Nkosana", "B.Sakala"],
  uae: ["Eisa", "Al-Hashemi", "S.Abbas", "Al Hammadi", "Ebrahim", "H.Abbas", "Ramadan", "Al-Zaabi", "Mabkhout", "Lima", "Canedo", "S.Ali"],
};

let stampCounter = 1;

function generateStamps(): Stamp[] {
  const stamps: Stamp[] = [];
  for (const team of teams) {
    const names = playerNames[team.id] || [];
    for (let i = 0; i < names.length; i++) {
      const rarity: Stamp["rarity"] =
        i === 0 ? "legendary" : i <= 2 ? "rare" : "common";
      stamps.push({
        id: `${team.id}-${i + 1}`,
        number: stampCounter++,
        name: names[i],
        teamId: team.id,
        position: undefined,
        rarity,
      });
    }
  }
  return stamps;
}

export const stamps = generateStamps();

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getStampsByTeam(teamId: string): Stamp[] {
  return stamps.filter((s) => s.teamId === teamId);
}

export const totalStamps = stamps.length;
export const totalTeams = teams.length;
