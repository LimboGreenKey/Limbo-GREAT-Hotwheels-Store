// =========================================
// ARTICLE DATA
// =========================================

const articles = [

    {
        title: "What do you sell?",
        category: "Hotwheels",
        description: "We sell a variety of Hot Wheels cars, from classic models to limited editions.",
        tags: ["Hot Wheels", "Cars"],
    },

    {
        title: "How many hot wheels do you have?",
        category: "Hotwheels",
        description: "We have a vast collection of Hot Wheels cars, with new releases added regularly but only one appeared are available for you to sell.",
        tags: ["Hot Wheels", "Inventory"],
    },

    {
        title: "Why do you sell hot wheels?",
        category: "Hotwheels",
        description: "We sell Hot Wheels cars because i love them and want to share that passion with others.",
        tags: ["Hot Wheels", "Sales"],
    },

    {
        title: "Where can i purchase your hot wheels?",
        category: "Hotwheels",
        description: "You can purchase our Hot Wheels cars on the contact page.",
        tags: ["Hot Wheels", "Purchase"],
    },
];


// =========================================
// AI ASSISTANT
// =========================================


// OPEN AI
function openAI() {

    const aiModal = document.getElementById("aiModal");

    if (!aiModal) {
        console.log("AI Modal tidak ditemukan.");
        return;
    }

    aiModal.classList.add("show");

    setTimeout(function () {

        const input = document.getElementById("questionInput");

        if (input) {
            input.focus();
        }

    }, 150);
}


// CLOSE AI
function closeAI() {

    const aiModal = document.getElementById("aiModal");

    if (!aiModal) {
        return;
    }

    aiModal.classList.remove("show");
}


// ENTER KEY
function handleEnter(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        SendQuestion();
    }

}


// =========================================
// ADD MESSAGE TO CHAT
// =========================================

function addAIMessage(message) {

    const chatMessages = document.getElementById("chatMessages");

    if (!chatMessages) {
        return;
    }

    const messageElement = document.createElement("div");

    messageElement.className = "message ai-message";

    messageElement.innerHTML = `
        <div class="message-avatar">
            <img src="robot-jones.png" alt="Robot Jones">
        </div>

        <div class="message-text">
            ${message}
        </div>
    `;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function addUserMessage(message) {

    const chatMessages = document.getElementById("chatMessages");

    if (!chatMessages) {
        return;
    }

    const messageElement = document.createElement("div");

    messageElement.className = "message user-message";

    messageElement.innerHTML = `
        <div class="message-text">
            ${message}
        </div>
    `;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// =========================================
// NORMALIZE TEXT
// =========================================

function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[?!.,]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}


// =========================================
// FIND ARTICLE
// =========================================

function findArticle(question) {

    const normalizedQuestion = normalizeText(question);

    let bestArticle = null;
    let bestScore = 0;

    articles.forEach(function (article) {

        let score = 0;

        const title = normalizeText(article.title);
        const description = normalizeText(article.description);

        // Cek judul
        if (normalizedQuestion.includes(title)) {
            score += 10;
        }

        // Cek setiap tag
        article.tags.forEach(function (tag) {

            const normalizedTag = normalizeText(tag);

            if (normalizedQuestion.includes(normalizedTag)) {
                score += 5;
            }

        });

        // Pecah pertanyaan menjadi kata-kata
        const questionWords = normalizedQuestion.split(" ");

        questionWords.forEach(function (word) {

            if (word.length < 3) {
                return;
            }

            if (title.includes(word)) {
                score += 2;
            }

            if (description.includes(word)) {
                score += 1;
            }

        });

        if (score > bestScore) {

            bestScore = score;
            bestArticle = article;

        }

    });

    return {
        article: bestArticle,
        score: bestScore
    };

}


// =========================================
// AI RESPONSE
// =========================================

function generateAIResponse(question) {

    const q = normalizeText(question);

    const result = findArticle(question);

    const article = result.article;
    const score = result.score;


    // -----------------------------------------
    // GREETING
    // -----------------------------------------

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q.includes("hello robot") ||
        q.includes("hi robot")
    ) {

        return "Hi! I'm Robot Jones 🤖 Ask me anything about the hotwheels of this website!";

    }

    // -----------------------------------------
    // WHO ARE YOU
    // -----------------------------------------

    if (
        q.includes("who are you") ||
        q.includes("what are you") ||
        q.includes("siapa kamu")
    ) {

        return "I'm Robot Jones 🤖, a robot from Polynuex Middle School, United States. I'm here to answer questions about Limbo GREAT Hotwheels Store!!!";

    }   


    // -----------------------------------------
    // ARTICLE MATCHING
    // -----------------------------------------

    if (article && score >= 3) {

        return article.description + ".";

    }


    // -----------------------------------------
    // SEARCH BY TAG
    // -----------------------------------------

    if (article && score > 0) {

        return article.description + ".";

    }


    // -----------------------------------------
    // FALLBACK
    // -----------------------------------------

    return "Hmm... I don't know about that yet 🤖 Try asking me about Limbo GREAT Hotwheels Store!!!";

}


// =========================================
// SEND QUESTION
// =========================================

function SendQuestion() {

    const input = document.getElementById("questionInput");

    if (!input) {
        return;
    }

    const question = input.value.trim();

    if (question === "") {
        return;
    }


    // Tampilkan pertanyaan user
    addUserMessage(question);

    // Kosongkan input
    input.value = "";


    // Efek AI berpikir
    const chatMessages = document.getElementById("chatMessages");

    const thinkingMessage = document.createElement("div");

    thinkingMessage.className = "message ai-message";

    thinkingMessage.id = "aiThinking";

    thinkingMessage.innerHTML = `
        <div class="message-avatar">
            <img src="robot-jones.png" alt="Robot Jones">
        </div>

        <div class="message-text">
            Thinking... 🤖
        </div>
    `;

    if (chatMessages) {
        chatMessages.appendChild(thinkingMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    // Beri sedikit delay supaya terasa seperti AI sedang berpikir
    setTimeout(function () {

        const thinking = document.getElementById("aiThinking");

        if (thinking) {
            thinking.remove();
        }

        const response = generateAIResponse(question);

        addAIMessage(response);

    }, 700);

}


// =========================================
// CLOSE AI WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener("click", function(event) {

    const aiModal = document.getElementById("aiModal");

    if (!aiModal) {
        return;
    }

    if (
        event.target === aiModal &&
        aiModal.classList.contains("show")
    ) {
        closeAI();
    }

});


// =========================================
// ESCAPE TO CLOSE AI
// =========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        const aiModal = document.getElementById("aiModal");

        if (
            aiModal &&
            aiModal.classList.contains("show")
        ) {
            closeAI();
        }

    }

});