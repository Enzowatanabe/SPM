import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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



const colunas = ["Conta", "Descrição", "Valor", "DataPagamento", "Data", "Mês", "FormaPagamento"];


const q = query(collection(db, "Contas"))

async function buscarPedidos() {
    const querySnapshot = await getDocs(q);
    const data = {};
    querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
    })
     
    return data;
}

// Consultar contas vencidas
// const consultaContasVencidas = query(collection(db, "Contas"), where("DataPagamento", "<", new Date("2024-01-01")));

// const contasVencida = await getDocs(consultaContasVencidas);
// contasVencida.forEach((doc) => {
//     console.log("Conta vencida:")
//     console.log(doc.data());
// })



function exibirTabela(data) {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    console.log(data);

    for (const dadosLinha of Object.values(data)) {      
        const linha = document.createElement("tr")
        for (const coluna of colunas) {
            const elementoColuna = document.createElement("td");
        
            let dadoColuna = dadosLinha[coluna]

            // Converte timestamp do firestore para data formatada
            if (typeof dadoColuna === "object" && "toDate" in dadoColuna) {
                dadoColuna = dadoColuna.toDate().toLocaleDateString();
            }

            elementoColuna.innerText = dadoColuna
          linha.appendChild(elementoColuna)
        }

        tabela.appendChild(linha);        
    }
}

async function recarregarTabela() {
    const data = await buscarPedidos();
    exibirTabela(data);
}

await recarregarTabela();

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



