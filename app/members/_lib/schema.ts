import { AUS_STATES, toBoolean } from "@/app/_lib/helper";
import { z } from "zod";
import { ADDRESS_FIELDS as AF, PROFILE_FIELDS as PF } from "./constant";

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
      .max(max, message),
  );

export const JoinSchema = z.object({
  [PF.firstName]: z.string().trim().min(2, "Please enter your first name."),
  [PF.lastName]: z.string().trim().min(2, "Please enter your last name."),

  [PF.phone]: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number.")
    .max(30, "Phone number is too long."),

  [AF.address1]: z.string().trim().min(5, "Please enter your street address."),
  [AF.address2]: z.string().trim().optional().default(""),
  [AF.suburb]: z.string().trim().min(2, "Please enter your suburb."),

  // Country is fixed to AU for now
  [AF.country]: z.literal("AU", {
    error: "Membership is currently only available for residents of Australia.",
  }),

  [AF.stateCode]: z.enum(AUS_STATES, {
    error: "Please select your state of residence",
  }),

  [AF.postcode]: z
    .string()
    .trim()
    .min(4, "Postcode should be 4 digits.")
    .max(4, "Postcode should be 4 digits.")
    .regex(/^\d{4}$/, "Postcode should contain only digits."),

  // Checkboxes – default false when not checked
  [PF.interestBlog]: checkboxBoolean,
  [PF.interestStore]: checkboxBoolean,
  [PF.newsletterOptIn]: checkboxBoolean,
  [PF.virtualMeetingOptIn]: checkboxBoolean,
});
