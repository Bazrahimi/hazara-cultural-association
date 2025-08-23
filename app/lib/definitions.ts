export type LoginState =
  | {
      email?: string;
      password?: string;
      message?: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  // "|" in TypeScript is the union operator
  | undefined;

export type SessionPayload = {
  userId: string; // required
  isAdmin?: boolean; // optional
  expiresAt: Date; // required
  [key: string]: unknown; // index signature
};

export type Session = {
  userId: string;
  isAdmin: boolean;
  expiresAt: string;
  iat: number;
  exp: number;
};
