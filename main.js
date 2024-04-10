const baseUrl = "http://localhost:3001";
const sendButton = document.getElementById("sendButton");
const myForm = document.getElementById("myForm-reg");

sendButton.addEventListener("click", sendData);

async function sendData(event) {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pas").value;

  if (firstName === "" || lastName === "" || email === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  const formData = {
    firstName,
    lastName,
    email,
    password: password, 
    login: false 
  };

  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    alert("User registered successfully!");
    window.location.href = "./main.html"; 
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Failed to register user. Please try again later.");
  }
}
