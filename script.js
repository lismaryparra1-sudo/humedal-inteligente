const phCtx = document.getElementById('phChart').getContext('2d');
const tempCtx = document.getElementById('tempChart').getContext('2d');
const nutrientesCtx = document.getElementById('nutrientesChart').getContext('2d');

function crearGrafico(ctx, label, color) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: color,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: label }
      }
    }
  });
}

const phChart = crearGrafico(phCtx, 'pH', 'blue');
const tempChart = crearGrafico(tempCtx, 'Temperatura (°C)', 'red');
const nutrientesChart = crearGrafico(nutrientesCtx, 'Nitratos (mg/L)', 'green');

// Simulación de datos
let tiempo = 0;
const alertas = [];

function agregarDato(chart, valor) {
  chart.data.labels.push(`${tiempo}:00`);
  chart.data.datasets[0].data.push(valor);
  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

function generarAlerta(condicion, mensaje) {
  if (condicion && !alertas.includes(mensaje)) {
    alertas.push(mensaje);
    const ul = document.getElementById('listaAlertas');
    const li = document.createElement('li');
    li.textContent = mensaje;
    ul.appendChild(li);
  }
}

setInterval(() => {
  tiempo++;

  const ph = (6.5 + Math.random() * 1.5).toFixed(2);
  const temp = (28 + Math.random() * 4).toFixed(1);
  const nitratos = (3.5 + Math.random() * 2).toFixed(1);

  agregarDato(phChart, ph);
  agregarDato(tempChart, temp);
  agregarDato(nutrientesChart, nitratos);

  generarAlerta(ph < 6.8, "⚠️ pH bajo detectado");
  generarAlerta(temp > 31, "⚠️ Temperatura alta");
  generarAlerta(nitratos > 5, "⚠️ Niveles de nitratos elevados");
}, 2000);
