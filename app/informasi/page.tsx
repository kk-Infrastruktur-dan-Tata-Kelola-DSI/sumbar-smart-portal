"use client";

import React from "react";
import StackedCarousel from "@/components/carousel";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import placeholderImage from "@/public/images/placholder-vertical.jpg";
import Link from "next/link";

export default function InformasiPage() {
    const [loading, setLoading] = React.useState(true);

    // Simulate data loading
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <InformasiSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="text-black">
                <div className="container mx-auto px-4 pt-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        Informasi
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Temukan kabar dan informasi terkini tentang Provinsi Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Berita Section */}
                <section className="mb-16">
                    <StackedCarousel />

                    <div className="flex justify-center">
                        <Link href="/informasi/berita">
                            <Button
                                className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95"
                            >
                                Lihat Semua Berita
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Infografis Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <h2 className="text-2xl font-bold">Infografis</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                            <Image
                                src={placeholderImage}
                                alt="Infografis 1"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                            <Image
                                src={placeholderImage}
                                alt="Infografis 2"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link href="/informasi/infografis">
                            <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                                Lihat Semua Infografis
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Foto Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <h2 className="text-2xl font-bold">Foto</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                                <Image
                                    src={placeholderImage}
                                    alt={`Foto ${item}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link href="/informasi/photo">
                            <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                                Lihat Semua Foto
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Video Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <h2 className="text-2xl font-bold">Video</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="relative aspect-video rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300">
                                <Image
                                    src={placeholderImage}
                                    alt={`Video ${item}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" className="transform scale-75 md:scale-100">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link href="/informasi/video">
                            <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                                Lihat Semua Video
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Index Agenda Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <h2 className="text-2xl font-bold">Agenda</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={placeholderImage}
                                    alt="Webinar Renotech"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Webinar Renotech</h3>
                            <p className="text-gray-600 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={placeholderImage}
                                    alt="Webinar Business"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Webinar Business</h3>
                            <p className="text-gray-600 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        </div>
                    </div>
                </section>

                {/* Pedoman Teknis Section */}
                <section className="mb-8" id="pedoman-teknis">
                    <div className="flex items-center gap-6 mb-8">
                        <h2 className="text-2xl font-bold">Pedoman Teknis</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                    PDF
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium">Pedoman Teknis Aplikasi Web versi {item}.0</h3>
                                    <p className="text-sm text-gray-500">2.5 MB</p>
                                </div>
                                <Button className="flex-shrink-0 px-6 py-2 rounded-full text-sm bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white">
                                    Download
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Skeleton component for loading state
function InformasiSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <div className="text-black">
                <div className="container mx-auto px-4 pt-16 text-center">
                    <Skeleton className="h-12 w-64 mx-auto rounded-lg mb-4" />
                    <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg mb-8" />
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Berita Section Skeleton */}
                <section className="mb-16">

                    <div className="h-[400px] flex items-center justify-center">
                        <Skeleton className="h-[320px] w-full max-w-3xl rounded-xl" />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-12 w-48 rounded-full" />
                    </div>
                </section>

                {/* Infografis Section Skeleton */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <Skeleton className="h-8 w-48 rounded-lg" />
                        <div className="h-[3px] flex-grow bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="aspect-[4/3] rounded-lg" />
                        <Skeleton className="aspect-[4/3] rounded-lg" />
                    </div>
                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-12 w-56 rounded-full" />
                    </div>
                </section>

                {/* Foto Section Skeleton */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="h-[3px] flex-grow bg-gray-200"></div>
                        <Skeleton className="h-8 w-32 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <Skeleton key={item} className="aspect-square rounded-lg" />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-12 w-48 rounded-full" />
                    </div>
                </section>

                {/* Video Section Skeleton */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <Skeleton className="h-8 w-32 rounded-lg" />
                        <div className="h-[3px] flex-grow bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <Skeleton key={item} className="aspect-video rounded-lg" />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-12 w-48 rounded-full" />
                    </div>
                </section>

                {/* Index Agenda Section Skeleton */}
                <section className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="h-[3px] flex-grow bg-gray-200"></div>
                        <Skeleton className="h-8 w-48 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <Skeleton className="aspect-[3/2] rounded-lg mb-4" />
                            <Skeleton className="h-6 w-48 rounded-lg mb-2" />
                            <Skeleton className="h-4 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4 rounded-lg mt-1" />
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <Skeleton className="aspect-[3/2] rounded-lg mb-4" />
                            <Skeleton className="h-6 w-48 rounded-lg mb-2" />
                            <Skeleton className="h-4 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4 rounded-lg mt-1" />
                        </div>
                    </div>
                </section>

                {/* Pedoman Teknis Section Skeleton */}
                <section className="mb-8">
                    <div className="flex items-center gap-6 mb-8">
                        <Skeleton className="h-8 w-48 rounded-lg" />
                        <div className="h-[3px] flex-grow bg-gray-200"></div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                                <div className="flex-grow">
                                    <Skeleton className="h-5 w-64 rounded-lg mb-2" />
                                    <Skeleton className="h-4 w-16 rounded-lg" />
                                </div>
                                <Skeleton className="h-10 w-24 rounded-full flex-shrink-0" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
