import React from "react";
import { MapPinned, ScanEye } from "lucide-react";
import { RiTodoLine } from "@remixicon/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full" suppressHydrationWarning={true}>
      <div className="z-0 w-full">{children}</div>
    </div>
  );
}
