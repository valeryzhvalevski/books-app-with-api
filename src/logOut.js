import { loadFavorites } from "./loadFavorites.js";

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
});

function logout() {
    const favoritesContainer = document.getElementById("favorites-container");

    loadFavorites(favoritesContainer);
    

    window.location.href = "login.html";
}


