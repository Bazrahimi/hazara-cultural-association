import { Img, Section } from "@react-email/components";
import { ORG_PROFILE } from "../../org/profile";
// app/_lib/email/components/EmailFooter.tsx

/**
 * Internal footer configuration
 * Only edit here – not passed from callers
 */


export default function EmailFooter() {
  

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
      {ORG_PROFILE.logoUrl && (
        <Img
          src={ORG_PROFILE.logoUrl}
          alt={`${ORG_PROFILE.orgName} logo`}
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
        <div style={{ fontWeight: 600 }}>{ORG_PROFILE.orgName}</div>

        {/* Farsi name (optional, RTL) */}
        {ORG_PROFILE.orgNameFarsi && (
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
            {ORG_PROFILE.orgNameFarsi}
          </div>
        )}

        <div>{ORG_PROFILE.address}</div>

        <div>
          Email:{" "}
          <a
            href={`mailto:${ORG_PROFILE.email}`}
            style={{ color: "#1d4ed8", textDecoration: "none" }}
          >
            {ORG_PROFILE.email}
          </a>
        </div>

        {ORG_PROFILE.contactNumber && <div>Phone: {ORG_PROFILE.contactNumber}</div>}

        <div>
          Website:{" "}
          <a
            href={ORG_PROFILE.website}
            style={{ color: "#1d4ed8", textDecoration: "none" }}
          >
            {ORG_PROFILE.website}
          </a>
        </div>
      </div>
    </Section>
  );
}
