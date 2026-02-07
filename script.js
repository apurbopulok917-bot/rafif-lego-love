// --- CONFIGURATION ---
const prizes = [
    { 
        img: "./img/story-1.jpg", 
        title: "Chapter 1: The Discovery",
        text: "I spent a lifetime looking for the rarest 'Chase' figure... and then I found you.",
        bg: "./img/bg-1.jpg" // Night Scene
    }, 
    { 
        img: "./img/story-2.jpg", 
        title: "Chapter 2: The Match",
        text: "I realized that the best collectibles come in pairs. We fit perfectly.",
        bg: "./img/bg-1.jpg"
    }, 
    { 
        img: "./img/story-3.jpg", 
        title: "Chapter 3: The World",
        text: "From the Jasmine of Damascus to the Sakura of Japan, you make my world beautiful.",
        bg: "./img/bg-2.jpg" // Sunset Scene
    }, 
    { 
        img: "./img/story-4.jpg", 
        title: "Chapter 4: The Promise",
        text: "I promise to love you through it all. I'd even walk across these for you.",
        bg: "./img/bg-2.jpg"
    },
    { 
        img: "./img/story-5.jpg", 
        title: "Chapter 5: The Truth",
        text: "Because simply put: إنتي قلببي (Enti Qalbi). You are my heart.",
        bg: "./img/bg-3.jpg" // Palace Scene
    },
    // THE BRIDGE
    {
        img: null, 
        title: "One last thing...",
        text: "So I have a question for my Babu...",
        bg: "./img/bg-3.jpg"
    }
];

let currentIndex = 0;
let isBoxOpen = false; 
let tapCount = 0; // Gamification counter

// Elements
const bgLayer = document.getElementById("bg-layer");
const music = document.getElementById("bg-music");
const welcomeScreen = document.getElementById("welcome-screen");
const unboxingScreen = document.getElementById("unboxing-screen");
const questionScreen = document.getElementById("question-screen");
const successScreen = document.getElementById("success-screen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const mainImage = document.getElementById("main-image");
const captionText = document.getElementById("caption-text");
const slideTitle = document.getElementById("slide-title");
const glowEffect = document.getElementById("glow-effect");
const tapMeter = document.getElementById("tap-meter");
const tapFill = document.getElementById("tap-fill");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// 1. START EXPERIENCE
startBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    unboxingScreen.classList.remove("hidden");
    music.volume = 0.5;
    music.play().catch(e => console.log("Audio needs interaction first")); // Autoplay fix
});

// 2. GAMIFICATION: TAP THE BOX
mainImage.addEventListener("click", () => {
    if (!isBoxOpen && currentIndex < prizes.length) {
        tapCount++;
        
        // Update Meter
        let percentage = (tapCount / 3) * 100;
        tapFill.style.width = percentage + "%";

        // Shake Effect
        mainImage.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(0.95)`;
        setTimeout(() => mainImage.style.transform = "rotate(0deg) scale(1)", 100);

        if (tapCount >= 3) {
            revealPrize();
            tapMeter.classList.add("hidden"); // Hide meter once opened
            tapCount = 0; // Reset for next time (optional)
        }
    }
});

// 3. REVEAL LOGIC
function revealPrize() {
    const prize = prizes[currentIndex];
    
    // Update Image
    if (prize.img) {
        mainImage.src = prize.img;
        glowEffect.classList.remove("hidden");
    } else {
        glowEffect.classList.add("hidden");
    }
    
    // Update Text
    captionText.innerText = prize.text; 
    slideTitle.innerText = prize.title;

    // Change Background Scene
    bgLayer.style.backgroundImage = `url('${prize.bg}')`;

    isBoxOpen = true;
    
    // Enable Next Button
    nextBtn.disabled = false;
    nextBtn.innerText = (currentIndex === prizes.length - 1) ? "Ask the Question ❤️" : "Next Chapter ➡️";
    
    // Enable Back Button (if not first slide)
    backBtn.disabled = (currentIndex === 0);
}

// 4. NEXT BUTTON
nextBtn.addEventListener("click", () => {
    if (currentIndex < prizes.length - 1) {
        currentIndex++;
        resetToClosedBox();
    } else {
        // End of slides -> Question
        unboxingScreen.classList.add("hidden");
        questionScreen.classList.remove("hidden");
    }
});

// 5. BACK BUTTON
backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        resetToClosedBox();
    }
});

function resetToClosedBox() {
    isBoxOpen = false;
    tapCount = 0;
    tapFill.style.width = "0%";
    tapMeter.classList.remove("hidden"); // Show meter again
    
    mainImage.src = "./img/box-closed.jpg";
    glowEffect.classList.add("hidden");
    
    slideTitle.innerText = "Chapter " + (currentIndex + 1);
    captionText.innerText = "Tap the box 3 times to open...";
    
    nextBtn.disabled = true; // Must play game to proceed
    nextBtn.innerText = "Locked 🔒";
    
    // Set background to previous slide's BG
    bgLayer.style.backgroundImage = `url('${prizes[currentIndex].bg}')`;
}

// 6. QUESTION & SUCCESS
yesBtn.addEventListener("click", () => {
    questionScreen.classList.add("hidden");
    successScreen.classList.remove("hidden");
    
    // Play Celebration Sound (optional tweak to music)
    music.volume = 1.0; 
});

// Runaway No Button
noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}
