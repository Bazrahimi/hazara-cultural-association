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
