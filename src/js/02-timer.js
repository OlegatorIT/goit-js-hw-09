import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let idInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      if (idInterval !== null) {
        return startValue();
      }
      if (btnStart.classList.contains('btn-notActiv')) {
        return;
      }
      btnStart.classList.add('btn-notActiv');
    } else {
      btnStart.classList.remove('btn-notActiv');
    }
  },
};

const stopWatch = flatpickr('#datetime-picker', options);

const btnStart = document.querySelector('.btn');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', startTimer);

function startTimer() {
  if (btnStart.classList.contains('btn-notActiv')) {
    return;
  }

  idInterval = setInterval(() => {
    const currentValue =
      stopWatch.selectedDates[0].getTime() - new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(currentValue);
    `${(valueSeconds.textContent = addLeadingZero(seconds))} 
     ${(valueMinutes.textContent = addLeadingZero(minutes))} 
    ${(valueHours.textContent = addLeadingZero(hours))} 
    ${(valueDays.textContent = addLeadingZero(days))}`;
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(idInterval);
      console.log('Finish');
    }
  }, 1000);

  btnStart.classList.add('btn-notActiv');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startValue() {
  clearInterval(idInterval);
  valueSeconds.textContent = '00';
  valueMinutes.textContent = '00';
  valueHours.textContent = '00';
  valueDays.textContent = '00';
}
