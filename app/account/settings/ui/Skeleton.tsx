// app/account/settings/ui/ProfileCardSkeleton.tsx
export function ProfileCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-56 bg-gray-200 rounded" />
        <div className="h-3 w-40 bg-gray-200 rounded" />
        <div className="h-3 w-44 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// app/account/settings/ui/AddressesCardSkeleton.tsx
export function AddressesCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="mt-4 space-y-3">
        <div className="h-16 w-full bg-gray-200 rounded" />
        <div className="h-16 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}