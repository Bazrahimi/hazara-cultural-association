import { MemberRoutes, PublicRoutes } from "@/app/_lib/routes";
import { Button, Header, P } from "@/app/_ui";

const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string; waiver?: string }>;
}) => {
  const params = await searchParams;
  const isWaived = params?.waiver === "1";
  return (
    <main>
      <Header as="h1" size="lg" align="center">
        {isWaived ? "Membership Submitted" : "Payment Successful"}
      </Header>

      {isWaived ? (
        <P>
          Your membership fee has been <strong>waived</strong>.
          <br />
          Your application has been submitted and is pending review.
        </P>
      ) : (
        <>
          <P>Thank you for completing your membership payment.</P>
          <P>
            Your subscription is now active and supports the work of the Hazara
            Cultural Association.
          </P>
        </>
      )}

      <div className="pt-6 space-y-3">
        <Button as="link" href={MemberRoutes.root()}>
          Go to Members Area
        </Button>

        <div>
          <Button
            as="link"
            href={PublicRoutes.home()}
            className="text-sm text-gray-600 underline"
          >
            Return to homepage
          </Button>
        </div>
      </div>

      {/* Optional */}
      {params?.session_id && (
        <p className="pt-8 text-xs text-gray-400">
          Reference: {params.session_id}
        </p>
      )}
    </main>
  );
};

export default page;
