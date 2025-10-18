// Same quiz data structure
const quizData = [
  {
    english: "Apple",
    options: ["Jablko", "Hruška", "Banán", "Pomeranč"],
    answer: 0,
    explanationEn: "I like apples.",
    explanationCz: "Líbí se mi jablka."
  },
  {
    english: "Dog",
    options: ["Kočka", "Pes", "Pták", "Kůň"],
    answer: 1,
    explanationEn: "The dog is barking.",
    explanationCz: "Pes štěká."
  },
  {
    english: "House",
    options: ["Dům", "Byt", "Stůl", "Židle"],
    answer: 0,
    explanationEn: "I live in a house.",
    explanationCz: "Bydlím v domě."
  },
  // Add more later
];

function loadCompletedWords() {
  const completedWords = JSON.parse(localStorage.getItem("completedWords") || "[]");
  const listContainer = document.getElementById("words-list");
  listContainer.innerHTML = ""; // Clear existing list

  if (completedWords.length === 0) {
    listContainer.innerHTML = "<p>You haven't learned any words yet.</p>";
    return;
  }

  completedWords.forEach(index => {
    const wordData = quizData[index];
    if (wordData) {
      const div = document.createElement("div");
      div.className = "word-item";

      const btn = document.createElement("button");
      btn.className = "word-btn";
      btn.textContent = `${wordData.english} → ${wordData.options[wordData.answer]}`;

      const expl = document.createElement("p");
      expl.className = "explanation";
      expl.innerHTML = `<strong>Usage:</strong> ${wordData.explanationEn}`;

      div.appendChild(btn);
      div.appendChild(expl);
      listContainer.appendChild(div);
    }
  });
}

// Reset progress function
function resetProgress() {
  if (confirm("Are you sure you want to reset your progress?")) {
    localStorage.removeItem("completedWords");
    loadCompletedWords();
    alert("Progress reset! You can now start again in the Czech quiz.");
  }
}

window.onload = function() {
  loadCompletedWords();
  document.getElementById("reset-btn").addEventListener("click", resetProgress);
};
