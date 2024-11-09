import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/navbar";

const HomePage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return <Navbar />;
};

export default HomePage;
