//app/u/auth/ui/resend/EmailFooter.txt
import { Img, Section } from "@react-email/components";

type EmailFooterProps = {
  logoUrl?: string;
  orgName?: string;
  orgNameFarsi?: string;
  email?: string;
  website?: string;
  location?: string;
};

export default function EmailFooter({
  logoUrl = "https://res.cloudinary.com/drvh5xeuw/image/upload/c_thumb,w_200,g_face/v1763895306/hca/website/hca-logo_i4xgc6.png",
  orgName = "Hazara Cultural Association (HCA)",
  orgNameFarsi = "انجمن فرهنگی هزاره",
  email = "info@hazara.org.au",
  website = "https://hazara.org.au",
  location = "Melbourne, Victoria, Australia",
}: EmailFooterProps) {
  return (
    <Section
      className="email-footer"
      style={{
        borderTop: "1px solid #e5e7eb",
        marginTop: "24px",
        paddingTop: "16px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <Img
        src={logoUrl}
        alt={`${orgName} logo`}
        width={48}
        height={48}
        style={{
          borderRadius: "9999px",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Text Block */}
      <div
        style={{
          fontSize: "12px",
          color: "#4b5563",
          lineHeight: 1.6,
        }}
      >
        {/* English Name */}
        <div style={{ fontWeight: 600 }}>{orgName}</div>

        {/* Persian Transliteration */}
        <div
          style={{
            fontSize: "11px",
            color: "#6b7280",
            marginBottom: "4px",
            direction: "rtl", // ensures right-to-left flow
            textAlign: "right", // aligns the text naturally for RTL
            unicodeBidi: "bidi-override", // forces correct bidi rendering in email clients
          }}
        >
          {orgNameFarsi}
        </div>

        <div>{location}</div>

        <div>
          Email:{" "}
          <a
            href={`mailto:${email}`}
            style={{ color: "#1d4ed8", textDecoration: "none" }}
          >
            {email}
          </a>
        </div>

        <div>
          Website:{" "}
          <a
            href={website}
            style={{ color: "#1d4ed8", textDecoration: "none" }}
          >
            {website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>
    </Section>
  );
}
