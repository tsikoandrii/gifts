document.addEventListener('DOMContentLoaded', function () {
  // Subscribe Modal //
  var subscribeModal = document.querySelector('#subscribeModal');
  var subscribeButton = document.querySelector('#subscribeButton');

  if (subscribeButton) {
    openHandler(subscribeButton, subscribeModal);
  }

  var deleteContestModal = document.querySelector('#deleteContestModal');
  var changeModalButton = document.querySelector('#changeModal');
  var subscribeButtonClose = document.querySelector('#subClose');
  changeModalButton.addEventListener('click', function () {
    subscribeModal.classList.add('changed');
  });
  subscribeButtonClose.addEventListener('click', function () {
    closeHandler(subscribeModal);
  }); // Delete Card Modal

  var deleteCardModal = document.querySelector('#deleteCardModal');
  var deleteCardButton = document.querySelector('#deleteCardButton');

  if (deleteCardButton) {
    openHandler(deleteCardButton, deleteCardModal);
  }

  deleteCardModal.querySelector('[data-control="cancel"]').addEventListener('click', function () {
    closeHandler(deleteCardModal);
  }); // Delete Contest Button

  var deleteContestButtons = document.querySelectorAll('.deleteContest');

  if (deleteContestButtons.length) {
    deleteContestButtons.forEach(function (button) {
      openHandler(button, deleteContestModal);
    });
  }

  deleteContestModal.querySelector('[data-control="cancel"]').addEventListener('click', function () {
    closeHandler(deleteContestModal);
  }); // Register Modal

  var registerModal = document.querySelector('#registerModal');
  var registerModalButton = document.querySelector('#registerModalButton');

  if (registerModalButton) {
    openHandler(registerModalButton, registerModal);
  } // Add New Card


  var addNewCard = document.querySelector('#addNewCard');

  if (addNewCard) {
    addNewCard.addEventListener('click', function (e) {
      if (e.target.dataset.component === 'addNewCardButton') {
        addNewCard.classList.add('active');
      }
    });
  } // DatePicker


  if (datePickerButton) {
    openHandler(datePickerButton, datePicker);
    datePicker.addEventListener('click', function (e) {
      if (e.target.dataset.type === 'day') {
        var action = e.target.dataset.datepicker;

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
            changeMonth(currentDate.month);
          }
        }

        if (action === 'next') {
          currentDate.day++;

          if (currentDate.day > daysInMonth(currentDate.month, currentDate.year)) {
            currentDate.day = 1;
            changeDay(currentDate.day, daysInMonth(currentDate.month, currentDate.year), true);
            currentDate.month++;
            changeMonth(currentDate.month);
            return 0;
          }

          changeDay(currentDate.day, daysInMonth(currentDate.month, currentDate.year));
        }
      }

      if (e.target.dataset.type === 'month') {
        var _action = e.target.dataset.datepicker;

        if (_action === 'prev') {
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

        if (_action === 'next') {
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
        datePickerButton.innerHTML = "".concat(currentDate.day, " ").concat(namesOfMonths[currentDate.month]);
        closeHandler(datePicker);
      }
    });
  } // TimePickerButton


  if (timePickerButton) {
    openHandler(timePickerButton, timePicker);
    timePicker.addEventListener('click', function (e) {
      if (e.target.dataset.type === 'hour') {
        var action = e.target.dataset.timepicker;
        var obj = getNewHours(currentDate.hours, action);
        editTime(obj, 'hour');
      }

      if (e.target.dataset.type === 'minute') {
        var _action2 = e.target.dataset.timepicker;

        var _obj = getNewMinutes(currentDate.minutes, _action2);

        editTime(_obj, 'minute');
      }

      if (e.target.dataset.type === 'submit') {
        timePickerButton.innerHTML = "".concat(String(currentDate.hours).padStart(2, '0'), ":").concat(String(currentDate.minutes).padStart(2, '0'));
        closeHandler(timePicker);
      }
    });
  }
});