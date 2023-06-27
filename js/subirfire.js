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




const botaogo = document.getElementById('enviar');

botaogo.addEventListener("click", async()=>{
    const nomecli = document.getElementById('nome').value;
    const descricaocli = document.getElementById('descricao').value;
    const valorcli = document.getElementById('valor').value;
    const datacli = document.getElementById('dataVenda').value;
    const mescli = document.getElementById('mes').value;
    const sinalcli = document.getElementById('sinal').value;
    const statuscli = document.getElementById('status').value;
    const primeirocli = document.getElementById('primeiroPagamento').value;

    
    const docRef = await addDoc(collection(db, "Pedidos"), {
    Nome: nomecli,
    descrição: descricaocli,
    Valor: valorcli,
    DataVenda: datacli,
    Mes: mescli,
    Sinal: sinalcli,
    Status: statuscli,
    PrimeiroPagamento: primeirocli,
   
    
},{merge:true});
console.log("Document written with ID: ", docRef);

await recarregarTabela();
})

const q = query(collection(db, "Pedidos"))

// const docs = querySnapshot.docs()
// console.log(docs)
// console.log(querySnapshot.docs[0])
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



// const docRef = doc(db, "Pedidos", "enzo");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
  
//   {merge:true});
//   console.log("Document written with ID: ", docRef);
// })

// const docRef = doc(db, "Pedidos", "nomecli");
// const docSnap = await getDoc(docRef);

// console.log(docRef)

// if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     console.log("No such document!");}