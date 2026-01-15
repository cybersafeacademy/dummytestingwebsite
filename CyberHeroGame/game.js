// Game State
let currentLevel = '';
let currentQuestion = 0;
let score = 0;
let questions = [];
let playerPosition = 1; // Snakes & Ladders position (1-10)

// ✅ CREATE AUDIO OBJECTS ONCE AT THE TOP
const yaySound = new Audio('/CyberHeroGame/yay.mp3');
const uhohSound = new Audio('/CyberHeroGame/ohno.mp3');

// Snakes & Ladders Configuration
const ladders = {
    3: 7,  // Square 3 → Jump to 7! 🪜
    5: 9   // Square 5 → Jump to 9! 🪜
};

const snakes = {
    8: 4,  // Square 8 → Slide to 4! 🐍
    10: 6  // Square 10 → Slide to 6! 🐍 (but only if they get question 10 wrong!)
};

// Question Database (10 questions per level!)
const questionBank = {
    password: [
        {
            question: "Which password is STRONGER and safer? 🔐",
            answers: [
                { text: "password123", correct: false },
                { text: "P@ssw0rd!2024#", correct: true },
                { text: "12345678", correct: false },
                { text: "myname", correct: false }
            ],
            tip: "Strong passwords have letters, numbers, and symbols! Like a secret code! 🔢🔤"
        },
        {
            question: "Should you share your password with your best friend? 🤔",
            answers: [
                { text: "Yes! We share everything!", correct: false },
                { text: "Only if they promise not to tell", correct: false },
                { text: "NO! Passwords are secret!", correct: true },
                { text: "Only on their birthday", correct: false }
            ],
            tip: "Passwords are like your secret superhero identity - NEVER share them! 🦸"
        },
        {
            question: "Where's the SAFEST place to keep passwords? 📝",
            answers: [
                { text: "Write on a sticky note on my monitor", correct: false },
                { text: "Tell my mom to remember them", correct: false },
                { text: "Use a password manager app", correct: true },
                { text: "Write in my school notebook", correct: false }
            ],
            tip: "Password managers are like super-safe treasure chests for your passwords! 🏴‍☠️"
        },
        {
            question: "Your little brother wants to play on your tablet. What do you do? 📱",
            answers: [
                { text: "Give him my password", correct: false },
                { text: "Let him watch me type it", correct: false },
                { text: "Type it myself without showing him", correct: true },
                { text: "Write it down for him", correct: false }
            ],
            tip: "Always keep your password secret, even from family! Type it yourself! 🤫"
        },
        {
            question: "How often should you change your passwords? ⏰",
            answers: [
                { text: "Never - too much work!", correct: false },
                { text: "Every few months", correct: true },
                { text: "Only if someone steals it", correct: false },
                { text: "Every day", correct: false }
            ],
            tip: "Changing passwords regularly keeps hackers guessing! Like changing your secret handshake! 🤝"
        },
        {
            question: "What makes a password REALLY strong? 💪",
            answers: [
                { text: "Using your pet's name", correct: false },
                { text: "At least 12 characters with letters, numbers & symbols", correct: true },
                { text: "Your birthday", correct: false },
                { text: "The word 'password'", correct: false }
            ],
            tip: "Long passwords with a mix of everything are super strong! Like a superhero team! 🦸‍♂️🦸‍♀️"
        },
        {
            question: "Can you use the SAME password for everything? 🤔",
            answers: [
                { text: "Yes! Easier to remember!", correct: false },
                { text: "NO! Each account needs different passwords", correct: true },
                { text: "Only for important stuff", correct: false },
                { text: "Yes, if it's really strong", correct: false }
            ],
            tip: "Different passwords protect you! If one gets hacked, the others stay safe! 🛡️"
        },
        {
            question: "Your friend sees you type your password. What do you do? 👀",
            answers: [
                { text: "It's fine, they're my friend", correct: false },
                { text: "Change my password right away!", correct: true },
                { text: "Tell them not to tell anyone", correct: false },
                { text: "Make them promise to forget it", correct: false }
            ],
            tip: "If someone sees your password, change it! Better safe than sorry! 🔄"
        },
        {
            question: "What's a good way to remember lots of passwords? 🧠",
            answers: [
                { text: "Write them all on paper", correct: false },
                { text: "Use a password manager", correct: true },
                { text: "Use simple passwords", correct: false },
                { text: "Tell someone to remember them", correct: false }
            ],
            tip: "Password managers remember all your passwords safely! Like a digital brain! 🤖"
        },
        {
            question: "Is 'ilovepizza123' a good password? 🍕",
            answers: [
                { text: "Yes! Pizza is awesome!", correct: false },
                { text: "No - too easy to guess!", correct: true },
                { text: "Yes, if I really love pizza", correct: false },
                { text: "Only for pizza websites", correct: false }
            ],
            tip: "Common words and numbers are easy for hackers to guess! Be creative and random! 🎨"
        }
    ],
    phishing: [
        {
            question: "You get an email: 'Congratulations! You won $1,000,000! Click here!' What do you do? 💰",
            answers: [
                { text: "CLICK IT! I'm rich!", correct: false },
                { text: "Tell my parents - it's a scam!", correct: true },
                { text: "Send it to my friends", correct: false },
                { text: "Reply asking for more money", correct: false }
            ],
            tip: "If it sounds too good to be true, it's probably a PHISHING TRAP! 🎣"
        },
        {
            question: "An email says it's from your school asking for your password. Is it real? 🏫",
            answers: [
                { text: "Yes! Schools always email", correct: false },
                { text: "Maybe - I should send it", correct: false },
                { text: "NO! Schools never ask for passwords", correct: true },
                { text: "Only if it looks official", correct: false }
            ],
            tip: "Real organizations NEVER ask for passwords by email! It's a phishing trick! 🚫"
        },
        {
            question: "What makes an email look SUSPICIOUS? 🕵️",
            answers: [
                { text: "Lots of spelling mistakes", correct: true },
                { text: "From my teacher", correct: false },
                { text: "Has my name in it", correct: false },
                { text: "Sent on a Monday", correct: false }
            ],
            tip: "Bad spelling and weird grammar are red flags! Real companies don't make silly mistakes! 🚩"
        },
        {
            question: "A link says 'Click here for free games!' Should you click it? 🎮",
            answers: [
                { text: "YES! Free games are awesome!", correct: false },
                { text: "Ask a grown-up first", correct: true },
                { text: "Click if it looks fun", correct: false },
                { text: "Share with friends first", correct: false }
            ],
            tip: "Always ask a trusted adult before clicking links from strangers! Stay safe! 👨‍👩‍👧"
        },
        {
            question: "Someone you don't know sends a funny video link. What do you do? 📹",
            answers: [
                { text: "Watch it immediately!", correct: false },
                { text: "Delete it - stranger danger!", correct: true },
                { text: "Download it to watch later", correct: false },
                { text: "Share it with everyone", correct: false }
            ],
            tip: "Don't open links from people you don't know! They might be phishing! 🎣"
        },
        {
            question: "You get a text: 'Your package is stuck! Click here NOW!' What do you do? 📦",
            answers: [
                { text: "Click immediately!", correct: false },
                { text: "Ask a parent if we ordered anything", correct: true },
                { text: "Forward to my friends", correct: false },
                { text: "Reply with my address", correct: false }
            ],
            tip: "Scammers create fake urgency! Always check with an adult first! ⏰"
        },
        {
            question: "An email has LOTS of exclamation marks!!!! Is that normal? 📧",
            answers: [
                { text: "Yes! They're excited!", correct: false },
                { text: "NO! That's suspicious!", correct: true },
                { text: "Only if it's good news", correct: false },
                { text: "It means it's important", correct: false }
            ],
            tip: "Too many exclamation marks is a phishing red flag! Real companies don't do that! 🚩"
        },
        {
            question: "Someone says 'I'm a Nigerian prince with money for you!' Is it real? 👑",
            answers: [
                { text: "Yes! I'm rich!", correct: false },
                { text: "NO! Classic phishing scam!", correct: true },
                { text: "Maybe, I should reply", correct: false },
                { text: "Only if they prove it", correct: false }
            ],
            tip: "The Nigerian Prince scam is one of the oldest tricks! Never fall for it! 🎣"
        },
        {
            question: "An email link ends in '.xyz.fake.com' - Should you trust it? 🔗",
            answers: [
                { text: "Sure! Looks official!", correct: false },
                { text: "NO! Weird domains are suspicious!", correct: true },
                { text: "Yes, if the email looks real", correct: false },
                { text: "Only on Tuesdays", correct: false }
            ],
            tip: "Check the FULL web address! Scammers use fake domains to trick you! 👀"
        },
        {
            question: "You get a scary email: 'Your account will close in 1 hour!' What do you do? ⏰",
            answers: [
                { text: "Panic and click the link!", correct: false },
                { text: "Ignore it - it's a scare tactic!", correct: true },
                { text: "Send them my password", correct: false },
                { text: "Forward it to everyone", correct: false }
            ],
            tip: "Phishers use fear to make you act fast! Stay calm and don't click! 🧘"
        }
    ],
    wifi: [
        {
            question: "You're at a café. Should you use their free Wi-Fi to check your bank account? ☕",
            answers: [
                { text: "Yes! Free Wi-Fi is great!", correct: false },
                { text: "Only if no one is watching", correct: false },
                { text: "NO! Public Wi-Fi isn't safe for that", correct: true },
                { text: "Yes, but use secret mode", correct: false }
            ],
            tip: "Public Wi-Fi is like a party - everyone can see what you're doing! 🎉"
        },
        {
            question: "Which Wi-Fi network is SAFER to use? 📶",
            answers: [
                { text: "'Free_WiFi_No_Password'", correct: false },
                { text: "Your home Wi-Fi with a password", correct: true },
                { text: "'Click_Here_For_Internet'", correct: false },
                { text: "Any network without a lock icon", correct: false }
            ],
            tip: "Networks with passwords are safer! Like a locked door vs. an open door! 🔒"
        },
        {
            question: "What should you do on public Wi-Fi? 🌐",
            answers: [
                { text: "Browse websites and watch videos", correct: true },
                { text: "Online shopping with credit cards", correct: false },
                { text: "Type in all my passwords", correct: false },
                { text: "Send private messages", correct: false }
            ],
            tip: "On public Wi-Fi: Browsing is OK! But save important stuff for home! 🏠"
        },
        {
            question: "Your neighbor asks for your home Wi-Fi password. Do you give it? 🏘️",
            answers: [
                { text: "Sure! They're nice!", correct: false },
                { text: "Ask my parents first", correct: true },
                { text: "Yes, if they pay me", correct: false },
                { text: "Post it on the door for everyone", correct: false }
            ],
            tip: "Your Wi-Fi password is private! Always ask a parent before sharing! 👨‍👩‍👧‍👦"
        },
        {
            question: "You see a Wi-Fi network called 'FBI Surveillance Van'. Should you connect? 🚐",
            answers: [
                { text: "YES! The FBI will protect me!", correct: false },
                { text: "NO! It's probably a joke or a trap", correct: true },
                { text: "Only to see what happens", correct: false },
                { text: "Yes, and tell my friends", correct: false }
            ],
            tip: "Funny network names can be tricks! Stick to networks you know and trust! 😄"
        },
        {
            question: "What's the SAFEST type of Wi-Fi? 🔒",
            answers: [
                { text: "Any Wi-Fi is safe!", correct: false },
                { text: "Home Wi-Fi with WPA2 or WPA3 encryption", correct: true },
                { text: "Airport Wi-Fi", correct: false },
                { text: "Any Wi-Fi with a funny name", correct: false }
            ],
            tip: "WPA2/WPA3 are like super locks for your Wi-Fi! Always use them at home! 🔐"
        },
        {
            question: "Can hackers see what you do on public Wi-Fi? 👀",
            answers: [
                { text: "No, Wi-Fi is always private", correct: false },
                { text: "YES! They can see your activity!", correct: true },
                { text: "Only if you tell them", correct: false },
                { text: "Only on Mondays", correct: false }
            ],
            tip: "Public Wi-Fi is like a glass window - people can see through it! Be careful! 🪟"
        },
        {
            question: "Should you let your smart watch auto-connect to any Wi-Fi? ⌚",
            answers: [
                { text: "Yes! More connections = better!", correct: false },
                { text: "NO! Only connect to trusted networks", correct: true },
                { text: "Only during school", correct: false },
                { text: "Yes, watches are safe", correct: false }
            ],
            tip: "Auto-connect can link you to dangerous networks! Turn it off! 📵"
        },
        {
            question: "Your friend's home Wi-Fi asks for a password. That's... 🤔",
            answers: [
                { text: "Annoying and unnecessary", correct: false },
                { text: "GOOD! Passwords protect networks!", correct: true },
                { text: "Weird and suspicious", correct: false },
                { text: "Only needed for adults", correct: false }
            ],
            tip: "Passwords on Wi-Fi are like locks on doors! They keep bad guys out! 🚪🔒"
        },
        {
            question: "Can you trust a Wi-Fi network just because it has a lock icon? 🔐",
            answers: [
                { text: "YES! Locks mean safe!", correct: false },
                { text: "Not always! Still check if you know the network", correct: true },
                { text: "Only if it's gold colored", correct: false },
                { text: "Locks always mean FBI approved", correct: false }
            ],
            tip: "A lock means encrypted, but you still need to trust WHO runs the network! 🕵️"
        }
    ]
};

// Funny correct responses
const correctResponses = [
    { emoji: "🎉", text: "AWESOME!", message: "You're a Cyber Hero!" },
    { emoji: "⭐", text: "AMAZING!", message: "Captain Cyber is proud!" },
    { emoji: "🏆", text: "PERFECT!", message: "You nailed it!" },
    { emoji: "💪", text: "GREAT JOB!", message: "You're crushing it!" },
    { emoji: "🦸", text: "SUPER!", message: "Hero level unlocked!" },
    { emoji: "🎊", text: "FANTASTIC!", message: "You're unstoppable!" },
    { emoji: "✨", text: "BRILLIANT!", message: "Genius move!" },
    { emoji: "🌟", text: "EXCELLENT!", message: "You rock!" }
];

// Funny wrong responses
const wrongResponses = [
    { emoji: "😅", text: "OOPSIE!", message: "That's okay! Heroes learn from mistakes!" },
    { emoji: "🤔", text: "NICE TRY!", message: "You'll get the next one!" },
    { emoji: "💙", text: "ALMOST!", message: "Keep going, hero!" },
    { emoji: "🦸", text: "NOT QUITE!", message: "Every hero makes mistakes!" },
    { emoji: "😊", text: "GOOD EFFORT!", message: "Learning makes you stronger!" }
];

// Start Game
function startGame() {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('levelSelection').style.display = 'block';
}

// Select Level
function selectLevel(level) {
    currentLevel = level;
    questions = questionBank[level];
    currentQuestion = 0;
    score = 0;
    playerPosition = 1; // Reset to starting position
    
    document.getElementById('levelSelection').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = questions[currentQuestion];
    const questionNumber = currentQuestion + 1;
    
    document.getElementById('questionNumber').textContent = questionNumber;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('scoreDisplay').textContent = score;
    
    // Update board - remove active class from all squares
    document.querySelectorAll('.board-square').forEach(sq => sq.classList.remove('active'));
    // Add active class to current position
    const currentSquare = document.querySelector(`[data-square="${playerPosition}"]`);
    if (currentSquare) {
        currentSquare.classList.add('active');
    }
    
    // Load answers
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';
    
    const colors = ['red', 'blue', 'yellow', 'green'];
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = `answer-btn ${colors[index]}`;
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(index);
        answersGrid.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(index) {
    const question = questions[currentQuestion];
    const isCorrect = question.answers[index].correct;
    
    // ✅ PLAY SOUND IMMEDIATELY - BEFORE ANYTHING ELSE!
    if (isCorrect) {
        yaySound.currentTime = 0;
        yaySound.play().catch(e => console.log('Audio play failed:', e));
    } else {
        uhohSound.currentTime = 0;
        uhohSound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Disable all buttons
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    // Mark correct/wrong
    buttons[index].classList.add(isCorrect ? 'correct' : 'wrong');
    
    // Move player on board
    if (isCorrect) {
        score += 10;
        playerPosition = Math.min(10, playerPosition + 1); // Move forward
        movePlayer(playerPosition);
        showCorrectFeedback(question.tip);
        createBalloons();
        createConfetti();
    } else {
        playerPosition = Math.max(1, playerPosition - 1); // Move back (min 1)
        movePlayer(playerPosition);
        showWrongFeedback(question.tip);
    }
    
    document.getElementById('scoreDisplay').textContent = score;
    
    // Check for ladders and snakes after a delay
    setTimeout(() => {
        checkLaddersAndSnakes();
    }, 1500);
    
    // Next question after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScoreScreen();
        }
    }, 4000);
}

// Move Player on Board
function movePlayer(newPosition) {
    // Remove player from old square
    document.querySelectorAll('.player-token').forEach(token => token.remove());
    
    // Remove active class from all squares
    document.querySelectorAll('.board-square').forEach(sq => sq.classList.remove('active'));
    
    // Add player to new square
    const newSquare = document.querySelector(`[data-square="${newPosition}"]`);
    if (newSquare) {
        const playerToken = document.createElement('div');
        playerToken.className = 'player-token';
        playerToken.id = 'playerToken';
        playerToken.textContent = '🦸‍♂️';
        newSquare.appendChild(playerToken);
        newSquare.classList.add('active');
    }
}

// Check for Ladders and Snakes
function checkLaddersAndSnakes() {
    let message = '';
    let newPosition = playerPosition;
    
    // Check for ladder
    if (ladders[playerPosition]) {
        newPosition = ladders[playerPosition];
        message = `🪜 LADDER! Climbing from ${playerPosition} to ${newPosition}!`;
        playerPosition = newPosition;
        movePlayer(playerPosition);
        showSpecialMessage(message, 'ladder');
        yaySound.play().catch(e => console.log('Audio failed:', e));
    }
    // Check for snake
    else if (snakes[playerPosition]) {
        newPosition = snakes[playerPosition];
        message = `🐍 SNAKE! Sliding from ${playerPosition} to ${newPosition}!`;
        playerPosition = newPosition;
        movePlayer(playerPosition);
        showSpecialMessage(message, 'snake');
        uhohSound.play().catch(e => console.log('Audio failed:', e));
    }
}

// Show Special Message for Ladders/Snakes
function showSpecialMessage(message, type) {
    const feedbackScreen = document.getElementById('feedbackScreen');
    
    feedbackScreen.className = `feedback-screen ${type === 'ladder' ? 'correct' : 'wrong'}`;
    feedbackScreen.style.display = 'flex';
    
    document.getElementById('feedbackEmoji').textContent = type === 'ladder' ? '🪜' : '🐍';
    document.getElementById('feedbackText').textContent = type === 'ladder' ? 'LADDER!' : 'SNAKE!';
    document.getElementById('feedbackMessage').textContent = message;
    document.getElementById('feedbackTip').textContent = '';
    
    setTimeout(() => {
        feedbackScreen.style.display = 'none';
    }, 2000);
}

// Show Correct Feedback
function showCorrectFeedback(tip) {
    const response = correctResponses[Math.floor(Math.random() * correctResponses.length)];
    const feedbackScreen = document.getElementById('feedbackScreen');
    
    feedbackScreen.className = 'feedback-screen correct';
    feedbackScreen.style.display = 'flex';
    
    document.getElementById('feedbackEmoji').textContent = response.emoji;
    document.getElementById('feedbackText').textContent = response.text;
    document.getElementById('feedbackMessage').textContent = response.message;
    document.getElementById('feedbackTip').textContent = "💡 " + tip;
    
    setTimeout(() => {
        feedbackScreen.style.display = 'none';
    }, 2500);
}

// Show Wrong Feedback
function showWrongFeedback(tip) {
    const response = wrongResponses[Math.floor(Math.random() * wrongResponses.length)];
    const feedbackScreen = document.getElementById('feedbackScreen');
    
    feedbackScreen.className = 'feedback-screen wrong';
    feedbackScreen.style.display = 'flex';
    
    document.getElementById('feedbackEmoji').textContent = response.emoji;
    document.getElementById('feedbackText').textContent = response.text;
    document.getElementById('feedbackMessage').textContent = response.message;
    document.getElementById('feedbackTip').textContent = "💡 " + tip;
    
    setTimeout(() => {
        feedbackScreen.style.display = 'none';
    }, 2500);
}

// Create Balloons
function createBalloons() {
    const colors = ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];
    const balloonCount = 12;
    
    for (let i = 0; i < balloonCount; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon wobble';
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDelay = Math.random() * 0.5 + 's';
            balloon.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            document.body.appendChild(balloon);
            
            setTimeout(() => {
                balloon.remove();
            }, 5000);
        }, i * 100);
    }
}

// Create Confetti
function createConfetti() {
    const colors = ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

// Show Score Screen
function showScoreScreen() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('scoreScreen').style.display = 'block';
    
    const finalScore = score;
    const maxScore = questions.length * 10;
    
    document.getElementById('finalScore').textContent = finalScore;
    
    let emoji, title, message;
    
    if (finalScore === maxScore) {
        emoji = '🏆';
        title = 'PERFECT SCORE!';
        message = "You're a LEGENDARY Cyber Hero! 🌟";
    } else if (finalScore >= maxScore * 0.8) {
        emoji = '⭐';
        title = 'AMAZING JOB!';
        message = "You're a true Cyber Champion! 🦸";
    } else if (finalScore >= maxScore * 0.6) {
        emoji = '🎊';
        title = 'GREAT WORK!';
        message = "You're becoming a Cyber Hero! 💪";
    } else if (finalScore >= maxScore * 0.4) {
        emoji = '😊';
        title = 'GOOD EFFORT!';
        message = "Keep practicing, young hero! 📚";
    } else {
        emoji = '🦸';
        title = 'NICE TRY!';
        message = "Every hero starts somewhere! Try again! 💙";
    }
    
    document.getElementById('scoreEmoji').textContent = emoji;
    document.getElementById('scoreTitle').textContent = title;
    document.getElementById('scoreMessage').textContent = message;
    
    // Celebration for high scores
    if (finalScore >= maxScore * 0.6) {
        createBalloons();
        createConfetti();
    }
}

// Play Again
function playAgain() {
    currentQuestion = 0;
    score = 0;
    playerPosition = 1; // Reset to starting position
    document.getElementById('scoreScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    loadQuestion();
}

// Back to Levels
function backToLevels() {
    document.getElementById('scoreScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('levelSelection').style.display = 'block';
}

// Back to Home (Website)
function backToHome() {
    // Go back to the Kids page
    window.location.href = '/cybersafe-kids';
}
