"use client";

import { P } from "@/app/_ui";

const FormErrorsMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="mt-2 sm:mt-3 lg:mt-4 text-center sm:text-left"
    >
      <P className=" text-red-600 leading-snug">{message}</P>
    </div>
  );
};

export default FormErrorsMessage;
