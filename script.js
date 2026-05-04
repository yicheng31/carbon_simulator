document.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = document.getElementById('welcomeModal');
  const startBtn = document.getElementById('startBtn');

  // Show welcome modal on page load
  if (welcomeModal) {
    welcomeModal.classList.remove('hidden');
  }

  // Hide modal when start button is clicked
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (welcomeModal) {
        welcomeModal.classList.add('hidden');
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
