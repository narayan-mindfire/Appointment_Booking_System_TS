// Custom Modal component
function Modal(message, callback){
    console.log("modal rendered")
    const modal = document.createElement("div")
    modal.id = "myModal"
    const modalContent = document.createElement("div")

    const closeButton = document.createElement("span")
    closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`

    const messageContainer = document.createElement("p")
    messageContainer.textContent = message;

    const confirmButton = document.createElement("button");
    confirmButton.id = "confirm-button";
    confirmButton.textContent = "confirm";
    confirmButton.addEventListener("click", () => {callback(); modal.remove()})

    modalContent.appendChild(closeButton)
    modalContent.appendChild(messageContainer)
    modalContent.appendChild(confirmButton)
    modal.appendChild(modalContent)

    // listener
    closeButton.addEventListener("click", () => {modal.remove()});

    return modal;
}
export default Modal