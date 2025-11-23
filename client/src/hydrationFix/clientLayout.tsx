"use client";

import { HydrationFix } from "./hydration";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HydrationFix />
      {children}
    </>
  );
}
