"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "@heroui/skeleton";
import placeholderVertical from "@/public/images/placholder-vertical.jpg";
import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";

const photos = [
    {
        id: 1,
        src: placeholderVertical,
        alt: "Kegiatan Pemerintah 1",
        aspect: "vertical",
        title: "Kunjungan Kerja Gubernur",
        date: "28 Oktober 2024"
    },
    {
        id: 2,
        src: placeholderHorizontal,
        alt: "Kegiatan Pemerintah 2",
        aspect: "horizontal",
        title: "Rapat Koordinasi Daerah",
        date: "27 Oktober 2024"
    },
    {
        id: 3,
        src: placeholderVertical,
        alt: "Kegiatan Pemerintah 3",
        aspect: "vertical",
        title: "Peresmian Gedung Baru",
        date: "26 Oktober 2024"
    },
    {
        id: 4,
        src: placeholderHorizontal,
        alt: "Kegiatan Pemerintah 4",
        aspect: "horizontal",
        title: "Forum Diskusi Pembangunan",
        date: "25 Oktober 2024"
    },
    {
        id: 5,
        src: placeholderVertical,
        alt: "Kegiatan Pemerintah 5",
        aspect: "vertical",
        title: "Kunjungan ke UMKM",
        date: "24 Oktober 2024"
    },
    {
        id: 6,
        src: placeholderHorizontal,
        alt: "Kegiatan Pemerintah 6",
        aspect: "horizontal",
        title: "Pembukaan Festival Budaya",
        date: "23 Oktober 2024"
    },
    {
        id: 7,
        src: placeholderVertical,
        alt: "Kegiatan Pemerintah 7",
        aspect: "vertical",
        title: "Pelatihan Digital Marketing",
        date: "22 Oktober 2024"
    },
    {
        id: 8,
        src: placeholderHorizontal,
        alt: "Kegiatan Pemerintah 8",
        aspect: "horizontal",
        title: "Seminar Ekonomi Kreatif",
        date: "21 Oktober 2024"
    },
    {
        id: 9,
        src: placeholderVertical,
        alt: "Kegiatan Pemerintah 9",
        aspect: "vertical",
        title: "Launching Program Smart City",
        date: "20 Oktober 2024"
    },
    {
        id: 10,
        src: placeholderHorizontal,
        alt: "Kegiatan Pemerintah 10",
        aspect: "horizontal",
        title: "Musyawarah Pembangunan Daerah",
        date: "19 Oktober 2024"
    },
    {
        id: 11,
        src: placeholderVertical,
        alt: "Kegiatan Pemerintah 11",
        aspect: "vertical",
        title: "Peninjauan Infrastruktur",
        date: "18 Oktober 2024"
    },
    {
        id: 12,
        src: placeholderHorizontal,
        alt: "Kegiatan Pemerintah 12",
        aspect: "horizontal",
        title: "Penandatanganan MoU",
        date: "17 Oktober 2024"
    }
];

export default function PhotoPage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <PhotoSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        Galeri Foto
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Dokumentasi kegiatan dan momen penting Provinsi Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                    {photos.map((photo) => (
                        <div 
                            key={photo.id} 
                            className="break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className={`relative ${
                                photo.aspect === "vertical" ? "aspect-[3/4]" : "aspect-[4/3]"
                            }`}>
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="font-bold text-lg mb-2">
                                    {photo.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-foreground-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                    {photo.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PhotoSkeleton() {
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
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 8].map((item) => (
                        <div 
                            key={item}
                            className="break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-md"
                        >
                            <Skeleton className="aspect-[3/4] w-full" />
                            <div className="p-4 bg-white">
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