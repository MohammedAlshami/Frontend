"use client";
import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import { serialize } from "cookie";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      sessionStorage.setItem("userSession", JSON.stringify(data));

      // Navigate to home page or another page on successful login
      window.location.href = "/en/crop";
    }
  };

  return (
    <div>
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/loginbg.svg')" }}
      >
        <div className="flex flex-col gap-4 items-center justify-center h-[40rem]">
          <img src="/DRANGUE_Logo.png" alt="" className="w-96" />
          <h2 className="text-5xl text-teal-500 font-bold">Login</h2>
          <div className="w-full max-w-lg flex flex-col gap-4 px-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-2 border-teal-500 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-2 border-teal-500 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
              onClick={handleLogin}
              className="w-full bg-teal-500 text-white p-2 rounded-lg flex justify-center items-center font-bold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
