export interface AddressPayload {
  street: string;
  city: string;
  country: string;
  userId: number;
}

export interface AddressResponseProps {
  message: string;
  statusCode: number;
  data: AddressResponse | AddressResponse[];
}

export interface AddressResponse {
  id: number;
  street: string;
  city: string;
  country: string;
  userId: number;
}

export interface UpdateAddressPayload {
  street?: string;
  city?: string;
  country?: string;
}
