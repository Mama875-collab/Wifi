
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js'; 
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js'; 


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
const auth = getAuth(app); // Passez l'instance 'app' à getAuth

document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'état d'authentification
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // L'utilisateur est connecté. Maintenant, vérifier si son email est vérifié.
            console.log('User is signed in:', user.uid);

            if (!user.emailVerified) {
                // L'utilisateur est connecté MAIS l'email n'est PAS vérifié.
                console.log('Email is not verified. Redirecting to email verification page.');
                // Rediriger vers la page de vérification d'email
                window.location.replace('verify-email.html'); // Assurez-vous que le chemin est correct
                // Utiliser replace() est conseillé ici pour empêcher l'utilisateur de revenir
                // à la page en utilisant le bouton retour du navigateur avant que l'email ne soit vérifié.
                return; // Arrêter l'exécution ici pour cet état
            } else {
                // L'utilisateur est connecté ET l'email est vérifié.
                console.log('User is signed in and email is verified.');
                // Le contenu de la page peut être affiché.
                // C'est ici que vous pouvez ajouter du code pour charger du contenu spécifique
                // ou afficher des éléments réservés aux utilisateurs vérifiés.
            }

        } else {
            // L'utilisateur N'EST PAS connecté. Redirigez-le vers la page de connexion.
            console.log('No user is signed in. Redirecting to login.');
            // Redirection vers la page de connexion
            window.location.replace('login.html'); // Assurez-vous que le chemin est correct
        }
    });
});
