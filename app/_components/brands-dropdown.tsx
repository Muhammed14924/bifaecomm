"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const brands = [
  {
    name: "ETİ",
    href: "/brands/eti",
    logo: "/brands/eti.png",
  },
  {
    name: "Bifa",
    href: "/brands/bifa",
    logo: "/brands/bifa.png",
  },
  {
    name: "Ülker",
    href: "/brands/ulker",
    logo: "/brands/ulker.png",
  },
  {
    name: "Kadri Group",
    href: "/brands/kadri",
    logo: "/brands/kadri.png",
  },
];

export function BrandsDropdown() {
  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="
              bg-transparent
              text-sm font-medium
              hover:bg-transparent
              focus:bg-transparent
            "
          >
            Markalarımız
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div
              className="
                w-[420px]
                p-4
                bg-[#f6f1ea]
                rounded-2xl
                shadow-xl
              "
            >
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="
                      flex items-center gap-3
                      p-3 rounded-xl
                      hover:bg-white
                      transition
                    "
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <span className="text-sm font-medium">{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
