document.addEventListener('DOMContentLoaded', () => {
  // Subscribe Modal //
  const subscribeModal = document.querySelector('#subscribeModal');
  const subscribeButton = document.querySelector('#subscribeButton');

  if (subscribeButton) {
    openHandler(subscribeButton, subscribeModal);
  }

  const deleteContestModal = document.querySelector('#deleteContestModal');

  const changeModalButton = document.querySelector('#changeModal');
  const subscribeButtonClose = document.querySelector('#subClose');

  changeModalButton.addEventListener('click', () => {
    subscribeModal.classList.add('changed');
  })

  subscribeButtonClose.addEventListener('click', () => {
    closeHandler(subscribeModal);
  })

  // Delete Card Modal
  const deleteCardModal = document.querySelector('#deleteCardModal');
  const deleteCardButton = document.querySelector('#deleteCardButton');

  if (deleteCardButton) {
    openHandler(deleteCardButton, deleteCardModal)
  }

  deleteCardModal.querySelector('[data-control="cancel"]').addEventListener('click', () => {
    closeHandler(deleteCardModal)
  })

  // Delete Contest Button
  const deleteContestButtons = document.querySelectorAll('.deleteContest');

  if (deleteContestButtons.length) {
    deleteContestButtons.forEach((button) => {
      openHandler(button, deleteContestModal);
    })
  }

  deleteContestModal.querySelector('[data-control="cancel"]').addEventListener('click', () => {
    closeHandler(deleteContestModal)
  })

  // Register Modal
  const registerModal = document.querySelector('#registerModal');
  const registerModalButton = document.querySelector('#registerModalButton');

  if (registerModalButton) {
    openHandler(registerModalButton, registerModal);
  }

  // Add New Card
  const addNewCard = document.querySelector('#addNewCard');

  if (addNewCard) {
    addNewCard.addEventListener('click', (e) => {
      if (e.target.dataset.component === 'addNewCardButton') {
        addNewCard.classList.add('active');
      }
    })
  }

  // DatePicker
  if (datePickerButton) {
    openHandler(datePickerButton, datePicker)
    datePicker.addEventListener('click', (e) => {
      if (e.target.dataset.type === 'day') {
        const action = e.target.dataset.datepicker;
        if (action === 'prev') {
          currentDate.day--;
          changeDay(currentDate.day);
          if (currentDate.day === 1) {
            dayElements.prev.innerHTML = daysInMonth(currentDate.month - 1, currentDate.year);
          }
          if (currentDate.day < 1) {
            currentDate.month--;
            currentDate.day = daysInMonth(currentDate.month, currentDate.year);
            dayElements.current.innerHTML = currentDate.day;
            dayElements.prev.innerHTML = currentDate.day - 1;
            changeMonth(currentDate.month)
          }
        }
        if (action === 'next') {
          currentDate.day++;
          if (currentDate.day > daysInMonth(currentDate.month, currentDate.year)) {
            currentDate.day = 1;
            changeDay(currentDate.day, daysInMonth(currentDate.month, currentDate.year), true);
            currentDate.month++
            changeMonth(currentDate.month)
            return 0;
          }
          changeDay(currentDate.day, daysInMonth(currentDate.month, currentDate.year));
        }
      }
      if (e.target.dataset.type === 'month') {
        const action = e.target.dataset.datepicker;
        if (action === 'prev') {
          currentDate.month--;
          if (currentDate.month === 1) {
            monthElements.prev.innerHTML = namesOfMonths[12];
            return 0;
          }
          if (currentDate.month < 1) {
            currentDate.month = 12;
            changeMonth(currentDate.month);
            return 0;
          }
          changeMonth(currentDate.month);
        }
        if (action === 'next') {
          currentDate.month++;
          if (currentDate.month > 12) {
            currentDate.month = 1;
            changeMonth(currentDate.month, true);
            return 0;
          }
          changeMonth(currentDate.month);
        }
      }

      if (e.target.dataset.type === 'submit') {
        datePickerButton.innerHTML = `${currentDate.day} ${namesOfMonths[currentDate.month]}`
        closeHandler(datePicker);
      }
    })
  }

  // TimePickerButton
  if (timePickerButton) {
    openHandler(timePickerButton, timePicker)

    timePicker.addEventListener('click', (e) => {
      if (e.target.dataset.type === 'hour') {
        const action = e.target.dataset.timepicker;
        const obj = getNewHours(currentDate.hours, action);
        editTime(obj, 'hour')
      }
      if (e.target.dataset.type === 'minute') {
        const action = e.target.dataset.timepicker;
        const obj = getNewMinutes(currentDate.minutes, action);
        editTime(obj, 'minute')
      }

      if (e.target.dataset.type === 'submit') {
        timePickerButton.innerHTML = `${String(currentDate.hours).padStart(2, '0')}:${String(currentDate.minutes).padStart(2, '0')}`
        closeHandler(timePicker);
      }
    })

  }
})