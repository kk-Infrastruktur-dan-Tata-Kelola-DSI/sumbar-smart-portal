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
import { Kbd } from "@heroui/kbd"; // Kbd di-import tapi tidak digunakan di versi baru
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import logoImage from '@/public/images/logo.png';

// --- Helper Icons (Placeholder) ---
// Anda bisa menggantinya dengan library ikon Anda (misal: react-icons)
const SearchIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const BellIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1.2em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1.2em"
    {...props}
  >
    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM19 17H5V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V17Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);
// ----------------------------------


export const Navbar = () => {
    // 1. Modifikasi Search Input agar sesuai gambar
    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            // Tambahkan ikon pencarian di awal
            startContent={<SearchIcon className="text-default-500" />}
            placeholder="Cari Informasi..."
        />
    );

    // 2. Definisikan link navigasi dari gambar
    const navLinks = [
      { name: "Beranda", href: "/" },
      { name: "Profil", href: "#" },
      { name: "Informasi", href: "#" },
      { name: "Pengumuman", href: "#" },
      { name: "Anti Hoax", href: "#" },
      { name: "Informasi Layanan", href: "#" },
      { name: "Keuangan Daerah", href: "#" },
      { name: "Budaya", href: "#" },
      { name: "Akuntabilitas", href: "#" },
      { name: "Inovasi", href: "#" },
    ];

    return (
        // Gunakan <header> untuk membungkus kedua bilah
        <header className="w-full flex flex-col">
            
            {/* === BILAH ATAS === */}
            <HeroUINavbar maxWidth="full" isBordered>
                
                {/* Kiri: Tombol Menu Mobile + Brand */}
                <NavbarContent justify="start" className="gap-2">
                    <NavbarMenuToggle className="sm:hidden" /> {/* Tombol burger di mobile */}
                    <NavbarBrand className="flex flex-row gap-2">
                        <Image src={logoImage} alt="Logo Provinsi Sumatera Barat" className="h-10 w-auto"/>
                        <div className="flex flex-col items-start">
                            {/* Menggunakan <NextLink> untuk link internal lebih baik */}
                            <NextLink href="/" className="font-bold text-inherit">
                                {siteConfig.name}
                            </NextLink>
                            <span className="text-sm text-neutral-500">
                                {siteConfig.description}
                            </span>
                        </div>
                    </NavbarBrand>
                </NavbarContent>

                {/* Tengah: Dihapus (karena link pindah ke bilah bawah) */}

                {/* Kanan: Search, Ikon Notifikasi, & Theme Switch */}
                <NavbarContent justify="end" className="gap-1">
                    <NavbarItem className="hidden lg:flex">
                        {searchInput}
                    </NavbarItem>
                    <NavbarItem>
                        <Button isIconOnly variant="light" aria-label="Notifikasi">
                            <BellIcon />
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                {/* === MENU MOBILE (saat tombol burger diklik) === */}
                <NavbarMenu>
                    {/* Tampilkan item pencarian di paling atas menu mobile */}
                    <NavbarMenuItem className="lg:hidden">
                        {searchInput}
                    </NavbarMenuItem>
                    
                    {/* Tampilkan semua link navigasi */}
                    {navLinks.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`}>
                            <Link
                                // Beri warna "primary" jika itu "Beranda" (link aktif)
                                color={index === 0 ? "primary" : "foreground"}
                                className="w-full"
                                href={item.href}
                                size="lg"
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </HeroUINavbar>

            {/* === BILAH BAWAH (Navigasi Desktop) === */}
            <nav className="hidden sm:flex w-full justify-center items-center h-14 shadow-sm bg-background border-b border-default-200">
                <div className="flex gap-6">
                    {navLinks.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            color="foreground"
                            className={clsx(
                                "text-sm font-medium",
                                // Logika untuk memberi style pada link "Beranda" yang aktif
                                index === 0 && "text-primary font-bold relative after:content-[''] after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-primary"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
};