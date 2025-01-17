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
      {/* Content */}
      <div className="z-0 w-full">{children}</div>

      {/* Navbar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center h-16 px-4 border-t border-gray-200 bg-white z-50">
        <a
          href="/en/mobile/map"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MapPinned className="w-6 h-6" />
        </a>

        {/* Elevated middle button */}
        <a
          href="/en/mobile/detect"
          className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 bg-black rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <ScanEye className="w-8 h-8 text-white  " />
        </a>

        <a
          href="/en/mobile/tasks"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RiTodoLine className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
