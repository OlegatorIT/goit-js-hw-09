import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

let counter = 1;

formEl.addEventListener('submit', e => {
  e.preventDefault();
  repeatPromis();
});

function createPromise(position, delay) {
  const step = Number(formEl.elements.step.value);
  delay =
    counter === 1
      ? Number(formEl.elements.delay.value)
      : Number(formEl.elements.delay.value) + (counter - 1) * step;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);

    counter++;
  });
}

function repeatPromis() {
  const amount = Number(formEl.elements.amount.value);

  const interval_ID = setInterval(() => {
    if (counter <= amount) {
      createPromise(counter)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    } else {
      clearInterval(interval_ID);
      counter = 1;
    }
  }, 0);
}
