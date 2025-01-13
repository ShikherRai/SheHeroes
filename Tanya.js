let userInput = document.getElementById("user-input");
let chatBox = document.getElementById("chat-output");
let sendBtn = document.getElementById("send-btn");
let voiceBtn = document.getElementById("voice-btn");

// Function to add user and bot messages to chat
function appendMessage(message, sender = 'bot') {
  let messageDiv = document.createElement('div');
  messageDiv.classList.add(sender + '-message');
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}

// Function to process text input and provide a response
function processInput(input) {
  if (input.toLowerCase().includes("help") || input.toLowerCase().includes("assist")) {
    appendMessage("Sure! I can help you with safety tips, finding nearby police stations, or sending an SOS alert. What do you need?", 'bot');
  } else if (input.toLowerCase().includes("sos")) {
    appendMessage("Sending an SOS alert to your emergency contacts and authorities...", 'bot');
    // Simulate sending SOS
    setTimeout(() => {
      appendMessage("SOS Alert Sent Successfully!", 'bot');
    }, 2000);
  } else if (input.toLowerCase().includes("police station")) {
    appendMessage("Searching for nearby police stations...", 'bot');
    // Integrate with Google Maps API or backend to search for stations
    setTimeout(() => {
      appendMessage("Nearby Police Station: Downtown Police Station, 3 miles away.", 'bot');
    }, 2000);
  } else {
    appendMessage("I’m sorry, I didn’t quite understand that. Can you please specify?", 'bot');
  }
}

// Event listener for text input
sendBtn.addEventListener('click', function() {
  let inputText = userInput.value.trim();
  if (inputText) {
    appendMessage(inputText, 'user');
    processInput(inputText);
    userInput.value = '';  // Clear input field
  }
});

// Voice Command Recognition
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

voiceBtn.addEventListener('click', function() {
  recognition.start();
});

recognition.onresult = function(event) {
  let voiceInput = event.results[0][0].transcript;
  appendMessage(voiceInput, 'user');
  processInput(voiceInput);
};

recognition.onerror = function(event) {
  appendMessage("Sorry, I couldn't hear you properly. Please try again.", 'bot');
};
