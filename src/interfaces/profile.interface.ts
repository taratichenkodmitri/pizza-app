export interface UserProfileResponse {
  id: number;
  email: string;
  passwordHash: string;
  address: string;
  name: string;
  restoreToken: string | null;
  phone: string;
}
