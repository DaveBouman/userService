import U from '../../entities/database/user';
/* eslint-disable */
declare global {
  namespace Express {
    interface User extends U { }
  }
}

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
  }
}