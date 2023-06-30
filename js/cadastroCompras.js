import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
    const cloja = document.getElementById('loja').value;
    const cdescricao = document.getElementById('descricao').value;
    const cvalor = document.getElementById('valor').value;
    const ccliente = document.getElementById('cliente').value;
    const cdata = document.getElementById('data').value;
    const cmes = document.getElementById('mes').value;
    const ctpagamento = document.getElementById('tipopagamento').value;
    
    
    const docRef = await addDoc(collection(db, "Compras"), {
    Loja: cloja,
    descrição: cdescricao,
    Valor: cvalor,
    Cliente: ccliente,
    Data: cdata,
    Mês: cmes,
    TipoPagamento: ctpagamento,
    
   
    
},{merge:true});
alert("Document written with ID: ", docRef);

document.getElementById('loja').value = '';
  
 
document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('cliente').value = '';
  document.getElementById('data').value = '';
  
 
document.getElementById('mes').value = '';
  document.getElementById('tipopagamento').value = '';

  

 


await recarregarTabela();
});