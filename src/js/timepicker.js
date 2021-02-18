// Time Picker

const timePicker = document.querySelector('#timePicker')
const timePickerButton = document.querySelector('[data-component="time-picker"]')

const hourElements = {
  current: document.querySelector('.hour[data-current="true"]'),
  prev: document.querySelector('.hour[data-timepicker="prev"]'),
  next: document.querySelector('.hour[data-timepicker="next"]'),
}

const minuteElements = {
  current: document.querySelector('.minute[data-current="true"]'),
  prev: document.querySelector('.minute[data-timepicker="prev"]'),
  next: document.querySelector('.minute[data-timepicker="next"]'),
}

const getNewHours = (hour, action) => {
  if (!action) {
    return {
      current: hour,
      prev: hour === 0 ? '23' : hour - 1,
      next: hour === 0 ? "01" : hour + 1,
    }
  }
  if (action === 'prev') {
    currentDate.hours--
    if (currentDate.hours < 0) {
      currentDate.hours = 23;
      return {
        current: 23,
        prev: 22,
        next: "00",
      }
    } else {

      return {
        current: currentDate.hours,
        prev:
          currentDate.hours === 0 ? '23' : currentDate.hours - 1,
        next: currentDate.hours + 1,
      }
    }
  }
  if (action === 'next') {
    currentDate.hours++
    if (currentDate.hours > 23) {
      currentDate.hours = 0;
      return {
        current: "00",
        prev: "23",
        next: "01",
      }
    } else {
      return {
        current: currentDate.hours,
        prev: currentDate.hours - 1,
        next: currentDate.hours === 23 ? '00' : currentDate.hours + 1,
      }
    }
  }
}

const getNewMinutes = (minute, action) => {
  if (!action) {
    return {
      current: minute,
      prev: minute === 0 ? '23' : minute - 1,
      next: minute === 0 ? "01" : minute + 1,
    }
  }
  if (action === 'prev') {
    currentDate.minutes--
    if (currentDate.minutes < 0) {
      currentDate.minutes = 59;
      return {
        current: 59,
        prev: 58,
        next: "00",
      }
    } else {

      return {
        current: currentDate.minutes,
        prev:
          currentDate.minutes === 0 ? '59' : currentDate.minutes - 1,
        next: currentDate.minutes + 1,
      }
    }
  }
  if (action === 'next') {
    currentDate.minutes++
    if (currentDate.minutes > 59) {
      currentDate.minutes = 0;
      return {
        current: "00",
        prev: "59",
        next: "01",
      }
    } else {
      return {
        current: currentDate.minutes,
        prev: currentDate.minutes - 1,
        next: currentDate.minutes === 59 ? '00' : currentDate.minutes + 1,
      }
    }
  }
}

const editTime = (data, type) => {
  if (type === 'hour') {
    Object.keys(data).forEach((key) => {
      hourElements[key].innerHTML = String(data[key]).padStart(2, '0');
    })
  }
  if (type === 'minute') {
    Object.keys(data).forEach((key) => {
      minuteElements[key].innerHTML = String(data[key]).padStart(2, '0');;
    })
  }
}

editTime(getNewHours(currentDate.hours), 'hour');