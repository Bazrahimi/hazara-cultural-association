// app/donate/page.tsx
import DonateForm from "./ui/DonateForm";
import TransparencySection from "./ui/TransparencySection";

export default function DonatePage() {
  return (
    <section className="space-y-10">
      {/* Note for HCA members */}
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
        <strong>Important Notice:</strong> Our donation system is currently in
        maintenance/testing mode. Please <u>do not enter real card details</u>{" "}
        or attempt to make actual donations at this time. This feature will be
        re-enabled once secure payment processing is fully live.
      </div>

      <DonateForm />
      <TransparencySection />
    </section>
  );
}
