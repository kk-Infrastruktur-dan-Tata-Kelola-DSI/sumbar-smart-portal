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
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import {
    Accordion,
    AccordionItem,
} from "@heroui/accordion";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ChevronDown, Menu } from "lucide-react";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

import { siteConfig } from "@/config/site";
import logoImage from '@/public/images/logo.png';
import MinangQuote from "./MinangQuote";

export const Navbar = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const profilDropdownItems = [
        { name: "Visi & Misi", href: "/profile" },
        { name: "Struktur dan Organisasi", href: "/profile#struktur" },
    ];

    const informasiDropdownItems = [
        { name: "Informasi", href: "/informasi" },
        { name: "Berita", href: "/informasi/berita" },
        { name: "Foto", href: "/informasi/foto" },
        { name: "Video", href: "/informasi/video" },
        { name: "Infografis", href: "/informasi/infografis" },
        { name: "Agenda", href: "/informasi/agenda" },
        { name: "Pedoman Teknis", href: "/informasi#pedoman-teknis" },
    ];

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Profil", href: "/profile", hasDropdown: true, dropdownItems: profilDropdownItems },
        { name: "Informasi", href: "/informasi", hasDropdown: true, dropdownItems: informasiDropdownItems },
        { name: "Pengumuman", href: "/pengumuman"},
        { name: "Anti Hoax", href: "/anti_hoax" },
        { name: "Informasi Layanan", href: "/informasi-layanan"},
        { name: "Keuangan Daerah", href: "/keuangan" },
        { name: "Budaya", href: "/budaya" },
        { name: "Inovasi", href: "/inovasi" },
        { name: "OPD", href: "/opd" },
    ];

    return (
        <header className="w-full flex flex-col">
            <HeroUINavbar maxWidth="full" isBordered classNames={{
                wrapper: "px-2 sm:px-4",
            }}>
                {/* Kiri: Logo + Toggle */}
                <NavbarContent justify="start" className="gap-1 sm:gap-2 flex-shrink-0">
                    <NavbarMenuToggle 
                        className="lg:hidden w-8 h-8 min-w-8"
                        icon={(isOpen) => <Menu className="w-5 h-5" />}
                    />
                    <NavbarBrand className="flex flex-row gap-1 sm:gap-2 flex-shrink-0 mr-0">
                        <Image 
                            src={logoImage} 
                            alt="Logo Provinsi Sumatera Barat" 
                            className="h-8 sm:h-10 w-auto flex-shrink-0" 
                        />
                        <div className="flex flex-col items-start min-w-0">
                            <NextLink href="/" className="font-bold text-inherit text-xs sm:text-base whitespace-nowrap tracking-tighter">
                                {siteConfig.name}
                            </NextLink>
                            <span className="text-[10px] sm:text-sm text-neutral-500 hidden md:block w-full tracking-tight">
                                {siteConfig.description}
                            </span>
                        </div>
                    </NavbarBrand>
                </NavbarContent>

                {/* Kanan: Minang Quote */}
                <NavbarContent justify="end" className="gap-1 flex-shrink-0">
                    <NavbarItem className="hidden lg:flex">
                        <MinangQuote />
                    </NavbarItem>
                </NavbarContent>

                {/* Mobile/Tablet Menu */}
                <NavbarMenu className="pt-4 px-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <NavbarMenuItem className="lg:hidden mb-3 pb-3 border-b border-divider">
                        <MinangQuote />
                    </NavbarMenuItem>
                    
                    {navLinks.map((item, index) => {
                        const isActive = mounted && pathname === item.href;
                        const isSubItemActive = mounted && item.dropdownItems?.some(sub => pathname === sub.href);
                        
                        if (item.hasDropdown && item.dropdownItems) {
                            return (
                                <NavbarMenuItem key={`${item.name}-${index}`} className="w-full">
                                    <Accordion 
                                        className="px-0"
                                        itemClasses={{
                                            base: "px-0",
                                            title: "text-base font-medium py-0",
                                            trigger: "px-0 py-2 hover:bg-transparent data-[hover=true]:bg-transparent",
                                            content: "px-0 pt-0 pb-0",
                                            indicator: "text-foreground",
                                        }}
                                    >
                                        <AccordionItem
                                            key="1"
                                            aria-label={item.name}
                                            title={
                                                <span className={clsx(
                                                    "text-base font-medium",
                                                    (isActive || isSubItemActive) && "text-white bg-[#FFB900] rounded-full font-semibold px-4 py-2"
                                                )}>
                                                    {item.name}
                                                </span>
                                            }
                                        >
                                            <div className="flex flex-col pl-4 pt-1">
                                                {item.dropdownItems.map((subItem, subIndex) => {
                                                    const isSubActive = mounted && pathname === subItem.href;
                                                    return (
                                                        <Link
                                                            key={`${subItem.name}-${subIndex}`}
                                                            href={subItem.href}
                                                            className={clsx(
                                                                "w-full text-sm py-2",
                                                                isSubActive ? "text-white bg-[#FFB900] rounded-full font-semibold px-4" : "text-foreground"
                                                            )}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </NavbarMenuItem>
                            );
                        }
                        
                        return (
                            <NavbarMenuItem key={`${item.name}-${index}`} className="w-full">
                                <Link
                                    className={clsx(
                                        "w-full block text-base font-medium py-2",
                                        isActive ? "text-white bg-[#FFB900] rounded-full font-semibold px-4" : "text-foreground"
                                    )}
                                    href={item.href}
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
                        const isSubItemActive = mounted && item.dropdownItems?.some(sub => pathname === sub.href);
                        
                        if (item.hasDropdown && item.dropdownItems) {
                            return (
                                <Dropdown key={item.name}>
                                    <DropdownTrigger>
                                        <Button
                                            variant="light"
                                            className={clsx(
                                                "text-sm font-medium hover:text-[#FFB900] transition-all relative p-0 h-auto min-w-0 bg-transparent data-[hover=true]:bg-transparent",
                                                (isActive || isSubItemActive) && "text-[#FFB900] font-semibold",
                                                (isActive || isSubItemActive) && "after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[3px] after:bg-[#FFB900] after:transition-all"
                                            )}
                                            endContent={<ChevronDown className="w-4 h-4" />}
                                        >
                                            {item.name}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label={`${item.name} menu`}>
                                        {item.dropdownItems.map((subItem) => (
                                            <DropdownItem
                                                key={subItem.name}
                                                href={subItem.href}
                                                className={clsx(
                                                    mounted && pathname === subItem.href && "text-[#FFB900] font-semibold"
                                                )}
                                            >
                                                {subItem.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            );
                        }
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                color="foreground"
                                className={clsx(
                                    "text-sm font-medium hover:text-[#FFB900] transition-all relative",
                                    isActive && "text-[#FFB900] font-semibold",
                                    isActive && "after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[3px] after:bg-[#FFB900] after:transition-all"
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