"use client";

import { Button, Input } from "@/app/ui/global/components";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { deleteAddressAction, saveAddressAction } from "./actions";
import { AddressInput } from "./definitions";
import { AddressState } from "./definitions";

export default function AddressForm({
  initial,
  mode, // "create" | "edit"
}: {
  initial: Partial<AddressInput>;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    AddressState | undefined,
    FormData
  >(saveAddressAction, undefined);

  // Close modal on success
  useEffect(() => {
    if (state?.ok) router.back();
  }, [state?.ok, router]);

  const err = state?.errors ?? {};
  const data = state?.data ?? initial;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* id for edit */}
      {mode === "edit" && data.id && (
        <input type="hidden" name="id" value={String(data.id)} />
      )}

      <Input
        id="label"
        label="Label (optional)"
        type="text"
        defaultValue={data.label ?? ""}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium">Type</span>
          <select
            name="type"
            defaultValue={data.type ?? "shipping"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="shipping">Shipping</option>
            <option value="billing">Billing</option>
          </select>
        </label>

        <label className="flex items-end gap-2 text-sm">
          <input
            type="checkbox"
            name="isDefault"
            defaultChecked={!!data.isDefault}
            className="h-4 w-4"
          />
          <span>Set as default</span>
        </label>
      </div>

      <Input
        id="address"
        type="text"
        label="Address line 1"
        defaultValue={data.address ?? ""}
        error={err.address}
        required
      />
      <Input
        id="address2"
        type="text"
        label="Address line 2 (optional)"
        defaultValue={data.address2 ?? ""}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          id="suburb"
          type="text"
          label="Suburb"
          defaultValue={data.suburb ?? ""}
          error={err.suburb}
          required
        />
        <Input
          id="stateCode"
          type="text"
          label="State code"
          placeholder="VIC"
          defaultValue={data.stateCode ?? ""}
          error={err.stateCode}
          required
        />
        <Input
          id="postcode"
          type="text"
          label="Postcode"
          defaultValue={data.postcode ?? ""}
          error={err.postcode}
          required
        />
      </div>

      <Input id="country" type="text" label="Country" defaultValue={data.country ?? "AU"} />

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : mode === "edit"
              ? "Save changes"
              : "Add address"}
        </Button>

        {mode === "edit" && data.id ? (
          <form action={deleteAddressAction}>
            <input type="hidden" name="id" value={String(data.id)} />
            <Button type="submit" variant="outline">
              Delete
            </Button>
          </form>
        ) : null}
      </div>

      {!state?.ok && state?.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}
