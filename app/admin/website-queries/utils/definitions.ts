export type QuickEnquiryRecord = {
  id: number;
  fullName: string;
  email: string;
  contactNumber: string | null;
  queryType: string;
  message: string;
  received: string;
  seen: boolean;
};

// ✅ Remove `email`, `contactNumber`, and `message`
export type QuickEnquiryHead = Omit<
  QuickEnquiryRecord,
  "email" | "contactNumber" | "message"
>;
