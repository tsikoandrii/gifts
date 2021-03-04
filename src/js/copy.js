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

let registerClickFunc = function () {
  axios.get('https://jsonplaceholder.typicode.com/users/2').then((resp) => {
    console.log(resp)
    if (resp.status !== 200) {
      return false;
    }
    let email = resp.data.email;
    let password = resp.data.phone;
    let login_text = document.getElementById('registered_email');
    let password_text = document.getElementById('registered_password');
    login_text.innerHTML = email;
    password_text.innerText = password;
    let copy_area = document.querySelector('[data-component="copy-data"]');
    copy_area.dataset.login = email;
    copy_area.dataset.password = password;
  })
}