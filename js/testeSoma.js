import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import { getFirestore, collection, getDoc, getDocs, query} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


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
      const mes = data.Mês;
      const valorTotal = data.ValorTotal;
  
      if (mes) {
        if (somaClientesPorMes[mes]) {
          somaClientesPorMes[mes] += valorTotal;
        } else {
          somaClientesPorMes[mes] = valorTotal;
        }
      }
    });
  
    ComprasSnapshot.forEach((doc) => {
      const data = doc.data();
      const mes = data.Mês;
      const valor = data.Valor; 
  
      if (mes) {
        if (somaComprasPorMes[mes]) {
          somaComprasPorMes[mes] += valor;
        } else {
          somaComprasPorMes[mes] = valor;
        }
      }
    });
  
    ContasSnapshot.forEach((doc) => {
      const data = doc.data();
      const mes = data.Mês;
      const valor = data.Valor;
  
      if (mes) {
        if (somaContasPorMes[mes]) {
          somaContasPorMes[mes] += valor;
        } else {
          somaContasPorMes[mes] = valor;
        }
      }
    });
    console.log(somaComprasPorMes)
    return {
      Clientes: somaClientesPorMes,
      Compras: somaComprasPorMes,
      Contas: somaContasPorMes,
    };
  }
  
 
  function exibirGrafico(somas) {
    const meses = getAllMonths(somas);
    const valoresClientes = getValoresPorMes(somas.Clientes, meses);
    const valoresCompras = getValoresPorMes(somas.Compras, meses);
    const valoresContas = getValoresPorMes(somas.Contas, meses);
  
    const ctx = document.getElementById("grafico").getContext("2d");
    const chartConfig = {
      type: "line",
      data: {
        labels: meses,
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
          duration: 000, // Duração da animação em milissegundos (2 segundos no exemplo)
          easing: "easeInOutQuart", // Função de easing para suavizar a animação (easeInOutQuart no exemplo)
        },
      },
    };
  
    const myChart = new Chart(ctx, chartConfig);
  }
  function getAllMonths(somas) {
    const meses = new Set();
    Object.keys(somas.Clientes).forEach((mes) => meses.add(mes));
    Object.keys(somas.Compras).forEach((mes) => meses.add(mes));
    Object.keys(somas.Contas).forEach((mes) => meses.add(mes));
    return Array.from(meses).sort((a, b) => new Date(a) - new Date(b));
  }
  
  function getValoresPorMes(valores, meses) {
    return meses.map((mes) => (valores[mes] ? valores[mes] : 0));
  }
  // ...
  
  async function recarregarGrafico() {
    const somas = await calcularSomaPorMes();
    exibirGrafico(somas);
  }
  
  await recarregarGrafico();
  
  // ...