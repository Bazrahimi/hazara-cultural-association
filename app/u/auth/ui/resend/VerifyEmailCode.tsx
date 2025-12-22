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
import EmailFooter from "./EmailFooter";

export default function VerifyEmailCode({
  fullName,
  code,
}: {
  fullName?: string;
  code: string; // 6-digit
}) {
  return (
    <Html>
      <Head>
        {/* Hint to some clients how to treat colors */}
        <style>
          {`
            :root {
              color-scheme: light;
              supported-color-schemes: light;
            }

            /* Extra safety for clients that respect prefers-color-scheme */
            @media (prefers-color-scheme: dark) {
              body {
                background-color: #020617 !important; /* slate-950 */
                color: #e5e7eb !important;           /* slate-200 */
              }

              .email-container {
                background-color: #020617 !important;
                color: #e5e7eb !important;
              }

              .email-code-box {
                background-color: #0f172a !important; /* slate-900 */
                border-color: #1f2937 !important;      /* slate-800 */
                color: #f9fafb !important;             /* slate-50 */
              }

              .email-footer {
                border-top-color: #1f2937 !important;
              }
            }
          `}
        </style>
      </Head>

      <Preview>Your verification code</Preview>

      <Body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          className="email-container"
          style={{
            margin: "24px auto",
            padding: "16px",
            maxWidth: "640px",
            backgroundColor: "#ffffff",
          }}
        >
          <Section>
            <Heading
              as="h2"
              style={{
                fontSize: "22px",
                marginBottom: "12px",
                color: "#111827", // slate-900
              }}
            >
              Verify your email
            </Heading>

            <Text
              style={{
                fontSize: "14px",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Hi {fullName || "there"},
            </Text>

            <Text
              style={{
                fontSize: "14px",
                color: "#111827",
                marginBottom: "12px",
                lineHeight: "1.5",
              }}
            >
              Use the 6-digit code below to confirm your email address. It
              expires in 10 minutes.
            </Text>

            {/* Farsi / Persian translation (RTL) */}
            <Text
              style={{
                fontSize: "14px",
                color: "#111827",
                marginBottom: "12px",
                lineHeight: "1.8",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              لطفاً از کد شش‌رقمی زیر برای تأیید نشانی ایمیل خود استفاده کنید.
              این کد تا ۱۰ دقیقه آینده اعتبار دارد.
            </Text>

            <Section
              className="email-code-box"
              style={{
                display: "inline-block",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#f9fafb",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              {code}
            </Section>

            <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

            <Text
              style={{
                color: "#6b7280", // slate-500
                fontSize: "12px",
                marginBottom: "6px",
              }}
            >
              If you didn’t request this, you can ignore this email.
            </Text>

            <Text
              style={{
                color: "#6b7280",
                fontSize: "12px",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              اگر شما این درخواست را ثبت نکرده‌اید، می‌توانید این ایمیل را
              نادیده بگیرید.
            </Text>
          </Section>

          {/* Footer with logo + contact details */}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
