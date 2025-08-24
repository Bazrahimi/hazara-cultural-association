"use client";
import { Header, P } from "@/app/ui/global/components";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

type HeaderProps = {
  title?: string;
  blurb?: string;
  phone?: string;
  email?: string;
  address?: string;
};

export default function ContactHeader({
  title,
  blurb,
  phone,
  email,
  address,
}: HeaderProps) {
  return (
    <>
      {/* Header / blurb */}
      <div className="flex items-start gap-3">
        <div>
          <Header align="center" as="h2">
            {title}
          </Header>
          <P className="mt-1 text-gray-700">{blurb}</P>
        </div>
      </div>

      {/* Quick org details */}
      <div className="grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-800 sm:grid-cols-2 mt-3">
        <P size="sm" className="flex items-center gap-2">
          <MdPhone className="text-gray-600" aria-hidden />{" "}
          <span>Phone: {phone}</span>
        </P>
        <P size="sm" className="flex items-center gap-2">
          <MdEmail className="text-gray-600" aria-hidden />{" "}
          <span>Email: {email}</span>
        </P>
        <P
          size="sm"
          className="col-span-1 flex items-center gap-2 sm:col-span-2"
        >
          <MdLocationOn className="text-gray-600" aria-hidden />{" "}
          <span>{address}</span>
        </P>
      </div>
    </>
  );
}
