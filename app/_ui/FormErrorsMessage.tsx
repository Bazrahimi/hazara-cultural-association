"use client";

export const FormErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="mt-2 sm:mt-3 lg:mt-4 text-center sm:text-left"
    >
      <p className="text-xs sm:text-sm lg:text-base font-medium text-red-600 leading-snug">
        {message}
      </p>
    </div>
  );
};
