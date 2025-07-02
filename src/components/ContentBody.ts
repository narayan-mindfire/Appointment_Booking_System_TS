import AppointmentList from "./AppointmentList"
import Form from "./Form"

function ContentBody():HTMLElement{
    const parent = document.createElement("div");
    parent.className = "content";
    parent.appendChild(Form());
    const appointmetnListContainer = document.createElement('div');
    appointmetnListContainer.id = "appointment-list-container";
    appointmetnListContainer.appendChild(AppointmentList());
    parent.appendChild((appointmetnListContainer));
    return parent
}

export default ContentBody