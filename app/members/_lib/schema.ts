import { AUS_STATES, toBoolean } from "@/app/_lib/helper";
import { z } from "zod";
import {
  ADDRESS_FIELDS as AF,
  EDUCATION_LEVEL_OPTIONS,
  PROFILE_FIELDS as PF,
} from "./constant";

// Reusable checkbox schema
const checkboxBoolean = z
  .preprocess((val) => toBoolean(val), z.boolean())
  .optional()
  .default(false);

const EDUCATION_LEVEL_VALUES = EDUCATION_LEVEL_OPTIONS.map(
  (o) => o.value,
) as readonly string[];

export const JoinSchema = z.object({
  [PF.firstName]: z.string().trim().min(2, "Please enter your first name."),
  [PF.lastName]: z.string().trim().min(2, "Please enter your last name."),

  [PF.phone]: z.string().trim().optional(),

  [PF.educationLevel]: z.enum(EDUCATION_LEVEL_VALUES).optional(),
  [PF.occupation]: z
    .string()
    .trim()
    .min(2, { message: "Please enter a valid occupation" })
    .max(100, { message: "Occupation is too long" })
    .optional(),

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
  [PF.newsletterOptIn]: checkboxBoolean,
  [PF.virtualMeetingOptIn]: checkboxBoolean,
});
