import type { VerifyMode } from "./definitions";
import { setVerifyCookies } from "./cookies";
import { issueVerificationCode } from "./verification";
export const startVerificationFlow = async ({
  userId,
  email,
  mode,
}: {
  userId: number;
  email: string;
  mode: VerifyMode;
}) => {
  await setVerifyCookies({ userId, email, mode });
  await issueVerificationCode({ userId, email });
};
