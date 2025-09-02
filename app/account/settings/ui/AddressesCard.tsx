import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import { addressToLines } from "../lib/helper";
import { use } from "react";
import { AddressRecord } from "../lib/definitions";



export default function AddressesCard({
  addressesPromise,
}: {
  addressesPromise: Promise<AddressRecord[]>;
}) {
  const addresses = use(addressesPromise);
  const hasAny = addresses.length > 0;
  const hasDefault = addresses.some(a => a.is_default);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <Header as="h2" size="sm">Addresses</Header>
        <div className="flex gap-2">
          <Button as="link" href="/account/settings/addresses/new" variant="outline" size="sm">Add address</Button>
          <Button as="link" href="/account/settings/addresses" variant="outline" size="sm">Manage</Button>
        </div>
      </div>

      {!hasAny && <p className="mt-3 text-sm text-gray-600">You have no saved addresses yet.</p>}

      {hasAny && (
        <ul className="mt-4 divide-y divide-gray-200 rounded-md border border-gray-200">
          {addresses.map(a => {
            const lines = addressToLines(a);
            return (
              <li key={a.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-gray-900">{a.label || a.type.toUpperCase()}</p>
                    {a.is_default && (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">Default</span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    {lines.map((l, i) => <div key={i}>{l}</div>)}
                  </div>
                </div>
                <Button as="link" href={`/account/settings/addresses/${a.id}/edit`} variant="outline" size="sm">Edit</Button>
              </li>
            );
          })}
        </ul>
      )}

      {!hasDefault && hasAny && (
        <p className="mt-3 text-xs text-amber-700">Set a default address so checkout can be even faster.</p>
      )}
    </section>
  );
}
