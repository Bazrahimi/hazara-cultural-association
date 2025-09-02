// app/account/settings/profile/ProfileForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { Button, Input } from "@/app/ui/global/components";
import { Profile, ProfileState, updateProfileAction } from "./action";

export default function ProfileForm({
  initial,
}: {
  initial: Partial<Profile>;
}) {
  const [state, formAction, isPending] = useActionState<
    ProfileState | undefined,
    FormData
  >(updateProfileAction, undefined);
  const router = useRouter();

  const err = state?.errors ?? {};
  const data = state?.data ?? initial;

  useEffect(() => {
    if (state?.ok) router.back();
  }, [state?.ok, router]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="firstName"
          type="text"
          label="First name"
          defaultValue={data.firstName ?? ""}
          error={err.firstName}
          required
        />
        <Input
          id="lastName"
          type="text"
          label="Last name"
          defaultValue={data.lastName ?? ""}
          error={err.lastName}
          required
        />
      </div>

      <Input
        id="contactNumber"
        type="tel"
        label="Phone number"
        placeholder="Enter your contact number"
        defaultValue={data.contactNumber ?? ""}
        error={err.contactNumber}
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
