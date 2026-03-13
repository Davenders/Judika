const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

// einfache Keyword-Router für "Weiterleitung"
const routes = [
  {
    keywords: ["kontakt", "telefon", "sprechzeiten"],
    hint: "Informationen zum Kontakt des Landesgerichts Falkenheim finden Sie im Bereich „Kontakt“ der Website.",
    linkText: "Zur Kontaktseite",
    href: "https://discord.gg/D3NNuyJUre"
  },
  {
    keywords: ["organisation", "aufbau", "abteilungen"],
    hint: "Details zur Organisation des Landesgerichts Falkenheim finden Sie im Bereich „Organisation“.",
    linkText: "Zur Organisationsseite",
    href: "#organisation"
  },
  {
    keywords: ["rechtsprechung", "urteil", "urteile"],
    hint: "Hinweise zur Rechtsprechung im Falkenheim‑Modell finden Sie im Bereich „Rechtsprechung“.",
    linkText: "Zur Rechtsprechungsseite",
    href: "#rechtsprechung"
  }
];

const systemNotice =
  "Hinweis: Judika darf ausschließlich Informationen aus dem Gesetzbuch Falkenheim " +
  "und den Inhalten der Website des Landesgerichts Falkenheim verwenden. " +
  "Sie ersetzt keine Rechtsberatung und ist nicht für reale Gesetzbücher der Bundesrepublik Deutschland zugelassen.";

function appendMessage(author, text, type = "judika") {
  const wrapper = document.createElement("div");
  wrapper.className = `message message-${type}`;

  const authorEl = document.createElement("div");
  authorEl.className = "message-author";
  authorEl.textContent = author;

  const textEl = document.createElement("div");
  textEl.className = "message-text";
  textEl.textContent = text;

  wrapper.appendChild(authorEl);
  wrapper.appendChild(textEl);
  chatLog.appendChild(wrapper);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function appendLinkHint(hint, linkText, href) {
  const wrapper = document.createElement("div");
  wrapper.className = "message message-judika";

  const authorEl = document.createElement("div");
  authorEl.className = "message-author";
  authorEl.textContent = "Judika";

  const textEl = document.createElement("div");
  textEl.className = "message-text";

  const p = document.createElement("p");
  p.textContent = hint;

  const a = document.createElement("a");
  a.href = href;
  a.textContent = linkText;
  a.style.color = "#3b82f6";
  a.style.textDecoration = "none";

  textEl.appendChild(p);
  textEl.appendChild(a);

  wrapper.appendChild(authorEl);
  wrapper.appendChild(textEl);
  chatLog.appendChild(wrapper);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleUserQuestion(question) {
  const q = question.toLowerCase();

  // einfache Weiterleitungslogik
  for (const route of routes) {
    if (route.keywords.some((k) => q.includes(k))) {
      appendLinkHint(route.hint, route.linkText, route.href);
      appendMessage(
        "Judika",
        "Bitte beachten Sie: Für verbindliche Auskünfte wenden Sie sich an das zuständige Personal des Landesgerichts Falkenheim.",
        "judika"
      );
      return;
    }
  }

  // generische Antwort – hier könntest du später Gemini / API einbauen
  appendMessage(
    "Judika",
    "Ich kann Ihre Frage nur im Rahmen des Falkenheim‑Gesetzbuchs beantworten. " +
      "Bitte prüfen Sie den entsprechenden Paragraphen im Gesetzbuch Falkenheim oder konkretisieren Sie Ihre Frage. " +
      "Bei komplexen oder individuellen Anliegen wenden Sie sich bitte direkt an das Personal des Landesgerichts Falkenheim.",
    "judika"
  );

  appendMessage("Hinweis", systemNotice, "judika");
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;

  appendMessage("Sie", value, "user");
  chatInput.value = "";

  setTimeout(() => {
    handleUserQuestion(value);
  }, 400);
});
