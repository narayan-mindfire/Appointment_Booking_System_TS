import stateService from "../app.state";
import { deleteAppointment, editAppointment } from "../services/dom.service";
import type { Appointment } from "../types";

function TableRow(app : Appointment):HTMLElement{
  const row = document.createElement("tr");
    row.innerHTML = `
        <td>${app.name}</td>
        <td>${app.doctor}</td>
        <td>${app.date}</td>
        <td>${app.slot}</td>
        <td>${app.purpose}</td>
        <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </td>
    `;
    if(app.id === stateService.getState("editingAppointmentId")) row.classList.add("highlighted");
    const editBtn = row.querySelector(".edit") as HTMLButtonElement
    const deleteBtn = row.querySelector(".delete") as HTMLButtonElement
    editBtn.addEventListener("click", () => editAppointment(app.id));
    deleteBtn.addEventListener("click", () => deleteAppointment(app.id));
    return row;
}

export default TableRow