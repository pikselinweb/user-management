export interface USER {
  id: number;
  email: string;
}
export interface PROFILE extends USER {
  userId: string;
  fullName: string;
  role: number;
}
