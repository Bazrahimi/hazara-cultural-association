// app/donate/success/page.tsx
import { DonateRoutes } from "@/app/lib/routes";
import { stripe } from "@/app/lib/stripe";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import type Stripe from "stripe";

export const metadata = {
  title: "Donation Successful",
};

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

type SearchParamsShape = { session_id?: string | string[] };

export default async function SuccessPage({
  searchParams,
}: {
  // Next.js 15: searchParams is a Promise
  searchParams: Promise<SearchParamsShape>;
}) {
  const sp = await searchParams;
  const rawId = sp?.session_id;
  const sessionId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
          <Header as="h2" size="md" align="center" className="mb-4">
            Missing session
          </Header>
          <P>
            We couldn’t find your payment session. If you completed your
            donation, a receipt should be emailed to you.
          </P>
          <div className="flex justify-center">
            <Link href={DonateRoutes.root()}>
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

    const pi = session.payment_intent as Stripe.PaymentIntent | null;
    const latestCharge =
      typeof pi?.latest_charge === "object"
        ? (pi!.latest_charge as Stripe.Charge)
        : null;
    receiptUrl = latestCharge?.receipt_url ?? undefined;
  } catch (err) {
    console.error("Failed Stripe Success", err);
    // Show generic success UI below
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
        {/* Title + Test badge */}
        <div className="mb-2 flex items-start justify-between gap-3">
          <Header as="h2" size="md" className="mb-0">
            Thank you for your donation! 🎉
          </Header>
          {/* Test Mode badge (hide in prod if you like) */}
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            Test mode
          </span>
        </div>

        <div className="space-y-3 text-center">
          {amountText && (
            <p className="text-lg font-semibold text-slate-800">
              {amountText} received
            </p>
          )}

          {email ? (
            <P className="text-slate-600">
              A confirmation receipt has been sent to{" "}
              <span className="font-semibold text-slate-800">{email}</span>.
            </P>
          ) : (
            <P className="text-slate-600">Your payment was successful.</P>
          )}

          <P>
            We use donated funds responsibly to support the community and our
            programs.
          </P>
        </div>

        {/* Gratitude + mission */}
        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-slate-800">
          <P className="font-semibold mb-1">
            With gratitude from Hazara Cultural Association
          </P>
          <P>
            We’re a volunteer-run community. Your donation helps sustain
            advocacy for Justice for Hazaras and the revival of Hazara
            heritage—preserving language, culture, and history for future
            generations. Thank you for standing with us.
          </P>
          {/* Optional tax note (uncomment if applicable) */}
          {/* <p className="mt-2 text-xs text-slate-600">
            Donations of $2 or more may be tax-deductible in Australia. A receipt will be emailed.
          </p> */}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
          <Link href={DonateRoutes.root()} className="inline-flex">
            <Button>Make another donation</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
