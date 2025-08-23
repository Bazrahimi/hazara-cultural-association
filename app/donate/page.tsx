// app/donate/page.tsx
import DonateForm from "./ui/DonateForm";
import TransparencySection from "./ui/TransparencySection";

export default function DonatePage() {
  return (
    <section className="space-y-10">
      {/* Note for HCA members */}
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Note for HCA members:</strong> This page must prioritise
        transparency and compliance with Australian nonprofit regulations.
        Ensure clear reporting of donation use, legal accuracy, and community
        accountability.
      </div>

      <DonateForm />
      <TransparencySection />
    </section>
  );
}
