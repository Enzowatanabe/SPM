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
    const cliente = document.getElementById('cliente').value;
    const descricao = document.getElementById('descricao').value;
    const valorT = document.getElementById('valorT').value;
    const dpagamento = document.getElementById('dpagamento').value;
    const sinal = document.getElementById('sinal').value;
    const mes = document.getElementById('mes1').value;
    const dataSinal = document.getElementById('dataSinal').value;
    const status = document.getElementById('status').value;
    const pagamento1 = document.getElementById('pagamento1').value;
    const dataPag1 = document.getElementById('datapagamento1').value;
    const mes2 = document.getElementById('mes2').value;
    const status1 = document.getElementById('status1').value;
    const pagamento2 = document.getElementById('pagamento2').value;
    const dataPag2 = document.getElementById('data2pagamento').value;
    const mes3 = document.getElementById('mes3').value;
    const status2 = document.getElementById('status2pagamento').value;
    const orcamento = document.getElementById('orcamento').value;
    
    
    const docRef = await addDoc(collection(db, "Clientes"), {
    Cliente: cliente,
    descrição: descricao,
    ValorTotal: valorT,
    DataVenda: dpagamento,
    Sinal: sinal,
    Mês: mes,
    DataSinal: dataSinal,
    Status: status,
    Pagamento: pagamento1,
    Data1Pag: dataPag1,
    Mês2: mes2,
    Status1: status1,
    Pagamento2: pagamento2,
    Data2Pag: dataPag2,
    Mês3: mes3,
    Status2: status2,
    Orçamento: orcamento,

    
   
    
},{merge:true});
console.log("Document written with ID: ", docRef);

await recarregarTabela();
})