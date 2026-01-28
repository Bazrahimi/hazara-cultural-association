// app/u/auth/_lib/email/templates/VerifyEmailCode.tsx
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
import EmailFooter from "../components/EmailFooter";

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
        {/* Force "light" rendering hints (best-effort; some clients still override) */}
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />

        {/* Avoid dark-mode overrides / auto-inversion where supported */}
        <style>
          {`
            html, body {
              background-color: #ffffff !important;
              color: #111827 !important;
            }

            table, td, div, p, a, span, h1, h2, h3, h4 {
              background-color: #ffffff !important;
              color: #111827 !important;
            }

            /* Helps in WebKit-based clients that try to recolor text in dark mode */
            * {
              -webkit-text-fill-color: currentColor !important;
            }

            .email-container {
              background-color: #ffffff !important;
              color: #111827 !important;
            }

            .email-code-box {
              background-color: #f9fafb !important;
              border-color: #e5e7eb !important;
              color: #111827 !important;
            }

            .email-footer {
              border-top-color: #e5e7eb !important;
              background-color: #ffffff !important;
              color: #111827 !important;
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
          color: "#111827",
        }}
      >
        <Container
          className="email-container"
          style={{
            margin: "24px auto",
            padding: "16px",
            maxWidth: "640px",
            backgroundColor: "#ffffff",
            color: "#111827",
          }}
        >
          <Section style={{ backgroundColor: "#ffffff", color: "#111827" }}>
            <Heading
              as="h2"
              style={{
                fontSize: "22px",
                marginBottom: "12px",
                color: "#111827",
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

            {/* Persian/Dari (RTL) */}
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
                backgroundColor: "#f9fafb",
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
                color: "#6b7280",
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

          {/* Footer */}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
