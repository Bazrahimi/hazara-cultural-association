export const QUERY_OPTIONS: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string> = {
  1: "Donations & Support",
  2: "Volunteering",
  3: "Cultural Programs & Classes",
  4: "Events & Community Gatherings",
  5: "Family Assistance / Community Support",
  6: "Advocacy & Media Enquiries",
  7: "Other",
};

export const ENQUIRY_FIELDS = {
  fullName: "fullName",
  email: "email",
  contactNumber: "contactNumber",
  queryType: "queryType",
  qMessage: "qMessage",
} as const;
