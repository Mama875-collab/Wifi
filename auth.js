// auth.js 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';



const firebaseConfig = {
  apiKey: "AIzaSyAzq0LsdEssEyGEKIdFgNsxTP0FGmwZYIU",
  authDomain: "wifi-24532.firebaseapp.com",
  projectId: "wifi-24532",
  storageBucket: "wifi-24532.appspot.com",
  messagingSenderId: "922684726790",
  appId: "1:922684726790:web:06fa4ab85441b967daed87",
  measurementId: "G-MEX7XTF0BG" // Optionnel
};

// Initialiser Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("Firebase app already initialized. Skipping initialization.");
  
}

// Obtenir l'instance Auth
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'état d'authentification
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // L'utilisateur est connecté.
            console.log('User is signed in:', user.uid);

            // --- LOGIQUE DE REDIRECTION BASÉE SUR LA VÉRIFICATION ---
            if (!user.emailVerified) {
                // L'utilisateur est connecté MAIS l'email n'est PAS vérifié.
                console.log('Email is not verified. Redirecting to email verification page.');

                window.location.replace('verify-email.html'); // Redirection
                return; // Arrêter l'exécution pour cet état
            } else {
                // L'utilisateur est connecté ET l'email est vérifié.
                console.log('User is signed in and email is verified.');
                // L'utilisateur peut accéder au contenu de cette page.
                // Mettre code pour afficher la page
            }

        } else {
            // L'utilisateur N'EST PAS connecté.
            console.log('No user is signed in. Redirecting to login.');
            // Redirection vers la page de connexion
            window.location.replace('index.html'); 
        }
    });
});

