interface SuccessResponse<T> {
  data: T;
  error: never;
}

export interface ErrorResponse {
  error: string;
  data: never;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;
