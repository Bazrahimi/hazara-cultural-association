import ContactForm from "./ui/ContactForm";
import ContactHeader from "./ui/ContactHeader";

const ContactUsPage = () => {
  return (
    <main
      className={`
        min-h-screen
        bg-[linear-gradient(
          to_bottom,
          theme(colors.blue.600) 0%,
          theme(colors.blue.600) 32%,
          white 32%,
          white 72%,
          theme(colors.yellow.500) 72%,
          theme(colors.yellow.500) 100%
        )]
      `}
    >
      {/* subtle overlay to keep content readable on bright bg */}
      <div className="min-h-screen bg-white/60 backdrop-blur-[1px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left column — intro & org info */}
            <section className="lg:col-span-7">
              <div className="rounded-2xl border border-white/70 bg-white/80 shadow-sm backdrop-blur p-6 sm:p-8">
                <ContactHeader
                  title="Contact Hazara Cultural Association"
                  blurb="We usually reply within 1–2 business days. Reach out about cultural programs, community events, volunteering, donations, or advocacy support."
                  phone="0000 000 000"
                  email="info@hazara.org.au"
                  address="Melbourne, Victoria, Australia"
                />
              </div>
            </section>

            {/* Right column — form card */}
            <aside className="lg:col-span-5">
              <div className="sticky top-6">
                {/* If your ContactForm already renders a card, leave as-is.
                    Otherwise you can wrap it in a card like below: */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 sm:p-7">
                  <ContactForm />
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;
