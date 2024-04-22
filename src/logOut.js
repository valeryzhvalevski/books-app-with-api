async function logout() {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const users = await response.json();
  
      users.forEach(async (user) => {
        if (user.login) {
          user.login = false;
  
          const updateUserResponse = await fetch(`http://localhost:3001/users/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          });
  
          if (!updateUserResponse.ok) {
            throw new Error("Failed to update user data");
          }
        }
      });
  
      window.location.href = "login.html"; 
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
  });
  