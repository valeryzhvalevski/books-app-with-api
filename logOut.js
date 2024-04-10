 document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
});

function logout() {
    window.location.href = "login.html"; 
}