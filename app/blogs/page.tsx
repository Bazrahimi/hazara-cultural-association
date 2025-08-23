// app/blogs/page.tsx

export default function BlogsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* Page Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl">
          Blogs & Events
        </h1>
        <p className="mt-2 text-gray-700">
          Articles, news, and upcoming events from the Hazara Cultural
          Association.
        </p>
      </header>

      {/* TODO Note */}
      <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
        <strong>Note:</strong> This page is a placeholder. In the future, it
        will be managed from the admin site so it’s easy to post new articles or
        events, as well as edit or delete them.
      </div>

      {/* Demo list of posts */}
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Hazara Genocide Memorial 2025",
            excerpt:
              "A solemn gathering in Melbourne to honour the victims of the Hazara genocide and to stand in solidarity for justice and recognition.",
            date: "27 September, 2025",
          },
          {
            title:
              "HCA Meeting with Australian Senators to Advocate for Official Recognition of the Hazara Genocide",
            excerpt:
              "Leaders of the Hazara Cultural Association recently met with Australian senators to call for official recognition of the Hazara genocide, highlighting decades of persecution and the urgent need for justice.",
            date: "16 August, 2025",
          },
          {
            title: "Thousands of Hazara Refugees in Limbo in Indonesia",
            excerpt:
              "For over a decade, thousands of Hazara refugees have been stranded in Indonesia, living in uncertainty and waiting for resettlement.",
            date: "20 August, 2025",
          },
          {
            title: "Article: The Rich History of Hazaristan",
            excerpt:
              "Exploring thousands of years of Hazara culture and the importance of preserving our heritage.",
            date: "5 June, 2025",
          },
        ].map((post) => (
          <article
            key={post.title}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>
            <p className="mt-3 text-xs text-gray-500">📅 {post.date}</p>
            <button className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline">
              Read More →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
