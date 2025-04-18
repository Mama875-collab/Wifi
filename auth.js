
        // Your web app's Firebase configuration
        // Replace with your actual Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAzq0LsdEssEyGEKIdFgNsxTP0FGmwZYIU",
    authDomain: "wifi-24532.firebaseapp.com",
    projectId: "wifi-24532",
    storageBucket: "wifi-24532.appspot.com",
    messagingSenderId: "922684726790",
    appId: "1:922684726790:web:06fa4ab85441b967daed87",
    measurementId: "G-MEX7XTF0BG"
};
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        document.addEventListener('DOMContentLoaded', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    console.log('User is signed in:', user.uid);
                    // You can further check user details if needed
                    // For example, to ensure their email is verified:
                    if (!user.emailVerified) {
                        console.log('Email is not verified. Redirecting to email verification page.');
                        window.location.href = '/verify-email.html'; // Replace with your email verification page
                    }
                    // Proceed to load the content for logged-in users here.
                } else {
                    // User is signed out.
                    console.log('No user is signed in. Redirecting to login.');
                    window.location.href = 'login.html'; // Replace with your login page
                }
            });
        });


