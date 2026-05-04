document.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = document.getElementById('welcomeModal');
  const startBtn = document.getElementById('startBtn');

  // Show welcome modal on page load
  if (welcomeModal) {
    welcomeModal.classList.remove('hidden');
  }

  // Hide modal and scroll to first question when start button is clicked
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (welcomeModal) {
        welcomeModal.classList.add('hidden');
      }
      
      // Scroll to first question
      const firstQuestion = document.querySelector('.question-step-1');
      if (firstQuestion) {
        setTimeout(() => {
          firstQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }

  // Track carbon and pressure values from button clicks
  const optionButtons = document.querySelectorAll('.option-button');
  optionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const carbon = parseFloat(e.target.dataset.carbon) || 0;
      const pressure = parseFloat(e.target.dataset.pressure) || 0;
      
      // Update totals (placeholder for actual calculation)
      console.log(`Question ${e.target.dataset.question}: +${carbon}kg CO2, +${pressure}% pressure`);
    });
  });
});
