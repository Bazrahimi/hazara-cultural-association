import { Header, P } from "@/app/_ui";
import { MembershipOption } from "../../../_lib/definitions";
type MembershipOptionCardProps = {
  opt: MembershipOption;
  name: string;
  defaultChecked?: boolean;
};

const MembershipOptionCard = ({
  opt,
  name,
  defaultChecked,
}: MembershipOptionCardProps) => {
  return (
    <label className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/30">
      <div className="flex items-start gap-4">
        <input
          type="radio"
          name={name}
          value={opt.id}
          defaultChecked={defaultChecked}
          className="mt-1 h-4 w-4 accent-blue-600"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Header as="h2" size="sm" className="text-gray-900">
              {opt.label}
            </Header>
            <div className="rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-900 group-has-[:checked]:bg-blue-400 group-has-[:checked]:text-blue-700">
              <P className="text-center rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-900 group-has-[:checked]:bg-blue-300 ">
                {opt.priceLabel}
              </P>
            </div>
          </div>

          <P className="text-sm text-gray-700">{opt.helper}</P>
        </div>
      </div>
    </label>
  );
};

export default MembershipOptionCard;
