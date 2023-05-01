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

      if (btnStart.classList.contains('notActiv')) {
        return;
      }
      btnStart.classList.add('notActiv');
    } else {
      btnStart.classList.remove('notActiv');
      inputStopWath.classList.add('notActiv');
      stopWatch._input.disabled = true;
    }
  },
};

const stopWatch = flatpickr('#datetime-picker', options);

const inputStopWath = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('.btn');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', startTimer);

function startTimer() {
  if (btnStart.classList.contains('notActiv')) {
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
      inputStopWath.classList.remove('notActiv');
      stopWatch._input.disabled = false;
      console.log('Finish');
    }
  }, 1000);

  btnStart.classList.add('notActiv');
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
