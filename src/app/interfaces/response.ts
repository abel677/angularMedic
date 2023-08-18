export interface AppointmentResponse {
  id: number;
  patient: Doctor;
  currentDate: Date;
  appointmentDate: Date;
  description: string;
  state: number;
  doctor: Doctor;
}

export interface Doctor {
  id: number;
  name: string;
  lastName: string;
  birthDate: Date;
  typeBlood: string;
  direction: string;
  phone: string;
  idUser: number;
  idGender: number;
}
