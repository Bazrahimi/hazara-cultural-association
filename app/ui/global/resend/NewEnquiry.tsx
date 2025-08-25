import { QuickEnquiry } from "@/app/lib/definitions";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const NewEnquiry = (args: QuickEnquiry) => {
  return (
    <Html>
      <Head />
      <Preview>New Website Enquiry from {args?.fullName}</Preview>
      <Body
        style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{ margin: "24px auto", padding: "16px", maxWidth: "640px" }}
        >
          <Section>
            <Heading as="h2">New Quick Enquiry Received</Heading>
            <Hr />
            <Text>
              <strong>Name:</strong> {args.fullName}
            </Text>
            <Text>
              <strong>Email:</strong> {args.email}
            </Text>
            <Text>
              <strong>Phone:</strong> {args.contactNumber}
            </Text>
            {args.qMessage && (
              <>
                <Hr />
                <Text style={{ whiteSpace: "pre-wrap" }}>{args.qMessage}</Text>
              </>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewEnquiry;
