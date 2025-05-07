// verify-email.js (Script pour la page de vérification d'email)
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
// S'assurer que ces IDs correspondent bien aux IDs dans votre verify-email.html
const loadingMessage = document.getElementById('loading-message');
const verificationPendingSection = document.getElementById('verification-pending');
const resendEmailBtn = document.getElementById('resend-email-btn');
const resendSuccessMessage = document.getElementById('resend-success');
const resendErrorMessage = document.getElementById('resend-error');
const verificationSuccessSection = document.getElementById('verification-success');
const notLoggedInSection = document.getElementById('not-logged-in');

// ----- Fonction pour masquer toutes les sections et messages spécifiques -----
function hideAllSections() {
    // On vérifie si les éléments existent avant de tenter de les manipuler
    if(loadingMessage) loadingMessage.style.display = 'none';
    if(verificationPendingSection) verificationPendingSection.style.display = 'none';
    if(resendSuccessMessage) resendSuccessMessage.style.display = 'none';
    if(resendErrorMessage) resendErrorMessage.style.display = 'none';
    if(verificationSuccessSection) verificationSuccessSection.style.display = 'none';
    if(notLoggedInSection) notLoggedInSection.style.display = 'none';
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
                if(verificationSuccessSection) verificationSuccessSection.style.display = 'block'; // Afficher le message de succès
                window.location.replace('https://mama875-collab.github.io/Wifi/next.html');

            } else {
                // L'email n'est PAS vérifié
                console.log('User is signed in but email is NOT verified.');
                 if(verificationPendingSection) verificationPendingSection.style.display = 'block'; // Afficher la section en attente

                // Note: On n'envoie PAS l'email automatiquement ici à chaque chargement/changement d'état.
                // On se fie au bouton "Renvoyer".
                // Si vous vouliez l'envoyer une fois automatiquement, il faudrait ajouter une logique
                // pour éviter d'en renvoyer à chaque rafraîchissement (ex: utiliser sessionStorage).
                // Par exemple, quelque chose comme :
                // if (!sessionStorage.getItem('verificationEmailSent')) {
                //     sendEmailVerification(user).then(() => {
                //         sessionStorage.setItem('verificationEmailSent', 'true');
                //         console.log('Premier email de vérification envoyé automatiquement.');
                //     }).catch(console.error);
                // }

            }

        } else {
            // Aucun utilisateur connecté
            console.log('No user is signed in. Redirecting to login.');
            hideAllSections(); // On remasque tout
            if(notLoggedInSection) notLoggedInSection.style.display = 'block'; // Afficher le message "pas connecté"
            // Rediriger vers la page de connexion 
            window.location.replace('index.html');
        }
    });

    // ----- Gestionnaire de clic pour le bouton de renvoi d'email -----
    if(resendEmailBtn) { // S'assurer que le bouton existe dans le HTML
        resendEmailBtn.addEventListener('click', async () => {
            // Désactiver le bouton pour éviter les clics multiples
            resendEmailBtn.disabled = true;
            if(resendSuccessMessage) resendSuccessMessage.style.display = 'none'; // Masquer messages précédents
            if(resendErrorMessage) resendErrorMessage.style.display = 'none';

            const user = auth.currentUser; // Obtenir l'utilisateur actuellement connecté
             if (user) {
                try {
                    await sendEmailVerification(user); // 
                    console.log('Email de vérification renvoyé !');
                    if(resendSuccessMessage) resendSuccessMessage.style.display = 'block'; // Afficher succès
                } catch (error) {
                    console.error('Erreur lors du renvoi de l\'email de vérification :', error);
                    if(resendErrorMessage) resendErrorMessage.style.display = 'block'; // Afficher erreur
                     if(resendErrorMessage) resendErrorMessage.innerText = `Erreur lors de l'envoi : ${error.message}`; // Message plus précis
                } finally {
                    // Réactiver le bouton après un court délai 
                    setTimeout(() => {
                         if(resendEmailBtn) resendEmailBtn.disabled = false;
                     }, 2000); // Réactiver après 2 secondes
                }
            } else {
                 console.error("Impossible de renvoyer l'email : aucun utilisateur n'est connecté.");
                 if(resendErrorMessage) resendErrorMessage.style.display = 'block';
                 if(resendErrorMessage) resendErrorMessage.innerText = "Aucun utilisateur connecté. Redirection...";
                 // onAuthStateChanged devrait détecter cela et rediriger vers index.html
            }
        });
    } else {
        console.error("Erreur: Le bouton avec l'ID 'resend-email-btn' n'a pas été trouvé dans le HTML. Le gestionnaire de clic ne peut pas être attaché.");
    }

}); 
