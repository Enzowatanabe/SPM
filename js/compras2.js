import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

const colunas = ["Cliente", "Data", "Loja", "Mês", "TipoPagamento", "Valor", "descrição"];

const q = query(collection(db, "Compras"))

async function buscarPedidos() {
    const querySnapshot = await getDocs(q);
    const data = {};
    querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
    })

    return data;
}

function exibirTabela(data) {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    for (const dataLinha of Object.values(data)) {
        const linha = document.createElement("tr")
        for (const coluna of colunas) {
            const elementoColuna = document.createElement("td");
            if (coluna === "Valor") {
                const valorFormatado = parseFloat(dataLinha[coluna]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                elementoColuna.innerText = valorFormatado;
            } else {
                elementoColuna.innerText = dataLinha[coluna];
            }

            linha.appendChild(elementoColuna);
        }
        tabela.appendChild(linha);
    }
}

async function recarregarTabela() {
    const data = await buscarPedidos();
    exibirTabela(data);
}

await recarregarTabela();

document.getElementById("calcular").addEventListener("click", async () => {
    const mes = document.getElementById("mes").value;
    const data = await buscarPedidos();
    const dataFiltrado = Object.values(data).filter((item) => item.Mês === mes);
    const somaTotal = dataFiltrado.reduce((total, item) => total + parseFloat(item.Valor), 0);
    document.getElementById("soma-total").innerText = somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

async function buscarDadosCompras(mes) {
    const querySnapshot = await getDocs(collection(db, "Compras"));
    const data = {};

    querySnapshot.forEach((doc) => {
        const compra = doc.data();
        if (compra.Mês === mes) {
            const cliente = compra.Cliente;
            const valorTotal = compra.Valor;

            if (!data[cliente]) {
                data[cliente] = 0;
            }

            data[cliente] += parseFloat(valorTotal);
        }
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
async function recarregarGraficoCompras(mes) {
    const data = await buscarDadosCompras(mes);
    exibirGraficoCompras(data);
}

document.getElementById("calcular").addEventListener("click", async () => {
    const mes = document.getElementById("mes").value;
    await recarregarGraficoCompras(mes);
});

document.getElementById("limpar").addEventListener("click", async () => {
    document.getElementById("mes").value = "";
    await recarregarGraficoCompras();
    document.getElementById("soma-total").innerText = "";
});