import stateService from "../app.state";
import { renderModal, showToast } from "../services/dom.service";
/**
 * function to delete appointments using id
 * @param {string} id 
 * @returns 
 */
export function deleteAppointment(id) {
    renderModal("Are you sure you want to delete this appointment?", () => {
        let updatedAppointments = [...stateService.getState("appointments")];
        updatedAppointments = updatedAppointments.filter(app => app.id !== id);
        stateService.setState("appointments", updatedAppointments)
        showToast("Appointment deleted.", "success");
    });
}