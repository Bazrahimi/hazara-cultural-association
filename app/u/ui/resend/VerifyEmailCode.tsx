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

export default function VerifyEmailCode({
  fullName,
  code,
}: {
  fullName?: string;
  code: string; // 6-digit
}) {
  return (
    <Html>
      <Head />
      <Preview>Your verification code</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ margin: "24px auto", padding: "16px", maxWidth: "640px" }}>
          <Section>
            <Heading as="h2">Verify your email</Heading>
            <Text>Hi {fullName || "there"},</Text>
            <Text>
              Use the 6-digit code below to confirm your email address. It expires in 10 minutes.
            </Text>
            <Section
              style={{
                display: "inline-block",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#f9fafb",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.2em",
              }}
            >
              {code}
            </Section>
            <Hr />
            <Text style={{ color: "#6b7280", fontSize: "12px" }}>
              If you didn’t request this, you can ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
