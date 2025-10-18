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
    // Add more words here
];

let clickable = true;
let currentWord = null;
let completedWords = JSON.parse(localStorage.getItem("completedWords") || "[]");

// Shuffle helper
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Get random new word
function getNextWord() {
    const remaining = quizData.filter((_, idx) => !completedWords.includes(idx));
    if (remaining.length === 0) return null;
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    return { word: random, index: quizData.indexOf(random) };
}

// Load next word
function loadWord() {
    const next = getNextWord();

    if (!next) {
        document.getElementById("english-word").innerText = "All done!";
        document.querySelector(".buttons").style.display = "none";
        const feedbackImg = document.getElementById("feedback-img");
        feedbackImg.src = "https://cdn-icons-png.flaticon.com/128/5291/5291032.png";
        feedbackImg.style.visibility = "visible";
        return;
    }

    currentWord = next.word;
    currentWord.currentIndex = next.index;

    document.getElementById("english-word").innerText = currentWord.english;

    const shuffledOptions = shuffleArray([...currentWord.options]);
    const correctOptionText = currentWord.options[currentWord.answer];
    currentWord.shuffledAnswer = shuffledOptions.indexOf(correctOptionText);

    const buttons = document.getElementsByClassName("option-btn");
    shuffledOptions.forEach((opt, i) => {
        buttons[i].innerText = opt;
        buttons[i].disabled = false;
        buttons[i].style.display = "inline-block";
    });

    // Invisible image by default
    const feedbackImg = document.getElementById("feedback-img");
    feedbackImg.src = "https://cdn-icons-png.flaticon.com/128/992/992700.png";
    feedbackImg.style.visibility = "visible";

    document.getElementById("explanation-text").innerText = "";
    clickable = true;
}

function checkAnswer(selected) {
    if (!clickable || !currentWord) return;
    clickable = false;

    const feedbackImg = document.getElementById("feedback-img");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    // Disable all buttons
    Array.from(document.getElementsByClassName("option-btn")).forEach(btn => btn.disabled = true);

    if (selected === currentWord.shuffledAnswer) {
        feedbackImg.src = "https://cdn-icons-png.flaticon.com/128/5291/5291032.png";
        correctSound.play();

        completedWords.push(currentWord.currentIndex);
        localStorage.setItem("completedWords", JSON.stringify(completedWords));

        setTimeout(loadWord, 1000);
    } else {
        feedbackImg.src = "https://cdn-icons-png.flaticon.com/128/1828/1828778.png";
        wrongSound.play();

        document.getElementById("explanation-text").innerHTML =
            `<strong>English:</strong> ${currentWord.explanationEn}<br>
             <strong>Czech:</strong> ${currentWord.explanationCz}`;

        setTimeout(loadWord, 3000);
    }
}

// Initialize
window.onload = loadWord;
