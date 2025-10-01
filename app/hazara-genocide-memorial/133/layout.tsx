import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "133rd Hazara Genocide Memorial — Event Report | HCA",
  description:
    "Event recap of HCA’s 133rd Hazara Genocide Memorial at Drum Theatre, Dandenong. Full house (360 seats), exhibition, speakers, and photos.",
  openGraph: {
    title: "133rd Hazara Genocide Memorial — Event Report | HCA",
    description:
      "Full-house memorial at Drum Theatre, Dandenong with exhibition and keynote speakers.",
    type: "article",
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
