'use client';
import React from "react";
// import { useRouter } from "next/";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
const BreadCrumbs = ({ title, icon }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <div className="bg-accent hover:bg-black/5 p-2 border border-black/20 rounded-xl cursor-pointer" onClick={() => router.back()}>
        <ArrowLeft />
      </div>
      <div>{icon}</div>

      <h2 className="text-2xl font-bold text-textDark">{title}</h2>
    </div>
  );
};

export default BreadCrumbs;
