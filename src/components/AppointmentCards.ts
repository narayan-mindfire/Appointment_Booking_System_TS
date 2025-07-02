import { sortAppointments } from "../app.logic.ts";
import card from "./Card.ts";
import stateService from "../app.state";

function appointmentCards() : HTMLElement{
  const container = document.createElement("div");
  container.id = "appointment-cards";
  container.className = "appointment-cards";

  let appointments = stateService.getState("appointments");
  const sortAppointmentsBy = stateService.getState("sortAppointmentsBy");
  if (sortAppointmentsBy) {
    appointments = sortAppointments(appointments, sortAppointmentsBy);
  }

  for (const app of appointments) {
        const cardElement:HTMLElement = card(app);
        container.appendChild(cardElement);
    }

  return container;
}

export default appointmentCards;
