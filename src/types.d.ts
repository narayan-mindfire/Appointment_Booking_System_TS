
export interface Appointment {
  id: number;
  name: string;
  email: string;
  date: string;   
  doctor: string;
  slot: string;
  purpose: string;
}

export type EditingAppointmentId = string | null

export type SortAppointmentsBy = string | null 

export type IsGridSelected = boolean

export interface State {
    editingAppointmentId: EditingAppointmentId,
    sortAppointmentsBy: SortAppointmentsBy,
    isGridSelected: IsGridSelected,
    appointments: Appointment[]
}