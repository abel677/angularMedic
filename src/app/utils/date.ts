import jwt_decode from 'jwt-decode';

export const getDecodedAccessToken = (token: string): any => {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
};
export const getCurrentTimestamp = (): number => {
  const currentDate = new Date();

  return currentDate.getTime() / 1000;
};

export const timestampToDate = (timestamp: number): Date => {
  const date = new Date(timestamp * 1000);

  return date;
};
