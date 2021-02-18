
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const namesOfMonths = {
  '1': 'Января',
  '2': 'Февраля',
  '3': 'Марта',
  '4': 'Апреля',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Августа',
  '9': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
}

const dayElements = {
  current: document.querySelector('.day[data-current="true"]'),
  prev: document.querySelector('.day[data-datepicker="prev"]'),
  next: document.querySelector('.day[data-datepicker="next"]'),
}

const monthElements = {
  current: document.querySelector('.month[data-current="true"]'),
  prev: document.querySelector('.month[data-datepicker="prev"]'),
  next: document.querySelector('.month[data-datepicker="next"]'),
}

const changeMonth = (month, isNewYear) => {
  monthElements.current.innerHTML = namesOfMonths[month];
  monthElements.prev.innerHTML = namesOfMonths[month - 1];
  monthElements.next.innerHTML = namesOfMonths[month + 1];

  if (month === 1) {
    monthElements.prev.innerHTML = namesOfMonths[12];
  }

  if (isNewYear) {
    monthElements.prev.innerHTML = namesOfMonths[12];
  }
  if (month === 12) {
    monthElements.next.innerHTML = namesOfMonths[1];
  }
}

const changeDay = (day, dayInMonth, isNewMonth = false) => {
  dayElements.current.innerHTML = day;
  dayElements.current.dataset.value = day;
  dayElements.next.innerHTML = day + 1;
  if (day === dayInMonth) {
    dayElements.next.innerHTML = 1;
    return;
  }
  if (isNewMonth || day === 1) {
    dayElements.prev.innerHTML = dayInMonth;
  } else {
    dayElements.prev.innerHTML = day - 1;
  }
}

changeDay(currentDate.day)
changeMonth(currentDate.month)

const datePickerButton = document.querySelector('[data-component="date-picker"]');
const datePicker = document.querySelector('#datePicker');