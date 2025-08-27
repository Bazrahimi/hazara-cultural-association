// app/donate/success/page.tsx
import { stripe } from "@/app/lib/stripe";
import { Button, Header } from "@/app/ui/global/components";
import Link from "next/link";
import type Stripe from "stripe";
import { P } from "@/app/ui/global/components";

export const metadata = {
  title: "Donation Successful",
};

type SearchParams = { session_id?: string | string[] };

function formatAmount(
  amount: number | null | undefined,
  currency: string | null | undefined
) {
  if (!amount || !currency) return "";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const rawId = searchParams?.session_id;
  const sessionId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 sm:p-8">
          <Header as="h2" size="md" align="center" className="mb-4">
            Missing session
          </Header>
          <p className="text-center text-slate-600 mb-6">
            We couldn’t find your payment session. If you completed your
            donation, you should receive a receipt by email.
          </p>
          <div className="flex justify-center">
            <Link href="/donate">
              <Button>Back to Donate</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let amountText = "";
  let email = "";
  let receiptUrl: string | undefined;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    });

    amountText = formatAmount(session.amount_total, session.currency);
    email = session.customer_details?.email || session.customer_email || "";

    // Try to expose a Stripe receipt link if available
    const pi = session.payment_intent as Stripe.PaymentIntent | null;
    const latestCharge =
      typeof pi?.latest_charge === "object"
        ? (pi!.latest_charge as Stripe.Charge)
        : null;
    receiptUrl = latestCharge?.receipt_url ?? undefined;
  } catch (err) {
    // swallow error, show a generic success box
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 sm:p-8">
        <Header as="h2" size="md" align="center" className="mb-4">
          Thank you for your donation! 🎉
        </Header>

        <div className="space-y-2 text-center">
          {amountText && (
            <p className="text-lg font-semibold text-slate-800">
              {amountText} received
            </p>
          )}
                {/* Copy polish */}
          {email ? (
            <P className="text-slate-600">
              A confirmation receipt has been sent to{" "}
              <span className="font-extrabold">{email}</span>.
            </P>
          ) : (
            <P className="text-slate-600">Your payment was successful.</P>
          )}

          {/* ✅ RECOMMENDATION: concise, polished mission statement */}
          <P className="text-slate-700">
            We use donated funds responsibly to support the community and our programs.
          </P>
        </div>

        {/* ✅ RECOMMENDATION: gratitude + mission block */}
        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-slate-800">
          <p className="font-semibold mb-1">With gratitude from Hazara Cultural Association</p>
          <p className="text-sm leading-relaxed">
            We’re a volunteer-run community. Your donation helps sustain advocacy for
            <strong> Justice for Hazaras</strong> and the
            <strong> revival of Hazara heritage</strong>—preserving language, culture, and history
            for future generations. Thank you for standing with us.
          </p>
          {/* Optional tax note (uncomment if applicable) */}
          {/* <p className="mt-2 text-xs text-slate-600">
            Donations of $2 or more may be tax-deductible in Australia. A receipt will be emailed.
          </p> */}
        </div>
          {!email && (
            <p className="text-slate-600">Your payment was successful.</p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {receiptUrl && (
            <a
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline">View / Download Receipt</Button>
            </a>
          )}
          {/* Print to PDF for users who want a hard copy */}

          <Link href="/donate" className="inline-flex">
            <Button>Make another donation</Button>
          </Link>
        </div>
      </div>
  
  );
}
