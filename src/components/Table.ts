import { sortAppointments } from "../app.logic"
import stateService from "../app.state"
import TableRow from "./TableRow"

function Table(){
    const table = document.createElement("table")
    table.classList.add('appointment-table')
    table.id = "appointment-table"
    table.innerHTML = `
        <thead>
            <tr>
            <th>Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Purpose</th>
            <th>Actions</th>
            </tr>
        </thead>
    `
    const tbodyContainer = document.createElement("div")
    tbodyContainer.id = "table-container"
    const tableBody = document.createElement("tbody")
    tableBody.className = "table-body"

    let appointments = stateService.getState("appointments") || [];
    const sortAppointmentsBy = stateService.getState("sortAppointmentsBy");
    if (sortAppointmentsBy) {
        appointments = sortAppointments(appointments, sortAppointmentsBy);
    }
    for (const app of appointments) {
        const row = TableRow(app);
        tableBody.appendChild(row);
    }

    tbodyContainer.appendChild(tableBody)
    table.appendChild(tbodyContainer);

    tableBody.id = "appointment-table-body"

    table.appendChild(tableBody)

    return table
}

export default Table