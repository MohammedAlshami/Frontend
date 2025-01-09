"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
useEffect(() => {
    const timer = setTimeout(() => {
        router.push("/en/mobile/map");
    }, 2000);

    return () => clearTimeout(timer);
}, [router]);

  return <div className="bg-black h-screen flex items-center justify-center">
    <img src="/drangue_light_logo.svg" alt=""  className="w-64 h-64"/>
  </div>;
};

export default Page;
