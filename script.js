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
// Assurez-vous que l'élément avec l'ID 'loginButton' existe dans votre HTML
// (probablement dans un autre fichier HTML si cette page n'est pas la page de connexion)
// Vous pourriez vouloir déplacer cette logique de connexion vers la page où le formulaire de connexion est présent.
const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', login);
} else {
    console.warn("Élément avec l'ID 'loginButton' non trouvé. La fonction de connexion ne sera pas attachée.");
}


function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Vérifiez si les éléments email et password existent
    if (!emailInput || !passwordInput) {
        console.error("Erreur: Impossible de trouver les champs email ou password pour la connexion.");
        return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie, redirige vers next.html
            window.location.href = "next.html";
        })
        .catch((error) => {
            alert(error.message); // Afficher le message d'erreur
        });
}
