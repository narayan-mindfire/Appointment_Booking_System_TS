import { DOCS, VALIDATION_CONFIG } from "../app.const";
import { showToast, resetErrorMessages, updateAvailableSlots, setMinDateForInput, markRequiredFields, resetFormFields} from "../services/dom.service";
import { validationService } from "../services/validation.service";
import stateService from "../app.state.js";

function Form() {
  const parent = document.createElement("div");
  parent.className = "form-container";

  parent.innerHTML = `
    <h2>Appointment Form</h2>
    <form id="myForm">
      <label class="form-label"><i class="fa-solid fa-user"></i> Name:<span id="required-name"></span><br><input type="text" id="name" /></label><br><span class="error-message" id="name-error"></span><br><br>
      <label class="form-label"><i class="fa-solid fa-envelope"></i> Email:<span id="required-email"></span><br><input type="text" id="email" /></label><br><span class="error-message" id="email-error"></span><br><br>
      <label class="form-label"><i class="fa-solid fa-calendar-days"></i> Date:<span id="required-date"></span><br><input type="date" id="date" /></label><br><span class="error-message" id="date-error"></span><br><br>
      <label class="form-label"><i class="fa-solid fa-stethoscope"></i> Doctor:<span id="required-doctor"></span><br>
        <input type="text" id="doctor">
        <div class="doc-options" id="doc-options"></div>
      </label><br><span class="error-message" id="doctor-error"></span><br><br>
      <label class="form-label"><i class="fa-solid fa-check-to-slot"></i> Slot:<span id="required-slot"></span><br>
        <select id="slot">
            <option value="">Select a time slot</option>
        </select>
      </label><br><span class="error-message" id="slot-error"></span><br><br>
      <label class="form-label"><i class="fa-solid fa-microscope"></i> Purpose:<span id="required-purpose"></span><br><input type="text" id="purpose" /></label><br><span class="error-message" id="purpose-error"></span><br><br>
      <center><input class="submit-button" id="submit" type="submit" value="Book Appointment" /></center>
    </form>
  `;

  const validators = validationService();

  function renderDoctorOptions(list) {
    const docList = parent.querySelector("#doc-options");
    docList.innerHTML = "";
    list.forEach((doc) => {
      const option = document.createElement("div");
      option.className = "doctor-option";
      option.textContent = doc;
      docList.appendChild(option);
    });
  }

  function setDoctors() {
    const docList = parent.querySelector("#doc-options");
    const doctorInput = parent.querySelector("#doctor");

    renderDoctorOptions(DOCS);

    doctorInput.addEventListener("input", function () {
      const filtered = DOCS.filter((doc) =>
        doc.toLowerCase().includes(this.value.toLowerCase())
      );
      docList.style.display = "block";
      renderDoctorOptions(filtered);
    });

    docList.addEventListener("click", function (e) {
      if (e.target.classList.contains("doctor-option")) {
        doctorInput.value = e.target.textContent;
        updateAvailableSlots();
        docList.style.display = "none";
      }
    });
  }

  function handleForm(e) {
    e.preventDefault();

    const fields = {
      name: parent.querySelector("#name").value.trim(),
      email: parent.querySelector("#email").value.trim(),
      date: parent.querySelector("#date").value,
      doctor: parent.querySelector("#doctor").value,
      slot: parent.querySelector("#slot").value,
      purpose: parent.querySelector("#purpose").value.trim(),
    };

    resetErrorMessages();

    let isValid = true;

    for (const key in fields) {
      const rules = VALIDATION_CONFIG[key] || [];
      for (const rule of rules) {
        const validate = validators[rule];
        if (validate && !validate(fields[key], key)) {
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
      showToast("Please input correct data and try again", "error");
      return;
    }
    let updatedAppointments = [...stateService.getState("appointments")];
    const editingAppointmentId = stateService.getState("editingAppointmentId")
    if (editingAppointmentId) {
      const idx = updatedAppointments.findIndex(
        (a) => a.id === editingAppointmentId
      );
      if (idx !== -1) {
        updatedAppointments[idx] = { id: editingAppointmentId, ...fields };
        stateService.setState("editingAppointmentId", null)
        parent.querySelector("#submit").value = ("Book Appointment");
      }
    } else {
      updatedAppointments.push({ id: Date.now(), ...fields });
    }

    stateService.setState("appointments", updatedAppointments)
    showToast("Appointment successfully booked!", "success");
    resetFormFields()
  }

  setTimeout(() => {
    setMinDateForInput();
    markRequiredFields();
    setDoctors();
  }, 0);

  // Listeners
  const formEl = parent.querySelector("form");
  const dateEle = parent.querySelector("#date");
  const doctorEle = parent.querySelector("#doctor");
  const docOptions = parent.querySelector("#doc-options");

  formEl.addEventListener("submit", handleForm);
  dateEle.addEventListener("change", updateAvailableSlots);
  doctorEle.addEventListener("change", updateAvailableSlots);
  doctorEle.addEventListener("click", () => {
    docOptions.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!doctorEle.contains(e.target) && !docOptions.contains(e.target)) {
      docOptions.style.display = "none";
    }
  });

  return parent;
}

export default Form;
