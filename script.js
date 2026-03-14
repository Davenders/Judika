const chatForm = document.getElementById("chat-form"); 
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log"); 

//Weiterleitung Router 
const routes = [
  {
    keyword: ["kontakt", "telefon", "sprechzeiten"],
    hint: "Sie erreichen den Kontakt des Landesgerichts Falkenheim jetzt über unseren Discord-Server.",
    linkText: "Zum Discord", 
    href: "https://discord.gg/D3NNuyJUre" 
  },
  { 
    keywords: ["organisation", "aufbau", "abteilungen"],
    hint: "Details zur Organisation des Landesgerichts Falkenheim finden Sie im Bereich "Organisation".",
    linkText: "Zur Organisationsseite", 
    href: "#organisation" 
  },
  {
    keywords: ["rechtsprechung", "urteil", "urteile"],
    hint: "Hinweise zur Rechtsprechung im Falkenheim-Modell finden Sie im Bereich "Rechtsprechung".",
    linkText: "Zur Rechtsprechungsseite",
    href: "#rechtsprechung"
  }
  ];
function appendMessage(author, text, type = "judika") 
{
  const wrapper = document.createElement("div");
  wrapper.className = ´message message -${type}´;

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

function appendLinkHint(hint, linkText, href) 
{
  const wrapper = document.createElement("div");
        wrapper.className = "message message-judika"; 

const author El = document.createElement("div");
  authorEl.className = "message-author";
  authorEl.textContent = "Judika"; 

const textEl = document.createElement("div");
  textEl.className = "message-text"; 

const p = document.createElement("p"); 
p.textContent = hint; 

cont a = document.createElement("a"); 
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

//Standardantwort solange API nicht funktioniert: 

async function generateAIAnswer(question) 
{
  const fixedAnswer = "Derzeit kann ich leider keine Antwort geben. Wenden Sie sich bitte über den E‑Mail‑Verteiler an die zuständige Fachperson. Diese wird Ihre Anfrage prüfen und entsprechend beantworten. Sollten Sie noch nicht in den E‑Mail‑Verteiler aufgenommen sein, können Sie diesem über den Menüpunkt „Kontakt“ beitreten.";

  appendMessage("Judika", fixedAnswer, "judika"); 
}

  function handleUserQuestion(question) 
  {
    const q = question.toLowerCase();

  //Weiterleitung 
for (const route of routes) 
{
  if (route.keywords.some((k) => q.includes(k))) 
  {
    appendLinkHInt(route.hint, route.linkText, route.href); 
    appendMessage("Judika", 
                  "Wenn Sie weitere Fragen haben, helfe ich Ihnen gerne weiter.", 
                  "judika"
                  ); 
    return; 
  }
}

    //Feste Antwort loly

  generateAIAnswer(question); 
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const value = chatInput.value.trim(); 
    if (!value) return; 

    appendMessage("Sie", value, "user); 
    chatInput.value = ""; 

    setTimeout(() => {
      handleUserQuestion(value); 
    }, 400); 
  }); 
    
                  
    

  
