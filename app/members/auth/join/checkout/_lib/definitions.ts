import { CamelizeKeys } from "@/app/_lib/helper";
import { MEMBERSHIP_PLAN_KEY } from "./constant";
export type PaymentKey = (typeof MEMBERSHIP_PLAN_KEY)[number];
export type MembershipOption = {
  id: string;
  label: string;
  priceLabel: string;
  helper: string;
};

type MemberSubscriptionDbRow = {
  id: number;
  user_id: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  status: string | null;
  collection_method: string | null;
  currency: string | null;
  billing_cycle_anchor: Date | null;
  current_period_start: Date | null;
  current_period_end: Date | null;
  cancel_at_period_end: boolean | null;
  canceled_at: Date | null;
  cancel_at: Date | null;
  default_payment_method_id: string | null;
  latest_invoice_id: string | null;
  created_at: Date;
  updated_at: Date;
};

export type MemberSubscriptionBase = CamelizeKeys<MemberSubscriptionDbRow>;

export type UpsertMemberSubscription = Omit<
  MemberSubscriptionBase,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "billingCycleAnchor"
  | "currentPeriodStart"
  | "currentPeriodEnd"
  | "canceledAt"
  | "cancelAt"
> & {
  billingCycleAnchor: number | null;
  currentPeriodStart: number | null;
  currentPeriodEnd: number | null;
  canceledAt: number | null;
  cancelAt: number | null;
};

type MembershipPayments = {
  id: number;
  user_id: number;
  payment_plan_key: string;
  amount_cents: number;
  currency: string;
  stripe_checkout_session_id: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_payment_intent_id: string | null;
  status:
    | "created"
    | "redirected"
    | "paid"
    | "failed"
    | "canceled"
    | "refunded";
  created_at: Date;
  updated_at: Date;
  stripe_invoice_id: string | null;
};

type MembershipPaymentsBase = CamelizeKeys<MembershipPayments>;

export type CreateMembershipPaymentRow = Pick<
  MembershipPaymentsBase,
  "userId" | "paymentPlanKey" | "amountCents"
>;

export type UpdateMembershipPaymentRow = Pick<
  MembershipPaymentsBase,
  | "id"
  | "stripeCustomerId"
  | "stripeSubscriptionId"
  | "stripeInvoiceId"
  | "status"
>;

export type EnsureMembershipPaymentRow = Pick<
  MembershipPaymentsBase,
  "id" | "stripeCustomerId" | "stripeSubscriptionId"
> & {
  email: string | null;
  created: boolean;
};
