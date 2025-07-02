import { sortSetter } from "../app.logic";
import stateService from "../app.state";
import AppointmentCards from "./AppointmentCards";
import Table from "./Table";

function AppointmentList() :HTMLElement{
  console.log("appointmentlist rendered")
  const parent = document.createElement("div");
  parent.className = "appointment-list";
  const header = document.createElement("div");
  header.className = "appointment-head";

  const heading = document.createElement("h2");
  heading.textContent = "Appointments List";

  const appOptions = document.createElement("div");
  appOptions.className = "app-options";

  const sortSelect = document.createElement("select");
  sortSelect.id = "sort";
  sortSelect.innerHTML = `
        <option>Sort appointments (default)</option>
        <option id="sDate" value="date">Sort by date (newest to oldest)</option>
        <option id="sDate" value="dateR">Sort by date (oldest to newest)</option>
        <option id="sDname" value="doctor">Sort by doctor name (A-Z)</option>
        <option id="sDname" value="doctorR">Sort by doctor name (Z-A)</option>
        <option id="sPname" value="name">Sort by patient name (A-Z)</option>
        <option id="sPname" value="nameR">Sort by patient name (Z-A)</option>
    `;

  const btnHalf = document.createElement("button");
  const btnFull = document.createElement("button");
  btnHalf.title = "Grid view";
  btnFull.title = "List view";
  btnHalf.id = "btn-half";
  btnFull.id = "btn-full";

  btnHalf.innerHTML = `<i class="fas fa-th-large"></i>`;
  btnFull.innerHTML = `<i class="fas fa-list"></i>`;

  appOptions.appendChild(sortSelect);
  appOptions.appendChild(btnHalf);
  appOptions.appendChild(btnFull);

  header.appendChild(heading);
  header.appendChild(appOptions);

  parent.appendChild(header);

  const isGridSelected = stateService.getState("isGridSelected");
  
  if (isGridSelected) {
    parent.appendChild(AppointmentCards());
    btnHalf.style.backgroundColor = "#c5c4c4";
    btnFull.style.backgroundColor = "#fff";
  } else {
    parent.appendChild(Table());
    btnHalf.style.backgroundColor = "#fff";
    btnFull.style.backgroundColor = "#c5c4c4";
  }

  // event listeners
  sortSelect.addEventListener("change", sortSetter);
  btnFull?.addEventListener("click", () => {
    stateService.setState("isGridSelected", false);
  });

  btnHalf?.addEventListener("click", () => {
    stateService.setState("isGridSelected", true);
  });
  return parent;
}

export default AppointmentList;
