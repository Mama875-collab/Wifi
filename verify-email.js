
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';



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
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("Firebase app already initialized. Skipping initialization.");

}


// Obtenir l'instance Auth
const auth = getAuth(app);

// ----- Références aux éléments HTML -----
const loadingMessage = document.getElementById('loading-message');
const verificationPendingSection = document.getElementById('verification-pending');
const resendEmailBtn = document.getElementById('resend-email-btn');
const resendSuccessMessage = document.getElementById('resend-success');
const resendErrorMessage = document.getElementById('resend-error');
const verificationSuccessSection = document.getElementById('verification-success');
const notLoggedInSection = document.getElementById('not-logged-in');

// ----- Fonction pour masquer toutes les sections et messages spécifiques -----
function hideAllSections() {
    loadingMessage.style.display = 'none';
    verificationPendingSection.style.display = 'none';
    resendSuccessMessage.style.display = 'none';
    resendErrorMessage.style.display = 'none';
    verificationSuccessSection.style.display = 'none';
    notLoggedInSection.style.display = 'none';
}


// ----- Logique de vérification d'état d'authentification -----
document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, (user) => {
        hideAllSections(); // Masquer tout d'abord

        if (user) {
            // Utilisateur connecté
            console.log('User state changed:', user.uid);

            if (user.emailVerified) {
                // L'email est VÉRIFIÉ
                console.log('Email is verified. Redirecting...');
                verificationSuccessSection.style.display = 'block'; // Afficher le message de succès
                window.location.replace('https://mama875-collab.github.io/Wifi/next.html');

            } else {
                // L'email n'est PAS vérifié
                console.log('User is signed in but email is NOT verified.');
                verificationPendingSection.style.display = 'block'; // Afficher la section en attente

                // Note: On n'envoie PAS l'email automatiquement ici à chaque chargement/changement d'état.
                // On se fie au bouton "Renvoyer".

            }

        } else {
            // Aucun utilisateur connecté
            console.log('No user is signed in. Redirecting to login.');
            hideAllSections(); // On remasque tout
            notLoggedInSection.style.display = 'block'; // Afficher le message "pas connecté"
            // Rediriger vers la page de connexion 
            window.location.replace('index.html'); // Chemin relatif
        }
    });

    // ----- Gestionnaire de clic pour le bouton de renvoi d'email -----
    if(resendEmailBtn) { // S'assurer que le bouton existe
        resendEmailBtn.addEventListener('click', async () => {
            // Désactiver le bouton pour éviter les clics multiples
            resendEmailBtn.disabled = true;
            resendSuccessMessage.style.display = 'none'; // Masquer messages précédents
            resendErrorMessage.style.display = 'none';

            const user = auth.currentUser; // Obtenir l'utilisateur actuellement connecté
             if (user) {
                try {
                    await sendEmailVerification(user);
                    console.log('Email de vérification renvoyé !');
                    resendSuccessMessage.style.display = 'block'; // Afficher succès
                } catch (error) {
                    console.error('Erreur lors du renvoi de l\'email de vérification :', error);
                    resendErrorMessage.style.display = 'block'; // Afficher erreur
                } finally {
                    // Réactiver le bouton après un court délai (facultatif, mais bien pour l'UX)
                    setTimeout(() => {
                         resendEmailBtn.disabled = false;
                     }, 2000); // Réactiver après 2 secondes
                }
            } else {
                 console.error("Impossible de renvoyer l'email : aucun utilisateur n'est connecté.");
                 resendErrorMessage.style.display = 'block';
                 resendErrorMessage.innerText = "Aucun utilisateur connecté. Redirection...";
               
            }
        });
    } else {
        console.error("Bouton #resend-
