function toast():HTMLElement{
    const toast = document.createElement("div")
    toast.className = "toast-hidden";
    toast.id = "toast-message";
    return toast;
}

export default toast
