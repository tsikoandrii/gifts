// File Input
const FileInputs = document.querySelectorAll('[data-component="file-input"]')
FileInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    const img = input.querySelector('.img');
    let file = e.target.files[0]

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function() {
      img.classList.add('no-hidden');
      input.classList.remove('empty')
      img.setAttribute('src', reader.result);
    };

    if (input.querySelector('.deleteContest')) {
      input.querySelector('.deleteContest').addEventListener('click', () => {
        deleteContestModal.querySelector('[data-control="delete"]').addEventListener('click', () => {
          img.classList.remove('no-hidden');
          input.classList.add('empty')
          img.setAttribute('src', "");
          closeHandler(deleteContestModal);
          deleteContestModal.querySelector('[data-control="delete"]').onclick = null;
        })

      })
    }

    reader.onerror = function() {
      console.log(reader.error);
    };
  })
})