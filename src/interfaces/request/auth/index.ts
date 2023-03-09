import { User } from "src/api/auth/models";

export interface UpdateProductRequest
  extends Partial<Omit<User, "verified_email" | "access_type" | "reseller">> {}
