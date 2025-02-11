'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Making two API calls concurrently
        await Promise.all([
          fetch(
            "https://duk8eezkki.execute-api.ap-southeast-1.amazonaws.com/main/v1/get-all",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                table: "farms",
              }),
            }
          ).catch((error) => console.error("Error in first API:", error)),

          fetch(
            "https://aqfrxqb3nqkjuauzsk2lnfifty0kgngl.lambda-url.ap-southeast-1.on.aws/"
          ).catch((error) => console.error("Error in second API:", error)),
        ]);
      } catch (error) {
        console.error("Unexpected error:", error);
      }

      // Redirect regardless of API response success or failure
      router.push("/en/crop/home");
    };

    fetchData();
  }, [router]);

  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
      <img
        src="/drangue_light_logo.svg"
        alt="Drangue Light Logo"
        className="w-1/2 h-auto max-w-[400px] object-contain"
      />
    </div>
  );
};

export default Page;
