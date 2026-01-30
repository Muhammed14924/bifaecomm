"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartContext } from "../_context/CartContext";
import { SiteNavbar } from "./site-navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = usePathname();
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? false : true;
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <CartContext.Provider value={{ updateCart, setUpdateCart }}>
      {/* {showHeader && <Header />} */}
      {showHeader && <SiteNavbar />}

      <main className="pt-20">{children}</main>
      <Toaster />
      <Footer />
    </CartContext.Provider>
  );
}
