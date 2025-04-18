// Importer les fonctions nécessaires depuis le SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Configuration de votre application web Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAzq0LsdEssEyGEKIdFgNsxTP0FGmwZYIU",
    authDomain: "wifi-24532.firebaseapp.com",
    projectId: "wifi-24532",
    storageBucket: "wifi-24532.appspot.com",
    messagingSenderId: "922684726790",
    appId: "1:922684726790:web:06fa4ab85441b967daed87",
    measurementId: "G-MEX7XTF0BG"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Fonction de connexion
document.getElementById('loginButton').addEventListener('click', login);

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie, redirige vers next.html
            window.location.href = "next.html";  
        })
        .catch((error) => {
            alert(error.message); // Afficher le message d'erreur
        });
}

  
