export type PostActionState = {
  ok: boolean;
  message: string;
  ts: number;
  errors?: Record<string, string[]>;
}

