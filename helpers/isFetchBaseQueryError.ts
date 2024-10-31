import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (
  error: any
): error is FetchBaseQueryError => {
  return error && typeof error === 'object' && 'status' in error;
};
