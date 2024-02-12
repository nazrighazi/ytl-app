const ResponseStatus = {
  Error: 'Error',
  Success: 'Success',
} as const;

export type SuccessResponse<T> = {
  status: (typeof ResponseStatus)['Success'];
  data: T;
};

export type ErrorResponse = {
  status: (typeof ResponseStatus)['Error'];
  data?: {
    message?: string;
    code?: string;
  };
  error?: {
    description?: string;
    titile?: string;
  };
};
