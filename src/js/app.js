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
    openHandler(registerModalButton, registerModal, registerClickFunc);
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

  // Update Date Input Function

  const dateInput = document.querySelector('#dateInput');

  const updateDateInput = (type) => {
    if (dateInput.value) {
      dateInput.value = `${String(currentDate.day).padStart(2, '0')}-${String(currentDate.month).padStart(2, '0')} ${String(currentDate.hours).padStart(2, '0')}:${String(currentDate.minutes).padStart(2, '0')}`;
    } else {
      if (type === 'date') {
        dateInput.value = `${String(currentDate.day).padStart(2, '0')}-${String(currentDate.month).padStart(2, '0')}`;
      }
      if (type === 'time') {
        dateInput.value = `${String(currentDate.hours).padStart(2, '0')}:${String(currentDate.minutes).padStart(2, '0')}`;
      }
    }
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
        datePickerButton.innerHTML = `${currentDate.day} ${namesOfMonths[currentDate.month]}`;
        updateDateInput('date');
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
        updateDateInput('time');
        closeHandler(timePicker);
      }
    })

  }

  // Timer

  let date_timer = document.querySelector('#timer')

  function getTimeRemaining(time) {
    let days, hours, minutes, seconds = 0;

    if (time.days.name) {
      days = time.days.value
      hours = time.hours.value
      minutes = time.minutes.value
      seconds = time.seconds.value
    } else {
      days = time.days
      hours = time.hours
      minutes = time.minutes
      seconds = time.seconds
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
        value: days,
      },
      'hours': {
        name: hours === 1 ? 'час' : hours === 2 || hours === 3 || hours === 4 ? 'часа' : 'часов',
        value: hours,
      },
      'minutes': {
        name: minutes === 1 ? 'минута' : minutes === 2 || minutes === 3 || minutes === 4 ? 'минуты' : 'минут',
        value: minutes,
      },
      'seconds': {
        name: seconds === 1 ? 'секунда' : seconds === 2 || seconds === 3 || seconds === 4 ? 'секунды' : 'секунд',
        value: seconds,
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
      daysSpan.innerHTML = `${('0' + time.days.value).slice(-2)} <span>${time.days.name}</span>`;
      hoursSpan.innerHTML = `${('0' + time.hours.value).slice(-2)} <span>${time.hours.name}</span>`;
      minutesSpan.innerHTML = `${('0' + time.minutes.value).slice(-2)} <span>${time.minutes.name}</span>`;
      secondsSpan.innerHTML = `${('0' + time.seconds.value).slice(-2)} <span>${time.seconds.name}</span>`;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }


  let timerData = {};

  try {
    timerData = JSON.parse(date_timer.dataset.time);
  } catch (err) {
    timerData = {};
    new Error(err);
  }

  if (date_timer) {
    initializeClock('timer', timerData);
  }
})