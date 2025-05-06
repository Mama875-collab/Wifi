// auth.js (Version Modulaire - N'inclut PAS la vérification d'email pour redirection)

// Importez les fonctions nécessaires des modules Firebase
import { initializeApp } from 'firebase/app'; // Importer initializeApp
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importer getAuth et onAuthStateChanged

// Votre configuration d'application web Firebase
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
// Meilleure pratique pour éviter l'erreur "duplicate-app" si le script est inclus plusieurs fois (ce qu'on a corrigé, mais c'est bien)
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("Firebase app already initialized. Skipping initialization.");
  // Si vous avez besoin de l'instance dans ce cas, décommentez les lignes ci-dessous et l'import getApp
  // import { getApp } from 'firebase/app';
  // app = getApp();
}

// Obtenir l'instance Auth
const auth = getAuth(app); // Passez l'instance 'app' à getAuth

document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'état d'authentification
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // L'utilisateur est connecté.
            console.log('User is signed in:', user.uid);
            // Le contenu de la page s'affiche normalement.

            // --- LA LOGIQUE DE REDIRECTION POUR LA VÉRIFICATION D'EMAIL EST COMMENTÉE OU SUPPRIMÉE ICI ---
            // if (!user.emailVerified) {
            //     console.log('Email is not verified. User can still view this page content.');
            //     // Vous pouvez afficher un message d'avertissement à l'utilisateur ici si vous le souhaitez,
            //     // mais pas de redirection automatique.
            // }
            // ------------------------------------------------------------------------------------------

            // Si l'utilisateur est connecté (vérifié ou non selon la logique ci-dessus)
            // Proceed to load the content for logged-in users here.
            console.log('User is authorized to view this page content.');
            // Ici, vous mettriez le code pour afficher les parties de la page réservées aux utilisateurs connectés,
            // ou pour charger des données spécifiques à l'utilisateur.

        } else {
            // L'utilisateur N'EST PAS connecté. Redirigez-le vers la page de connexion.
            console.log('No user is signed in. Redirecting to login.');
            // Utiliser replace() pour ne pas garder la page protégée dans l'historique
            window.location.replace('login.html'); // Assurez-vous que le chemin vers login.html est correct
        }
    });
});
