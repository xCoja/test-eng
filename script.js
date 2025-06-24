// Log visit when someone opens the site
fetch("https://eng-back-cq47.onrender.com/api/visit", {
  method: "POST"
}).catch(err => console.error("Visit log failed:", err));


const data = [
  {
    question: "What do you do for a living",
    questionSR: "Čime se baviš?",
    answer: "I work as a car dealership assistant",
    answerSR: "Bavim se kao asistent u prodaji automobila."
  },
  {
    question: "Where are you from",
    questionSR: "Odakle si?",
    answer: "I am from Serbia",
    answerSR: "Iz Srbije sam."
  },
  {
    question: "How old are you",
    questionSR: "Koliko imaš godina?",
    answer: "I am twenty four years old",
    answerSR: "Imam 24 godine."
  },
  {
    question: "Can you help me please",
    questionSR: "Možeš li mi pomoći, molim te?",
    answer: "Yes of course I can help",
    answerSR: "Naravno da mogu da pomognem."
  },
  {
    question: "What time is it now",
    questionSR: "Koliko je sati sada?",
    answer: "It is half past four",
    answerSR: "Pola četiri je."
  },
  {
    question: "I would like some water",
    questionSR: "Želeo bih malo vode.",
    answer: "Here is a glass of water",
    answerSR: "Evo čaše vode."
  },
  {
    question: "Where is the nearest shop",
    questionSR: "Gde je najbliža prodavnica?",
    answer: "It is around the corner",
    answerSR: "Iza ugla je."
  },
  {
    question: "Do you speak English",
    questionSR: "Govoriš li engleski?",
    answer: "Yes but just a little",
    answerSR: "Da, ali slabo."
  },
  {
    question: "How much does this cost",
    questionSR: "Koliko ovo košta?",
    answer: "It costs twenty five euros",
    answerSR: "Košta dvadeset pet evra."
  },
  {
    question: "I don't understand what you mean",
    questionSR: "Ne razumem šta želiš da kažeš.",
    answer: "Let me explain it again",
    answerSR: "Dozvoli mi da objasnim ponovo."
  },
  {
    question: "Can I try this shirt on",
    questionSR: "Mogu li da probam ovu košulju?",
    answer: "Yes the fitting room is over there",
    answerSR: "Da, kabina za presvlačenje je tamo."
  },
  {
    question: "Where can I find a pharmacy",
    questionSR: "Gde mogu da nađem apoteku?",
    answer: "The pharmacy is across the street",
    answerSR: "Apoteka je preko puta."
  },
  {
    question: "Do you have any brothers or sisters",
    questionSR: "Imaš li braće ili sestara?",
    answer: "Yes I have one brother",
    answerSR: "Da, imam jednog brata."
  },
  {
    question: "What time does the bank close",
    questionSR: "Kada se zatvara banka?",
    answer: "The bank closes at five pm",
    answerSR: "Banka se zatvara u 5 popodne."
  },
  {
    question: "Can I get the bill please",
    questionSR: "Mogu li dobiti račun, molim?",
    answer: "Yes I will bring it right away",
    answerSR: "Da, doneću ga odmah."
  },
  {
    question: "What do you like to eat",
    questionSR: "Šta voliš da jedeš?",
    answer: "I like to eat pasta and pizza",
    answerSR: "Volim da jedem pastu i picu."
  },
  {
    question: "Are you free in the morning",
    questionSR: "Da li si slobodan ujutru?",
    answer: "Yes I am free in the morning",
    answerSR: "Da, slobodan sam ujutru."
  },
  {
    question: "Where did you go on vacation",
    questionSR: "Gde si išao na odmor?",
    answer: "I went to Greece with my family",
    answerSR: "Bio sam u Grčkoj sa porodicom."
  },
  {
    question: "What do you usually do on weekends",
    questionSR: "Šta obično radiš vikendom?",
    answer: "I relax and watch movies at home",
    answerSR: "Odmaram i gledam filmove kod kuće."
  },
  {
    question: "How do you say this in English",
    questionSR: "Kako se ovo kaže na engleskom?",
    answer: "You say it like this",
    answerSR: "Kaže se ovako."
  }
];







let totalCorrect = 0;
let totalIncorrect = 0;
const testStart = Date.now();

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderPage(startIndex, endIndex, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.slice(startIndex, endIndex).forEach((item) => {
    const block = document.createElement("div");
    block.className = "question-block";

    const questionEl = document.createElement("h3");
    questionEl.textContent = item.questionSR;
    block.appendChild(questionEl);
    block.appendChild(renderSection(item));

    const answerLabel = document.createElement("div");
    answerLabel.className = "section-label";
    answerLabel.textContent = item.answerSR;
    block.appendChild(answerLabel);
    block.appendChild(renderSection(item, true));

    container.appendChild(block);
  });
}

function renderSection(item, isAnswer = false) {
  const correctText = isAnswer ? item.answer : item.question;
  const section = document.createElement("div");
  const wordsDiv = document.createElement("div");
  const answerDiv = document.createElement("div");
  wordsDiv.className = "words";
  answerDiv.className = "answer";

  const shuffled = shuffle(correctText.split(" "));

  shuffled.forEach((word) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;

    span.addEventListener("click", () => {
      if (answerDiv.locked || span.disabled) return;
      const answerWord = document.createElement("span");
      answerWord.className = "word";
      answerWord.textContent = word;
      answerWord.style.background = "none";

      answerWord.addEventListener("click", () => {
        answerWord.remove();
        span.style.visibility = "visible";
        span.disabled = false;
      });

      span.style.visibility = "hidden";
      span.disabled = true;
      answerDiv.appendChild(answerWord);
    });

    wordsDiv.appendChild(span);
  });

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "Proveri";
  checkBtn.addEventListener("click", () => {
    if (answerDiv.locked) return;

    const userAnswer = Array.from(answerDiv.querySelectorAll(".word"))
      .map((w) => w.textContent)
      .join(" ")
      .trim();

    const isCorrect = userAnswer === correctText;

    // ✅ Loguj pojedinačan odgovor
    fetch("https://eng-back-cq47.onrender.com/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: isAnswer ? item.answerSR : item.questionSR,
        correctAnswer: correctText,
        userAnswer,
        isCorrect
      })
    }).catch(err => console.error("Answer log failed:", err));

    if (isCorrect) {
      answerDiv.classList.add("correct");
      answerDiv.innerHTML += " ✅ Tačno!";
      totalCorrect++;
    } else {
      answerDiv.classList.add("incorrect");
      const userDisplay = `<span style="color:#888;font-style:italic;">Tvoj odgovor:</span> ${userAnswer}<br>`;
      const correctDisplay = `<strong>Ispravno:</strong> ${correctText}`;
      answerDiv.innerHTML = `❌ Netačno!<br>${userDisplay}${correctDisplay}`;
      totalIncorrect++;
      if (!window.missed) window.missed = [];
      window.missed.push(correctText);
    }

    answerDiv.locked = true;
  });

  section.appendChild(wordsDiv);
  section.appendChild(answerDiv);
  section.appendChild(checkBtn);
  return section;
}

document.getElementById("page1-btn").addEventListener("click", () => {
  document.getElementById("quiz-page-1").classList.remove("hidden");
  document.getElementById("quiz-page-2").classList.add("hidden");
  document.getElementById("page1-btn").classList.add("active");
  document.getElementById("page2-btn").classList.remove("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("page2-btn").addEventListener("click", () => {
  document.getElementById("quiz-page-1").classList.add("hidden");
  document.getElementById("quiz-page-2").classList.remove("hidden");
  document.getElementById("page2-btn").classList.add("active");
  document.getElementById("page1-btn").classList.remove("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("finish-btn")?.addEventListener("click", () => {
  const total = totalCorrect + totalIncorrect;
  const percent = total ? Math.round((totalCorrect / total) * 100) : 0;
  let pcClass = percent >= 75 ? "c-green" : percent >= 50 ? "c-yellow" : "c-red";

  document.getElementById("result").innerHTML =
    `<span class="c-green">${totalCorrect} tačnih</span>, ` +
    `<span class="c-red">${totalIncorrect} netačnih</span> – ` +
    `<span class="${pcClass}">${percent}% uspešnosti</span>`;

  const payload = {
    timestamp: Date.now(),
    elapsed: Math.round((Date.now() - testStart) / 1000),
    score: percent,
    correct: totalCorrect,
    incorrect: totalIncorrect,
    missed: window.missed || []
  };

  fetch("https://eng-back-cq47.onrender.com/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(err => console.error("Failed to save result:", err));
});

renderPage(0, 10, "quiz-page-1");
renderPage(10, 20, "quiz-page-2");
