const ingresoInput = document.getElementById("ingresoInput");
const cantidadInput = document.getElementById("cantidadInput");
const agregarBtn = document.getElementById("agregarBtn");
const resultado = document.getElementById("resultado");
const ingresosAgregados = document.getElementById("ingresosAgregados");
const graficaPastel = document.getElementById("graficaPastel");

let totalIngresos = 0;
const datosGrafica = {
  labels: [],
  data: [],
  backgroundColor: [],
};

agregarBtn.addEventListener('click', (e) => {

  e.preventDefault();

  const ingreso = ingresoInput.value;
  const cantidad = parseInt(cantidadInput.value);

  if (ingreso && cantidad) {
    totalIngresos += cantidad;
    resultado.innerText = `Total: $${totalIngresos}`;

    const ingresoAgregado = document.createElement("p");
    ingresoAgregado.innerText = `Ingreso: ${ingreso}, Cantidad: $${cantidad}`;
    ingresosAgregados.appendChild(ingresoAgregado);

    datosGrafica.labels.push(ingreso);
    datosGrafica.data.push(cantidad);
    datosGrafica.backgroundColor.push(getRandomColor());

    if (!graficaPastel.chart) {
      
      const ctx = graficaPastel.getContext("2d");
      graficaPastel.chart = new Chart(ctx, {
        type: "doughnut",
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Gráfico'
            }
          },
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        data: {
          labels: datosGrafica.labels,
          datasets: [{
            data: datosGrafica.data,
            backgroundColor: datosGrafica.backgroundColor,
          }],
        },
      });
    } else {
      graficaPastel.chart.data.labels = datosGrafica.labels;
      graficaPastel.chart.data.datasets[0].data = datosGrafica.data;
      graficaPastel.chart.update();
    }

    ingresoInput.value = "";
    cantidadInput.value = "";
  }
})

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}