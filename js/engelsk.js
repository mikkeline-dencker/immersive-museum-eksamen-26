// Array with questions and answers
const questions = [
  {
    question: "What is your greatest strength?",
    answers: [
      {
        text: "My ability to think creatively and create my own style",
        puppet: "Lulu",
      },
      {
        text: "My deep intuition and ability to give good advices",
        puppet: "Sinhu",
      },
      {
        text: "That there’s more to me than meets the eye",
        puppet: "Pupparpasta",
      },
      {
        text: "My loyalty and ability to look after those around me",
        puppet: "Verda",
      },
    ],
  },
  {
    question: "What do you wish you had more of?",
    answers: [
      { text: "Space to be myself", puppet: "Lulu" },
      {
        text: "Peace and time to immerse myself in my interests",
        puppet: "Sinhu",
      },
      { text: "Cozy moments with friends", puppet: "Verda" },
      {
        text: "Freedom to break free and experience the world",
        puppet: "Dragen",
      },
    ],
  },
  {
    question: "Where do you thrive the most?",
    answers: [
      { text: "Where there is warmth and safety", puppet: "Pupparpasta" },
      { text: "In a creative space", puppet: "Lulu" },
      { text: "In good company", puppet: "Verda" },
      { text: "Where there is total freedom", puppet: "Dragen" },
    ],
  },
  {
    question: "What makes you happiest?",
    answers: [
      {
        text: "Relaxing with a bowl of sweets and a great book",
        puppet: "Sinhu",
      },
      {
        text: "When people take the time to get to know the real me",
        puppet: "Pupparpasta",
      },
      { text: "The feeling of being completely free", puppet: "Dragen" },
      { text: "Making a close friend or family member happy", puppet: "Verda" },
    ],
  },
  {
    question: "What’s your favorite way to relax?",
    answers: [
      {
        text: "When I have no plans, so I can just be spontaneous",
        puppet: "Dragen",
      },
      { text: "By spending time on my favorite hobbies", puppet: "Lulu" },
      {
        text: "By closing my eyes and dreaming myself away for a while",
        puppet: "Sinhu",
      },
      {
        text: "When I get to sit down and write my thoughts out",
        puppet: "Pupparpasta",
      },
    ],
  },
];

// Data about the 5 puppets
const puppets = {
  Lulu: {
    name: "Lulu",
    image: "img/lulu.png",
    background: "img/maling.gif",
    description:
      "You are creative, imaginative and dare to be a little different. You create your own world and don't let others define your identity – that takes courage!",
    backgroundClass: "lulu-background",
    imageClass: "lulu-image",
  },
  Sinhu: {
    name: "Sinhu",
    image: "img/sinhu.png",
    background: "img/vinger.gif",
    description:
      "You are a rare, deep and magical protector. Just like Ovartaci's beloved papier-mâché horse, you are the group's most loyal friend and an advisor others can turn to for help.",
    backgroundClass: "sinhu-background",
    imageClass: "sinhu-image",
  },
  Pupparpasta: {
    name: "Pupparpasta",
    image: "img/pupparpasta.png",
    background: "img/bog.gif",
    description:
      "You are authentic and embody more than meets the eye. You are grounded in yourself, but you take good care of your innermost thoughts until you are ready to share them with those you trust.",
    backgroundClass: "pupparpasta-background",
    imageClass: "pupparpasta-image",
  },
  Verda: {
    name: "Verda",
    image: "img/verda.png",
    background: "img/cykel.gif",
    description:
      "You are the faithful friend who loves close company. You thrive best on everyday adventures – ideally a bike ride to the beach with someone you care about.",
    backgroundClass: "verda-background",
    imageClass: "verda-image",
  },
  Dragen: {
    name: "Dragen",
    image: "img/dragen.png",
    background: "img/drage-vinger.gif",
    description:
      "You are the ultimate symbol of freedom. You love the feeling of independence and spontaneity, and you dream big about being able to move freely – both in time and space.",
    backgroundClass: "dragen-background",
    imageClass: "dragen-image",
  },
};

// Scoring system
let questionIndex = 0;
let scores = { Lulu: 0, Sinhu: 0, Pupparpasta: 0, Verda: 0, Dragen: 0 };

// Starts the quiz
function startQuiz() {
  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("quiz-screen").classList.add("active");
  questionIndex = 0;
  scores = { Lulu: 0, Sinhu: 0, Pupparpasta: 0, Verda: 0, Dragen: 0 }; // Reset scores
  showQuestion();
}

// Shows the questions
function showQuestion() {
  const currentQuestion = questions[questionIndex];
  document.getElementById("question-text").innerText = currentQuestion.question;

  // Updates the progress bar
  const percent = ((questionIndex + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = percent + "%";

  const answerContainer = document.getElementById("answer-button-container");
  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.className = "quiz-answer-button";
    btn.addEventListener("click", () => {
      if (ans.puppet) {
        scores[ans.puppet]++;
      }
      questionIndex++;

      if (questionIndex < questions.length) {
        showQuestion();
      } else {
        showLoadingScreen(); // Shows the loading screen
      }
    });
    answerContainer.appendChild(btn);
  });
}

// Loading screen
function showLoadingScreen() {
  document.getElementById("quiz-screen").classList.remove("active");
  document.getElementById("wait-screen").classList.add("active");

  setTimeout(showResult, 1200);
}

// Calculates the winner and saves to localStorage
function showResult() {
  document.getElementById("wait-screen").classList.remove("active");
  document.getElementById("result-screen").classList.add("active");

  // Finds the highest score among all puppets
  const maxScore = Math.max(...Object.values(scores));

  // If multiple puppets share the highest score, we collect them
  const winners = Object.keys(scores).filter(
    (puppet) => scores[puppet] === maxScore,
  );

  // If tied: draw randomly among the winners
  const randomWinnerIndex = Math.floor(Math.random() * winners.length);
  const winner = winners[randomWinnerIndex];

  // Saves the result to localStorage
  localStorage.setItem("quizWinner", winner);

  // Retrieves the winning puppet
  const puppet = puppets[winner];

  // Shows the puppet name on the result screen
  document.getElementById("puppet-name").innerText = puppet.name;

  // Sets the puppet image and adds CSS class for styling
  const imageEl = document.getElementById("puppet-image");
  imageEl.src = puppet.image;
  imageEl.className = "puppet-image"; // Resets previous classes
  imageEl.classList.add(puppet.imageClass); // Adds individual class

  // Sets the background GIF and adds CSS class for styling
  const backgroundEl = document.getElementById("puppet-wings");
  backgroundEl.src = puppet.background;
  backgroundEl.className = "puppet-background"; // Resets previous classes
  backgroundEl.classList.add(puppet.backgroundClass); // Adds individual class

  // Also sends the puppet's info into the pop-up card
  document.getElementById("popup-puppet-name").innerText = puppet.name;
  document.getElementById("puppet-description").innerText = puppet.description;
}

// EVENT LISTENERS: Start quiz button
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-quiz-btn");
  if (startButton) {
    startButton.addEventListener("click", startQuiz);
  }

  const whyButton = document.getElementById("why-button");
  const closeButton = document.getElementById("close-popup-button");

  // When "Why?" is clicked, the pop-up is shown as a flex element on top of everything
  if (whyButton && popupCard) {
    whyButton.addEventListener("click", () => {
      popupCard.style.display = "flex";
    });
  }

  // When the close cross is clicked, the pop-up is hidden again
  if (closeButton && popupCard) {
    closeButton.addEventListener("click", () => {
      popupCard.style.display = "none";
    });
  }
});

// Camera screen
const video = document.querySelector("#camera");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const cameraButton = document.querySelector("#cameraButton");
const resultDisplay = document.querySelector("#resultDisplay");
const cameraFrame = document.querySelector(".camera-frame");
const takenPicture = document.querySelector("#takenPicture");
const takePictureButton = document.querySelector("#takePictureButton");
const resultScreen = document.querySelector("#result-screen");
const cameraScreen = document.querySelector("#camera-screen");
const popupCard = document.querySelector("#popup-card");

const puppetOverlay = new Image();

function updateCameraPuppet() {
  const winner = localStorage.getItem("quizWinner");

  if (!winner || !puppets[winner]) {
    puppetOverlay.src = puppets.Pupparpasta.image;
    return;
  }

  puppetOverlay.src = puppets[winner].image;
}

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    video.srcObject = stream;
    video.addEventListener("playing", startPreview);
  } catch (error) {
    console.error("The camera could not be started:", error);
  }
}

// Draw live preview on canvas continuously
function startPreview() {
  canvas.style.display = "block"; // Show canvas instead of video
  video.style.display = "none"; // Hide raw video

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  function draw() {
    if (video.paused || video.ended) return;

    // Mirrored video
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Overlay on top — same position every time
    if (puppetOverlay.complete) {
      const w = canvas.width * 0.3;
      const h = canvas.height * 0.5;
      const x = canvas.width - w - 160;
      const y = canvas.height - h;

      ctx.drawImage(puppetOverlay, x, y, w, h);
    }

    requestAnimationFrame(draw);
  }

  draw();
}
// Take picture with countdown — freeze the current canvas frame
cameraButton.addEventListener("click", () => {
  if (!video.srcObject) {
    alert("The camera has not been started yet.");
    return;
  }

  cameraButton.disabled = true;

  let countdown = 3;
  const display = document.getElementById("countdown-display");

  if (display) {
    display.innerText = countdown;
    display.style.display = "block";
  }

  const interval = setInterval(() => {
    countdown--;

    if (countdown > 0) {
      if (display) display.innerText = countdown;
    } else {
      clearInterval(interval);
      if (display) display.style.display = "none";

      video.pause();
      takenPicture.src = canvas.toDataURL("image/jpeg", 0.92);
      cameraFrame.style.display = "none";
      resultDisplay.style.display = "flex";

      cameraButton.disabled = false;
      cameraButton.style.opacity = "1";
    }
  }, 1000);
});

takePictureButton.addEventListener("click", () => {
  popupCard.classList.add("hidden");

  resultScreen.style.display = "none";
  cameraScreen.style.display = "block";

  updateCameraPuppet();
  startCamera();
});

const phoneInput = document.querySelector("#phoneInput");
if (phoneInput) {
  phoneInput.addEventListener("input", (event) => {
    let value = event.target.value;

    const startsWithPlus = value.startsWith("+");

    value = value.replace(/[^0-9]/g, "");

    if (startsWithPlus) {
      value = "+" + value;
    }

    event.target.value = value;
  });
}
