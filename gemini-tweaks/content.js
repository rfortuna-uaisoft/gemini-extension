// Traduz as configurações em atributos e variáveis CSS no <html>.
// Todo o visual fica em gemini.css, que só reage a esses atributos.
const root = document.documentElement;
let ultimaFonteUrl = "";

function carregarFontes(s) {
  const familias = new Set();
  [s.fontOn && s.fontText, s.fontOn && s.codeFont].forEach((k) => {
    const gf = GT_FONTS[k]?.gf;
    if (gf) familias.add(gf);
  });
  const url = familias.size
    ? "https://fonts.googleapis.com/css2?" + [...familias].map((f) => "family=" + f).join("&") + "&display=swap"
    : "";
  if (url === ultimaFonteUrl) return;
  ultimaFonteUrl = url;

  let link = document.getElementById("gt-fonts");
  if (!url) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.id = "gt-fonts";
    link.rel = "stylesheet";
    (document.head || root).appendChild(link);
  }
  link.href = url;
}

function aplicar(s) {
  const on = s.enabled;
  root.dataset.gt = on ? "on" : "off";
  root.dataset.gtWidth = s.widthOn ? "on" : "off";
  root.dataset.gtInput = s.alignInput ? "on" : "off";
  root.dataset.gtFont = s.fontOn ? "on" : "off";
  root.dataset.gtTheme = s.themeOn ? s.theme : "off";
  root.dataset.gtDisclaimer = s.hideDisclaimer ? "hide" : "show";

  root.style.setProperty("--gt-width", s.width + "px");
  root.style.setProperty("--gt-font-size", s.fontSize + "px");
  root.style.setProperty("--gt-line-height", String(s.lineHeight));
  root.style.setProperty("--gt-font-text", GT_FONTS[s.fontText]?.stack ?? "inherit");
  root.style.setProperty("--gt-font-code", GT_FONTS[s.codeFont]?.stack ?? "inherit");

  carregarFontes({ ...s, fontOn: on && s.fontOn });
}

chrome.storage.sync.get(GT_DEFAULTS).then(aplicar);

chrome.storage.onChanged.addListener((_mudancas, area) => {
  if (area === "sync") chrome.storage.sync.get(GT_DEFAULTS).then(aplicar);
});
