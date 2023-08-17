export interface IAuth {
  email: string;
  password: string;
}

export interface IRegisterPayload extends IAuth {
  name: string;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}
export interface IGender {
  id?: number;
  gender: string;
}

export interface IPerson extends IGender, IUser {
  id?: number;
  name: string;
  lastName: string;
  birthDate: string;
  typeBlood: string;
  direction: string;
  email: string;
  phone: string;
  securityNumber: string;
}
export interface IPatient extends IPerson {
  id?: number;
  securityNumber: string;
}

export interface ISpecialty {
  id?: number;
  specialty: string;
}

export interface ISchedules {
  id?: number;
  schedule: string;
}
export interface IDoctor extends IPerson, ISpecialty, ISchedules {
  doctor_id?: number;
}

export interface IAppointmentsPayload {
  patient_id: number;
  doctor_id: number;
  appointmentDate: Date;
  descripcion: string;
}
