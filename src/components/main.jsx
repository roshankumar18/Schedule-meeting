"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { SignOutButton, auth, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
const Main = () => {
  useEffect(() => {
    try {
      axios.post("/api/user");
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="flex  justify-center">
        <Link href="/availability">
          <button className="bg-blue-400 p-4 w-52 hover:bg-blue-600">
            Set Availabilty
          </button>
        </Link>
      </div>
      <div className="flex  justify-center mt-3">
        <Link href="/schedule">
          <button className="bg-blue-400 p-4 w-52 hover:bg-blue-600">
            Schedule Meeting
          </button>
        </Link>
      </div>
      <div className="mt-3">
        <SignOutButton>
          <button className="bg-blue-400 p-4 w-52 hover:bg-blue-600">
            Logout
          </button>
        </SignOutButton>
      </div>
    </>
  );
};

export default Main;
