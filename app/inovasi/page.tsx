"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";

export default function InovasiPage() {
    const [loading, setLoading] = React.useState(true);

    // Simulate data loading
    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const innovations = [
        {
            image: "/images/ppid.png", // PPID logo
            title: "PPID",
            description: "PPID adalah singkatan dari Pejabat Pengelola Informasi dan Dokumentasi, yaitu individu atau unit di setiap pemerintah Sumatra Barat yang bertanggung jawab untuk memberikan informasi kepada publik sesuai dengan amanat undang-undang. Keberadaan PPID mempermudah masyarakat untuk mendapatkan informasi dengan cara yang terbuka, mudah dan informasi yang wajib diumumkan secara berkala hingga informasi yang harus disediakan setiap saat dan sewaktu-waktu.",
            buttonText: "Akses PPID"
        },
        {
            image: "/images/e-riset.png", // Badan Penelitian dan Pengembangan logo
            title: "Aplikasi E-Riset",
            description: "Dalam penyebaran hasil penelitian ini banyak cara yang dapat dilakukan salah satunya adalah melalui sistem komunikasi yang disebut dengan Elektronik Riset (e-Riset) yang memuat hasil-hasil penelitian yang telah dilakukan baik dari Perguruan Tinggi, Lembaga Penelitian, OPD dan para peneliti lainnya.",
            buttonText: "Kunjungi E-Riset"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Inovasi & Layanan Digital</h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Platform layanan digital untuk meningkatkan transparansi dan aksesibilitas informasi publik di Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto space-y-20">
                    {loading ? (
                        <>
                            {[1, 2].map((i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    {/* Image Skeleton */}
                                    <div className={i % 2 === 0 ? "md:order-2" : ""}>
                                        <Skeleton className="w-full aspect-square max-w-md mx-auto rounded-lg" />
                                    </div>

                                    {/* Text Skeleton */}
                                    <div className={`space-y-6 ${i % 2 === 0 ? "md:order-1" : ""}`}>
                                        <Skeleton className="h-10 w-64 rounded-lg" />
                                        <div className="space-y-3">
                                            <Skeleton className="h-4 w-full rounded-lg" />
                                            <Skeleton className="h-4 w-full rounded-lg" />
                                            <Skeleton className="h-4 w-5/6 rounded-lg" />
                                            <Skeleton className="h-4 w-full rounded-lg" />
                                            <Skeleton className="h-4 w-4/5 rounded-lg" />
                                        </div>
                                        <Skeleton className="h-11 w-40 rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        innovations.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Icon/Image */}
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

                            {/* Text Content */}
                            <div className={`space-y-6 ${index % 2 === 0 ? "md:order-1" : ""}`}>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground-900">
                                    {item.title}
                                </h2>
                                <p className="text-foreground-700 leading-relaxed text-base">
                                    {item.description}
                                </p>
                                <Button
                                    color="default"
                                    size="lg"
                                    className="font-semibold px-8 bg-foreground-900 text-white hover:bg-foreground-800"
                                    radius="lg"
                                >
                                    {item.buttonText}
                                </Button>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
