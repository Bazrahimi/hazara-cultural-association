// app/members/auth/join/payment/cancel/page.tsx

import { MemberRoutes } from "@/app/_lib/routes";
import { Button, Header, P } from "@/app/_ui";

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
      <Header as="h1" size="lg">
        Payment Cancelled
      </Header>

      <P>
        Your payment was cancelled and <strong>no charges were made</strong>.
      </P>

      <P>
        You can retry your membership payment at any time, or return later if
        you need more time.
      </P>

      <div className="pt-6 space-y-3">
        <Button as="link" href={MemberRoutes.checkout()}>
          Try Payment Again
        </Button>

        <Button as="link" href={MemberRoutes.root()}>
          Back to membership info
        </Button>
      </div>
    </main>
  );
}
