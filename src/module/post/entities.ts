export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponseProps {
  message: string;
  statusCode: number;
  data: PostResponse | PostResponse[];
}

export interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}
