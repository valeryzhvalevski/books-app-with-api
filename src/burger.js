const burgerBtn = document.querySelector('.burger');
    const favoritesContainer = document.getElementById('favorites-container');
    const backdrop = document.getElementById('backdrop');

    burgerBtn.addEventListener('click', function(event) {
        backdrop.classList.remove('none');
        favoritesContainer.style.display = 'flex';
        event.stopPropagation(); 
    });

    backdrop.addEventListener('click', function(event) {
        if (event.target === backdrop) {
            backdrop.classList.add('none');
            favoritesContainer.style.display = 'none';
        }
    });