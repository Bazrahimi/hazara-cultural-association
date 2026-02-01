// app/account/settings/profile/ProfileForm.tsx
"use client";

import { Button, Input } from "@/app/_ui";
import { useActionState } from "react";
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

  const data = state?.data ?? initial;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Input
          id="firstName"
          autoComplete="given-name"
          type="text"
          label="First name"
          placeholder="Enter your first name"
          defaultValue={data?.firstName || ""}
          error={state?.errors?.firstName}
          required
        />
        <Input
          id="lastName"
          autoComplete="family-name"
          type="text"
          label="Last name"
          defaultValue={data?.lastName ?? ""}
          placeholder="Enter your last name"
          error={state?.errors?.lastName}
          required
        />
      </div>

      <Input
        id="contactNumber"
        type="tel"
        label="Contact number"
        placeholder="Enter your contact number"
        defaultValue={data?.contactNumber ?? ""}
        error={state?.errors?.contactNumber}
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
