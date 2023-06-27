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


const botaogo = document.getElementById('enviar');

botaogo.addEventListener("click", async()=>{
    const conta = document.getElementById('conta').value;
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const dpagamento = document.getElementById('dpagamento').value;
    const data = document.getElementById('data').value;
    const mes = document.getElementById('mes').value;
    const fpagamento = document.getElementById('formapagamento').value;
    
    
    const docRef = await addDoc(collection(db, "Contas"), {
    Conta: conta,
    Descrição: descricao,
    Valor: valor,
    DataPagamento: dpagamento,
    Data: data,
    Mês: mes,
    FormaPagamento: fpagamento,
    
   
    
},{merge:true});
console.log("Document written with ID: ", docRef);

await recarregarTabela();
})