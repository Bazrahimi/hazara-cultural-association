import { z } from "zod";
import { DonationSchema } from "./schema";
import { ActionState } from "@/app/lib/definitions";

export type Donation = z.infer<typeof DonationSchema>;
export type DonationState = ActionState<Donation>;


