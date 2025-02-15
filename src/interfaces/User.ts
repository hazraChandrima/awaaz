export type UserRole = "admin" | "user";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  profile_image: string;
  location: string;
  phone_number: string;
  verified: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
