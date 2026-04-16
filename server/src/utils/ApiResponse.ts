export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
};

export const apiResponse = {
  success<T>(message: string, data: T): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },
  error(message: string, error?: unknown): ApiResponse<null> {
    return {
      success: false,
      message,
      error,
    };
  },
};
