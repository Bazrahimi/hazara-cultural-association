export default function AccountDashboardLoading() {
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-5 w-40 bg-gray-200 rounded" />

      {/* Role banner */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
        <div className="h-6 w-48 bg-blue-200/60 rounded mb-3" />
        <div className="h-4 w-3/4 bg-blue-100/70 rounded" />
      </div>

      {/* Quick Actions header */}
      <div className="h-6 w-32 bg-gray-200 rounded" />

      {/* Quick Actions grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4"
          >
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-100 rounded" />

            <div className="space-y-3 pt-2">
              <div className="h-12 bg-gray-100 rounded-md" />
              <div className="h-12 bg-gray-100 rounded-md" />
              <div className="h-12 bg-gray-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-36 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="h-4 w-1/2 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
