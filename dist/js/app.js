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
    openHandler(registerModalButton, registerModal, function () {
      console.log('skksks');
    });
  } // Add New Card


  var addNewCard = document.querySelector('#addNewCard');

  if (addNewCard) {
    addNewCard.addEventListener('click', function (e) {
      if (e.target.dataset.component === 'addNewCardButton') {
        addNewCard.classList.add('active');
      }
    });
  } // Update Date Input Function


  var dateInput = document.querySelector('#dateInput');

  var updateDateInput = function updateDateInput(type) {
    if (dateInput.value) {
      dateInput.value = "".concat(String(currentDate.day).padStart(2, '0'), "-").concat(String(currentDate.month).padStart(2, '0'), " ").concat(String(currentDate.hours).padStart(2, '0'), ":").concat(String(currentDate.minutes).padStart(2, '0'));
    } else {
      if (type === 'date') {
        dateInput.value = "".concat(String(currentDate.day).padStart(2, '0'), "-").concat(String(currentDate.month).padStart(2, '0'));
      }

      if (type === 'time') {
        dateInput.value = "".concat(String(currentDate.hours).padStart(2, '0'), ":").concat(String(currentDate.minutes).padStart(2, '0'));
      }
    }
  }; // DatePicker


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
        updateDateInput('date');
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
        updateDateInput('time');
        closeHandler(timePicker);
      }
    });
  } // Timer


  var date_timer = document.querySelector('#timer');

  function getTimeRemaining(time) {
    var days,
        hours,
        minutes,
        seconds = 0;

    if (time.days.name) {
      days = time.days.value;
      hours = time.hours.value;
      minutes = time.minutes.value;
      seconds = time.seconds.value;
    } else {
      days = time.days;
      hours = time.hours;
      minutes = time.minutes;
      seconds = time.seconds;
    }

    if (!days && !hours && !minutes && !seconds) {
      return {
        'days': 0,
        'hours': 0,
        'minutes': 0,
        'seconds': 0
      };
    }

    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      minutes = 59;
      hours--;
    }

    if (hours < 0) {
      hours = 23;
      days--;
    }

    return {
      'days': {
        name: days === 1 ? 'день' : days === 2 || days === 3 || days === 4 ? 'дня' : 'дней',
        value: days
      },
      'hours': {
        name: hours === 1 ? 'час' : hours === 2 || hours === 3 || hours === 4 ? 'часа' : 'часов',
        value: hours
      },
      'minutes': {
        name: minutes === 1 ? 'минута' : minutes === 2 || minutes === 3 || minutes === 4 ? 'минуты' : 'минут',
        value: minutes
      },
      'seconds': {
        name: seconds === 1 ? 'секунда' : seconds === 2 || seconds === 3 || seconds === 4 ? 'секунды' : 'секунд',
        value: seconds
      }
    };
  }

  function initializeClock(id, time) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.day');
    var hoursSpan = clock.querySelector('.hour');
    var minutesSpan = clock.querySelector('.minute');
    var secondsSpan = clock.querySelector('.second');

    function updateClock() {
      time = getTimeRemaining(time);
      daysSpan.innerHTML = "".concat(('0' + time.days.value).slice(-2), " <span>").concat(time.days.name, "</span>");
      hoursSpan.innerHTML = "".concat(('0' + time.hours.value).slice(-2), " <span>").concat(time.hours.name, "</span>");
      minutesSpan.innerHTML = "".concat(('0' + time.minutes.value).slice(-2), " <span>").concat(time.minutes.name, "</span>");
      secondsSpan.innerHTML = "".concat(('0' + time.seconds.value).slice(-2), " <span>").concat(time.seconds.name, "</span>");
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  var timerData = {};

  try {
    timerData = JSON.parse(date_timer.dataset.time);
  } catch (err) {
    timerData = {};
    new Error(err);
  }

  if (date_timer) {
    initializeClock('timer', timerData);
  }
});