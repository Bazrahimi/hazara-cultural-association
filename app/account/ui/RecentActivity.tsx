import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import Link from "next/link";
import { P } from "@/app/ui/global/paragraph";

const RecentActivity = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <Header as="h2">Recent Activity</Header>

        <Button as="link" href="/shop/purchases" variant="outline" size="sm">
        View all

        </Button>



      </div>
      <P className="mt-2 text-sm text-gray-500">
        You don’t have any recent activity yet. Once you buy or list cultural
        items, they’ll appear here.
      </P>
    </div>
  );
};

export default RecentActivity;
