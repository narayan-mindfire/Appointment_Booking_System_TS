import appointmentList from "./AppointmentList"
import form from "./Form"

function contentBody():HTMLElement{
    const parent = document.createElement("div");
    parent.className = "content";
    parent.appendChild(form());
    const appointmetnListContainer = document.createElement('div');
    appointmetnListContainer.id = "appointment-list-container";
    appointmetnListContainer.appendChild(appointmentList());
    parent.appendChild((appointmetnListContainer));
    return parent
}

export default contentBody