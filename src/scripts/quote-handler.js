const quotes = [
    "If I had infinite money I would destroy my monitor with the rage Java has bestowed upon me, that of a thousand suns.",
    "Man, I used to be team C# in the great Java vs C# debate but honestly, Python solos both.",
    "Everyone talkin' bout Polinex and Nebula, but Cobalt gonna solo both 100%.",
    "Life, is osu!",
    "A wise man once asked me, 'best esports style fps game?' I arrogantly responded, 'Valorant ofc!' I was then violently beaten to death.",
    "I would learn C++, Rust, and Haskell but im 300 iq points below the required amount :(",
    "ts peak asf",
    "I am the best at everything I do, except about everything.",
    "Even at gun point, hating on Poligon would be an impossible task for me. (Nathan quote)",
    "wtf?",
    "Always the fridge protecting the snacks from the hungry monster known as: your-somehow-skinny-little-brother-who-eats-everything.",
    "Learn the Unity API my child.",
    "The [flip] is a boolean LMAO Stop making up words bud. (jd quote)",
    "If coding was a competitive sport, I would be the guy who gets banned for being too lazy to even show up.",
    "Not gonna lie, there should be an award ceremony for coding, something like the oscars but for smelly losers.",
    "Vibe coding is like gambling, you always think there is a chance you will win but in reality you're just wasting your time.",
    "Surely no goober with no coding experience is going to copy elements of this website and use it for their own, right?",
];

const quoteElement = document.getElementById("quote-typewriter");

let quoteIndex = 0;
let quoteCharIndex = 0;
let deletingQuote = false;

function typeQuote() {
    const currentQuote = quotes[quoteIndex];

    if (!deletingQuote) {
        quoteElement.textContent = currentQuote.substring(0, quoteCharIndex + 1);
        quoteCharIndex++;

        if (quoteCharIndex === currentQuote.length) {
            deletingQuote = true;
            setTimeout(typeQuote, 5000);
            return;
        }
    } else {
        quoteElement.textContent = currentQuote.substring(0, quoteCharIndex - 1);
        quoteCharIndex--;

        if (quoteCharIndex === 0) {
            deletingQuote = false;
            quoteIndex = (quoteIndex + 1) % quotes.length;
        }
    }

    setTimeout(typeQuote, deletingQuote ? 40 : 75);
}

document.addEventListener("DOMContentLoaded", () => {
    typeQuote();
});