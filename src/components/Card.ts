marker 
import stateService from "../app.state";
import { deleteAppointment, editAppointment } from "../services/dom.service";
import type { Appointment } from "../types";

function card(app : Appointment) : HTMLElement{
    const card = document.createElement("div");
    card.className = "appointment-card";

    card.innerHTML = `
        <div class="card-content">
            <div class="header-section">
                <h3 class="patient-name" title="patient">${app.name}</h3>
                <p class="doctorEle-info" ><span class="doctorEle-name" title="doctorEle"><i class="fa-solid fa-stethoscope"></i> ${app.doctor}</span></p>
            </div>

            <p class="purpose-info" title="purpose">${app.purpose}</p>

            <div class="details-section">
                <div class="detail-item">
                    <span class="detail-label"> <i class="fa-solid fa-calendar-days" title="date"></i></span>
                    <span class="detail-value" title="date">${app.date}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label" title="time"><i class="fa-solid fa-clock "></i></span>
                    <span class="detail-value" title="time">${app.slot}</span>
                </div>
            </div>
        </div>
        <div class="card-buttons">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;
    if(app.id === stateService.getState("editingAppointmentId")) card.classList.add("highlighted");
    const editBtn = card.querySelector(".edit");
    if (editBtn) {
        editBtn.addEventListener("click", () => editAppointment(app.id));
    }
    const deleteBtn = card.querySelector(".delete");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => deleteAppointment(app.id));
    }
    return card;
}

export default card;