import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, query} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBU4cy14ZPyRLAWD_qoI-58HiIAsaFVqKw",
    authDomain: "pontomovel-38fc6.firebaseapp.com",
    projectId: "pontomovel-38fc6",
    storageBucket: "pontomovel-38fc6.appspot.com",
    messagingSenderId: "1074418666528",
    appId: "1:1074418666528:web:67da185fe6a8349b8ec045",
    measurementId: "G-0589PM04ZM"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "Clientes"))

  // ... GRAFICO CLIENTES

function exibirTabela(data) {
    const valores = Object.values(data).map((item) => item.ValorTotal);
    const cliente = Object.values(data).map((item) => item.Cliente);
    const labels = Object.keys(data);
  
    const ctx = document.getElementById("grafico").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cliente,
        datasets: [
          {
            label: "CLIENTES",
            data: valores,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  
  // Função para buscar os pedidos no Firestore
  async function buscarPedidos() {
    const querySnapshot = await getDocs(q);
    const data = {};
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  
    return data;
  }
  
  // Função para recarregar a tabela com os dados atualizados
  async function recarregarTabela() {
    const data = await buscarPedidos();
    exibirTabela(data);
  }
  
  // Carrega a tabela inicialmente
  await recarregarTabela();
  
  
  // ... GRAFICO COMPRAS

  async function buscarDadosCompras() {
    const querySnapshot = await getDocs(collection(db, "Compras"));
    const data = {};
  
    querySnapshot.forEach((doc) => {
      const compra = doc.data();
      const cliente = compra.Cliente;
      const valorTotal = compra.Valor;
  
      if (!data[cliente]) {
        data[cliente] = 0;
      }
  
      data[cliente] += parseFloat(valorTotal);
    });
  
    return data;
  }
  
  function exibirGraficoCompras(data) {
    const labels = Object.keys(data);
    const valores = Object.values(data);
  
    const ctx = document.getElementById("grafico2").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "COMPRAS",
            data: valores,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  async function recarregarGraficoCompras() {
    const data = await buscarDadosCompras();
    exibirGraficoCompras(data);
  }
  
  await recarregarGraficoCompras();
  
  // ...

  // ... GRAFICO CONTAS

async function buscarDadosContas() {
  const querySnapshot = await getDocs(collection(db, "Contas"));
  const data = {};

  querySnapshot.forEach((doc) => {
    const conta = doc.data();
    const cliente = conta.Conta;
    const valorTotal = conta.Valor;

    if (!data[cliente]) {
      data[cliente] = 0;
    }

    data[cliente] += parseFloat(valorTotal);
  });

  return data;
}

function exibirGraficoContas(data) {
  const labels = Object.keys(data);
  const valores = Object.values(data);

  const ctx = document.getElementById("grafico3").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "CONTAS",
          data: valores,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function recarregarGraficoContas() {
  const data = await buscarDadosContas();
  exibirGraficoContas(data);
}

await recarregarGraficoContas();

// ...

// ------------------------------------------------------------------------------------------
async function calcularSomaPorMes() {
  const queryClientes = query(collection(db, "Clientes"));
  const queryCompras = query(collection(db, "Compras"));
  const queryContas = query(collection(db, "Contas"));

  const [clientesSnapshot, ComprasSnapshot, ContasSnapshot] = await Promise.all([
    getDocs(queryClientes),
    getDocs(queryCompras),
    getDocs(queryContas),
     
  ]);

  const somaClientesPorMes = {};
  const somaComprasPorMes = {};
  const somaContasPorMes = {};

  clientesSnapshot.forEach((doc) => {
    const data = doc.data();
    const mes = new Date(data.DataVenda).getMonth() + 1;
    const valorTotal = data.ValorTotal;

    if (mes) {
      if (somaClientesPorMes[mes]) {
        somaClientesPorMes[mes] += Number(valorTotal);
      } else {
        somaClientesPorMes[mes] = Number(valorTotal);
      }
    }
  });

  ComprasSnapshot.forEach((doc) => {
    const data = doc.data();
    const mes = new Date(data.Data).getMonth() + 1;
    const valor = data.Valor; 
    

    if (mes) {
      if (somaComprasPorMes[mes]) {
        somaComprasPorMes[mes] += Number(valor);
      } else {
        somaComprasPorMes[mes] = Number(valor);
      }
    }
    console.log(somaComprasPorMes)
  });


  ContasSnapshot.forEach((doc) => {
    const data = doc.data();
    const mes = (data.DataPagamento?.toDate() ?? new Date()).getMonth() + 1;
    const valor = data.Valor;

    if (mes) {
      if (somaContasPorMes[mes]) {
        somaContasPorMes[mes] += Number(valor);
      } else {
        somaContasPorMes[mes] = Number(valor);
      }
    }
    
  });
  
  return {
    Clientes: somaClientesPorMes,
    Compras: somaComprasPorMes,
    Contas: somaContasPorMes,
  };
  
}


function getAllMonths(somas) {
  const meses = new Set();
  Object.keys(somas.Clientes).forEach((mes) => meses.add(mes));
  Object.keys(somas.Compras).forEach((mes) => meses.add(mes));
  Object.keys(somas.Contas).forEach((mes) => meses.add(mes));
  
  const sortedMonths = Array.from(meses).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });
  
  return sortedMonths;
}

const nomesMeses = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro"
}


function getValoresPorMes(valores, meses) {
  return meses.map((mes) => (valores[mes] ? valores[mes] : 0));
}

function exibirGrafico(somas) {
  const meses = getAllMonths(somas);
  const valoresClientes = getValoresPorMes(somas.Clientes, meses);
  const valoresCompras = getValoresPorMes(somas.Compras, meses);
  const valoresContas = getValoresPorMes(somas.Contas, meses);

  // meses: [6, 7, ...]
  // mesesNomes: ["Junho", "Julho", ...]
  const mesesNomes = meses.map((numero) => nomesMeses[numero])
 

  const ctx = document.getElementById("grafico4").getContext("2d");
  const chartConfig = {
    type: "line",
    data: {
      labels: mesesNomes,
      datasets: [
        {
          label: "Soma do Valor de Contas",
          data: valoresContas,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Soma do Valor de Compras",
          data: valoresCompras,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Soma do Valor Total Clientes",
          data: valoresClientes,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "x", // Exibir os meses no eixo X
      scales: {
        y: {
          beginAtZero: true,

        },
      },
      animation: {
        duration: 1000, // Duração da animação em milissegundos (2 segundos no exemplo)
        easing: "easeInOutQuart", // Função de easing para suavizar a animação (easeInOutQuart no exemplo)
      },
    },
  };

  const myChart = new Chart(ctx, chartConfig);
}


async function recarregarGrafico() {
  const somas = await calcularSomaPorMes();
  exibirGrafico(somas);
}

await recarregarGrafico();

// ...