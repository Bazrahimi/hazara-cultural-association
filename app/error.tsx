// app/error.tsx
"use client";

import { useEffect } from "react";

import { Button } from "./ui/global/components";
import { Header } from "./ui/global/Header";
import { P } from "./ui/global/paragraph";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Optional: log to console or monitoring service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <Header as="h2">Something went wrong</Header>

      <P>We couldn’t load this page right now. Please try again in a moment.</P>

      <Button variant="outline" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
