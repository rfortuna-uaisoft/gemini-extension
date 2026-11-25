// Compartilhado entre content.js e popup.js (ambos carregam este arquivo antes).
const GT_DEFAULTS = {
  enabled: true,
  widthOn: true,
  width: 1100,
  alignInput: true,
  fontOn: true,
  fontText: "jetbrains",
  fontSize: 15,
  lineHeight: 1.7,
  codeFont: "jetbrains",
  themeOn: true,
  theme: "aurora",
  hideDisclaimer: false,
};

// Famílias do Google Fonts (a CSP do Gemini já permite fonts.googleapis.com).
const GT_FONTS = {
  default:    { label: "Padrão do Gemini", stack: null, gf: null },
  jetbrains:  { label: "JetBrains Mono",   stack: '"JetBrains Mono", "Cascadia Code", Consolas, monospace', gf: "JetBrains+Mono:wght@400;500;700" },
  fira:       { label: "Fira Code",        stack: '"Fira Code", "Cascadia Code", Consolas, monospace',      gf: "Fira+Code:wght@400;500;700" },
  plexmono:   { label: "IBM Plex Mono",    stack: '"IBM Plex Mono", Consolas, monospace',                   gf: "IBM+Plex+Mono:wght@400;500;700" },
  cascadia:   { label: "Cascadia Code (do Windows)", stack: '"Cascadia Code", "Cascadia Mono", Consolas, monospace', gf: null },
  inter:      { label: "Inter",            stack: '"Inter", "Segoe UI", sans-serif',                        gf: "Inter:wght@400;500;600;700" },
  plexsans:   { label: "IBM Plex Sans",    stack: '"IBM Plex Sans", "Segoe UI", sans-serif',                gf: "IBM+Plex+Sans:wght@400;500;600;700" },
};

const GT_THEMES = {
  aurora:   "Aurora (cores do logo)",
  dev:      "Dev Dark (estilo editor)",
  midnight: "Midnight (preto OLED)",
};
