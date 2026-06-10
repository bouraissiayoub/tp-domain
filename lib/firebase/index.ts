export { firebaseConfig } from './config'
export { signIn, signOut, getCurrentUser, onAuthChange } from './auth'
export type { User } from './auth'
export {
  getAppointments,
  updateAppointmentStatus,
  getClients,
  getClient,
  getConsultationNotes,
  addConsultationNote,
  getAcceptedSlots,
} from './firestore'
export type { Appointment, Client, ConsultationNote } from './firestore'
