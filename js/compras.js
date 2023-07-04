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
 
const colunas = ["Cliente", "Valor", "Loja", "Mês", "descrição" , "Data" ,"TipoPagamento"];

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

// Adicione essas linhas
let paginaAtual = 1;
const itensPorPagina = 40;

async function recarregarTabela() {
    const data = await buscarPedidos();
    const dataPaginado = Object.values(data).slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);
    exibirTabela(dataPaginado);

    // Atualize o número da página atual
    document.getElementById("pagina-atual").innerText = `Página ${paginaAtual}`;
}

await recarregarTabela();

// Adicione essas linhas
document.getElementById("anterior").addEventListener("click", () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        recarregarTabela();
    }
});

document.getElementById("proximo").addEventListener("click", async () => {
    const data = await buscarPedidos();
    const numPaginas = Math.ceil(Object.values(data).length / itensPorPagina);
    if (paginaAtual < numPaginas) {
        paginaAtual++;
        recarregarTabela();
    }
});


// const q = query(collection(db, "Compras"))

// async function buscarPedidos() {
//     const querySnapshot = await getDocs(q);
//     const data = {};
//     querySnapshot.forEach((doc) => {
//         data[doc.id] = doc.data();
//     })

//     return data;
// }

// function exibirTabela(data) {
//     const tabela = document.getElementById("tabela");
//     tabela.innerHTML = "";


//     for (const dataLinha of Object.values(data)) {
//         const linha = document.createElement("tr")
//         for (const coluna of colunas) {
//             const elementoColuna = document.createElement("td");
//             if (coluna === "Valor") {
//                 const valorFormatado = parseFloat(dataLinha[coluna]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//                 elementoColuna.innerText = valorFormatado;
//             } else {
//                 elementoColuna.innerText = dataLinha[coluna];
//             }

//             linha.appendChild(elementoColuna);

//         }
//         tabela.appendChild(linha);        
//     }
// }
// async function recarregarTabela() {
//     const data = await buscarPedidos();
//     const valorTotal = Object.values(data).map((it) => Number(it.Valor) ?? 0).filter((valor) => !isNaN(valor)).reduce((total, cur) => cur + total, 0);
//     console.log({valorTotal});
//     exibirTabela(data);
// }

// await recarregarTabela();

const limparfiltro = document.getElementById('limparfiltro')
const filtrarbotao = document.getElementById('botaofiltrar')
filtrarbotao.addEventListener('click', ()=>{
        const input = document.getElementById("filtro").value
        filtrar(input)
    })
    limparfiltro.addEventListener('click', ()=>{
        document.getElementById("filtro").value = ""
        filtrar("")
    })    

    const filtrar = (input)=>{
        var input, filtro, tabela, linhas, colunas, valorCelula;
        filtro = input.toUpperCase();
        tabela = document.getElementById("tabela");
        linhas = tabela.getElementsByTagName("tr");

        for (var i = 0; i < linhas.length; i++) {
            colunas = linhas[i].getElementsByTagName("td");
            for (var j = 0; j < colunas.length; j++) {
                valorCelula = colunas[j].innerText || colunas[j].textContent;
                if (valorCelula.toUpperCase().indexOf(filtro) > -1) {
                    linhas[i].style.display = "";
                    break;
                } else {
                    linhas[i].style.display = "none";
                }
            }
        }
    }