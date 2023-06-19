// animación del contador de libreria de animación

// var clock = $(".clock").FlipClock({ clockFace: "TwelveHourClock" });

// Cuenta regresiva

const getRemainingTime = (deadline) => {
  let now = new Date(),
    remainTime = (new Date(deadline) - now + 1000) / 1000,
    remainSeconds = ("0" + Math.floor(remainTime % 60)).slice(-2),
    remainMinutes = ("0" + Math.floor((remainTime / 60) % 60)).slice(-2),
    remainHours = ("0" + Math.floor((remainTime / 3600) % 24)).slice(-2),
    remainDays = Math.floor(remainTime / (3600 * 24));

  return {
    remainSeconds,
    remainMinutes,
    remainHours,
    remainDays,
    remainTime,
  };
};

const countdown = (deadline, elem, finalMessage) => {
  const el = document.getElementById(elem);

  const timerUpdate = setInterval(() => {
    let t = getRemainingTime(deadline);

    el.innerHTML = `
      <div class="clock__days number"><span>${t.remainDays}</span><h4>días</h4></div>
      <div class="clock__hours number"><span>${t.remainHours}</span><h4>horas</h4></div>
      <div class="clock__minutes number"><span>${t.remainMinutes}</span><h4>minutos</h4></div>
      <div class="clock__seconds number"><span>${t.remainSeconds}</span><h4>segundos</h4></div>`;

    if (t.remainTime <= 1) {
      clearInterval(timerUpdate);
      el.innerHTML = finalMessage;
    }
  }, 1000);
};

countdown("Jan 1 2024 00:00:00 GMT-0600", "clock", "¡Feliz Año nuevo!");
