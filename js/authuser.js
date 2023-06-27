import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import * as firebase from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
      getAuth,
      onAuthStateChanged,
      signOut
  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
    
    
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
const auth = getAuth();
document.getElementById('sair').addEventListener('click', function(){
  
  signOut(auth).then(() => {
  alert("voce saiu")
  }).catch((error) => {
  alert("erro")
  console.log(error)
  });

})

auth.onAuthStateChanged(function(user) {
  if (user) {
    // O usuário está autenticado, permita o acesso à página
  } else {
    alert('Sem permissão')
    window.location.href = 'login.html';
  }
});