// Main
const backdrop = document.querySelector('#backdrop');
const modals = document.querySelectorAll('.default-modal');

// Functions
const openHandler = (button, modal, func) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof func === 'function') {
      func();
    }
    backdrop.classList.remove('hidden');
    modal.classList.add('active');
  })
}

const closeHandler = (modal) => {
  backdrop.classList.add('hidden');
  modal.classList.remove('active');
}

// Open Modal Function
if (backdrop) {
  backdrop.addEventListener('click', () => {
    modals.forEach(closeHandler);
  })
}