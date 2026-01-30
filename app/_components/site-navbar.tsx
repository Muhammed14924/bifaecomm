"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleUserIcon, Menu, Search, ShoppingCart, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { BifaLogo } from "./bifa-logo";
import clsx from "clsx";
import { KadriLogo } from "./kadri-logo";
import { BrandsDropdown } from "./brands-dropdown";
import ProductApis from "@/app/_utils/ProductApis";
const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "التصنيفات", isDropdown: true },
  { label: "منتجاتنا", href: "/products" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];
interface Category {
  id: string | number;
  name?: string; // fallback if data is flattened
  image?: {
    [0]: {
      url: string;
    };
  };
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await ProductApis.getCategory();
      console.log("categories", res.data.data);
      setCategory(res.data.data);
    };

    fetchCategories();
  }, []);

  return (
    <header className="fixed top-3 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={clsx(
            "flex items-center justify-between rounded-full transition-all duration-300",
            "px-6 py-3 backdrop-blur",
            scrolled
              ? "bg-[#f6f1ea]/85 shadow-xl scale-[0.95]"
              : "bg-[#f6f1ea] shadow-lg",
          )}
        >
          {/* LEFT (RTL) */}
          <KadriLogo />

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) =>
              item.isDropdown ? (
                <NavigationMenu key={index}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className="
                          bg-transparent hover:bg-transparent focus:bg-transparent 
                          text-sm font-medium text-neutral-800 hover:text-black 
                          transition p-0 h-auto
                        "
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-2 p-4 bg-[#f6f1ea] rounded-2xl shadow-xl">
                          {category.map((cat: Category) => (
                            <li key={cat.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/products?category=${cat?.name}`}
                                  className="
                                    flex items-center gap-3 p-3 rounded-xl
                                    hover:bg-white transition text-sm font-medium
                                  "
                                >
                                  {cat?.name}
                                  <Image
                                    src={cat?.image?.[0]?.url}
                                    alt={cat?.name}
                                    width={20}
                                    height={20}
                                  />
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className="
                    text-sm font-medium text-neutral-800
                    hover:text-black transition
                    relative after:absolute after:-bottom-1 after:right-0
                    after:h-[2px] after:w-0 after:bg-[#8a1818]
                    hover:after:w-full after:transition-all
                  "
                >
                  {item.label}
                </Link>
              ),
            )}
            {/* {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
          text-sm font-medium text-neutral-800
          hover:text-black transition
          relative after:absolute after:-bottom-1 after:right-0
          after:h-[2px] after:w-0 after:bg-[#8a1818]
          hover:after:w-full after:transition-all
        "
              >
                {item.label}
              </Link>
            ))} */}

            <CircleUserIcon className="m-auto size-7" />
            <div className="md:flex gap-3 items-center border rounded-full hidden">
              <Search />
              <input
                type="text"
                placeholder="بحث"
                className="bg-transparent pr-3 pl-0 py-2 rounded-full focus:outline-none"
              />
            </div>
            <div>
              <h2 className="flex gap-2 items-center border rounded-full p-2 bg-slate-200">
                <ShoppingCart className="m-auto size-6" />
                <span className="bg-[#8a1818] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {/* {totalCartItem} */}0
                </span>
              </h2>
            </div>
            <BrandsDropdown />
          </nav>

          {/* RIGHT */}
          <BifaLogo />

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mt-4 rounded-3xl bg-[#f6f1ea] shadow-lg p-6 lg:hidden">
            <nav className="flex flex-col gap-4 text-right">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <CircleUserIcon className="m-auto size-5" />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
