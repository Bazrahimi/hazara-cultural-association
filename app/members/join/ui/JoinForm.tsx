// app/members/join/page.tsx

import { Button, Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { SelectInput } from "@/app/ui/global/SelectInput";
import Involvement from "./Involvement";

const STATES = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"] as const;
const AGE_RANGES = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55+",
] as const;

const PROFICIENCY_LEVELS = [
  "None",
  "Basic",
  "Conversational",
  "Fluent",
  "Native / Near-native",
] as const;

const JoinForm = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
                id="country"
                label="Country of current residence"
                type="text"
                value="AU"
                // assuming your Input component forwards this
                readOnly
              />

              <SelectInput id="stateCode" label="State" options={STATES} />

              <Input
                id="postCode"
                label="Post Code"
                type="number"
                placeholder="Enter your your post code"
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
              {/* spacer columns if you want later extra fields */}
              <div className="hidden md:block" />
              <div className="hidden md:block" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SelectInput
              id="ageRange"
              label="Age Range"
              options={AGE_RANGES}
              placeholder="Select age range"
            />
            <SelectInput
              id="englishProficiency"
              label="English proficiency"
              options={PROFICIENCY_LEVELS}
              placeholder="Select Level"
            />
            <SelectInput
              id="farsiHazaragiProficiency"
              label="Farsi / Hazaragi proficiency"
              options={PROFICIENCY_LEVELS}
              placeholder="Select level"
            />
          </div>

          {/* Involvement & online presence */}
          <div className="space-y-3">
            <Header as="h2" size="md">
              How would you like to be involved?
            </Header>

            <p className="text-sm text-gray-700">
              HCA has a blog and a modern online marketplace to share news,
              amplify the voices of those who are often silenced, and help the
              community find culturally relevant services, products, and
              stories.
            </p>

            <Involvement />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button>Submit membership</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default JoinForm;
