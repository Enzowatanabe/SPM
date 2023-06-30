
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
const auth = getAuth(app);

document.getElementById('cadastrar').addEventListener('click', function(){
    const email = document.getElementById('userEmail').value
    const password = document.getElementById('userSenha').value
      
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user
          alert('Usuario criado!')
          window.location.href = "login.html";
      })
      .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use"){
            alert("Usuário ja cadastrado")
            window.location.href = "login.html";
          }else{
            const errorMessage = error.errorMessage;
          alert('Error')
          }
          
      })

    })
