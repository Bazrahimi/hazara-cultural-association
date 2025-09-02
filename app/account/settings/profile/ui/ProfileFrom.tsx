// app/account/settings/profile/ProfileForm.tsx
"use client";

import { useActionState } from "react";

import { Button, Input } from "@/app/ui/global/components";
import { updateProfileAction } from "../lib/action";
import { Profile, ProfileState } from "../lib/schema";

export default function ProfileForm({
  initial,
}: {
  initial: Partial<Profile>;
}) {
  const [state, formAction, isPending] = useActionState<
    ProfileState | undefined,
    FormData
  >(updateProfileAction, undefined);

  const err = state?.errors ?? {};
  const data = state?.data ?? initial;

  return (
   
        <form action={formAction} className="space-y-5" noValidate>
          <Input
            id="firstName"
            type="text"
            label="First name"
                 placeholder="Enter your first name"
            defaultValue={data.firstName || ""}
            error={err.firstName}
            required
          />
          <Input
            id="lastName"
            type="text"
            label="Last name"
            defaultValue={data.lastName ?? ""}
              placeholder="Enter your last name"
            error={err.lastName}
            required
          />

          <Input
            id="contactNumber"
            type="tel"
            label="Phone number"
            placeholder="Enter your contact number"
            defaultValue={data?.contactNumber ?? ""}
            error={err.contactNumber}
            required
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </Button>

          {state?.message && (
            <p
              className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}
            >
              {state.message}
            </p>
          )}
        </form>
    
  );
}
