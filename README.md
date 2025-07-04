# Appointment Booking System

A modular and maintainable **Appointment Booking System** built using **vanilla JavaScript** and modern architectural principles. The project follows **state-based rendering** powered by the **Observer Pattern**, ensuring efficient updates and clean reactivity across UI components.

---

## 🔧 Tech Stack

- **Vite** – For fast development and production builds.
- **Typescript** – No frontend frameworks used.
- **Modular Architecture** – Components and services are neatly organized.
- **Observer Pattern** – For reactive state updates and decoupled rendering logic.

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App Locally

```bash
npm run dev
```

## Key Concepts

### State Management (`app.state.ts`)

- A lightweight state manager using the **Observer Pattern**.
- Components can subscribe to specific state keys.
- Automatically triggers re-renders when the subscribed state changes.

### Persistent Storage (`app.storage.ts`)

- Uses `localStorage` to save and load appointment data.
- Keeps user data intact across page reloads.

### Modular Components (`components/`)

- Each UI unit (like `AppointmentList`, `Toast`, `Counter`, etc.) is a pure JS function returning DOM nodes.
- Modular design encourages reusability and easier testing.

### State-Based Rendering

- Components like `AppointmentList` re-render only when specific parts of the state (e.g., `appointments`, `sortAppointmentsBy`, `isGridSelected`) change.

---

## Features

- Add, edit, and view appointments.
- Toggle between **grid** and **list** views.
- Sort appointments by:
  - Date (asc/desc)
  - Doctor name (A-Z/Z-A)
  - Patient name (A-Z/Z-A)
- UI updates reactively based on state changes.

---

## Example: How State Triggers Re-render

```js
stateService.subscribe("appointments", () => {
  renderAppointmentList();
  renderCounter();
});

stateService.setState("appointments", updatedList);
```

- Any change in `appointments` automatically re-renders the list and counter.
