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

const colunas = ["Nome", "descrição", "Valor", "DataVenda", "Mes", "Sinal", "Status", "PrimeiroPagamento"];


const q = query(collection(db, "Pedidos"))

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

            elementoColuna.innerText = dataLinha[coluna]
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