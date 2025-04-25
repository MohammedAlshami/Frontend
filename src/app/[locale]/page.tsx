"use client";
import React, { useEffect, useState } from "react";

import CropPage from "@/components/Landing/CropPage";
import MainPage from "@/components/Landing/MainPage";

function Page({ lang }: { lang: any }) {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname; // e.g., sub.example.com
    const parts = hostname.split(".");

    // Assuming the structure is subdomain.domain.tld
    if (parts.length > 2) {
      setSubdomain(parts[0]); // First part is the subdomain
    } else {
      setSubdomain("main"); // No subdomain found
    }
  }, []); // Missing dependency array added to run only once

  return (
    <>
      {(subdomain === "main" || subdomain === "www") && <MainPage />}
      {subdomain !== "main" && subdomain && <CropPage subdomain={subdomain} />}
    </>
  );
}

export default Page;
