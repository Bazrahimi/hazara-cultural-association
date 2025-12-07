import { AUS_STATES, toBoolean } from "@/app/lib/helper";
import { z } from "zod";

// Reusable checkbox schema
const checkboxBoolean = z
  .preprocess((val) => toBoolean(val), z.boolean())
  .optional()
  .default(false);

// Generic helper for numeric enum
const numericEnum = (min: number, max: number, message: string) =>
  z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z
      .number({
        error: message,
      })
      .int(message)
      .min(min, message)
      .max(max, message)
  );

export const MemberSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name."),
  lastName: z.string().trim().min(2, "Please enter your last name."),

  // Country is fixed to AU for now
  country: z.literal("AU", {
    error: "Membership is currently only available for residents of Australia.",
  }),

  stateCode: z.enum(AUS_STATES, {
    error: "Please select your state of residence",
  }),

  postCode: z
    .string()
    .trim()
    .min(4, "Postcode should be 4 digits.")
    .max(4, "Postcode should be 4 digits.")
    .regex(/^\d{4}$/, "Postcode should contain only digits."),

  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number.")
    .max(30, "Phone number is too long."),

  ageRange: numericEnum(0, 5, "Please select your age range"),

  englishProficiency: numericEnum(
    0,
    4,
    "Please select your proficiency level."
  ),

  farsiHazaragiProficiency: numericEnum(
    0,
    4,
    "Please select your proficiency level."
  ),

  // Checkboxes – default false when not checked
  interestBlog: checkboxBoolean,
  interestStore: checkboxBoolean,
  newsletterOptIn: checkboxBoolean,
  virtualMeetingOptIn: checkboxBoolean,
});
