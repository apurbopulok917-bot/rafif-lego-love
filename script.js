// --- THE LOVE STORY DATA ---
const prizes = [
    { 
        img: "./img/story-1.jpg", 
        title: "Chapter 1: The Discovery",
        text: "I spent a lifetime looking for the rarest 'Chase' figure... and then I found you."
    }, 
    { 
        img: "./img/story-2.jpg", 
        title: "Chapter 2: The Match",
        text: "I realized that the best collectibles come in pairs. We fit perfectly."
    }, 
    { 
        img: "./img/story-3.jpg", 
        title: "Chapter 3: The World",
        text: "From the Jasmine of Damascus to the Sakura of Japan, you make my world beautiful."
    }, 
    { 
        img: "./img/story-4.jpg", 
        title: "Chapter 4: The Promise",
        text: "I promise to love you through it all. I'd even walk across these for you."
    },
    { 
        img: "./img/story-5.jpg", 
        title: "Chapter 5: The Truth",
        text: "Because simply put: إنتي قلببي (Enti Qalbi). You are my heart."
    },
    // THE POETIC BRIDGE (No Box, just text)
    {
        img: null, // No image swap needed, we keep the heart image
        title: "One last thing...",
        text: "So I have a question for my Babu..."
    }
];

let currentIndex = 0;
let isBoxOpen = false; 

// Elements
const welcomeScreen = document.getElementById("welcome-screen");
const unboxingScreen = document.getElementById("unboxing-screen");
const questionScreen = document.getElementById("question-screen");
const successScreen = document.getElementById("success-screen");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const mainImage = document.getElementById("main-image");
const captionText = document.getElementById("caption-text");
const slideTitle = document.getElementById("slide-title");
const glowEffect = document.getElementById("glow-effect");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// 1. Start
startBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    unboxingScreen.classList.remove("hidden");
});

// 2. The Interaction Loop
nextBtn.addEventListener("click", () => {
    
    // IF BOX IS CLOSED -> OPEN IT
    if (!isBoxOpen) {
        mainImage.classList.add("shake-anim");
        nextBtn.disabled = true; // Prevent double clicking
        
        setTimeout(() => {
            revealPrize();
            nextBtn.disabled = false;
        }, 800); // 0.8s Shake
    } 
    // IF BOX IS OPEN -> CLOSE IT FOR NEXT ROUND
    else {
        resetToClosedBox();
    }
});

function revealPrize() {
    if (currentIndex < prizes.length) {
        const prize = prizes[currentIndex];
        
        // If image is null (The Bridge), keep previous image but remove glow
        if (prize.img) {
            mainImage.src = prize.img;
            glowEffect.classList.remove("hidden");
        } else {
            glowEffect.classList.add("hidden");
        }

        mainImage.classList.remove("shake-anim");
        mainImage.classList.add("pop-anim"); 
        
        captionText.innerText = prize.text; 
        slideTitle.innerText = prize.title;
        
        // Logic for Button Text
        if (currentIndex === prizes.length - 1) {
            nextBtn.textContent = "Ask the Question ❤️";
        } else {
            nextBtn.textContent = "Next Chapter ➡️";
        }
        
        isBoxOpen = true; 
        currentIndex++;
    } else {
        // Go to Question Screen
        unboxingScreen.classList.add("hidden");
        questionScreen.classList.remove("hidden");
    }
}

function resetToClosedBox() {
    // Only reset if we are NOT at the end
    if (currentIndex < prizes.length) {
        mainImage.src = "./img/box-closed.jpg";
        mainImage.classList.remove("pop-anim");
        glowEffect.classList.add("hidden");
        
        slideTitle.innerText = "Chapter " + (currentIndex + 1);
        captionText.innerText = "Tap to open...";
        nextBtn.textContent = "Open Box 📦";
        
        isBoxOpen = false; 
    } else {
        // We are at the end (The Bridge)
        unboxingScreen.classList.add("hidden");
        questionScreen.classList.remove("hidden");
    }
}

// 3. Question Logic
yesBtn.addEventListener("click", () => {
    questionScreen.classList.add("hidden");
    successScreen.classList.remove("hidden");
});

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
    const container = document.querySelector('.container');
    const maxX = container.clientWidth - noBtn.offsetWidth - 20;
    const maxY = container.clientHeight - noBtn.offsetHeight - 20;
    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}