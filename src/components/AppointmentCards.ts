import state from "../app.state";
import { sortAppointments } from "../app.logic.js";
import Card from "./Card.js";
import stateService from "../app.state";

function AppointmentCards() {
  const container = document.createElement("div");
  container.id = "appointment-cards";
  container.className = "appointment-cards";

  let appointments = stateService.getState("appointments");
  const sortAppointmentsBy = stateService.getState("sortAppointmentsBy");
  if (sortAppointmentsBy) {
    appointments = sortAppointments(appointments, sortAppointmentsBy);
  }

  for (const app of appointments) {
        const card = Card(app);
        container.appendChild(card);
    }

  return container;
}

export default AppointmentCards;
