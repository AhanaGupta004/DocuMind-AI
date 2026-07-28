const fileInput = document.getElementById("fileInput");
const browseButton = document.getElementById("browseButton");
const dropArea = document.getElementById("dropArea");

const documentCard = document.getElementById("documentCard");
const documentName = document.getElementById("documentName");
const documentStatus = document.getElementById("documentStatus");

const questionInput = document.getElementById("questionInput");
const sendButton = document.getElementById("sendButton");

const chat = document.getElementById("chat");
const welcome = document.getElementById("welcome");


// ============================================
// FILE SELECTION
// ============================================

browseButton.addEventListener("click", () => {
    fileInput.click();
});


fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {
        uploadPDF(fileInput.files[0]);
    }

});


// ============================================
// DRAG AND DROP
// ============================================

dropArea.addEventListener("dragover", (event) => {

    event.preventDefault();

    dropArea.classList.add("dragging");

});


dropArea.addEventListener("dragleave", () => {

    dropArea.classList.remove("dragging");

});


dropArea.addEventListener("drop", (event) => {

    event.preventDefault();

    dropArea.classList.remove("dragging");

    const file = event.dataTransfer.files[0];

    if (file) {
        uploadPDF(file);
    }

});


// ============================================
// UPLOAD PDF
// ============================================

async function uploadPDF(file) {

    if (!file.name.toLowerCase().endsWith(".pdf")) {

        alert("Please select a PDF file.");

        return;
    }

    documentCard.style.display = "flex";

    documentName.textContent = file.name;

    documentStatus.textContent = "Processing...";


    const formData = new FormData();

    formData.append("file", file);


    try {

        const response = await fetch("/upload", {

            method: "POST",

            body: formData

        });


        const data = await response.json();


        if (!data.success) {

            documentStatus.textContent = "Failed";

            alert(data.error);

            return;
        }


        documentStatus.textContent =
            `Indexed • ${data.total_chunks} chunks`;


        addSystemMessage(
            `${file.name} is ready. You can now ask questions about it.`
        );


    } catch (error) {

        console.error(error);

        documentStatus.textContent = "Error";

        alert("Could not upload the document.");

    }

}


// ============================================
// SEND QUESTION
// ============================================

sendButton.addEventListener("click", sendQuestion);


questionInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        sendQuestion();

    }

});


// ============================================
// SUGGESTION BUTTONS
// ============================================

document
    .querySelectorAll(".suggestions button")
    .forEach(button => {

        button.addEventListener("click", () => {

            questionInput.value = button.textContent.trim();

            sendQuestion();

        });

    });


// ============================================
// ASK RAG
// ============================================

async function sendQuestion() {

    const question = questionInput.value.trim();


    if (!question) {
        return;
    }


    hideWelcome();

    addMessage(question, "user");

    questionInput.value = "";


    const loadingId = addLoadingMessage();


    try {

        const response = await fetch(
            `/ask?question=${encodeURIComponent(question)}`
        );


        const data = await response.json();


        removeMessage(loadingId);


        if (data.error) {

            addMessage(
                data.error,
                "ai"
            );

            return;
        }


        addMessage(
            data.answer,
            "ai"
        );


    } catch (error) {

        console.error(error);

        removeMessage(loadingId);

        addMessage(
            "Something went wrong while generating the answer.",
            "ai"
        );

    }

}


// ============================================
// CHAT UI
// ============================================

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className = `message ${sender}`;


    const content = document.createElement("div");

    content.className = "message-content";


    if (sender === "ai") {

        const label = document.createElement("div");

        label.className = "ai-label";

        label.textContent = "DOCUMIND AI";

        content.appendChild(label);

    }


    const textElement = document.createElement("div");

    textElement.textContent = text;


    content.appendChild(textElement);

    message.appendChild(content);

    chat.appendChild(message);


    chat.scrollTop = chat.scrollHeight;

}


function addSystemMessage(text) {

    hideWelcome();

    addMessage(text, "ai");

}


function addLoadingMessage() {

    const id = `loading-${Date.now()}`;


    const message = document.createElement("div");

    message.className = "message ai";

    message.id = id;


    const content = document.createElement("div");

    content.className = "message-content";

    content.textContent = "Thinking...";


    message.appendChild(content);

    chat.appendChild(message);


    chat.scrollTop = chat.scrollHeight;


    return id;

}


function removeMessage(id) {

    const element = document.getElementById(id);

    if (element) {
        element.remove();
    }

}


function hideWelcome() {

    if (welcome) {
        welcome.style.display = "none";
    }

}