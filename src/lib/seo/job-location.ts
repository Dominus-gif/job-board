/**
 * Turn a board location string into the geographic areas Google will accept in
 * `applicantLocationRequirements`.
 *
 * Why this exists: a JobPosting marked `jobLocationType: "TELECOMMUTE"` must
 * name at least one real place applicants can be in. We were passing the raw
 * board string straight through, so Google was reading areas called "Remote",
 * "Remote - US", "SF Office" and "Anywhere in the World" — none of which is a
 * place. With no usable area and no `jobLocation` either, the posting has
 * neither of the two properties Google accepts, which is what Search Console
 * reports.
 *
 * The job is only ever to name the COUNTRY (or the multi-country region) an
 * applicant may live in. We deliberately do not try to reconstruct a street
 * address: these are remote roles, the city in the string is the employer's
 * anchor rather than somewhere the employee reports, and Google does not want
 * `jobLocation` when `applicantLocationRequirements` is present.
 *
 * Matching is done on a normalised, space-padded string with plain substring
 * containment rather than regular expressions, which gives word boundaries for
 * free and keeps the tables readable.
 */

/** A geographic area as Google accepts it inside applicantLocationRequirements. */
export interface ApplicantArea {
  "@type": "Country" | "AdministrativeArea";
  name: string;
}

/**
 * Lowercase, accent-folded, punctuation-free, space-padded — so
 * `includes(" us ")` is word-bounded without a regular expression, and
 * "München" / "São Paulo" / "Bogotá" reach the same keys as their plain
 * spellings. Folding before stripping matters: dropping the accented letter
 * outright would leave "m nchen".
 */
const LETTER_FOLD: Record<string, string> = {
  "ł": "l", "ø": "o", "æ": "ae", "ß": "ss", "đ": "d", "ð": "d", "þ": "th",
};

function norm(s: string): string {
  // NFD strips combining accents, but letters that are their own codepoint
  // (Polish l-stroke, Nordic slashed o) survive it and would break the token.
  const folded = s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[łøæßđðþ]/g, (c) => LETTER_FOLD[c]);
  return ` ${folded.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim()} `;
}

/**
 * Country name -> the aliases that appear in the wild. The canonical key is
 * what we emit, so it stays a name Google can resolve.
 */
const COUNTRY_ALIASES: Record<string, string[]> = {
  // No bare "america": it is a substring token of "North America", "Latin
  // America" and "South America", every one of which would then be read as the
  // United States.
  "United States": ["united states", "united states of america", "usa", "u s a", "us", "u s", "stateside"],
  "United Kingdom": [
    "united kingdom", "uk", "u k", "great britain", "britain", "england", "scotland", "wales",
    "northern ireland",
  ],
  Canada: ["canada"],
  Germany: ["germany", "deutschland"],
  France: ["france"],
  Spain: ["spain", "espana"],
  Portugal: ["portugal"],
  Netherlands: ["netherlands", "the netherlands", "holland"],
  Belgium: ["belgium"],
  Luxembourg: ["luxembourg"],
  Ireland: ["ireland", "republic of ireland"],
  Italy: ["italy", "italia"],
  Poland: ["poland", "polska"],
  Romania: ["romania"],
  Bulgaria: ["bulgaria"],
  Czechia: ["czechia", "czech republic"],
  Slovakia: ["slovakia"],
  Hungary: ["hungary"],
  Austria: ["austria", "osterreich"],
  Switzerland: ["switzerland", "schweiz", "suisse"],
  Sweden: ["sweden", "sverige"],
  Norway: ["norway", "norge"],
  Denmark: ["denmark", "danmark"],
  Finland: ["finland", "suomi"],
  Iceland: ["iceland"],
  Estonia: ["estonia"],
  Latvia: ["latvia"],
  Lithuania: ["lithuania"],
  Greece: ["greece"],
  Croatia: ["croatia"],
  Serbia: ["serbia", "srb"],
  Slovenia: ["slovenia"],
  Ukraine: ["ukraine"],
  Turkey: ["turkey", "turkiye"],
  Cyprus: ["cyprus"],
  Malta: ["malta"],
  India: ["india"],
  China: ["china", "mainland china"],
  Japan: ["japan"],
  "South Korea": ["south korea", "korea", "republic of korea"],
  Singapore: ["singapore"],
  Malaysia: ["malaysia"],
  Indonesia: ["indonesia"],
  Thailand: ["thailand"],
  Vietnam: ["vietnam", "viet nam"],
  Philippines: ["philippines", "the philippines"],
  Taiwan: ["taiwan"],
  "Hong Kong": ["hong kong"],
  Australia: ["australia"],
  "New Zealand": ["new zealand"],
  Brazil: ["brazil", "brasil"],
  Mexico: ["mexico"],
  Argentina: ["argentina"],
  Chile: ["chile"],
  Colombia: ["colombia"],
  Peru: ["peru"],
  Uruguay: ["uruguay"],
  "Costa Rica": ["costa rica"],
  Panama: ["panama"],
  Ecuador: ["ecuador"],
  "South Africa": ["south africa"],
  Nigeria: ["nigeria"],
  Kenya: ["kenya"],
  Egypt: ["egypt"],
  Ghana: ["ghana"],
  Morocco: ["morocco"],
  "United Arab Emirates": ["united arab emirates", "uae", "emirates"],
  "Saudi Arabia": ["saudi arabia", "saudi"],
  Israel: ["israel"],
  Qatar: ["qatar"],
  Jordan: ["jordan"],
  Pakistan: ["pakistan"],
  Bangladesh: ["bangladesh"],
  "Sri Lanka": ["sri lanka"],
  Nepal: ["nepal"],
  Armenia: ["armenia"],
  Azerbaijan: ["azerbaijan"],
  Kazakhstan: ["kazakhstan"],
  Uzbekistan: ["uzbekistan"],
  Moldova: ["moldova"],
  Belarus: ["belarus"],
  Albania: ["albania"],
  "Bosnia and Herzegovina": ["bosnia", "bosnia and herzegovina", "herzegovina"],
  "North Macedonia": ["north macedonia", "macedonia"],
  Montenegro: ["montenegro"],
  Kosovo: ["kosovo"],
  Guatemala: ["guatemala"],
  Honduras: ["honduras"],
  "El Salvador": ["el salvador"],
  Nicaragua: ["nicaragua"],
  "Dominican Republic": ["dominican republic"],
  Jamaica: ["jamaica"],
  "Trinidad and Tobago": ["trinidad", "trinidad and tobago"],
  Bolivia: ["bolivia"],
  Paraguay: ["paraguay"],
  Venezuela: ["venezuela"],
  Kuwait: ["kuwait"],
  Bahrain: ["bahrain"],
  Oman: ["oman"],
  Lebanon: ["lebanon"],
  Tunisia: ["tunisia"],
  Algeria: ["algeria"],
  Ethiopia: ["ethiopia"],
  Tanzania: ["tanzania"],
  Uganda: ["uganda"],
  Rwanda: ["rwanda"],
  Senegal: ["senegal"],
  Zimbabwe: ["zimbabwe"],
  Zambia: ["zambia"],
  Cameroon: ["cameroon"],
  Mauritius: ["mauritius"],
  Myanmar: ["myanmar"],
  Cambodia: ["cambodia"],
  Laos: ["laos"],
  Mongolia: ["mongolia"],
  Brunei: ["brunei"],
  Maldives: ["maldives"],
  Bhutan: ["bhutan"],
  Fiji: ["fiji"],
  "Papua New Guinea": ["papua new guinea"],
  Bahamas: ["bahamas"],
  "Cayman Islands": ["cayman islands"],
  Niger: ["niger"],
  Barbados: ["barbados"],
  // "Georgia" on its own is far more often the US state on this board, so the
  // country only answers to a disambiguated spelling.
  Georgia: ["georgia country", "republic of georgia"],
};

/**
 * City -> country, for strings that name only a city. Deliberately limited to
 * hubs that actually appear on the board; anything unrecognised falls through
 * rather than being guessed at.
 */
const CITY_COUNTRY: Record<string, string> = {};
const addCities = (country: string, cities: string[]) => {
  for (const c of cities) CITY_COUNTRY[c] = country;
};

addCities("United States", [
  "san francisco", "sf", "south san francisco", "san francisco bay area", "bay area", "silicon valley",
  "new york", "new york city", "nyc", "brooklyn", "manhattan", "queens", "jersey city", "newark",
  "boston", "cambridge ma", "somerville", "devens", "waltham", "burlington ma",
  "seattle", "bellevue", "everett", "redmond", "kirkland", "tacoma",
  "austin", "dallas", "houston", "plano", "irving", "san antonio", "fort worth",
  "chicago", "evanston", "naperville",
  "los angeles", "santa monica", "pasadena", "irvine", "long beach", "burbank", "culver city",
  "san jose", "san mateo", "san carlos", "sunnyvale", "santa clara", "mountain view", "menlo park",
  "palo alto", "redwood city", "foster city", "cupertino", "fremont", "pleasanton", "milpitas",
  "berkeley", "oakland", "emeryville", "sacramento", "san diego", "carlsbad", "fresno",
  "denver", "boulder", "colorado springs",
  "atlanta", "charlotte", "raleigh", "durham", "nashville", "miami", "orlando", "tampa", "jacksonville",
  "washington dc", "arlington va", "alexandria va", "reston", "mclean", "bethesda", "herndon", "tysons",
  "philadelphia", "pittsburgh", "baltimore", "columbus", "cleveland", "cincinnati", "indianapolis",
  "detroit", "ann arbor", "minneapolis", "st paul", "madison", "milwaukee",
  "kansas city", "st louis", "omaha", "des moines",
  "salt lake city", "provo", "lehi", "las vegas", "reno", "phoenix", "scottsdale", "tempe", "chandler",
  "portland", "eugene", "boise",
  "richmond va", "norfolk", "stamford", "hartford", "princeton", "trenton", "hoboken",
  "honolulu", "anchorage", "albuquerque", "tucson", "oklahoma city", "tulsa", "memphis", "louisville",
  "new orleans", "birmingham al", "charleston", "savannah", "greenville",
  "bronx", "staten island", "research triangle park", "cottonwood heights", "hillsborough county",
  "ventura", "wilmington", "san fran", "durham nc", "provo ut",
]);
addCities("United Kingdom", [
  "london", "greater london", "shoreditch", "manchester", "birmingham", "edinburgh", "glasgow",
  "bristol", "leeds", "oxford", "brighton", "cardiff", "belfast", "reading", "sheffield",
  "nottingham", "liverpool", "newcastle", "cambridge uk", "milton keynes", "maidenhead", "basingstoke", "coventry", "southampton",
]);
addCities("Germany", [
  "berlin", "munich", "munchen", "hamburg", "frankfurt", "cologne", "koln", "stuttgart",
  "dusseldorf", "leipzig", "dresden", "karlsruhe", "nuremberg", "nurnberg", "bonn", "hannover",
  "mannheim", "bremen", "essen", "potsdam", "bochum", "bad homburg", "mainz", "munster",
  "osnabruck", "freiburg", "freiburg im breisgau", "lubeck", "wurzburg", "augsburg", "kiel",
  "darmstadt", "heidelberg", "wiesbaden", "aachen", "jena", "erlangen",
]);
addCities("France", ["paris", "lyon", "marseille", "toulouse", "bordeaux", "lille", "nantes", "nice", "montpellier", "rennes", "grenoble", "strasbourg", "saint denis", "sophia antipolis", "nancy", "toulon", "le mans", "poitiers", "tours", "beaune", "dijon", "angers"]);
addCities("Spain", ["madrid", "barcelona", "valencia", "seville", "sevilla", "malaga", "bilbao", "zaragoza", "alicante", "palma"]);
addCities("Portugal", ["lisbon", "lisboa", "porto", "braga", "coimbra", "funchal"]);
addCities("Netherlands", ["amsterdam", "rotterdam", "utrecht", "eindhoven", "the hague", "den haag", "delft", "groningen", "amstelveen", "alkmaar", "roosendaal", "haarlem", "tilburg", "breda", "nijmegen", "enschede"]);
addCities("Belgium", ["brussels", "bruxelles", "antwerp", "antwerpen", "ghent", "gent", "leuven"]);
addCities("Ireland", ["dublin", "cork", "galway", "limerick"]);
addCities("Italy", ["milan", "milano", "rome", "roma", "turin", "torino", "bologna", "florence", "firenze", "naples", "napoli", "padova", "verona"]);
addCities("Poland", ["warsaw", "warszawa", "krakow", "cracow", "wroclaw", "gdansk", "poznan", "lodz", "katowice", "szczecin"]);
addCities("Czechia", ["prague", "praha", "brno", "ostrava"]);
addCities("Austria", ["vienna", "wien", "graz", "linz", "salzburg", "innsbruck"]);
addCities("Switzerland", ["zurich", "geneva", "geneve", "basel", "bern", "lausanne", "lugano", "zug", "winterthur"]);
addCities("Sweden", ["stockholm", "gothenburg", "goteborg", "malmo", "uppsala", "lund"]);
addCities("Norway", ["oslo", "bergen", "trondheim", "stavanger"]);
addCities("Denmark", ["copenhagen", "kobenhavn", "aarhus", "odense"]);
addCities("Finland", ["helsinki", "espoo", "tampere", "oulu", "turku"]);
addCities("Estonia", ["tallinn", "tartu"]);
addCities("Latvia", ["riga"]);
addCities("Lithuania", ["vilnius", "kaunas"]);
addCities("Greece", ["athens", "thessaloniki"]);
addCities("Romania", ["bucharest", "bucuresti", "cluj", "cluj napoca", "timisoara", "iasi", "brasov"]);
addCities("Bulgaria", ["sofia", "plovdiv", "varna", "burgas"]);
addCities("Hungary", ["budapest", "debrecen", "szeged"]);
addCities("Serbia", ["belgrade", "beograd", "novi sad", "nis"]);
addCities("Croatia", ["zagreb", "split", "rijeka", "osijek"]);
addCities("Slovenia", ["ljubljana", "maribor"]);
addCities("Slovakia", ["bratislava", "kosice"]);
addCities("Ukraine", ["kyiv", "kiev", "lviv", "kharkiv", "odesa", "odessa", "dnipro"]);
addCities("Turkey", ["istanbul", "ankara", "izmir", "antalya"]);
addCities("Cyprus", ["nicosia", "limassol"]);
addCities("Canada", [
  "toronto", "vancouver", "montreal", "ottawa", "calgary", "edmonton", "waterloo", "kitchener",
  "halifax", "victoria bc", "winnipeg", "quebec city", "mississauga", "burnaby", "markham", "hamilton on",
  "port coquitlam", "coquitlam", "richmond bc", "surrey bc", "laval", "gatineau", "kelowna",
]);
addCities("India", [
  "bangalore", "bengaluru", "mumbai", "delhi", "new delhi", "gurgaon", "gurugram", "noida",
  "hyderabad", "chennai", "pune", "kolkata", "ahmedabad", "jaipur", "kochi", "coimbatore",
  "indore", "chandigarh", "trivandrum", "thiruvananthapuram", "vijayawada", "visakhapatnam", "mysore", "nagpur",
]);
addCities("Japan", ["tokyo", "osaka", "kyoto", "yokohama", "nagoya", "fukuoka", "sapporo", "kobe"]);
addCities("South Korea", ["seoul", "busan", "incheon", "seongnam", "pangyo"]);
addCities("China", ["beijing", "shanghai", "shenzhen", "guangzhou", "hangzhou", "chengdu", "suzhou", "wuhan"]);
addCities("Taiwan", ["taipei", "hsinchu", "kaohsiung"]);
addCities("Malaysia", ["kuala lumpur", "penang", "cyberjaya", "johor bahru"]);
addCities("Indonesia", ["jakarta", "bandung", "bali", "denpasar", "surabaya", "yogyakarta"]);
addCities("Thailand", ["bangkok", "chiang mai", "phuket"]);
addCities("Vietnam", ["ho chi minh", "ho chi minh city", "hanoi", "da nang", "saigon"]);
addCities("Philippines", ["manila", "makati", "cebu", "taguig", "quezon city", "bgc", "pasig", "davao"]);
addCities("Australia", ["sydney", "melbourne", "brisbane", "perth", "adelaide", "canberra", "gold coast", "hobart"]);
addCities("New Zealand", ["auckland", "wellington", "christchurch", "hamilton nz"]);
addCities("Brazil", [
  "sao paulo", "rio de janeiro", "belo horizonte", "curitiba", "porto alegre", "brasilia",
  "recife", "florianopolis", "campinas", "fortaleza", "salvador",
]);
addCities("Mexico", ["mexico city", "ciudad de mexico", "cdmx", "guadalajara", "monterrey", "queretaro", "puebla", "merida"]);
addCities("Argentina", ["buenos aires", "cordoba", "rosario", "mendoza", "la plata"]);
addCities("Chile", ["santiago", "valparaiso"]);
addCities("Colombia", ["bogota", "medellin", "cali", "barranquilla", "cartagena"]);
addCities("Peru", ["lima", "arequipa"]);
addCities("Uruguay", ["montevideo"]);
addCities("Costa Rica", ["heredia", "alajuela"]);
addCities("Israel", ["tel aviv", "jerusalem", "haifa", "herzliya", "ramat gan", "netanya"]);
addCities("United Arab Emirates", ["dubai", "abu dhabi", "sharjah"]);
addCities("Saudi Arabia", ["riyadh", "jeddah", "dammam", "king abdullah economic city"]);
addCities("Qatar", ["doha"]);
addCities("Egypt", ["cairo", "alexandria", "giza"]);
addCities("Nigeria", ["lagos", "abuja", "ibadan"]);
addCities("Kenya", ["nairobi", "mombasa"]);
addCities("South Africa", ["cape town", "johannesburg", "durban", "pretoria", "sandton"]);
addCities("Ghana", ["accra"]);
addCities("Morocco", ["casablanca", "rabat", "marrakech"]);
addCities("Pakistan", ["karachi", "lahore", "islamabad"]);
addCities("Bangladesh", ["dhaka"]);
addCities("Sri Lanka", ["colombo"]);
addCities("Nepal", ["kathmandu"]);
addCities("Armenia", ["yerevan"]);
addCities("Georgia", ["tbilisi"]);
addCities("Singapore", ["singapore"]);
addCities("Hong Kong", ["hong kong", "kowloon"]);
addCities("Luxembourg", ["luxembourg city"]);
addCities("Iceland", ["reykjavik"]);

/** Two-letter codes, only honoured after a comma or dash and only in caps. */
const US_STATE_CODES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
  "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
  "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
  "WI", "WY", "DC",
]);
const CA_PROVINCE_CODES = new Set(["ON", "QC", "BC", "AB", "MB", "SK", "NS", "NB", "NL", "PE", "YT", "NT", "NU"]);

const US_STATE_NAMES = [
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware",
  "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana",
  "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana",
  "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "north carolina", "north dakota",
  "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota",
  "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin",
  "wyoming", "district of columbia",
];

/** Sub-national names that identify a country on their own. */
const SUBNATIONAL: Record<string, string> = {
  ontario: "Canada", quebec: "Canada", "british columbia": "Canada", alberta: "Canada",
  manitoba: "Canada", saskatchewan: "Canada", "nova scotia": "Canada", "new brunswick": "Canada",
  newfoundland: "Canada", "prince edward island": "Canada",
  "andhra pradesh": "India", karnataka: "India", maharashtra: "India", "tamil nadu": "India",
  telangana: "India", kerala: "India", gujarat: "India", haryana: "India", punjab: "India",
  "uttar pradesh": "India", "west bengal": "India", rajasthan: "India",
  bavaria: "Germany", bayern: "Germany", hessen: "Germany", "nordrhein westfalen": "Germany",
  "new south wales": "Australia", queensland: "Australia", "western australia": "Australia",
  catalonia: "Spain", cataluna: "Spain", andalusia: "Spain",
  "sao paulo state": "Brazil", "ile de france": "France",
};

/**
 * Multi-country regions. Emitted as `AdministrativeArea` because that is what
 * they are — a continent is not a country, and inventing a country for it
 * would be worse markup than naming the region honestly.
 */
const REGION_ALIASES: { name: string; aliases: string[] }[] = [
  { name: "Europe", aliases: ["europe", "european union", "eu", "eea", "emea", "european economic area"] },
  { name: "Europe", aliases: ["dach", "benelux", "nordics", "nordic", "scandinavia", "cee", "central europe", "eastern europe", "western europe", "southern europe"] },
  { name: "North America", aliases: ["north america", "namer", "northern america"] },
  { name: "Latin America", aliases: ["latin america", "latam", "south america", "central america"] },
  { name: "Americas", aliases: ["americas", "amer"] },
  { name: "Asia-Pacific", aliases: ["apac", "asia pacific", "asia", "southeast asia", "south east asia", "anz"] },
  { name: "Middle East", aliases: ["middle east", "mena", "gulf"] },
  { name: "Africa", aliases: ["africa", "sub saharan africa"] },
];

/** How many areas we are willing to list before the markup stops being useful. */
const MAX_AREAS = 8;

function matchCountries(hay: string): string[] {
  const out: string[] = [];
  for (const [country, aliases] of Object.entries(COUNTRY_ALIASES)) {
    if (aliases.some((a) => hay.includes(` ${a} `))) out.push(country);
  }
  return out;
}

/** ISO-3166 alpha-2 codes that turn up as a lowercase suffix ("München, de"). */
const ISO2_COUNTRY: Record<string, string> = {
  us: "United States", gb: "United Kingdom", ca: "Canada", de: "Germany", fr: "France",
  es: "Spain", pt: "Portugal", nl: "Netherlands", be: "Belgium", ie: "Ireland", it: "Italy",
  pl: "Poland", ro: "Romania", bg: "Bulgaria", cz: "Czechia", sk: "Slovakia", hu: "Hungary",
  at: "Austria", ch: "Switzerland", se: "Sweden", no: "Norway", dk: "Denmark", fi: "Finland",
  is: "Iceland", ee: "Estonia", lv: "Latvia", lt: "Lithuania", gr: "Greece", hr: "Croatia",
  rs: "Serbia", si: "Slovenia", ua: "Ukraine", tr: "Turkey", cy: "Cyprus", mt: "Malta",
  in: "India", cn: "China", jp: "Japan", kr: "South Korea", sg: "Singapore", my: "Malaysia",
  id: "Indonesia", th: "Thailand", vn: "Vietnam", ph: "Philippines", tw: "Taiwan", hk: "Hong Kong",
  au: "Australia", nz: "New Zealand", br: "Brazil", mx: "Mexico", ar: "Argentina", cl: "Chile",
  co: "Colombia", pe: "Peru", uy: "Uruguay", cr: "Costa Rica", pa: "Panama", ec: "Ecuador",
  za: "South Africa", ng: "Nigeria", ke: "Kenya", eg: "Egypt", gh: "Ghana", ma: "Morocco",
  ae: "United Arab Emirates", sa: "Saudi Arabia", il: "Israel", qa: "Qatar", jo: "Jordan",
  pk: "Pakistan", bd: "Bangladesh", lk: "Sri Lanka", np: "Nepal", lu: "Luxembourg",
};

/**
 * Two-letter codes, read only where one genuinely appears: after a comma,
 * dash or opening bracket. Without that anchor "remote OR hybrid" reads as
 * Oregon and "work IN Berlin" as Indiana.
 *
 * Case decides which table wins, because that is how the sources actually
 * write them: "Austin, TX" is a US state, "München, de" is a country code.
 */
function matchCodes(original: string): string[] {
  const out = new Set<string>();
  for (const m of original.matchAll(/[,(–—-]\s*([A-Za-z]{2})(?![A-Za-z])/g)) {
    const token = m[1];
    const lower = token.toLowerCase();
    const upper = token.toUpperCase();
    const lowercaseWritten = token === lower;
    if (lowercaseWritten && ISO2_COUNTRY[lower]) out.add(ISO2_COUNTRY[lower]);
    else if (US_STATE_CODES.has(upper)) out.add("United States");
    else if (CA_PROVINCE_CODES.has(upper)) out.add("Canada");
    else if (ISO2_COUNTRY[lower]) out.add(ISO2_COUNTRY[lower]);
  }
  return [...out];
}

function matchCities(hay: string): string[] {
  const out = new Set<string>();
  for (const [city, country] of Object.entries(CITY_COUNTRY)) {
    if (hay.includes(` ${city} `)) out.add(country);
  }
  return [...out];
}

function matchRegions(hay: string): string[] {
  const out: string[] = [];
  for (const { name, aliases } of REGION_ALIASES) {
    if (!out.includes(name) && aliases.some((a) => hay.includes(` ${a} `))) out.push(name);
  }
  return out;
}

/**
 * The areas an applicant for this listing may be located in, or an empty array
 * when the board string names no place at all (a bare "Remote", an office
 * nickname). An empty result is a signal to the caller, not a failure: a
 * TELECOMMUTE posting with no real area is markup Google rejects, so the right
 * response upstream is to publish no JobPosting block rather than a broken one.
 */
export function applicantAreas(location: string, scope: "worldwide" | "regional"): ApplicantArea[] {
  if (scope === "worldwide") return [{ "@type": "Country", name: "Worldwide" }];

  const raw = location || "";
  const hay = norm(raw);
  if (!hay.trim()) return [];

  // An explicitly named country wins outright: "San José, Costa Rica" must not
  // also pick up San Jose, California from the city table.
  const countries = matchCountries(hay);
  if (countries.length === 0) {
    const add = (c: string) => {
      if (!countries.includes(c)) countries.push(c);
    };
    // Cities before state names, so "Tbilisi, Georgia" is the country and a
    // bare "Georgia" is still the state.
    for (const c of matchCities(hay)) add(c);
    for (const [name, country] of Object.entries(SUBNATIONAL)) if (hay.includes(` ${name} `)) add(country);
    if (countries.length === 0 && US_STATE_NAMES.some((s) => hay.includes(` ${s} `))) add("United States");
    for (const c of matchCodes(raw)) add(c);
  }

  if (countries.length > 0) {
    return countries.slice(0, MAX_AREAS).map((name) => ({ "@type": "Country" as const, name }));
  }

  return matchRegions(hay)
    .slice(0, MAX_AREAS)
    .map((name) => ({ "@type": "AdministrativeArea" as const, name }));
}
