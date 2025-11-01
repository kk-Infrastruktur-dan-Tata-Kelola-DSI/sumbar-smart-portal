"use client";

import {
    Navbar as HeroUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@heroui/navbar";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Bell, Search, Globe } from "lucide-react";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

import { siteConfig } from "@/config/site";
import logoImage from '@/public/images/logo.png';

export const Navbar = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            startContent={<Search className="text-gray-500" />}
            placeholder="Cari Informasi..."
        />
    );

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Profil", href: "/profile" },
        { name: "Informasi", href: "/informasi" },
        { name: "Pengumuman", href: "/pengumuman" },
        { name: "Anti Hoax", href: "/anti_hoax" },
        { name: "Informasi Layanan", href: "/layanan" },
        { name: "Keuangan Daerah", href: "/keuangan" },
        { name: "Budaya", href: "/budaya" },
        { name: "Akuntabilitas", href: "/akuntabilitas" },
        { name: "Inovasi", href: "/inovasi" },
    ];

    return (
        <header className="w-full flex flex-col">
            <HeroUINavbar maxWidth="full" isBordered>
                {/* Kiri: Logo + Toggle */}
                <NavbarContent justify="start" className="gap-2">
                    <NavbarMenuToggle className="lg:hidden" /> {/* Fixed: Muncul hanya <lg */}
                    <NavbarBrand className="flex flex-row gap-2 flex-shrink-0">
                        <Image src={logoImage} alt="Logo Provinsi Sumatera Barat" className="h-10 w-auto" />
                        <div className="flex flex-col items-start">
                            <NextLink href="/" className="font-bold text-inherit">
                                {siteConfig.name}
                            </NextLink>
                            <span className="text-sm text-neutral-500">
                                {siteConfig.description}
                            </span>
                        </div>
                    </NavbarBrand>
                </NavbarContent>

                {/* Kanan: Search + Icons */}
                <NavbarContent justify="end" className="gap-2"> {/* Gap dinaikkan sedikit */}
                    <NavbarItem className="hidden lg:flex"> {/* Sudah ok */}
                        {searchInput}
                    </NavbarItem>
                    <NavbarItem>
                        <Button isIconOnly variant="light" aria-label="Notifikasi" className="mr-1">
                            <Bell />
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button isIconOnly variant="light" aria-label="Bahasa">
                            <Globe />
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                {/* Mobile/Tablet Menu */}
                <NavbarMenu>
                    <NavbarMenuItem className="lg:hidden">
                        {searchInput}
                    </NavbarMenuItem>
                    {navLinks.map((item, index) => {
                        const isActive = mounted && pathname === item.href;
                        return (
                            <NavbarMenuItem key={`${item.name}-${index}`}>
                                <Link
                                    color={isActive ? "primary" : "foreground"}
                                    className={clsx(
                                        "w-full",
                                        isActive && "font-semibold"
                                    )}
                                    href={item.href}
                                    size="lg"
                                >
                                    {item.name}
                                </Link>
                            </NavbarMenuItem>
                        );
                    })}
                </NavbarMenu>
            </HeroUINavbar>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex w-full justify-center items-center h-14 bg-background">
                <div className="flex gap-6">
                    {navLinks.map((item) => {
                        const isActive = mounted && pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                color="foreground"
                                className={clsx(
                                    "text-sm font-medium hover:text-warning transition-all relative",
                                    isActive && "text-warning font-semibold",
                                    isActive && "after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[3px] after:bg-warning after:transition-all"
                                )}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
};