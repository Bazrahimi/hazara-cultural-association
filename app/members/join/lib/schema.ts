// app/members/join/schema.ts
"use server";

import { z } from "zod";

export const MembershipSchema = z
  .object({
    firstName: z.string().min(2, "Please enter your first name."),
    lastName: z.string().min(2, "Please enter your last name."),
    phone: z.string().min(6, "Please enter a valid phone number."),
    suburb: z.string().min(2, "Please enter your suburb."),
    stateCode: z
      .string()
      .min(2, "Please select your state.")
      .max(3, "Invalid state code."),
    country: z.literal("AU", {
      errorMap: () => ({
        message: "Membership is only available for residents of Australia.",
      }),
    }),

    // Membership fee + tier
    tier: z.enum(["standard", "supporter", "patron"]),
    feeAmount: z.coerce.number({
      invalid_type_error: "Please enter a valid amount.",
    }),
    requestWaiver: z
      .enum(["yes", "no"])
      .default("no")
      .transform((v) => v === "yes"),

    waiverReason: z
      .string()
      .max(500, "Please keep your explanation within 500 characters.")
      .optional()
      .or(z.literal("")),

    // Awareness level
    awarenessLevel: z.enum(["strong", "good", "some", "low"], {
      required_error:
        "Please tell us about your awareness of Hazara history and persecution.",
    }),
  })
  .superRefine((data, ctx) => {
    // If not requesting waiver → enforce minimum fee
    if (!data.requestWaiver && data.feeAmount < 10) {
      ctx.addIssue({
        path: ["feeAmount"],
        code: z.ZodIssueCode.custom,
        message: "Minimum membership fee is $10.",
      });
    }

    // If requesting waiver → require a reason
    if (data.requestWaiver && !data.waiverReason?.trim()) {
      ctx.addIssue({
        path: ["waiverReason"],
        code: z.ZodIssueCode.custom,
        message: "Please explain your circumstances for a fee waiver.",
      });
    }
  });

export type MembershipInput = z.infer<typeof MembershipSchema>;

export type MembershipState = {
  ok: boolean;
  message?: string;
  // field errors by key, like your BlogPost pattern
  errors?: Partial<Record<keyof MembershipInput, string[]>>;
  data?: Partial<MembershipInput>;
};
