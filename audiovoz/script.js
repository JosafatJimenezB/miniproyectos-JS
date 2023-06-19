const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const resultArea = document.getElementById("result");

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = "es-ES";
recognition.interimResult = false;

btnStart.addEventListener("click", () => {
  recognition.start();
});

btnStop.addEventListener("click", () => {
  recognition.abort();
});

recognition.onresult = (event) => {
  const text = event.results[event.results.length - 1][0].transcript;
  resultArea.value = text;
};
