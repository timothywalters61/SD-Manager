function Send() {

    let chat = document.getElementById("message-container");
   let message = document.getElementById("message");
   let text = message.innerText;

   let box = document.createElement("div");
   box.className = "message-sent";

   let sender = document.createElement("div");
   sender.innerText = "Razeen";

   let messageText = document.createElement("div");
   messageText.innerText = text;
   box.appendChild(sender);
   box.appendChild(messageText);

   chat.appendChild(box);
}