import { SLOTS, VALIDATION_CONFIG } from "../app.const";
import stateService from "../app.state";
import AppointmentList from "../components/AppointmentList";
import Counter from "../components/Counter";
import Modal from "../components/Modal";

/**
 * Clears all validation error messages.
 */
function resetErrorMessages() {
    document.querySelectorAll(".error-message").forEach(ele => ele.textContent = "");
}

/**
 * resets form fields
 */
function resetFormFields(){
    const form = document.getElementById("myForm")
    form.querySelector("#name").value=""
    form.querySelector("#email").value=""
    form.querySelector("#date").value=""
    form.querySelector("#doctor").value=""
    form.querySelector("#slot").value=""
    form.querySelector("#purpose").value=""
}

/**
 * function to show toast messages in the dom
 * @param {string} message 
 * @param {string} type 
 */
function showToast(message, type = "success") {
    const toast = document.getElementById("toast-message");
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
    const dateEle = document.getElementById("date");
    const doctorEle = document.getElementById("doctor");
    const slotEle = document.getElementById("slot");
    const date = dateEle.value;
    const doctorVal = doctorEle.value;

    // Clear old options
    slotEle.innerHTML = `<option value="">Select a time slot</option>`;

    if (!date || !doctorVal) return;

    const appointments = stateService.getState("appointments");
    const bookedSlots = appointments
        .filter(appointment => appointment.date === date && appointment.doctor === doctorVal && appointment.id !== stateService.getState("editingAppointmentId"))
        .map(appointment => appointment.slot);

    const today = new Date();
    const selectedDate = new Date(date);
    const isToday = today.toDateString() === selectedDate.toDateString();

    SLOTS.forEach(slot => {
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

    document.getElementById("date").setAttribute("min", minDate);
}

/**
 * Displays asterisk for required fields.
 */
function markRequiredFields() {
    Object.keys(VALIDATION_CONFIG).forEach(field => {
        if (VALIDATION_CONFIG[field].includes("isRequired")) {
            const label = document.getElementById(`required-${field}`);
            if (label) label.textContent = '*';
        }
    });
}

/**
 * renders appointment list component locally
 */
function renderAppointmentList() {
  const container = document.getElementById("appointment-list-container");
  if (!container) return;
  container.innerHTML = "";
  container.appendChild(AppointmentList());
}

/**
 * renders counter
 */
function renderCounter(){
    const container = document.getElementById("counter-container");
    if(!container) return;
    container.innerHTML = "";
    container.appendChild(Counter());
}

/**
 * renders the Modal component
 */
function renderModal(message, callback) {
    const modal = Modal(message, callback);
    document.body.appendChild(modal);
}

export {resetErrorMessages, showToast, updateAvailableSlots, markRequiredFields, setMinDateForInput, renderAppointmentList, resetFormFields, renderCounter, renderModal}