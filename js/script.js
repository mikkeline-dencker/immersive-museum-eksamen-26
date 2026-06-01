// Array med spg og svar
const spg = [
  {
    spg: "Hvad er din absolut største styrke?",
    svar: [
      {
        tekst: "Min evne til at tænke kreativt og skabe min egen stil",
        dukke: "Lulu",
      },
      {
        tekst: "Min dybe intuition og evne til at gennemskue svære ting",
        dukke: "Sinhu",
      },
      {
        tekst: "Min varme for mennesker og evnen til at få folk til at grine",
        dukke: "Pupparpasta",
      },
      {
        tekst: "Min loyalitet og evne til at passe på dem omkring mig",
        dukke: "Verda",
      },
    ],
  },
  {
    spg: "Hvad ønsker du dig mere af?",
    svar: [
      { tekst: "Plads til at være mig selv", dukke: "Lulu" },
      { tekst: "Ro og tid til at fordybe sig i interesser", dukke: "Sinhu" },
      { tekst: "Hyggelige stunder med venner", dukke: "Verda" },
      { tekst: "Frihed til at bryde ud og opleve verden", dukke: "Dragen" },
    ],
  },
  {
    spg: "Hvor trives du allerbedst?",
    svar: [
      { tekst: "Hvor der er varme og tryghed", dukke: "Pupparpasta" },
      { tekst: "I et kreativt rum", dukke: "Lulu" },
      { tekst: "I godt selskab", dukke: "Verda" },
      { tekst: "Hvor der er total frihed", dukke: "Dragen" },
    ],
  },
  {
    spg: "Hvad gør dig mest glad?",
    svar: [
      {
        tekst: "At kunne slappe af, læse en bog og en skål slik",
        dukke: "Sinhu",
      },
      { tekst: "At være omringet af dem jeg holder af", dukke: "Pupparpasta" },
      { tekst: "At gøre en ven glad", dukke: "Verda" },
      { tekst: "Følelsen af at være fri", dukke: "Dragen" },
    ],
  },
  {
    spg: "Hvordan slapper du bedst af?",
    svar: [
      { tekst: "Ved at komme ud under den blå himmel", dukke: "Dragen" },
      { tekst: "Ved at dyrke mine hobbyer", dukke: "Lulu" },
      {
        tekst: "Ved at lukke øjnene og dykke ned i mine drømme",
        dukke: "Sinhu",
      },
      {
        tekst: "Ved at hygge med familie og mine nærmeste",
        dukke: "Pupparpasta",
      },
    ],
  },
];

// Data om de 5 dukker
const dukker = {
  Lulu: {
    navn: "Lulu",
    billede: "img/lulu.png",
    baggrund: "img/maling.gif",
    beskrivelse:
      "Du er kreativ, fantasifuld og tør være lidt anderledes. Du skaber din egen verden og lader ikke andre definere din identitet – det er modigt!",
    baggrundKlasse: "lulu-baggrund",
    billedeKlasse: "lulu-billede",
  },
  Sinhu: {
    navn: "Sinhu",
    billede: "img/sinhu.png",
    baggrund: "img/vinger.gif",
    beskrivelse:
      "Du er en sjælden, dyb og magisk beskytter. Ligesom Ovartacis elskede papmaché-hest er du gruppens mest loyale ven og en rådgiver, man kan søge hjælp hos.",
    baggrundKlasse: "sinhu-baggrund",
    billedeKlasse: "sinhu-billede",
  },
  Pupparpasta: {
    navn: "Pupparpasta",
    billede: "img/pupparpasta.png",
    baggrund: "img/bog.gif",
    beskrivelse:
      "Du er indbegrebet af leg og humor. For dig er verden et sted uden stramme regler, hvor der altid er plads til nye, skøre og fantastiske idéer.",
    baggrundKlasse: "pupparpasta-baggrund",
    billedeKlasse: "pupparpasta-billede",
  },
  Verda: {
    navn: "Verda",
    billede: "img/verda.png",
    baggrund: "img/cykel.gif",
    beskrivelse:
      "Du er den trofaste ven, der elsker det nære selskab. Du trives bedst på eventyr i hverdagen - gerne en cykeltur til stranden med nogen, du holder af.",
    baggrundKlasse: "verda-baggrund",
    billedeKlasse: "verda-billede",
  },
  Dragen: {
    navn: "Dragen",
    billede: "img/dragen.png",
    baggrund: "img/drage-vinger.gif",
    beskrivelse:
      "Du er det ultimative symbol på frihed. Du elsker følelsen af uafhængighed og drømmer stort om at kunne bevæge dig frit – både i tid og sted.",
    baggrundKlasse: "dragen-baggrund",
    billedeKlasse: "dragen-billede",
  },

};

// Pointsystem
let spgIndex = 0;
let scores = { Lulu: 0, Sinhu: 0, Pupparpasta: 0, Verda: 0, Dragen: 0 };

// Starter quizzen
function startQuiz() {
  document.getElementById("start-skaerm").style.display = "none";
  document.getElementById("quiz-skaerm").style.display = "block";
  spgIndex = 0;
  scores = { Lulu: 0, Sinhu: 0, Pupparpasta: 0, Verda: 0, Dragen: 0 }; // Nulstil point
  visSpoergsmaal();
}

// Viser spørgsmålene
function visSpoergsmaal() {
  const aktuelleSpg = spg[spgIndex];
  document.getElementById("spg-tekst").innerText = aktuelleSpg.spg;

// Opdaterer progress bar
    const procent = ((spgIndex + 1) / spg.length) * 100;
    document.getElementById("progress-bar").style.width = procent + "%";

    const svarContainer = document.getElementById("svar-knap-container");
    svarContainer.innerHTML = "";

    aktuelleSpg.svar.forEach(ans => {
    const btn = document.createElement('button');
    btn.innerText = ans.tekst;
    btn.className = 'quiz-svarknap';
    btn.onclick = () => {
        if(ans.dukke) { scores[ans.dukke]++; } 
      spgIndex++; 

      if (spgIndex < spg.length) {
        visSpoergsmaal(); 
      } else {
        visLoadingSkaerm(); // Viser loading skærm
      }
    };
    svarContainer.appendChild(btn);
  });
}

// Loading skærm
function visLoadingSkaerm() {
  document.getElementById("quiz-skaerm").style.display = "none";
  document.getElementById("vente-side").style.display = "block";

  setTimeout(visResultat, 1000);
}

// Beregner vinder og gemmer i localstorage
function visResultat() {
  document.getElementById("vente-side").style.display = "none";
  document.getElementById("resultat-skaerm").style.display = "block";

  // Finder højeste score blandt alle dukker
  const maxScore = Math.max(...Object.values(scores));

  // Hvis flere dukker har samme højeste score, samler vi dem
  const winners = Object.keys(scores).filter(
    (dukke) => scores[dukke] === maxScore,
  );

  // Hvis stemmelighed: trækker lod blandt vinderene
  const randomWinnerIndex = Math.floor(Math.random() * winners.length);
  const winner = winners[randomWinnerIndex];

  // Gemmer resultat i browser-hukommelse så det huskes
  localStorage.setItem("quizVinder", winner);

  // Henter den vindende dukke
  let gemtVinder = localStorage.getItem("quizVinder");
  const dukke = dukker[gemtVinder];

  // Viser dukke-navn
  document.getElementById("dukke-navn").innerText = dukke.navn;

  // Sætter dukke-billede og tilføjer CSS-klasse for styling
  const billedeEl = document.getElementById("dukke-billede");
  billedeEl.src = dukke.billede;
  billedeEl.className = "dukke-billede"; // Nulstiller tidligere klasser
  billedeEl.classList.add(dukke.billedeKlasse); // Tilføjer individuel klasse

  // Sætter baggrund-GIF og tilføjer CSS-klasse for styling
  const baggrundEl = document.getElementById("dukke-vinger");
  baggrundEl.src = dukke.baggrund;
  baggrundEl.className = "dukke-baggrund"; // Nulstiller tidligere klasser
  baggrundEl.classList.add(dukke.baggrundKlasse); // Tilføjer individuel klasse
}

