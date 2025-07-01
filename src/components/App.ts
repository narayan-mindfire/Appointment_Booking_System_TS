import Counter from "./Counter";
import MainHeading from "./MainHeading";
import ContentBody from "./ContentBody";
import Toast from "./Toast";
import stateService from "../app.state";
import { renderAppointmentList, renderCounter } from "../services/dom.service";
import {editAppointment} from "../utils/editAppointment.js";

export function renderApp() {
    console.log("starting app")
    const root = document.getElementById('app');
    root.innerHTML = ''; 
    

    const layout = document.createElement('div');
    layout.className = 'app';

    layout.appendChild(Toast())
    layout.appendChild(MainHeading());
    const counterContainer = document.createElement('div');
    counterContainer.id = "counter-container";
    counterContainer.appendChild(Counter())
    layout.appendChild(counterContainer);
    layout.appendChild(ContentBody())

    root.appendChild(layout);
    const editingAppointmentId = stateService.getState("editingAppointmentId")
    if(editingAppointmentId) editAppointment(editingAppointmentId)

    // mapping state values to functions to trigger upon change
    stateService.subscribe('appointments', () => {
        renderAppointmentList();
        renderCounter();
    });

    stateService.subscribe('isGridSelected', renderAppointmentList);

    stateService.subscribe('sortAppointmentsBy', renderAppointmentList)
}
