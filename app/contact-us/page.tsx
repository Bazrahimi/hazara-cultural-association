import ContactForm from "./ui/ContactForm";
import ContactHeader from "./ui/ContactHeader";

const ContactUsPage = () => {
  return (
    <>
      <ContactHeader
        title="Contact Hazara Cultural Association"
        blurb="We usually reply within 1–2 business days. Reach out about cultural programs, community events, volunteering, donations, or advocacy support."
        phone="0000 000 000"
        email="info@hazara.org.au"
        address="Melbourne, Victoria, Australia"
      />
      <ContactForm />
    </>
  );
};

export default ContactUsPage;
