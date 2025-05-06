// verify-email.js (Version Modulaire)

// Importez les fonctions nécessaires des modules Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, applyActionCode } from 'firebase/auth'; // On a besoin de applyActionCode pour vérifier l'email


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
// Utilisation de try/catch pour être sûr même si l'app est déjà initialisée ailleurs
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("Firebase app already initialized. Skipping initialization.");
  // Si vous avez besoin de l'instance dans ce cas, vous pouvez la récupérer comme ceci :
  // import { getApp } from 'firebase/app'; // Ajoutez cet import
  // app = getApp();
}

// Obtenir l'instance Auth
const auth = getAuth(app);

// Fonction utilitaire pour lire les paramètres de l requête (issue des facts)
function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    const statusMessageElement = document.getElementById('statusMessage');
    const continueLinkElement = document.getElementById('continueLink');

    // Lire les paramètres de l'URL
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode'); // Le code unique pour l'action
    const continueUrl = getParameterByName('https://mama875-collab.github.io/next.html'); // L'URL où retourner après
    const lang = getParameterByName('lang'); // Langue (optionnel pour l'UI)

    // Optionnel: définir la langue pour le SDK si vous voulez gérer les messages d'erreur localisés
    if (lang) {
         // Note: setting languageCode might affect other operations on this auth instance
         // For email action handlers, the 'lang' param is mainly for YOU to localize the page UI
         // auth.languageCode = lang;
         console.log('Language parameter detected:', lang);
         // Ici, vous utiliseriez 'lang' pour charger les textes de votre UI dans la bonne langue
         // Pour cet exemple simple, nous restons en français.
    }


    // Vérifier que c'est bien une action de vérification d'email
    if (mode === 'verifyEmail' && actionCode) {
        // Tenter d'appliquer le code d'action (vérifier l'email)
        applyActionCode(auth, actionCode).then(() => {
            // Succès : l'email est maintenant vérifié !
            console.log('Email verification successful.');
            statusMessageElement.textContent = 'Votre adresse email a été vérifiée avec succès !';
            statusMessageElement.className = 'success'; // Ajouter une classe pour le style

            // Si une URL de continuation existe, afficher le lien
            if (continueUrl) {
                continueLinkElement.href = continueUrl; // Définir l'URL du lien
                continueLinkElement.style.display = 'inline-block'; // Afficher le lien
            } else {
                  afficher un lien vers la page d'accueil par défaut
                  continueLinkElement.href = 'https://mama875-collab.github.io/index.html'; // Lien vers page d'accueil
                  continueLinkElement.textContent = 'Retour à l\'accueil';
                  continueLinkElement.style.display = 'inline-block';
            }

        }).catch((error) => {
            // Échec de la vérification (code invalide, expiré, etc.)
            console.error('Email verification failed:', error);
            let errorMessage = 'La vérification de l\'email a échoué.';

            // Vous pouvez rendre le message d'erreur plus spécifique en fonction du code d'erreur Firebase
            switch (error.code) {
                case 'auth/invalid-action-code':
                    errorMessage = 'Le code de vérification est invalide ou a expiré.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Votre compte a été désactivé.';
                    break;
                case 'auth/user-not-found':
                     errorMessage = 'Aucun utilisateur trouvé pour ce code.';
                     break;
                // Ajoutez d'autres codes d'erreur si nécessaire
            }

            statusMessageElement.textContent = errorMessage + ' Veuillez réessayer ou contacter le support.';
            statusMessageElement.className = 'error'; // Ajouter une classe pour le style
        });

    } else {
        // Mode invalide ou code manquant
        console.error('Invalid mode or missing action code.');
        statusMessageElement.textContent = 'Lien de vérification invalide. Veuillez réessayer.';
        statusMessageElement.className = 'error';
    }
});
