import counter from "./Counter";
import mainHeading from "./MainHeading";
import contentBody from "./ContentBody";
import toast from "./Toast";
import stateService from "../app.state";
import { editAppointment, renderappointmentList, renderCounter } from "../services/dom.service";


export function renderApp() {
    console.log("starting app")
    const root = document.getElementById('app') as HTMLElement;
    root.innerHTML = ''; 
    

    const layout = document.createElement('div');
    layout.className = 'app';

    layout.appendChild(toast())
    layout.appendChild(mainHeading());
    const counterContainer = document.createElement('div');
    counterContainer.id = "counter-container";
    counterContainer.appendChild(counter())
    layout.appendChild(counterContainer);
    layout.appendChild(contentBody())

    root.appendChild(layout);
    const editingAppointmentId = stateService.getState("editingAppointmentId")
    if(editingAppointmentId) editAppointment(editingAppointmentId)

    // mapping state values to functions to trigger upon change
    stateService.subscribe('appointments', () => {
        renderappointmentList();
        renderCounter();
    });

    stateService.subscribe('isGridSelected', renderappointmentList);

    stateService.subscribe('sortAppointmentsBy', renderappointmentList)
}
