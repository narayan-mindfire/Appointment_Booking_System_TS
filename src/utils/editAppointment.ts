import stateService from "../app.state";
import { resetErrorMessages, showToast, updateAvailableSlots } from "../services/dom.service";

/**
 * Loads appointment data into form for editing.
 * @param {number} id - Appointment ID
 */
export function editAppointment(id:number) {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    const appointments = stateService.getState("appointments");
    const appointment = appointments.find(app => app.id === id);
    if (!appointment) return;
    showToast("Appointment set to edit", "success");

    stateService.setState("editingAppointmentId", id);

    document.querySelectorAll(".appointment-card").forEach(card => {
        const cardName = card.querySelector(".patient-name")?.textContent?.trim() || "";
        const cardDate = card.querySelector(".detail-item:nth-child(1) .detail-value")?.textContent?.trim();
        const cardTime = card.querySelector(".detail-item:nth-child(2) .detail-value")?.textContent?.trim();

        if (
            cardName === appointment.name &&
            cardDate === appointment.date &&
            cardTime === appointment.slot
        ) {
            card.classList.add("highlighted");
        } else {
            card.classList.remove("highlighted");
        }
    });

    document.querySelectorAll("#appointment-table-body tr").forEach(row => {
        const cells = row.getElementsByTagName("td");
        const name = cells[0]?.textContent?.trim() || "";
        const doctor = cells[1]?.textContent?.trim() || "";
        const date = cells[2]?.textContent?.trim() || "";
        const slot = cells[3]?.textContent?.trim() || "";

        if (
            name === appointment.name &&
            doctor === appointment.doctor &&
            date === appointment.date &&
            slot === appointment.slot
        ) {
            row.classList.add("highlighted");
        } else {
            row.classList.remove("highlighted");
        }
    });

    // pre-fill form
    const nameInput = document.getElementById("name") as HTMLInputElement | null;
    if (nameInput) nameInput.value = appointment.name;

    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    if (emailInput) emailInput.value = appointment.email;

    const dateInput = document.getElementById("date") as HTMLInputElement | null;
    if (dateInput) dateInput.value = appointment.date;

    const doctorInput = document.getElementById("doctor") as HTMLInputElement | null;
    if (doctorInput) doctorInput.value = appointment.doctor;

    updateAvailableSlots(); 

    const slotInput = document.getElementById("slot") as HTMLInputElement | null;
    if (slotInput) slotInput.value = appointment.slot;

    const purposeInput = document.getElementById("purpose") as HTMLInputElement | null;
    if (purposeInput) purposeInput.value = appointment.purpose;

    resetErrorMessages();
    const form = document.getElementById("myForm");
    const submitBtn = form?.querySelector<HTMLInputElement>("#submit");
    if (submitBtn) {
        submitBtn.value = "Update Appointment";
    }
}