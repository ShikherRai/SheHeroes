// Select the button and feedback elements
const sosButton = document.getElementById('sos-button');
const sosFeedback = document.getElementById('sos-feedback');

// Event listener for button click
sosButton.addEventListener('click', () => {
  // Disable the button and change text to indicate action is in progress
  sosButton.disabled = true;
  sosButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate sending the SOS alert (2 seconds delay)
  setTimeout(() => {
    // Enable the button and reset the text
    sosButton.disabled = false;
    sosButton.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Send SOS';

    // Show the success feedback message
    sosFeedback.classList.remove('hidden');
    sosFeedback.textContent = 'SOS Alert Sent Successfully!';

    // Hide the feedback message after 3 seconds
    setTimeout(() => {
      sosFeedback.classList.add('hidden');
    }, 3000);
  }, 2000); // Simulated delay
});
