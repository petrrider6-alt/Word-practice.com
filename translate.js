// translate.js — universal page translator
document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("selectedLanguage");

  // If user already picked a language before, translate automatically
  if (savedLang && savedLang !== "en") {
    translateAllH1(savedLang);
  }

  // Attach listener if language selector exists
  const selector = document.getElementById("language-select");
  if (selector) {
    selector.addEventListener("change", async function() {
      const lang = this.value;
      if (!lang) return;
      localStorage.setItem("selectedLanguage", lang);
      await translateAllH1(lang);
    });
  }
});

// Function to translate all <h1> elements
async function translateAllH1(targetLang) {
  const h1Elements = document.querySelectorAll("h1");
  for (let el of h1Elements) {
    const originalText = el.dataset.original || el.textContent;
    el.dataset.original = originalText;

    const translatedText = await translateText(originalText, targetLang);
    el.textContent = translatedText;
  }
}

// Use MyMemory API for free translation
async function translateText(text, targetLang) {
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    const data = await res.json();
    return data.responseData.translatedText || text;
  } catch (err) {
    console.error("Translation failed:", err);
    return text;
  }
}
