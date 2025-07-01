import stateService from "../app.state";

function Counter(){
    console.log("counter rendered")
    const counter = document.createElement("div");
    counter.className = "head-area";
    const count = stateService.getState("appointments").length || 0;
    counter.innerHTML = `
        <h3 id="total-appointments">Total Appointments: <span>${count}</span></h3>
    `
    return counter;
}
export default Counter