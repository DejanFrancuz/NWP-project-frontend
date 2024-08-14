export interface LoginRequest{
  username: string,
  password: string
}
export interface LoginResponse{
  jwt: string
}
export interface QueryRequest{
  name: string,
  status: string[],
  startDate: Date,
  endDate: Date
}
export interface User{
  userId?: number,
  firstName: String,
  lastName: String,
  email: String,
  permissions: String[]
}
export interface Machine{
  id?: number,
  name: string,
  status: MachineStatus,
  createdBy: User,
  dateCreated: Date,
  active: boolean
}

export enum MachineStatus{ STOPPED, RUNNING}

