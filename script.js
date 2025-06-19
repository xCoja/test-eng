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
    question: "What do you do in the morning",
    questionSR: "Šta radiš ujutru?",
    answer: "I brush my teeth and eat breakfast",
    answerSR: "Perem zube i doručkujem."
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

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderPage(startIndex, endIndex, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.slice(startIndex, endIndex).forEach((item, index) => {
    const block = document.createElement("div");
    block.className = "question-block";

    const questionEl = document.createElement("h3");
    questionEl.textContent = `${item.questionSR}`;
    block.appendChild(questionEl);

    block.appendChild(renderSection(item.question, `pitanje-${index}`));

    const answerLabel = document.createElement("div");
    answerLabel.className = "section-label";
    answerLabel.textContent = item.answerSR;
    block.appendChild(answerLabel);

    block.appendChild(renderSection(item.answer, `odgovor-${index}`));
    container.appendChild(block);
  });
}

function renderSection(text, idPrefix) {
  const section = document.createElement("div");
  const shuffled = shuffle(text.split(" "));
  const wordsDiv = document.createElement("div");
  wordsDiv.className = "words";
  const answerDiv = document.createElement("div");
  answerDiv.className = "answer";

  shuffled.forEach(word => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.addEventListener("click", () => {
      if (answerDiv.locked) return;
      answerDiv.textContent += word + " ";
      span.style.visibility = "hidden";
    });
    wordsDiv.appendChild(span);
  });

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "Proveri";
  checkBtn.addEventListener("click", () => {
    if (answerDiv.locked) return;
    const original = text;
    const userAnswer = answerDiv.textContent.trim();
    if (userAnswer === original) {
      answerDiv.classList.add("correct");
      answerDiv.textContent += " ✅ Tačno!";
    } else {
      answerDiv.classList.add("incorrect");
      answerDiv.textContent = `❌ Netačno! Ispravno: ${original}`;
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
});

document.getElementById("page2-btn").addEventListener("click", () => {
  document.getElementById("quiz-page-1").classList.add("hidden");
  document.getElementById("quiz-page-2").classList.remove("hidden");
  document.getElementById("page2-btn").classList.add("active");
  document.getElementById("page1-btn").classList.remove("active");
});

renderPage(0, 10, "quiz-page-1");
renderPage(10, 20, "quiz-page-2");
