import "./style.css";

const baseUrl = "http://localhost:3001";
const sendButton = document.getElementById("sendButton");
const myForm = document.getElementById("myForm");
const dataList = document.getElementById("dataList");

sendButton.addEventListener("click", sendData);

function sendData() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;

  const successMessage = document.getElementById("success-message");

  if (firstName === "" || lastName === "" || email === "") {
    alert("заполните все поля");
    return;
  }

  const formData = {
    firstName,
    lastName,
    email,
  };

  postUsers(formData);
  myForm.reset();

  successMessage.style.display = "block";

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

async function getUser() {
  try {
    const response = await fetch(`${baseUrl}/users`);
    const users = await response.json();
    console.log(users);
    displayUsers(users);
  } catch (error) {
    console.error(error);
  }
}

function displayUsers(users) {
  dataList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.firstName} ${user.lastName} - ${user.email}`;
    dataList.appendChild(li);
  });
}

async function postUsers(data) {
  try {
    await fetch(`${baseUrl}/users`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await getUser();
  } catch (error) {
    console.error(error);
  }
}

getUser();
