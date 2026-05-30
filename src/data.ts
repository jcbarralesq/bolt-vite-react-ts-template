import { Team, Stamp } from "./types";

export const teams: Team[] = [
  { id: "mex", name: "México", flag: "🇲🇽", group: "A", confederation: "CONCACAF" },
  { id: "rsa", name: "Sudáfrica", flag: "🇿🇦", group: "A", confederation: "CAF" },
  { id: "kor", name: "Corea del Sur", flag: "🇰🇷", group: "A", confederation: "AFC" },
  { id: "cze", name: "República Checa", flag: "🇨🇿", group: "A", confederation: "UEFA" },
  { id: "can", name: "Canadá", flag: "🇨🇦", group: "B", confederation: "CONCACAF" },
  { id: "bih", name: "Bosnia y Herzegovina", flag: "🇧🇦", group: "B", confederation: "UEFA" },
  { id: "qat", name: "Catar", flag: "🇶🇦", group: "B", confederation: "AFC" },
  { id: "sui", name: "Suiza", flag: "🇨🇭", group: "B", confederation: "UEFA" },
  { id: "bra", name: "Brasil", flag: "🇧🇷", group: "C", confederation: "CONMEBOL" },
  { id: "mar", name: "Marruecos", flag: "🇲🇦", group: "C", confederation: "CAF" },
  { id: "hai", name: "Haití", flag: "🇭🇹", group: "C", confederation: "CONCACAF" },
  { id: "sco", name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", confederation: "UEFA" },
  { id: "usa", name: "Estados Unidos", flag: "🇺🇸", group: "D", confederation: "CONCACAF" },
  { id: "par", name: "Paraguay", flag: "🇵🇾", group: "D", confederation: "CONMEBOL" },
  { id: "aus", name: "Australia", flag: "🇦🇺", group: "D", confederation: "AFC" },
  { id: "tur", name: "Turquía", flag: "🇹🇷", group: "D", confederation: "UEFA" },
  { id: "ger", name: "Alemania", flag: "🇩🇪", group: "E", confederation: "UEFA" },
  { id: "cuw", name: "Curazao", flag: "🇨🇼", group: "E", confederation: "CONCACAF" },
  { id: "civ", name: "Costa de Marfil", flag: "🇨🇮", group: "E", confederation: "CAF" },
  { id: "ecu", name: "Ecuador", flag: "🇪🇨", group: "E", confederation: "CONMEBOL" },
  { id: "ned", name: "Países Bajos", flag: "🇳🇱", group: "F", confederation: "UEFA" },
  { id: "jpn", name: "Japón", flag: "🇯🇵", group: "F", confederation: "AFC" },
  { id: "swe", name: "Suecia", flag: "🇸🇪", group: "F", confederation: "UEFA" },
  { id: "tun", name: "Túnez", flag: "🇹🇳", group: "F", confederation: "CAF" },
  { id: "bel", name: "Bélgica", flag: "🇧🇪", group: "G", confederation: "UEFA" },
  { id: "egy", name: "Egipto", flag: "🇪🇬", group: "G", confederation: "CAF" },
  { id: "irn", name: "Irán", flag: "🇮🇷", group: "G", confederation: "AFC" },
  { id: "nzl", name: "Nueva Zelanda", flag: "🇳🇿", group: "G", confederation: "OFC" },
  { id: "esp", name: "España", flag: "🇪🇸", group: "H", confederation: "UEFA" },
  { id: "cpv", name: "Cabo Verde", flag: "🇨🇻", group: "H", confederation: "CAF" },
  { id: "ksa", name: "Arabia Saudita", flag: "🇸🇦", group: "H", confederation: "AFC" },
  { id: "uru", name: "Uruguay", flag: "🇺🇾", group: "H", confederation: "CONMEBOL" },
  { id: "fra", name: "Francia", flag: "🇫🇷", group: "I", confederation: "UEFA" },
  { id: "sen", name: "Senegal", flag: "🇸🇳", group: "I", confederation: "CAF" },
  { id: "irq", name: "Irak", flag: "🇮🇶", group: "I", confederation: "AFC" },
  { id: "nor", name: "Noruega", flag: "🇳🇴", group: "I", confederation: "UEFA" },
  { id: "arg", name: "Argentina", flag: "🇦🇷", group: "J", confederation: "CONMEBOL" },
  { id: "alg", name: "Argelia", flag: "🇩🇿", group: "J", confederation: "CAF" },
  { id: "aut", name: "Austria", flag: "🇦🇹", group: "J", confederation: "UEFA" },
  { id: "jor", name: "Jordania", flag: "🇯🇴", group: "J", confederation: "AFC" },
  { id: "por", name: "Portugal", flag: "🇵🇹", group: "K", confederation: "UEFA" },
  { id: "cod", name: "RD Congo", flag: "🇨🇩", group: "K", confederation: "CAF" },
  { id: "uzb", name: "Uzbekistán", flag: "🇺🇿", group: "K", confederation: "AFC" },
  { id: "col", name: "Colombia", flag: "🇨🇴", group: "K", confederation: "CONMEBOL" },
  { id: "eng", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", confederation: "UEFA" },
  { id: "cro", name: "Croacia", flag: "🇭🇷", group: "L", confederation: "UEFA" },
  { id: "gha", name: "Ghana", flag: "🇬🇭", group: "L", confederation: "CAF" },
  { id: "pan", name: "Panamá", flag: "🇵🇦", group: "L", confederation: "CONCACAF" },
];

const players: Record<string, string[]> = {
  mex: ["Luis Malagón","Johan Vásquez","César Montes","Israel Reyes","Jorge Sánchez","Jesús Gallardo","Carlos Rodríguez","Edson Álvarez","Orbelín Pineda","Marcel Ruiz","Érick Sánchez","Diego Lainez","Hirving Lozano","Santiago Giménez","Raúl Jiménez","Alexis Vega","Roberto Alvarado","César Huerta"],
  rsa: ["Ronwen Williams","Sipho Chaine","Mbekezeli Mbokazi","Khulumani Ndamane","Nkosinathi Sibisi","Siyabonga Ngezana","Khuliso Mudau","Aubrey Modiba","Samukele Kabini","Thalente Mbatha","Teboho Mokoena","Bathusi Aubaas","Yaya Sithole","Sipho Mbule","Lyle Foster","Iqraam Rayners","Mohau Nkota","Oswin Appollis"],
  kor: ["Hyeon-woo Jo","Seung-Gyu Kim","Min-jae Kim","Yu-min Cho","Han-beom Lee","Young-woo Seol","Tae-seok Lee","Myung-jae Lee","Jae-sung Lee","In-beom Hwang","Kang-in Lee","Seung-ho Paik","Jens Castrop","Dong-yeong Lee","Gue-sung Cho","Heung-min Son","Hee-chan Hwang","Hyeon-Gyu Oh"],
  cze: ["Matej Kovar","Jindrich Stanek","Ladislav Krejci","Jaroslav Zeleny","Tomas Holes","David Zima","Vladimir Coufal","Michal Sadilek","Lukas Provod","Lukas Cerv","Tomas Soucek","Pavel Sulc","Matej Vydra","Vasil Kusej","Tomas Chory","Vaclav Cerny","Adam Hlozek","Patrik Schick"],
  can: ["Dayne St.Clair","Derek Cornelius","Moïse Bombito","Kamal Miller","Alphonso Davies","Alistair Johnston","Samuel Adekugbe","Riche Laryea","Stephen Eustáquio","Ismaël Koné","Jonathan Osorio","Jacob Shaffelburg","Mathieu Choinière","Niko Sigur","Tajon Buchanan","Liam Millar","Cyle Larin","Jonathan David"],
  bih: ["Nikola Vasilj","Sead Kolasinac","Tarik Muharemovic","Nihad Mujakic","Nikola Katic","Amar Dedic","Amir Hadziahmetovic","Benjamin Tahirovic","Armin Gigovic","Ivan Sunjic","Ivan Basic","Dzenis Burnic","Esmir Bajraktarevic","Amar Memic","Ermedin Demirovic","Edin Dzeko","Samed Bazdar","Haris Tabakovic"],
  qat: ["Meshaal Barsham","Lucas Mendes","Boualem Khoukhi","Pedro Miguel","Tarek Salman","Sultan Albrake","Mohammed Waad","Homam Ahmed","Mohamed Al-Mannai","Karim Boudiaf","Assim Madibo","Ahmed Fatehi","Abdulaziz Hatim","Hassan Al-Haydos","Edmilson Junior","Akram Afif","Ahmed Al Ganehi","Almoez Ali"],
  sui: ["Gregor Kobel","Yvon Mvogo","Manuel Akanji","Nico Elvedi","Aurèle Amenda","Silvan Widmer","Ricardo Rodriguez","Granit Xhaka","Denis Zakaria","Remo Freuler","Fabian Rieder","Ardon Jashari","Johan Manzambi","Michel Aebischer","Breel Embolo","Ruben Vargas","Dan Ndoye","Zeki Amdouni"],
  bra: ["Alisson","Bento","Marquinhos","Éder Militão","Gabriel Magalhães","Danilo","Wesley","Lucas Paquetá","Casemiro","Bruno Guimarães","Luiz Henrique","Vinicius Júnior","Rodrygo","João Pedro","Matheus Cunha","Gabriel Martinelli","Raphinha","Estévão"],
  mar: ["Yassine Bounou","Munir El Kajoui","Achraf Hakimi","Noussair Mazraoui","Nayef Aguerd","Roman Saiss","Jawad El Yamiq","Adam Masina","Sofyan Amrabat","Azzedine Ounahi","Bilal El Khannouss","Ismael Saibari","Eliesse Ben Seghir","Youssef En-Nesyri","Abde Ezzalzouli","Soufiane Rahimi","Brahim Diaz","Ayoub El Kaabi"],
  hai: ["Johny Placide","Jean-Kevin Duverne","Ricardo Adé","Duke Lacroix","Garven Metusala","Hannes Delcroix","Carlens Arcus","Martin Expérience","Leverton Pierre","Danley Jean Jacques","Jean-Ricner Bellegarde","Christopher Attys","Derrick Etienne Jr","Josue Casimir","Ruben Providence","Duckens Nazon","Louicius Deedson","Frantzdy Pierrot"],
  sco: ["Angus Gunn","Jack Hendry","Scott McKenna","John Souttar","Grant Hanley","Kieran Tierney","Aaron Hickey","Andrew Robertson","Anthony Ralston","Scott McTominay","Billy Gilmour","Lewis Ferguson","Ryan Christie","Kenny McLean","John McGinn","Lyndon Dykes","Che Adams","Ben Doak"],
  usa: ["Matt Freese","Chris Richards","Tim Ream","Mark McKenzie","Alex Freeman","Antonee Robinson","Tyler Adams","Tanner Tessmann","Weston McKennie","Christian Roldan","Timothy Weah","Diego Luna","Malik Tillman","Christian Pulisic","Brenden Aaronson","Ricardo Pepi","Haji Wright","Folarin Balogun"],
  par: ["Roberto Fernández","Orlando Gill","Gustavo Gómez","Fabián Balbuena","Omar Alderete","Junior Alonso","Juan José Cáceres","Mathías Villasanti","Diego Gómez","Damián Bobadilla","Andrés Cubas","Matías Galarza","Julio Enciso","Alejandro Romero","Miguel Almirón","Ramón Sosa","Ángel Romero","Antonio Sanabria"],
  aus: ["Mathew Ryan","Joe Gauci","Harry Souttar","Alessandro Circati","Cameron Burgess","Lewis Miller","Milos Degenek","Jordan Bos","Aziz Behich","Jackson Irvine","Riley McGree","Aiden O'Neill","Connor Metcalfe","Patrick Yazbek","Craig Goodwin","Kusini Yengi","Nestory Irankunda","Mohamed Touré"],
  tur: ["Ugurcan Çakir","Abdulkerim Bardakci","Çaglar Söyüncü","Merih Demiral","Ferdi Kadioglu","Mert Müldür","Zeki Çelik","Kaan Ayhan","Ismail Yüksek","Hakan Çalhanoglu","Orkun Kökçü","Arda Güler","Irfan Can Kahveci","Yunus Akgün","Can Uzun","Baris Alper Yilmaz","Kerem Aktürkoglu","Kenan Yildiz"],
  ger: ["Marc-André ter Stegen","Jonathan Tah","Nico Schlotterbeck","Antonio Rüdiger","Waldemar Anton","David Raum","Ridle Baku","Maximilian Mittelstädt","Joshua Kimmich","Florian Wirtz","Felix Nmecha","Leon Goretzka","Jamal Musiala","Serge Gnabry","Kai Havertz","Leroy Sané","Karim Adeyemi","Nick Woltemade"],
  cuw: ["Eloy Room","Armando Obispo","Roshon van Eijma","Jurien Gaari","Sherel Floranus","Joshua Brenet","Shurandy Sambo","Livano Comenencia","Godfried Roemeratoe","Juninho Bacuna","Leandro Bacuna","Tahith Chong","Kenji Gorre","Jearl Margaritha","Jürgen Locadia","Jeremy Antonisse","Gervane Kastaneer","Sontje Hansen"],
  civ: ["Yahia Fofana","Wilfried Singo","Odilon Kossounou","Evan Ndicka","Willy Boly","Emmanuel Agbadou","Ousmane Diomande","Jean-Philippe Gbamin","Ghislain Konan","Franck Kessié","Seko Fofana","Ibrahim Sangaré","Amad Diallo","Sébastien Haller","Simon Adingra","Yan Diomande","Evann Guessand","Oumar Diakite"],
  ecu: ["Hernán Galíndez","Gonzalo Valle","Piero Hincapié","Willian Pacho","Joel Ordóñez","Pervis Estupiñán","Ángelo Preciado","Moisés Caicedo","Alan Franco","Kendry Páez","Pedro Vite","John Yeboah","Leonardo Campana","Gonzalo Plata","Nilson Angulo","Alan Minda","Kevin Rodríguez","Enner Valencia"],
  ned: ["Bart Verbruggen","Virgil van Dijk","Micky van de Ven","Jurriën Timber","Denzel Dumfries","Nathan Aké","Jeremie Frimpong","Jan Paul van Hecke","Tijjani Reijnders","Ryan Gravenberch","Teun Koopmeiners","Frenkie de Jong","Xavi Simons","Justin Kluivert","Memphis Depay","Donyell Malen","Wout Weghorst","Cody Gakpo"],
  jpn: ["Zion Suzuki","Junnosuke Suzuki","Shogo Taniguchi","Tsuyoshi Watanabe","Henry Mochizuki","Kaishu Sano","Ayumu Seko","Yuki Soma","Ao Tanaka","Daichi Kamada","Takefusa Kubo","Ritsu Doan","Keito Nakamura","Takumi Minamino","Shuto Machino","Junya Ito","Koki Ogawa","Ayase Ueda"],
  swe: ["Viktor Johansson","Isak Hien","Victor Lindelöf","Gustaf Lagerbielke","Daniel Svensson","Ken Sema","Gabriel Gudmundsson","Emil Holm","Lucas Bergvall","Hugo Larsson","Jesper Karlström","Yasin Ayari","Mattias Svanberg","Roony Bardghji","Dejan Kulusevski","Anthony Elanga","Alexander Isak","Viktor Gyökeres"],
  tun: ["Bechir Ben Said","Aymen Dahmen","Montassar Talbi","Yassine Meriah","Dylan Bronn","Yan Valery","Ali Abdi","Ellyes Skhiri","Aissa Laidouni","Ferjani Sassi","Mohamed Ali Ben Romdhane","Hannibal Mejbri","Sayfallah Ltaief","Elias Achouri","Elias Saad","Hazem Mastouri","Ismael Gharbi","Naim Sliti"],
  bel: ["Thibaut Courtois","Arthur Theate","Zeno Debast","Brandon Mechele","Timothy Castagne","Maxim De Cuyper","Thomas Meunier","Youri Tielemans","Amadou Onana","Nicolas Raskin","Alexis Saelemaekers","Hans Vanaken","Kevin De Bruyne","Charles De Ketelaere","Jérémy Doku","Leandro Trossard","Loïs Openda","Romelu Lukaku"],
  egy: ["Mohamed El Shenawy","Yasser Ibrahim","Khaled Sobhi","Ramy Rabia","Hossam Abdelmaguid","Mohamed Hany","Mohamed Hamdy","Ahmed Fatouh","Marwan Attia","Zizo","Hamdy Fathy","Mohamed Lasheen","Emam Ashour","Osama Faisal","Mohamed Salah","Mostafa Mohamed","Trezeguet","Omar Marmoush"],
  irn: ["Alireza Beiranvand","Morteza Pouraliganji","Shoja Khalilzadeh","Hossein Kanaani","Ehsan Hajsafi","Milad Mohammadi","Ramin Rezaeian","Sadegh Moharrami","Saleh Hardani","Saeed Ezatolahi","Saman Ghoddos","Omid Noorafkan","Roozbeh Cheshmi","Mohammad Mohebi","Sardar Azmoun","Mehdi Taremi","Alireza Jahanbakhsh","Ali Gholizadeh"],
  nzl: ["Max Crocombe","Alex Paulsen","Michael Boxall","Tyler Bindon","Finn Surman","Liberato Cacace","Tim Payne","Francis de Vries","Ben Old","Joe Bell","Sarpreet Singh","Ryan Thomas","Matthew Garbett","Marko Stamenić","Chris Wood","Elijah Just","Callum McCowatt","Kosta Barbarouses"],
  esp: ["Unai Simón","Robin Le Normand","Aymeric Laporte","Dean Huijsen","Pedro Porro","Dani Carvajal","Marc Cucurella","Martín Zubimendi","Rodri","Pedri","Fabián Ruiz","Mikel Merino","Lamine Yamal","Dani Olmo","Nico Williams","Ferran Torres","Álvaro Morata","Mikel Oyarzabal"],
  cpv: ["Vozinha","Logan Costa","Pico","Diney","Steven Moreira","Wagner Pina","João Paulo","Yannick Semedo","Kevin Pina","Patrick Andrade","Jamiro Monteiro","Deroy Duarte","Garry Rodrigues","Jovane Cabral","Ryan Mendes","Dailon Livramento","Willy Semedo","Bebé"],
  ksa: ["Nawaf Al-Aqidi","Abdulrahman Al-Sanbi","Saud Abdulhamid","Nawaf Boushal","Jehad Thakri","Moteb Al-Harbi","Hassan Altambakti","Musab Al-Juwayr","Ziyad Al-Johani","Abdullah Al-Khaibari","Nasser Al-Dawsari","Saleh Abu Al-Shamat","Marwan Al-Swahafi","Salem Al-Dawsari","Abdulrahman Al-Aboud","Feras Al-Brikan","Saleh Al-Shehri","Abdullah Al-Hamdan"],
  uru: ["Sergio Rochet","Santiago Mele","Ronald Araujo","José María Giménez","Sebastián Cáceres","Maxi Araujo","Mathías Olivera","Guillermo Varela","Nahitan Nández","Federico Valverde","Giorgian De Arrascaeta","Rodrigo Bentancur","Manuel Ugarte","Nicolás de la Cruz","Darwin Núñez","Federico Viñas","Rodrigo Aguirre","Facundo Pellistri"],
  fra: ["Mike Maignan","William Saliba","Ibrahima Konaté","Dayot Upamecano","Theo Hernandez","Jules Koundé","Lucas Digne","Aurélien Tchouaméni","Eduardo Camavinga","Manu Koné","Adrien Rabiot","Michael Olise","Ousmane Dembélé","Bradley Barcola","Désiré Doué","Kingsley Coman","Hugo Ekitike","Kylian Mbappé"],
  sen: ["Édouard Mendy","Yehvann Diouf","Moussa Niakhaté","Kalidou Koulibaly","Abdoulaye Seck","Ismail Jakobs","El Hadji Malick Diouf","Idrissa Gueye","Pape Matar Sarr","Pape Gueye","Habib Diarra","Lamine Camara","Krepin Diatta","Sadio Mané","Ismaïla Sarr","Boulaye Dia","Iliman Ndiaye","Nicolas Jackson"],
  irq: ["Jalal Hassan","Rebin Sulaka","Akam Hashem","Zaid Tahseen","Manaf Younis","Hussein Ali","Merchas Doski","Zidane Iqbal","Amir Al-Ammari","Ibrahim Bayesh","Ali Jasim","Youssef Amyn","Aimar Sher","Marko Farji","Osama Rashid","Ali Al-Hamadi","Aymen Hussein","Mohanad Ali"],
  nor: ["Ørjan Nyland","Leo Østigård","Kristoffer Ajer","Torbjørn Heggem","Julian Ryerson","Marcus Pedersen","David Møller Wolfe","Morten Thorsby","Martin Ødegaard","Sander Berge","Patrick Berg","Andreas Schjelderup","Erling Haaland","Alexander Sørloth","Aron Dønnum","Jørgen Strand Larsen","Antonio Nusa","Oscar Bobb"],
  arg: ["Emiliano Martínez","Cristian Romero","Nicolás Otamendi","Leonardo Balerdi","Nahuel Molina","Nicolás Tagliafico","Enzo Fernández","Alexis Mac Allister","Rodrigo De Paul","Exequiel Palacios","Leandro Paredes","Nico Paz","Franco Mastantuono","Nico González","Lionel Messi","Lautaro Martínez","Julián Álvarez","Giuliano Simeone"],
  alg: ["Alexis Guendouz","Ramy Bensebaini","Mohamed Amine Tougai","Aïssa Mandi","Youcef Atal","Rayan Aït-Nouri","Ismael Bennacer","Houssem Aouar","Hicham Boudaoui","Ramiz Zerrouki","Nabil Bentaleb","Farés Chaibi","Riyad Mahrez","Said Benrahma","Anis Hadj Moussa","Amine Gouiri","Baghdad Bounedjah","Mohammed Amoura"],
  aut: ["Alexander Schlager","Patrick Pentz","David Alaba","Kevin Danso","Philipp Lienhart","Stefan Posch","Phillipp Mwene","Konrad Laimer","Alexander Prass","Xaver Schlager","Marcel Sabitzer","Florian Grillitsch","Nicolas Seiwald","Romano Schmid","Christoph Baumgartner","Patrick Wimmer","Michael Gregoritsch","Marko Arnautović"],
  jor: ["Yazeed Abulaila","Yazan Al-Arab","Abdallah Nasib","Saleem Obaid","Mohammad Abualnadi","Ehsan Haddad","Mohammad Abu Hashish","Mohannad Abu Taha","Ibrahim Saadeh","Nizar Al-Rashdan","Noor Al-Rawabdeh","Amer Jamous","Musa Al-Tamari","Yazan Al-Naimat","Mahmoud Al-Mardi","Ali Olwan","Mohammad Abu Zrayq","Ibrahim Sabra"],
  por: ["Diogo Costa","José Sá","Rúben Dias","Gonçalo Inácio","João Cancelo","Diogo Dalot","Nuno Mendes","Bernardo Silva","Bruno Fernandes","Rúben Neves","Vitinha","João Neves","Cristiano Ronaldo","Francisco Trincão","João Félix","Gonçalo Ramos","Pedro Neto","Rafael Leão"],
  cod: ["Lionel Mpasi","Axel Tuanzebe","Chancel Mbemba","Aaron Wan-Bissaka","Arthur Masuaku","Joris Kayembe","Charles Pickel","Ngal'ayel Mukau","Edo Kayembe","Samuel Moutoussamy","Noah Sadiki","Théo Bongonda","Meschak Elia","Yoane Wissa","Brian Cipenga","Fiston Mayele","Cédric Bakambu","Nathanaël Mbuku"],
  uzb: ["Utkir Yusupov","Farrukh Sayfiev","Sherzod Nasrullaev","Umar Eshmurodov","Khusniddin Alikulov","Rustamjon Ashurmatov","Khozhiakbar Alizhonov","Abdukodir Khusanov","Odildzhon Khamrobekov","Otabek Shukurov","Jamshid Iskanderov","Azizbek Turgunboev","Khozhimat Erkinov","Eldor Shomurodov","Oston Urunov","Jaloliddin Masharipov","Igor Sergeev","Abbosbek Fayzullaev"],
  col: ["Camilo Vargas","David Ospina","Dávinson Sánchez","Yerry Mina","Jhon Lucumí","Daniel Muñoz","Johan Mojica","Santiago Arias","Jefferson Lerma","Kevin Castaño","Richard Ríos","James Rodríguez","Juan Fernando Quintero","Jorge Carrascal","Jhon Arias","Jhon Córdoba","Luis Suárez","Luis Díaz"],
  eng: ["Jordan Pickford","John Stones","Marc Guéhi","Ezri Konsa","Dan Burn","Trent Alexander-Arnold","Reece James","Jordan Henderson","Declan Rice","Jude Bellingham","Cole Palmer","Morgan Rogers","Anthony Gordon","Phil Foden","Bukayo Saka","Harry Kane","Marcus Rashford","Ollie Watkins"],
  cro: ["Dominik Livakovic","Duje Caleta-Car","Joško Gvardiol","Luka Vušković","Josip Šutalo","Josip Stanišić","Kristijan Jakic","Luka Modric","Mateo Kovacic","Martin Baturina","Lovro Majer","Mario Pašalic","Petar Sucic","Ivan Perišić","Marco Pašalic","Ante Budimir","Andrej Kramaric","Franjo Ivanovic"],
  gha: ["Lawrence Ati Zigi","Mohammed Salisu","Alidu Seidu","Alexander Djiku","Tariq Lamptey","Gideon Mensah","Caleb Yirenkyi","Thomas Partey","Salis Abdul Samed","Kamaldeen Sulemana","Mohammed Kudus","Abdul Fatawu","Iñaki Williams","Jordan Ayew","André Ayew","Joseph Paintsil","Osman Bukari","Antoine Semenyo"],
  pan: ["Orlando Mosquera","Luis Mejía","Fidel Escobar","José Córdoba","Andrés Andrade","Michael Amir Murillo","Eric Davis","César Blackman","Cristian Martínez","Aníbal Godoy","Adalberto Carrasquilla","Carlos Harvey","Édgar Bárcenas","Ismael Díaz","José Fajardo","Cecilio Waterman","José Luis Rodríguez","Alberto Quintero"],
};

let counter = 1;
function buildStamps(): Stamp[] {
  const result: Stamp[] = [];
  for (const team of teams) {
    // Badge
    result.push({ id: `${team.id}-badge`, number: counter++, name: `Escudo ${team.name}`, teamId: team.id, rarity: "legendary" });
    // Team photo
    result.push({ id: `${team.id}-photo`, number: counter++, name: `Foto ${team.name}`, teamId: team.id, rarity: "rare" });
    // 18 players
    const names = players[team.id] || [];
    for (let i = 0; i < names.length; i++) {
      const rarity: Stamp["rarity"] = i <= 1 ? "legendary" : i <= 4 ? "rare" : "common";
      result.push({ id: `${team.id}-${i}`, number: counter++, name: names[i], teamId: team.id, rarity });
    }
  }
  return result;
}

export const stamps = buildStamps();

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getStampsByTeam(teamId: string): Stamp[] {
  return stamps.filter((s) => s.teamId === teamId);
}

export const totalStamps = stamps.length;
export const totalTeams = teams.length;
