"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CircleUserIcon, Menu, MoveRight, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const { user } = useUser();
  const path = usePathname();

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Explore",
      href: "/explore",
      description: "",
    },
    {
      title: "Projects",
      href: "/projects",
      description: "",
    },
    {
      title: "About Us",
      href: "/about",
      description: "",
    },
    {
      title: "Contact Us",
      href: "/contact",
      description: "",
    },
  ];

  const [isOpen, setOpen] = useState(false);

  // Hide header on sign-in and sign-up pages
  if (path.includes("sign-in") || path.includes("sign-up")) {
    return null;
  }

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background border-b shadow-md">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink>
                        <Button variant="ghost">{item.title}</Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button size="sm" className="mt-10">
                              Book a call today
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center justify-center relative h-20">
          {/* <p className="font-semibold">KadriGroup</p> */}
          <Image
            src="/bifa.png"
            alt="KadriGroup Logo"
            width={200}
            height={100}
            className=" top-0 h-28 w-auto"
            loading="eager"
          />
        </div>
        <div className="flex justify-end w-full gap-4">
          {/* <Button variant="ghost" className="hidden md:inline">
              Book a demo
            </Button> */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Register</Button>
              </Link>
              <CircleUserIcon />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <h2 className="text-xl flex items-center gap-2 cursor-pointer">
                <ShoppingCart />
                (0)
              </h2>
              <UserButton />
            </div>
          )}
          <div className="border-r hidden md:inline"></div>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
