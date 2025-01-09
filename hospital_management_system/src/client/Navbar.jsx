import React, { useState, useEffect } from "react";

import { useGuestAuth } from "../context/auth/GuestAuthContext";
import { NavbarContent } from "./components/navbar/NavbarContent";
import { MobileMenu } from "./components/navbar/MobileMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, logout } = useGuestAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <NavbarContent
        isAuthenticated={isAuthenticated}
        logout={logout}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
      />

      {menuOpen && (
        <MobileMenu logout={logout} isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
};

export default Navbar;
