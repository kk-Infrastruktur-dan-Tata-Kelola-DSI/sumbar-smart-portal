"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "@heroui/skeleton";
import placeholderVertical from "@/public/images/placholder-vertical.jpg";

const infografis = [
    {
        id: 1,
        title: "Statistik Pertumbuhan Ekonomi Sumbar 2024",
        date: "28 Oktober 2024",
        image: placeholderVertical,
    },
    {
        id: 2,
        title: "Perkembangan UMKM Digital Sumbar",
        date: "25 Oktober 2024",
        image: placeholderVertical,
    },
    {
        id: 3,
        title: "Capaian Pembangunan Infrastruktur 2024",
        date: "22 Oktober 2024",
        image: placeholderVertical,
    },
    {
        id: 4,
        title: "Indeks Pembangunan Manusia Sumbar",
        date: "20 Oktober 2024",
        image: placeholderVertical,
    },
    {
        id: 5,
        title: "Peta Potensi Pariwisata Sumbar",
        date: "18 Oktober 2024",
        image: placeholderVertical,
    },
    {
        id: 6,
        title: "Statistik Pendidikan Sumbar 2024",
        date: "15 Oktober 2024",
        image: placeholderVertical,
    }
];

export default function InfografisPage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <InfografisSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        Infografis
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Informasi visual dan statistik terkini Provinsi Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {infografis.map((item) => (
                        <div 
                            key={item.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-foreground-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                    {item.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function InfografisSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <Skeleton className="h-12 w-64 mx-auto rounded-lg mb-4" />
                    <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div 
                            key={item}
                            className="bg-white rounded-xl shadow-md"
                        >
                            <Skeleton className="aspect-[3/4] w-full rounded-t-xl" />
                            <div className="p-4">
                                <Skeleton className="h-6 w-3/4 rounded-lg mb-2" />
                                <Skeleton className="h-4 w-32 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}