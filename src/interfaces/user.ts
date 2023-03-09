export enum UserType {
  SYSADMIN = "sysadmin",
  ADMIN = "admin",
  RESELLER = "reseller",
  USER = "user",
}

export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  access_type: UserType;
}
