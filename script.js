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
    }
];

// STATE VARIABLES
let currentIndex = 0;
let isBoxOpen = false; 
let tapCount = 0; 
const tapsRequired = 3;

// ELEMENTS
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
    
    // Attempt to play music
    music.volume = 0.5;
    music.play().catch(error => {
        console.log("Music play failed (browser policy): ", error);
    });

    // Initialize first slide background
    updateBackground();
});

// 2. GAMIFICATION: TAP BOX
mainImage.addEventListener("click", () => {
    if (!isBoxOpen) {
        tapCount++;
        
        // Update Visual Meter
        let percentage = (tapCount / tapsRequired) * 100;
        tapFill.style.width = percentage + "%";

        // Shake Animation
        mainImage.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(0.95)`;
        setTimeout(() => mainImage.style.transform = "rotate(0deg) scale(1)", 100);

        // Check if unlocked
        if (tapCount >= tapsRequired) {
            revealPrize();
        }
    }
});

// 3. REVEAL PRIZE
function revealPrize() {
    isBoxOpen = true;
    const prize = prizes[currentIndex];
    
    // Show Image
    mainImage.src = prize.img;
    glowEffect.classList.remove("hidden");
    
    // Show Text
    captionText.innerText = prize.text; 
    slideTitle.innerText = prize.title;

    // Hide Meter
    tapMeter.classList.add("hidden");

    // Enable Buttons
    nextBtn.disabled = false;
    
    if (currentIndex === prizes.length - 1) {
        nextBtn.innerText = "Ask the Question ❤️";
    } else {
        nextBtn.innerText = "Next Chapter ➡️";
    }
}

// 4. NEXT BUTTON
nextBtn.addEventListener("click", () => {
    if (currentIndex < prizes.length - 1) {
        currentIndex++;
        resetToClosedBox();
    } else {
        // End of slides -> Go to Question
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

// 6. RESET LOGIC (For Next/Back)
function resetToClosedBox() {
    isBoxOpen = false;
    tapCount = 0;
    
    // Visual Resets
    mainImage.src = "./img/box-closed.jpg";
    glowEffect.classList.add("hidden");
    tapMeter.classList.remove("hidden");
    tapFill.style.width = "0%";
    
    // Text Resets
    slideTitle.innerText = "Chapter " + (currentIndex + 1);
    captionText.innerText = "Tap the box 3 times to break the seal...";
    
    // Button Resets
    nextBtn.disabled = true;
    nextBtn.innerText = "Locked 🔒";
    backBtn.disabled = (currentIndex === 0);

    // Update Background for the new chapter
    updateBackground();
}

function updateBackground() {
    if (prizes[currentIndex] && prizes[currentIndex].bg) {
        bgLayer.style.backgroundImage = `url('${prizes[currentIndex].bg}')`;
    }
}

// 7. QUESTION SCREEN LOGIC
yesBtn.addEventListener("click", () => {
    questionScreen.classList.add("hidden");
    successScreen.classList.remove("hidden");
    music.volume = 1.0; // Volume up for celebration!
});

// Runaway NO Button
noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = "fixed"; // Fixed prevents it from breaking layout
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}
