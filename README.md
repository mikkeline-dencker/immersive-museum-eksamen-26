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

#### ORCA-Tabel

![ORCA-tabel](/img/orca-tabel.png)

### Fra ORCA til JavaScript Datastruktur

Vores ORCA-overvejelser afspejler sig direkte i vores JavaScript-kode:
* **`spg` (Array af Objekter):** Linker direkte til vores **Spørgsmål-objekt**. Det indeholder en **string** med selve spørgsmåls-teksten og et **array** af svarmuligheder, som hver linker til en specifik dukke.
* **`dukker` (Objekt):** Fungerer som vores database over **Dukke-objektet**. Her er hver enkelt dukke gemt med sine tilhørende attributter.
* **Attributter:** Vi bruger variabler som `let spgIndex = 0` (til at tælle hvilket spørgsmål man er på) og `scores` (til at tælle pointene sammen). De ligger øverst i vores JavaScript-fil, så koden hele tiden kan holde øje med, hvor langt brugeren er i quizzen, og sørge for at opdatere vores progress bar i HTML'en
* **Vores konkrete datatyper:** For at computeren kan forstå vores data, har vi brugt specifikke datatyper i vores `dukker`-database:
  * `navn`, `billede` og `beskrivelse` er af datatypen **String** (tekst), da det er faste værdier og stier.
  * Vores pointsystem arbejder med datatypen **Number** (tal), når vi tæller pointene sammen for at finde en vinder.
  * Vores spørgsmål (`spg`) er gemt i et **Array** (en liste), som indeholder **Objekter** (hvor dataen er parret i par).

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

## 4. Udvalgt kode og kommentarer

For at vise, hvordan vores app fungerer i praksis, har vi udvalgt et par centrale stykker kode fra vores projekt.

### 1. Kode-eksempel: LocalStorage (Fra JavaScript)
Her er koden, der sørger for, at resultatskærmen gemmer vinderen, så kamera-skærmen kan huske den bagefter:

```javescript
// Gemmer resultat i localstorage

localStorage.setItem("quizVinder", winner);
```
* Linjen `localStorage.setItem` gemmer vinderen af quizzen i browseren under navnet `"quizVinder"`. På den måde husker computeren resultatet, så vi kan hente det frem igen, når vi skifter over til kamera-skærmen.

### 2. Kode-eksempel: Vis/skjul skærme (Fra CSS)
Dette er den CSS-kode, vi tænder og slukker for via JavaScript, når brugeren trykker på en knap for at skifte skærm:

```css
/* Standardskærmen er skjult */
.skaerm {
  display: none;
}

/* Når skærmen får klassen .aktiv, bliver den vist på iPad'en */
.skaerm.aktiv {
  display: flex;
}
```
* Ved at bruge `display: none` som standard, er alle vores 5-6 skærm-sektioner usynlige i starten. Først når vi tilføjer klassen `.aktiv`, dukker skærmen op.

### 3. Kommentarer i koden (HTML, CSS & JS)
Vi har gjort meget ud af at lave kommentarer i alle vores filer. (<!- --> i HTML, /* */ i CSS & // i JS)
* Dele vores filer op i overskuelige sektioner, f.eks. 
#### css
```css
/* ================================================
                     FORSIDE
   ================================================ */

/* ================================================
            TILBAGE-KNAP OG PROGRESS BAR
   ================================================ */

/* ================================================
            DUKKE-BILLEDE INDIVIDUAL STYLING
   ================================================ */
   ```
#### js
``` javascript

// Array med spg og svar

// Opdaterer progress bar

// Tag billede — frys det nuværende canvas-frame
```
* Forklare over for os selv og hinanden, hvad de sværeste funktioner gør, især inde i kamera-koden, som vi fik tilsendt af vores lærer.
* Gøre det nemt for andre at læse vores kode, uden at skulle gætte sig til, hvad de forskellige varialer gør.
___


## 5. Tredjeparts-biblioteker

For at holde vores prototype så hurtig, let og optimeret som muligt, har vi valgt **ikke** at anvende nogen tredjeparts-biblioteker. Alt funktionalitet og logik er skrevet i helt ren JavaScript, så det kører hurtigt på skærmen.
* **Kamera-koden:** Selve den grundlæggende kode til at åbne for kameraet og få dukken vist på skærmen er noget, vi har fået udleveret af vores programmerings-lærer. Vores opgave har herfra været at forstå koden, style kamera-skærmen i CSS, og programmere det så vinder-dukken automatisk bliver hentet over som et filter.
* **Design-ressourcer:** Vi har brugt *Google Fonts* til at hente skrifttyperne `Yrsa` og `Afacad` ind i vores HTML-header, så teksten passer til Museum Ovartacis visuelle stil.

---

## 6. GitHub Samarbejde

At arbejde sammen om koden var en udfordring til at starte med, da vi lige skulle lære at samarbejde på GitHub. I begyndelsen fik vi lavet lidt rod i koden, fordi vi ikke helt havde forstået, at man ikke bare kan rette i de samme filer på samme tid. Men så snart vi fandt ud af, hvordan systemet fungerede, kørte det rigtig fint.
* **Commits:** Vi har arbejdet med meningsfulde commits undervejs. Det vil sige, at vi har givet vores commits korte, passende navne og tilføjet en lille beskrivelse af, hvad der faktisk er blevet ændret i koden (f.eks. "feat: tilføjet pointsystem" eller "fix: rettet styling af polaroid-ramme").
* **Arbejdsform:** Vi mødtes fysisk hver gang vi skulle kode, for at sikre, at vi snakkede godt sammen og kunne hjælpe hinanden. Efter vores startproblemer fandt vi hurtigt ud af, hvordan man kan *branche* og *merge* sit arbejde. For at være på den helt sikre side og undgå at lave fejl i fælles-koden ved et uheld, valgte vi dog en meget sikker løsning: Vi havde hver især vores eget repository (arbejdsmappe) på GitHub, hvor vi testede ting af, og så kopierede vi først koden over i det fælles projekt, når vi var helt sikre på, at det virkede.
* **Hjemme-arbejde:** Vi ville give hinanden hjemme-opgaver med kodning, for at få optimeret tiden, så meget som muligt. Når vi mødtes igen, ville vi gennemgå koden, og sørge for at alt var som det skulle være.

---

## 7. Brug af AI-værktøjer

Vi har undervejs i projektet brugt AI (f.eks. ChatGPT/Gemini & CoPilot) som en digital makker og hjælp til koden. Vi har primært brugt det til:
* **Fejlsøgning:** Til at finde fejl i vores JavaScript og CSS, hvis noget ikke virkede, eller hvis kameraet drillede.
* **Forklaringer:** Vi brugte AI til at skære kamera-koden ud i pap for os. Da vi ikke havde haft om kamera-funktioner og canvas i undervisningen før, var det et helt nyt emne, så AI hjalp os med at forstå, hvad de forskellige linjer i koden faktisk gjorde.
* **Optimering:** Til at gøre vores egen kode mere ren og overskuelig (CoPilot er primært brugt her).

**Al kode er efterfølgende tilpasset, testet og implementeret af os selv, så vi har fuld forståelse for, hvordan løsningen fungerer.**

---

## 8. Kode-validering

For at sikre, at vores kode er fejlfri, følger de officielle webstandarder og ikke har glemte tags eller skjulte fejl, har vi kørt vores filer igennem de officielle valideringsværktøjer (W3C Validators):
* **HTML:** Vores index.html er blevet valideret med W3C Markup Validation Service 
([Markdown Live Preview](https://validator.w3.org/nu/#textarea)). Koden er godkendt uden fejl, dog er der noget info om at vi ikke behøver skråstreg i slutningen af et (`<img>`)-tag (f.eks. `<img src="img/forside.gif" alt="forside gif" class="forside-gif" />`)("Document checking completed. No errors or warnings to show.").
* **CSS:** Vores style.css er blevet valideret med W3C CSS Validation Service (Jigsaw) ([Markdown Live Preview](https://jigsaw.w3.org/css-validator/validator)). Alt layout og iPad-styling er godkendt uden fejl.

#### HTML-validering:
![HTML-validering](/img/html-vali.png)
#### CSS-validering:
![CSS-validering](/img/css-vali.png)