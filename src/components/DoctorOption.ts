function doctorOption(doc : string):HTMLElement{
    const div = document.createElement("div");
    div.textContent = doc;
    div.className = "doctor-option";
    div.style.borderBottom = "1px solid black";
    return div;
}
export default doctorOption;