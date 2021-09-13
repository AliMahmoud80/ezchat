var socket = io();

const chatContainer = document.querySelector("#chat-container");

const userConnectedTemplate = (username, connected) => `
      <div class="user-connected">
        <hr />
        ${username} ${connected ? "connected" : "disconnected"}
        <hr />
      </div>`;

const msgTemplate = (username, msg) => `
      <div class="message">
        <p>${username} : </p>
        <p>${msg}</p>
      </div>`;

socket.on("user connect", (username) => {
  chatContainer.insertAdjacentHTML(
    "beforeend",
    userConnectedTemplate(username, true)
  );
});

socket.on("user disconnect", (username) => {
  chatContainer.insertAdjacentHTML(
    "afterbegin",
    userConnectedTemplate(username, false)
  );
});

const chatForm = document.querySelector(".chat-form");
const msgInput = document.querySelector(".chat-form .form-input");
const sendBtn = document.querySelector(".chat-form .send-btn");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (msgInput.value != "") socket.emit("send msg", msgInput.value);

  msgInput.value = "";
});

socket.on("send msg", ({ username, msg }) => {
  chatContainer.insertAdjacentHTML("afterbegin", msgTemplate(username, msg));
});
