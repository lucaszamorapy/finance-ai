"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="flex justify-between px-8 py-4 border-b border-solid">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <Link
          className={
            pathName === "/"
              ? "text-primary font-bold"
              : "text-muted-foreground"
          }
          href={"/"}
        >
          Dashboard
        </Link>
        <Link
          className={
            pathName === "/transactions"
              ? "text-primary font-bold"
              : "text-muted-foreground"
          }
          href={"/transactions"}
        >
          Transações
        </Link>
        <Link
          className={
            pathName === "/subscription"
              ? "text-primary font-bold"
              : "text-muted-foreground"
          }
          href={"/subscription"}
        >
          Assinaturas
        </Link>
      </div>
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
