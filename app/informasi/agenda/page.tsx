"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "@heroui/skeleton";
import placeholderVertical from "@/public/images/placholder-vertical.jpg";

const agendas = [
    {
        id: 1,
        title: "Webinar Pengembangan UMKM Digital",
        date: "30 Oktober 2024",
        location: "Hotel Pangeran, Padang",
        description: "Pelatihan dan diskusi tentang strategi digitalisasi UMKM di era modern untuk meningkatkan daya saing usaha lokal.",
        image: placeholderVertical
    },
    {
        id: 2,
        title: "Festival Kuliner Tradisional",
        date: "2 November 2024",
        location: "Taman Budaya, Padang",
        description: "Pameran dan festival kuliner khas Minangkabau dengan berbagai sajian tradisional dari seluruh kabupaten/kota.",
        image: placeholderVertical
    },
    {
        id: 3,
        title: "Seminar Smart City Sumbar",
        date: "5 November 2024",
        location: "Auditorium Gubernuran",
        description: "Pembahasan implementasi teknologi smart city untuk pembangunan kota yang lebih efisien dan modern.",
        image: placeholderVertical
    },
    {
        id: 4,
        title: "Workshop Pengembangan Pariwisata",
        date: "8 November 2024",
        location: "Hotel Mercure, Padang",
        description: "Pelatihan pengembangan destinasi wisata dan peningkatan kualitas layanan pariwisata Sumbar.",
        image: placeholderVertical
    },
    {
        id: 5,
        title: "Forum Investasi Daerah",
        date: "12 November 2024",
        location: "Ballroom Hotel Axana",
        description: "Forum diskusi dan presentasi potensi investasi di berbagai sektor unggulan Sumatera Barat.",
        image: placeholderVertical
    },
    {
        id: 6,
        title: "Konferensi Pendidikan",
        date: "15 November 2024",
        location: "Universitas Andalas",
        description: "Konferensi tentang peningkatan kualitas pendidikan dan pengembangan SDM di Sumatera Barat.",
        image: placeholderVertical
    }
];

export default function AgendaPage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <AgendaSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        Agenda Kegiatan
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Jadwal kegiatan dan acara penting Provinsi Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agendas.map((agenda) => (
                        <div 
                            key={agenda.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src={agenda.image}
                                    alt={agenda.title}
                                    fill
                                    className="object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                    {agenda.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-foreground-500 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                    {agenda.date}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground-500 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    {agenda.location}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {agenda.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AgendaSkeleton() {
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
                                <Skeleton className="h-4 w-32 rounded-lg mb-2" />
                                <Skeleton className="h-4 w-48 rounded-lg mb-3" />
                                <Skeleton className="h-4 w-full rounded-lg" />
                                <Skeleton className="h-4 w-5/6 rounded-lg mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}