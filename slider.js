// Fichier : slider.js

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne le conteneur de chaque slider sur la page
    const allSliders = document.querySelectorAll('.slider-container');

    allSliders.forEach(sliderContainer => {
        const slider = sliderContainer.querySelector('.slider');
        const images = sliderContainer.querySelectorAll('.slider img');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        const dotsContainer = sliderContainer.querySelector('.slider-dots');

        if (!slider || images.length === 0) {
            // Ne rien faire si le slider ou les images ne sont pas trouvés dans ce conteneur
            return;
        }

        let currentIndex = 0; // Indice de l'image actuellement affichée
        // La largeur d'une image est la largeur du conteneur parent visible
        const imageWidth = sliderContainer.clientWidth;

        // --- Créer les indicateurs (points) ---
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = sliderContainer.querySelectorAll('.slider-dot');

        // --- Fonction pour mettre à jour les points ---
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }

        // --- Fonction pour déplacer le slider ---
        function moveToSlide(index) {
            // S'assurer que l'indice est valide
            if (index < 0) {
                currentIndex = images.length - 1; // Revenir à la dernière image
            } else if (index >= images.length) {
                currentIndex = 0; // Revenir à la première image
            } else {
                currentIndex = index;
            }

            // Calculer la distance de transformation
            // Utilise la largeur du conteneur visible (sliderContainer)
            const offset = -currentIndex * sliderContainer.clientWidth;
            slider.style.transform = `translateX(${offset}px)`;

            updateDots(); // Mettre à jour les points après le déplacement
        }

        // --- Écouteurs d'événements pour les boutons ---
        prevBtn.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        // --- Initialisation ---
        // S'assurer que la première image est active et le premier point
        updateDots();

        // Optionnel : Ajuster la position si la fenêtre change de taille
        window.addEventListener('resize', () => {
             // Recalculer la largeur du conteneur et repositionner
             const updatedImageWidth = sliderContainer.clientWidth;
             const offset = -currentIndex * updatedImageWidth;
             slider.style.transform = `translateX(${offset}px)`;
             // Pas besoin de mettre à jour les points ici
        });

        // Optionnel : Défilement automatique
        // setInterval(() => {
        //     moveToSlide(currentIndex + 1);
        // }, 5000); // Change d'image toutes les 5 secondes (5000ms)
    });
    // Dans slider.js, à l'intérieur de document.addEventListener('DOMContentLoaded', () => { ... });

    // ... (ton code existant pour le slider) ...

    // --- Bouton Retour en Haut ---
    const backToTopButton = document.getElementById('back-to-top');

    // Afficher le bouton lorsque l'utilisateur défile
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Affiche le bouton après 300px de défilement vertical
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Faire défiler la page vers le haut en douceur au clic
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0, // Défile vers le haut de la page
            behavior: 'smooth' // Animation de défilement douce
        });
    });
}); // Fin du document.addEventListener('DOMContentLoaded' ...
});
