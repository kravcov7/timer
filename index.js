const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Функция для форматирования числа в двузначную строку
const addZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    // Остановить предыдущую анимацию, если такая есть
    clearInterval(intervalId);

    let remainingSeconds = seconds;
    intervalId = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds < 0) {
        clearInterval(intervalId);
        timerEl.textContent = "00:00:00";
        return;
      }

      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;

      timerEl.textContent = `${addZero(hours)}:${addZero(
        minutes
      )}:${addZero(seconds)}`;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
