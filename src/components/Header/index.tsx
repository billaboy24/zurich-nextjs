"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../assets/images/zurich-logo-horizontal.svg";
import { doLogout } from "../../app/actions";

const Header: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await doLogout();
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-lg">
      <Image src={Logo} alt="Zurich Logo" width={240} height={30} />

      <button
        onClick={handleSignOut}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
