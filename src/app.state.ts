import { saveData } from "./app.storage";

const stateService = (function () {
    const state = {
        editingAppointmentId: null,
        sortAppointmentsBy: null,
        isGridSelected: true,
        appointments: []
    };

    // observers map, each key maps to array of callbacks
    const observers = {};

    // notify all observers when a key changes
    function notifyObservers(key) {
        if (observers[key]) {
            observers[key].forEach(callback => callback());
        }
    }

    //setting state, triggers observers
    function setState(key, value) {
        const oldValue = state[key];
        if (oldValue === value) return; 

        state[key] = value;

        saveData(key, value);

        notifyObservers(key, value);
    }

    // returns current state value
    function getState(key) {
        return state[key];
    }

    // state values mapped to functions to be triggered on change
    function subscribe(key, callback) {
        if (!observers[key]) {
            observers[key] = [];
        }
        observers[key].push(callback);
    }

    return {
        setState,
        getState,
        subscribe
    };
})();

export default stateService;
