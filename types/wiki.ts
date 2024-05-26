enum Language {
  Bengali = "bn",
  German = "de",
  Greek = "el",
  English = "en",
  Hebrew = "he",
  Hungarian = "hu",
  Japanese = "ja",
  Latin = "la",
  Sindhi = "sd",
  Swedish = "sv",
  Urdu = "ur",
  Chinese = "zh",
}

const LANG_LIST: Array<{ name: string; value: string }> = [];

for (const [key, value] of Object.entries(Language)) {
  LANG_LIST.push({ name: key, value });
}

export { LANG_LIST, Language };
