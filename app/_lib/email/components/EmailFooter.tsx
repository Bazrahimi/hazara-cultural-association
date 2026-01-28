import { Img, Section } from "@react-email/components";
// app/_lib/email/components/EmailFooter.tsx

/**
 * Internal footer configuration
 * Only edit here – not passed from callers
 */
const EMAIL_FOOTER = {
  orgName: "Hazara Cultural Association (HCA)",
  orgNameFarsi: "انجمن فرهنگی هزاره", // optional
  email: "info@hazara.org.au",
  website: "https://hazara.org.au",
  location: "Melbourne, Victoria, Australia",
  logoUrl:
    "https://res.cloudinary.com/drvh5xeuw/image/upload/c_thumb,w_200,g_face/v1763895306/hca/website/hca-logo_i4xgc6.png",
  contactNumber: undefined as string | undefined, // optional
};

export default function EmailFooter() {
  const {
    orgName,
    orgNameFarsi,
    email,
    website,
    location,
    logoUrl,
    contactNumber,
  } = EMAIL_FOOTER;

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
      {/* Logo (optional) */}
      {logoUrl && (
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
      )}

      {/* Text block */}
      <div
        style={{
          fontSize: "12px",
          color: "#4b5563",
          lineHeight: 1.6,
        }}
      >
        {/* Org name */}
        <div style={{ fontWeight: 600 }}>{orgName}</div>

        {/* Farsi name (optional, RTL) */}
        {orgNameFarsi && (
          <div
            style={{
              fontSize: "11px",
              color: "#6b7280",
              marginBottom: "4px",
              direction: "rtl",
              textAlign: "right",
              unicodeBidi: "bidi-override",
            }}
          >
            {orgNameFarsi}
          </div>
        )}

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

        {contactNumber && <div>Phone: {contactNumber}</div>}

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
