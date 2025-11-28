// app/members/join/page.tsx

import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import clsx from "clsx";

const STATES = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"] as const;

const JoinForm = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <Header as="h1" size="lg" className="text-gray-900">
          HCA Membership Registration
        </Header>

        <P size="sm" className="text-gray-700">
          Membership is open to people currently residing in Australia. A minimum
          fee of <strong>$10/year</strong> applies to all members, including the
          executive team. If you are unable to pay at this time, you can request
          a fee waiver below.
        </P>

        <form action="" noValidate className="space-y-8">
          {/* Personal Detail */}
          <div className="space-y-4">
            <Header as="h2" size="md">
              Personal details
            </Header>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="firstName"
                label="First name"
                placeholder="Enter your first name"
                type="text"
                required
              />
              <Input
                id="lastName"
                label="Last name"
                placeholder="Enter your last name"
                type="text"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                id="phone"
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                required
              />

              <Input
                id="country"
                label="Country of current residence"
                type="text"
                value="AU"
                // assuming your Input component forwards this
                readOnly
              />

              <div>
                <label
                  htmlFor="stateCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <select
                  name="stateCode"
                  id="stateCode"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-200",
                    "py-2 pr-10 text-sm sm:text-base outline-1 placeholder:text-gray-500 placeholder:text-xs",
                    "focus:border-hca-blue-main focus:ring-2 focus:ring-blue-100"
                  )}
                  defaultValue=""
                >
                  <option value="">Select</option>
                  {STATES.map((code) => (
                    <option value={code} key={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                id="suburb"
                type="text"
                label="Suburb"
                placeholder="Enter your suburb"
                required
              />
              {/* spacer columns if you want later extra fields */}
              <div className="hidden md:block" />
              <div className="hidden md:block" />
            </div>
          </div>

          {/* Membership fee + tier */}
          <div className="space-y-4">
            <Header as="h2" size="md">
              Membership fee & tier
            </Header>
            <P size="sm">
              Standard membership starts at <strong>$10/year</strong>. If you
              would like to support HCA further, you can choose a higher tier.
              Fees apply to all members, including the executive team. If you
              are unable to pay at this time, you can request a fee waiver.
            </P>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="tier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Membership tier
                </label>
                <select
                  name="tier"
                  id="tier"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-200",
                    "py-2 pr-10 text-sm sm:text-base outline-1 placeholder:text-gray-500 placeholder:text-xs",
                    "focus:border-hca-blue-main focus:ring-2 focus:ring-blue-100"
                  )}
                  defaultValue="standard"
                >
                  <option value="standard">Standard ($10+)</option>
                  <option value="supporter">Supporter ($25+)</option>
                  <option value="patron">Patron ($50+)</option>
                </select>
              </div>

              <div>
                <Input
                  id="feeAmount"
                  label="Annual fee amount (AUD)"
                  type="number"
                  placeholder="10"
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-700">
                Fee waiver (special circumstances)
              </p>

              <div className="flex flex-wrap gap-4 text-xs">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="requestWaiver"
                    value="no"
                    defaultChecked
                    className="h-3 w-3"
                  />
                  No, I can pay the annual fee.
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="requestWaiver"
                    value="yes"
                    className="h-3 w-3"
                  />
                  Yes, I would like to request a waiver.
                </label>
              </div>

              <textarea
                name="waiverReason"
                rows={3}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-xs"
                placeholder="If requesting a waiver, please briefly explain your circumstances."
              />
            </div>
          </div>

          {/* Awareness question */}
          <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <Header as="h2" size="sm">
              Awareness of Hazara history & persecution
            </Header>
            <P size="xs">
              This helps us understand how familiar our members are with Hazara
              history and the persecution of the last 134 years. There are no
              right or wrong answers – we use this to plan education and
              awareness programs.
            </P>

            <div className="mt-2 flex flex-wrap gap-4 text-xs">
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="awarenessLevel"
                  value="strong"
                  className="h-3 w-3"
                />
                Strong awareness
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="awarenessLevel"
                  value="good"
                  className="h-3 w-3"
                />
                Good awareness
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="awarenessLevel"
                  value="some"
                  className="h-3 w-3"
                />
                Some awareness
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="awarenessLevel"
                  value="low"
                  className="h-3 w-3"
                />
                Low awareness
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Submit membership
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default JoinForm;
