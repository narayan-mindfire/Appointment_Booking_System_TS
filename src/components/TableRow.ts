import stateService from "../app.state";
import { deleteAppointment } from "../utils/deleteAppointment";
import { editAppointment } from "../utils/editAppointment";

function TableRow(app){
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
    row.querySelector(".edit").addEventListener("click", () => editAppointment(app.id));
    row.querySelector(".delete").addEventListener("click", () => deleteAppointment(app.id));
    return row;
}

export default TableRow