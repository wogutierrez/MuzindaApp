let flashcards = []; // Array to hold the flashcards
let currentIndex = 0; // Current index of the flashcard being studied
let studySession = []; // Array to track cards being studied

// Function to import CSV files
function importCSV() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            parseCSV(text);
        };
        reader.readAsText(file);
    } else {
        alert("Please select a CSV file to import.");
    }
}

// Function to parse CSV data and create flashcards
function parseCSV(data) {
    const rows = data.split('\n');
    flashcards = rows.map(row => {
        const [shona, english] = row.split(',');
        return { shona: shona.trim(), english: english.trim() };
    });
    alert(`${flashcards.length} cards imported successfully!`);
    document.getElementById("view-cards").style.display = 'block'; // Show view cards button
}

// Function to create a new deck
function createDeck() {
    const deckContainer = document.getElementById("deck-container");

    // Check if there are any flashcards imported
    if (flashcards.length === 0) {
        alert("Please import a CSV file first to create a deck.");
        return; // Exit the function if no cards are available
    }

    // Prompt user for the deck name
    const deckName = prompt("Enter the name of the new deck:");

    if (deckName) {
        // Create a new deck element
        const deck = document.createElement("div");
        deck.className = "deck";
        deck.innerHTML = `
            <h3>${deckName}</h3>
            <p>Cards: ${flashcards.length}</p>
            <button onclick="viewCards()">View Cards</button>
            <button onclick="startStudying()">Start Studying</button>
        `;
        deckContainer.appendChild(deck);

        // Show the "Start Studying" button after creating the deck
        document.getElementById("start-studying").style.display = 'block'; // Show start studying button
    } else {
        alert("Deck creation cancelled.");
    }
}

// Function to view the imported cards
function viewCards() {
    const deckContainer = document.getElementById("deck-container");
    deckContainer.innerHTML = ""; // Clear previous content

    flashcards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <p><strong>Shona:</strong> ${card.shona}</p>
            <p><strong>English:</strong> ${card.english}</p>
        `;
        deckContainer.appendChild(cardElement);
    });
}

// Function to start studying the cards
function startStudying() {
    // Shuffle flashcards and prepare the study session
    studySession = [...flashcards]; // Copy flashcards to study session
    currentIndex = 0; // Reset current index
    showFlashcard(); // Show the first flashcard
}

// Function to show the current flashcard
function showFlashcard() {
    const studyContainer = document.getElementById("deck-container");
    studyContainer.innerHTML = ""; // Clear previous content

    if (currentIndex < studySession.length) {
        const card = studySession[currentIndex];
        studyContainer.innerHTML = `
            <h2>Shona: ${card.shona}</h2>
            <input type="text" id="answer" placeholder="Guess the English word" />
            <div>
                <button onclick="checkAnswer()">Check Answer</button>
            </div>
        `;
    } else {
        studyContainer.innerHTML = `<h2>You've completed the study session!</h2>`;
    }
}

// Function to check the answer
function checkAnswer() {
    const answerInput = document.getElementById("answer").value.trim();
    const card = studySession[currentIndex];

    if (answerInput.toLowerCase() === card.english.toLowerCase()) {
        alert("Correct! Moving to the next card.");
        currentIndex++;
        showFlashcard();
    } else {
        alert(`Incorrect! The correct answer is: ${card.english}`);
        // Handle button clicks for Fail, Remember, and Easy
        showStudyOptions();
    }
}

// Function to show study options
function showStudyOptions() {
    const studyContainer = document.getElementById("deck-container");
    studyContainer.innerHTML += `
        <div>
            <button onclick="failCard()">Fail</button>
            <button onclick="rememberCard()">Remember</button>
            <button onclick="easyCard()" style="display:none;">Easy</button>
        </div>
    `;
}

// Function to handle Fail button
function failCard() {
    showFlashcard(); // Show the same card again
}

// Function to handle Remember button
function rememberCard() {
    currentIndex++;
    showFlashcard(); // Move to the next card
}

// Function to handle Easy button (not implemented yet)
function easyCard() {
    // You can add functionality for the Easy button later
}

// Event listener for importing a CSV file
document.getElementById("file-input").addEventListener("change", importCSV);

// Event listener for creating a new deck
document.getElementById("new-deck").addEventListener("click", createDeck);

// Event listener for viewing cards
document.getElementById("view-cards").addEventListener("click", viewCards);

// Event listener for starting to study
document.getElementById("start-studying").addEventListener("click", startStudying);
