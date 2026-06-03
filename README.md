# Prototypeovervejelser - Museum Ovartaci Quiz

Beskrivelse af projektet: En interaktiv skærm-quiz (iPad-skærm) for Museum Ovartaci, hvor målet for brugeren, er at finde ud af hvilken Ovartaci-dukke man minder om. Derudover er der mulighed for at tage et polaroid-billede med dukken, via kameraet på skærmen.

---

## 1. Projektets Struktur & Navngivning

### Mappe- & filstruktur
Projektet følger den standarde mappe-struktur, for at gøre projektet og koden mere struktureret.

* `/` (Root): Indeholder `index.html`, da det er den fil, browseren leder efter først.
* `/css`: Indeholder `style.css` (Alt styling og iPad-layout).
* `/js`: Indeholder `script.js` (Alt logik, pointsystem og kamera-funktionalitet).
* `/img`: Indeholder alle statiske billeder (.png), ikoner (.svg) og animerede baggrunde (.gif)

![Mappe-struktur](/img/mappe-struktur.png)

### Navngivning af mapper, filer og class'
* **Filer og mapper:** Navngivet med udelukkende små, engelske bogstaver uden specialtegn (æ, ø, å) for at undgå scannings-fejl.
* **HTML/CSS:** Vi har anvendt kebab-case (f.eks. `#kamera-skaerm`) konsekvent til klasser og ID'er.
* **JavaScript:** Vi har anvendt camelCase konsekvent til variabler og funktioner (f.eks. `let spgIndex`, `function startQuiz()`). Navnene er holdt semantiske og beskrivende, så koden er let at læse.

---

## 2. JavaScript Datastruktur & ORCA-tabel

For at få styr på alt indholdet i quizzen, har vi brugt en OOUX og ORCA-tabel til at finde frem til vores objekter, relationer, knapper (CTA) og data (attributter). Vi har delt vores projekt op i fire områder: 
* **Quiz**
* **Spørgsmål**
* **Dukke / Resultat**
* **Kamera-funktionen**

### ORCA-Tabel

![ORCA-tabel](/img/orca-tabel.png)

### Fra ORCA til JavaScript Datastruktur

Vores ORCA-overvejelser afspejler sig direkte i vores JavaScript-kode:
* **`spg` (Array af Objekter):** Linker direkte til vores **Spørgsmål-objekt**. Det indeholder en string med selve spørgsmåls-teksten og et array af svarmuligheder, som hver linker til en specifik dukke.
* **`dukker` (Objekt):** Fungerer som vores database over **Dukke-objektet**. Her er hver enkelt dukke gemt med sine tilhørende attributter som faste datatyper (`navn`, `billede` og `beskrivelse` som strings).
* **Attributter:** Vi bruger variabler som let `spgIndex = 0` (til at tælle hvilket spørgsmål man er på) og `scores` (til at tælle pointene sammen). De ligger øverst i vores JavaScript-fil, så koden hele tiden kan holde øje med, hvor langt brugeren er i quizzen, og sørge for at opdatere vores progress bar i HTML'en

---

## 3. Anvendelse af Webteknologier og LocalStorage

### LocalStorage

Vi bruger browserens `localStorage` til at få quizzen og kameraet til at hænge sammen, uden at appen glemmer brugerens data undervejs:
* **Gem data:** Når man klikker på den sidste svarknap, finder koden ud af, hvilken dukke der har fået flest point. Denne vinder gemmes i browserens hukommelse, så computeren kan huske det: `localStorage.setItem("quizVinder", winner);`.
* **Hent data:** Når brugeren trykker på *"Tag billede"* på resultatskærmen, skifter vi over til kameraet. Her bruger vi `localStorage.getItem("quizVinder")` via funktionen `opdaterKameraDukke()` til at hente vinder-dukken frem igen.

Det gør, at vi kan binde quizzen og kameraet sammen, så koden automatisk ved, hvilket dukke-billede den skal hente fra vores database og lægge hen over brugerens live-video/billede som et filter.

### Anvendte JavaScript-teknologier
* **DOM-manipulation (Skifte mellem skærme):** Vi bruger JavaScript til at hoppe rundt i de forskellige skærme (f.eks. quizzen og resultatet) uden at iPaden skal genindlæse siden. Det gør vi ved at tænde og slukke for CSS-klassen `.aktiv`. Når en skærm har klassen `.aktiv`, viser CSS den på skærmen, og når vi fjerner den, bliver skærmen skjult igen.
* **Adgang til kameraet:** Vi bruger koden `navigator.mediaDevices.getUserMedia` til at tænde for iPad'ens frontkamera. Den video, som kameraet fanger, sender vi direkte ind i et `<video>`-tag i vores HTML, så brugeren kan se sig selv live.
* **Kamera-filteret & polaroid-billedet (Canvas):** For at vi kan lægge vinder-dukken oven på kamera-videoen, har vi skjult det normale video-tag. I stedet bruger vi et `<canvas>`-element (som fungerer som et digitalt tegnebræt). Her bruger vi JavaScript til hele tiden at tegne videon live, spejlvende billedet og klistre dukkens billede fast på skærmen med funktionen `ctx.drawImage()`. Når brugeren klikker på kameraknappen, fryser vi blot det, der er tegnet på brættet, og gemmer det som et rigtigt foto, der kan vises i en polaroid-ramme.

---

## 4. Tredjeparts-biblioteker

For at holde vores prototype så hurtig, let og optimeret som muligt, har vi valgt **ikke**at anvende nogen tredjeparts-biblioteker. Alt funktionalitet og logik er skrevet i helt ren JavaScript, så det kører hurtigt på skærmen.
* **Kamera-koden:** Selve den grundlæggende kode til at åbne for kameraet og få dukken vist på skærmen er noget, vi har fået udleveret af vores programmerings-lærer. Vores opgave har herfra været at forstå koden, style kamera-skærmen i CSS, og programmere det så vinder-dukken automatisk bliver hentet over som et filter.
* **Design-ressourcer:** Vi har brugt *Google Fonts* til at hente skrifttyperne `Yrsa` og `Afacad` ind i vores HTML-header, så teksten passer til Museum Ovartacis visuelle stil.

## 5. GitHub Samarbejde

Mangler