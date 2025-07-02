import { slots, validationConfig } from "../app.const";
import stateService from "../app.state";
import appointmentList from "../components/AppointmentList";
import counter from "../components/Counter";
import modal from "../components/Modal";
import type { Appointment } from "../types";

/**
 * Clears all validation error messages.
 */
function resetErrorMessages() {
    document.querySelectorAll<HTMLElement>(".error-message").forEach(ele => ele.textContent = "");
}

/**
 * resets form fields
 */
function resetFormFields(){
    const form = document.getElementById("myForm") as HTMLFormElement | null
    if(!form) return;
    const fields = ["name", "email", "date", "doctor", "slot", "purpose"] as const;

    fields.forEach(id => {
        const input = form.querySelector<HTMLInputElement | HTMLSelectElement>(`#${id}`);
        if (input) input.value = "";
    });
}

/**
 * function to show toast messages in the dom
 * @param {string} message 
 * @param {string} type 
 */
function showToast(message:string, type: "success" | "warning" | "error" = "success") {
    const toast = document.getElementById("toast-message") as HTMLDivElement | null;
    if(!toast) return;
    toast.textContent = message;
    toast.classList.remove("toast-hidden");
    toast.classList.add("toast-visible");

    toast.style.backgroundColor = {
      success: "green",
      warning: "orange",
      error: "red"
    }[type] || "gray";

    setTimeout(() => {
      toast.classList.remove("toast-visible");
      toast.classList.add("toast-hidden");
    }, 3000);
}

/**
 * checks and udpdates available slots
 */
function updateAvailableSlots() {
    const dateEle = document.getElementById("date") as HTMLInputElement | null;
    const doctorEle = document.getElementById("doctor") as HTMLSelectElement | null;
    const slotEle = document.getElementById("slot") as HTMLElement | null;
    if(!dateEle || !doctorEle || !slotEle) return;
    const date = dateEle.value;
    const doctorVal = doctorEle.value;

    // Clear old options
    slotEle.innerHTML = `<option value="">Select a time slot</option>`;

    if (!date || !doctorVal) return;

    const appointments = stateService.getState("appointments") as Appointment[];
    const bookedSlots = appointments
        .filter(appointment => appointment.date === date && appointment.doctor === doctorVal && appointment.id !== stateService.getState("editingAppointmentId"))
        .map(appointment => appointment.slot);

    const today = new Date();
    const selectedDate = new Date(date);
    const isToday = today.toDateString() === selectedDate.toDateString();

    slots.forEach(slot => {
        const slotHour = Number(slot.split(":")[0]);
        const isDisabled = bookedSlots.includes(slot) || (isToday && slotHour <= today.getHours());

        if (!isDisabled) {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            slotEle.appendChild(option);
        }
    });
}

/**
 * sets current day as the minimum day to book appointment
 */
function setMinDateForInput() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    const dateInput = document.getElementById("date");
    if (dateInput) {
        dateInput.setAttribute("min", minDate);
    }
}

/**
 * Displays asterisk for required fields.
 */
function markRequiredFields(): void {
  Object.keys(validationConfig).forEach((field) => {
    if (validationConfig[field as keyof typeof validationConfig].includes("isRequired")) {
      const label = document.getElementById(`required-${field}`);
      if (label) label.textContent = '*';
    }
  });
}

/**
 * renders appointment list component locally
 */
function renderappointmentList():void{
  const container = document.getElementById("appointment-list-container");
  if (!container) return;
  container.innerHTML = "";
  container.appendChild(appointmentList());
}

/**
 * renders counter
 */
function renderCounter():void{
    const container = document.getElementById("counter-container");
    if(!container) return;
    container.innerHTML = "";
    container.appendChild(counter());
}

/**
 * renders the Modal component
 */
function renderModal(message:string, callback: ()=>void):void{
    const modalElement = modal(message, callback);
    document.body.appendChild(modalElement);
}

/**
 * function to delete appointments using id
 * @param {string} id 
 * @returns 
 */
function deleteAppointment(id:number) {
    renderModal("Are you sure you want to delete this appointment?", () => {
        let updatedAppointments = [...stateService.getState("appointments")];
        updatedAppointments = updatedAppointments.filter(app => app.id !== id);
        stateService.setState("appointments", updatedAppointments)
        showToast("Appointment deleted.", "success");
    });
}

/**
 * Loads appointment data into form for editing.
 * @param {number} id - Appointment ID
 */
function editAppointment(id:number) {
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

export {resetErrorMessages, showToast, updateAvailableSlots, markRequiredFields, setMinDateForInput, renderappointmentList, resetFormFields, renderCounter, renderModal, deleteAppointment, editAppointment}