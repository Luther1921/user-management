export interface UserPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserResponseProps {
  message: string;
  statusCode: number;
  data: UserResponse | UserResponse[] | null;
}

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  street?: string;
  city?: string;
  country?: string;
}
