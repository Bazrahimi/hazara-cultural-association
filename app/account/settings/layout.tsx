// app/account/settings/layout.tsx
import type { ReactNode } from "react";

export default function Layout({
  children,
  modal, // parallel route slot
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal /* modal overlays on top when present */}
    </>
  );
}
