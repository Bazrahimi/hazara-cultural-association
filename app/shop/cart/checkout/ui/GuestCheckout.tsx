import { Button, Input } from "@/app/ui/global/components";
import { useState } from "react";

const GuestCheckout = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <div className="my-3 md:my-5">
      {!clicked ? (
        <Button
          fullWidth
          aria-label="Proceed to guest checkout"
          onClick={() => setClicked(true)}
        >
          Guest Checkout
        </Button>
      ) : (
        <div>
          <Input
            id="email"
            label="email"
            placeholder="Enter your email address"
            type="email"
          />

          <Input
            id="confirmEmail"
            label="confirm your Email address"
            type="email"
            placeholder="Enter your email address"
          />
          <div className="flex gap-4">
            <Button fullWidth variant="outline" onClick={() => setClicked(false)}>Back</Button>
            <Button fullWidth>Continue as Guest</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCheckout;
