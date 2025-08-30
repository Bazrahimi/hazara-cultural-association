import { Button, Input } from "@/app/ui/global/components";
import { useMemo, useState } from "react";

const GuestCheckout = ({
  setActiveMethod,
}: {
  setActiveMethod: (method: string | null) => void;
}) => {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const isEmail = (v: string) => v.includes("@");

  const error = useMemo(() => {
    const e = email.trim();
    const c = confirmEmail.trim();

    if (!e || !c) return null; // don’t show an error while typing the first field
    if (!isEmail(e) || !isEmail(c)) return "Invalid email address";
    if (e !== c) return "Emails do not match";
    return null;
  }, [email, confirmEmail]);

  const handleSubmit = () => {
    const e = email.trim();
    const c = confirmEmail.trim();

    if (!e || !c) return; // button is disabled anyway
    if (!isEmail(e) || !isEmail(c)) return; // disabled anyway
    if (e !== c) return; // disabled anyway

    // Proceed with guest checkout logic
    console.log("Guest checkout submitted with:", e);
  };

  const pickValue = (v: unknown) =>
    typeof v === "string"
      ? v
      : ((v as React.ChangeEvent<HTMLInputElement>).target.value ?? "");

  return (
    <div className="my-3 md:my-5">
      {!clicked ? (
        <Button
          fullWidth
          aria-label="Proceed to guest checkout"
          onClick={() => {
            setClicked(true);
            setActiveMethod("guest");
          }}
        >
          Guest Checkout
        </Button>
      ) : (
        <div className="space-y-3">
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email address"
            type="email"
            required
            value={email} // ← controlled
            onChange={(v) => setEmail(pickValue(v))}
          />
          <Input
            id="confirmEmail"
            label="Confirm your Email address"
            type="email"
            placeholder="Enter your email address"
            required
            value={confirmEmail} // ← controlled
            onChange={(v) => setConfirmEmail(pickValue(v))}
          />

          {error && (
            <p className="text-red-500 text-sm" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-4">
            <Button
              fullWidth
              variant="outline"
              onClick={() => {
                setClicked(false);
                setActiveMethod(null);
                setEmail("");
                setConfirmEmail("");
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={!!error || !email || !confirmEmail}
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCheckout;
