document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURATION ---
    const prizes = [
        { 
            img: "./img/story-1.jpg", 
            title: "Chapter 1: The Discovery",
            text: "I spent a lifetime looking for the rarest 'Chase' figure... and then I found you.",
            bg: "./img/bg-1.jpg" // Change to .png if your file is PNG
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
            bg: "./img/bg-2.jpg" 
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
            bg: "./img/bg-3.jpg" 
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
    const container = document.querySelector(".container");

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
    const restartBtn = document.getElementById("restartBtn");

    // 1. START EXPERIENCE
    if(startBtn) {
        startBtn.addEventListener("click", () => {
            welcomeScreen.classList.add("hidden");
            unboxingScreen.classList.remove("hidden");
            
            // Attempt to play music
            if(music) {
                music.volume = 0.5;
                music.play().catch(error => {
                    console.log("Music play failed (browser policy): ", error);
                });
            }

            updateBackground();
        });
    }

    // 2. GAMIFICATION: TAP BOX
    if(mainImage) {
        mainImage.addEventListener("click", () => {
            if (!isBoxOpen) {
                tapCount++;
                let percentage = (tapCount / tapsRequired) * 100;
                if(tapFill) tapFill.style.width = percentage + "%";

                mainImage.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(0.95)`;
                setTimeout(() => mainImage.style.transform = "rotate(0deg) scale(1)", 100);

                if (tapCount >= tapsRequired) {
                    revealPrize();
                }
            }
        });
    }

    // 3. REVEAL PRIZE
    function revealPrize() {
        isBoxOpen = true;
        const prize = prizes[currentIndex];
        
        mainImage.src = prize.img;
        if(glowEffect) glowEffect.classList.remove("hidden");
        
        captionText.innerText = prize.text; 
        slideTitle.innerText = prize.title;

        if(tapMeter) tapMeter.classList.add("hidden");

        nextBtn.disabled = false;
        
        if (currentIndex === prizes.length - 1) {
            nextBtn.innerText = "Ask the Question ❤️";
        } else {
            nextBtn.innerText = "Next Chapter ➡️";
        }
    }

    // 4. NEXT BUTTON
    if(nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentIndex < prizes.length - 1) {
                currentIndex++;
                resetToClosedBox();
            } else {
                unboxingScreen.classList.add("hidden");
                questionScreen.classList.remove("hidden");
            }
        });
    }

    // 5. BACK BUTTON
    if(backBtn) {
        backBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                resetToClosedBox();
            }
        });
    }

    // 6. RESET LOGIC
    function resetToClosedBox() {
        isBoxOpen = false;
        tapCount = 0;
        
        mainImage.src = "./img/box-closed.jpg";
        if(glowEffect) glowEffect.classList.add("hidden");
        if(tapMeter) tapMeter.classList.remove("hidden");
        if(tapFill) tapFill.style.width = "0%";
        
        slideTitle.innerText = "Chapter " + (currentIndex + 1);
        captionText.innerText = "Tap the box 3 times to break the seal...";
        
        nextBtn.disabled = true;
        nextBtn.innerText = "Locked 🔒";
        backBtn.disabled = (currentIndex === 0);

        updateBackground();
    }

    function updateBackground() {
        if (prizes[currentIndex] && prizes[currentIndex].bg && bgLayer) {
            bgLayer.style.backgroundImage = `url('${prizes[currentIndex].bg}')`;
        }
    }

    // 7. QUESTION SCREEN LOGIC
    if(yesBtn) {
        yesBtn.addEventListener("click", () => {
            questionScreen.classList.add("hidden");
            successScreen.classList.remove("hidden");
            
            if(container) container.classList.add("celebration-mode");
            
            // Celebration Background (Using bg-1.jpg or .png)
            if(bgLayer) bgLayer.style.backgroundImage = "url('./img/bg-1.jpg')"; 
            
            if(music) music.volume = 1.0; 
        });
    }

    // 8. RESTART
    if(restartBtn) {
        restartBtn.addEventListener("click", () => {
            location.reload();
        });
    }

    // Runaway NO Button
    if(noBtn) {
        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", moveButton);
    }

    function moveButton() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = "fixed"; 
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    }

}); // End of DOMContentLoaded
