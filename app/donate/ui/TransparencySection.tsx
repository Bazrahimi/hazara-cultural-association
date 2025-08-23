// app/components/TransparencySection.tsx
export default function TransparencySection() {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
        Transparency & Impact
      </h2>

      <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
        <p>
          <strong>How your donation works:</strong> Every contribution directly
          funds HCA’s cultural programs, advocacy efforts, and community
          activities. We ensure that resources are used responsibly and
          effectively.
        </p>

        <p>
          <strong>Why this matters:</strong> Donations sustain our ability to
          advocate for the Hazara people, preserve our cultural identity, and
          support families across Melbourne and beyond.
        </p>

        <p>
          <strong>For the future:</strong> Your support helps empower the next
          generation of Hazara Australians, ensuring our heritage and voice are
          preserved for years to come.
        </p>
      </div>
    </section>
  );
}
