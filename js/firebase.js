
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
  const firebaseConfig = {
    apiKey: "AIzaSyBU4cy14ZPyRLAWD_qoI-58HiIAsaFVqKw",
    authDomain: "pontomovel-38fc6.firebaseapp.com",
    projectId: "pontomovel-38fc6",
    storageBucket: "pontomovel-38fc6.appspot.com",
    messagingSenderId: "1074418666528",
    appId: "1:1074418666528:web:67da185fe6a8349b8ec045",
    measurementId: "G-0589PM04ZM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

// login-----------------------------------------------------------

  document.getElementById('login').addEventListener('click', function(){
    const email = document.getElementById('userEmail').value
    const password = document.getElementById('userSenha').value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
            // Signed in
        const user = userCredential.user;
        window.location.href = "HTML/paginausuario.html";
            // ...
})
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Erro")
    });
})

// cadastro-----------------------------------------------------------

document.getElementById('cadastrar').addEventListener('click', function(){
  const email = document.getElementById('userEmail').value
  const password = document.getElementById('userSenha').value
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        alert('Usuario criado!')
        window.location.href = "/index.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use"){
          alert("Usuário ja cadastrado")
          window.location.href = "/index.html";
        }else{
          const errorMessage = error.errorMessage;
        alert('Error')
        }
        
    })

  })
