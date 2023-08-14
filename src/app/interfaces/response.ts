export interface AppointmentResponse {
  patient:         Doctor;
  currentDate:     Date;
  appointmentDate: Date;
  description:     null | string;
  state:           number;
  doctor:          Doctor;
}

export interface Doctor {
  id:        number;
  name:      string;
  lastName:  string;
  birthDate: Date;
  typeBlood: string;
  direction: string;
  email:     string;
  phone:     string;
  idUser:    number;
  idGender:  number;
}