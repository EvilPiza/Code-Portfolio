const phrases = [
    "EvilPiza", 
    "Blox", 
    "The Goat 🐐",
    "a Python Fan",
    "Scared of C++",
    "Behind You",
    "a Smelly Loser",
    "Bad at Coding",
    "Lazier Than Most",
    "Addicted to Osu!",
    "a Pro Gooner",
    "an Idiot Sandwich",
    "a Java Hater",
    "Dying inside",
    "a Baller",
    "Stealing Code",
];
const typingElement = document.getElementById("typewriter");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    const currentText = typingElement.textContent;

    if (!isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(type, isDeleting ? 60 : 100);
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});