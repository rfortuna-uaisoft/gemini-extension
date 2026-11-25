const CODE_FONTS = ["default", "jetbrains", "fira", "plexmono", "cascadia"];
const PREVIEWS = {
  aurora: "linear-gradient(135deg, #1d3573, #3c2f78 55%, #5b2742)",
  dev: "linear-gradient(135deg, #1e1e1e 60%, #4ec9b0)",
  midnight: "linear-gradient(135deg, #000 70%, #8ab4f8)",
};

const campos = [...document.querySelectorAll("[data-key]")];
let estado = { ...GT_DEFAULTS };

function ler(el) {
  if (el.type === "checkbox") return el.checked;
  if (el.type === "range") return Number(el.value);
  return el.value;
}

function escrever(el, valor) {
  if (el.type === "checkbox") el.checked = valor;
  else el.value = valor;
}

function preencherSelect(id, chaves) {
  const sel = document.getElementById(id);
  sel.replaceChildren(
    ...chaves.map((k) => Object.assign(document.createElement("option"), { value: k, textContent: GT_FONTS[k].label }))
  );
}

function montarTemas() {
  const caixa = document.getElementById("temas");
  caixa.replaceChildren(
    ...Object.entries(GT_THEMES).map(([chave, nome]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tema";
      b.dataset.tema = chave;
      const amostra = document.createElement("i");
      amostra.style.background = PREVIEWS[chave];
      b.append(amostra, nome.split(" (")[0]);
      b.title = nome;
      b.addEventListener("click", () => salvar("theme", chave));
      return b;
    })
  );
}

// Reflete o estado na tela (valores, saídas numéricas, seções apagadas, tema ativo).
function desenhar() {
  campos.forEach((el) => escrever(el, estado[el.dataset.key]));
  document.querySelectorAll("[data-out]").forEach((o) => {
    o.textContent = estado[o.dataset.out] + (o.dataset.suf ?? "");
  });
  document.getElementById("opcoes").classList.toggle("off", !estado.enabled);
  document.querySelectorAll("section[data-sec]").forEach((s) => {
    s.classList.toggle("off", !estado[s.dataset.sec]);
  });
  document.querySelectorAll(".tema").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.tema === estado.theme));
  });
}

function salvar(chave, valor) {
  estado[chave] = valor;
  chrome.storage.sync.set({ [chave]: valor });
  desenhar();
}

campos.forEach((el) => {
  el.addEventListener("input", () => salvar(el.dataset.key, ler(el)));
});

document.getElementById("restaurar").addEventListener("click", () => {
  estado = { ...GT_DEFAULTS };
  chrome.storage.sync.set(GT_DEFAULTS);
  desenhar();
});

preencherSelect("fontText", Object.keys(GT_FONTS).filter((k) => k !== "cascadia"));
preencherSelect("codeFont", CODE_FONTS);
montarTemas();

chrome.storage.sync.get(GT_DEFAULTS).then((salvo) => {
  estado = salvo;
  desenhar();
});
