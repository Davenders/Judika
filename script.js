const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

// Weiterleitungs-Router
const routes = [
  {
    keywords: ["kontakt", "telefon", "sprechzeiten"],
    hint: "Sie erreichen den Kontakt des Landesgerichts Falkenheim jetzt über unseren Discord‑Server.",
    linkText: "Zum Discord",
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

// KI-Antwort erzeugen
async function generateAIAnswer(question) {
  appendMessage("Judika", "Einen Moment, ich denke nach …", "judika");

  try {
    const response = await fetch("http://localhost:1234/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "your-model-name",
        messages: [
          { role: "system", content: "Du bist Judika, eine sachliche, höfliche Assistentin." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Ich konnte keine Antwort generieren.";

    appendMessage("Judika", answer, "judika");

  } catch (err) {
    appendMessage("Judika", "Es gab ein Problem beim Generieren der Antwort.", "judika");
  }
}

function handleUserQuestion(question) {
  const q = question.toLowerCase();

  // Weiterleitungslogik
  for (const route of routes) {
    if (route.keywords.some((k) => q.includes(k))) {
      appendLinkHint(route.hint, route.linkText, route.href);
      appendMessage(
        "Judika",
        "Wenn Sie weitere Fragen haben, helfe ich Ihnen gerne weiter.",
        "judika"
      );
      return;
    }
  }

  // KI-Antwort
  generateAIAnswer(question);
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
