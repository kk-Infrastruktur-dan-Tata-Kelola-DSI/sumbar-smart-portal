"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function InovasiPage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const innovations = [
        {
            image: "/images/ppid.png",
            title: "PPID",
            description: "PPID adalah singkatan dari Pejabat Pengelola Informasi dan Dokumentasi, yaitu individu atau unit di setiap pemerintah Sumatra Barat yang bertanggung jawab untuk memberikan informasi kepada publik sesuai dengan amanat undang-undang. Keberadaan PPID mempermudah masyarakat untuk mendapatkan informasi dengan cara yang terbuka, mudah dan informasi yang wajib diumumkan secara berkala hingga informasi yang harus disediakan setiap saat dan sewaktu-waktu.",
            buttonText: "Akses PPID",
            url: "#"
        },
        {
            image: "/images/e-riset.png",
            title: "Aplikasi E-Riset",
            description: "Dalam penyebaran hasil penelitian ini banyak cara yang dapat dilakukan salah satunya adalah melalui sistem komunikasi yang disebut dengan Elektronik Riset (e-Riset) yang memuat hasil-hasil penelitian yang telah dilakukan baik dari Perguruan Tinggi, Lembaga Penelitian, OPD dan para peneliti lainnya.",
            buttonText: "Kunjungi E-Riset",
            url: "#"
        }
    ];

    if (loading) {
        return <InovasiSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        Inovasi & Layanan Digital
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Platform layanan digital untuk meningkatkan transparansi dan aksesibilitas informasi publik di Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <section className="mb-16">
                    <div className="max-w-6xl mx-auto space-y-20">
                        {innovations.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className={index % 2 === 0 ? "md:order-2" : ""}>
                                    <div className="relative w-full aspect-square max-w-md mx-auto">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                                <div className={`space-y-6 ${index % 2 === 0 ? "md:order-1" : ""}`}>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <Link href={item.url}>
                                        <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                                            {item.buttonText}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function InovasiSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <Skeleton className="h-12 w-80 mx-auto rounded-lg mb-4" />
                    <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg" />
                </div>
            </div>

            <div className="container mx-auto px-4">
                <section className="mb-16">
                    <div className="max-w-6xl mx-auto space-y-20">
                        {[1, 2].map((i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className={i % 2 === 0 ? "md:order-2" : ""}>
                                    <Skeleton className="w-full aspect-square max-w-md mx-auto rounded-lg" />
                                </div>
                                <div className={`space-y-6 ${i % 2 === 0 ? "md:order-1" : ""}`}>
                                    <Skeleton className="h-10 w-64 rounded-lg" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full rounded-lg" />
                                        <Skeleton className="h-4 w-full rounded-lg" />
                                        <Skeleton className="h-4 w-5/6 rounded-lg" />
                                        <Skeleton className="h-4 w-full rounded-lg" />
                                        <Skeleton className="h-4 w-4/5 rounded-lg" />
                                    </div>
                                    <Skeleton className="h-12 w-48 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
