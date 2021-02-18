// CopyLink
const CopyButtons = document.querySelectorAll('[data-component="copy-link"]')
CopyButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = window.location.origin + button.dataset.url;
    window.navigator.clipboard.writeText(value)
      .then(() => {
        button.classList.add('green');
      })
      .catch(err => {
        console.log('Something went wrong', err);
      })
  })
})

const CopyDataArea = registerModal.querySelector('[data-component="copy-data"]')
CopyDataArea.addEventListener('click', (e) => {
  const dataset = CopyDataArea.dataset;
  const value = `Login: ${dataset.login}, Password: ${dataset.password}`
  window.navigator.clipboard.writeText(value)
    .then(() => {
      CopyDataArea.querySelector('.notice').innerHTML = 'Скопировано!'
    })
    .catch(err => {
      console.log('Something went wrong', err);
    })
})