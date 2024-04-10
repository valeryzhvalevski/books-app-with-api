


document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  sendButton.addEventListener("click", login);
});

function login(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  fetch("http://localhost:3001/users")
    .then((response) => response.json())
    .then((data) => {
      let isLoggedIn = false; 
      data.forEach((user) => {
        if (email === user.email && password === user.password) {
          isLoggedIn = true; 
          window.location.href = "main.html";
          return;
        }
      });

      if (!isLoggedIn) {
        console.error("Вход не удался: неверный email или пароль");
      }
    })
    .catch((error) => console.error("Ошибка при входе:", error));
}
