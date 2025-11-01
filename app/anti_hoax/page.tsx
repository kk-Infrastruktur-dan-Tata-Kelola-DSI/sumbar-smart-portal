import { Suspense } from "react";
import CardAntiHoax from "@/components/card_antihoax";
import PopupAntiHoax from "@/components/popup-antihoax";
import AntiHoaxClient from "@/app/anti_hoax/antihoax-client";
import { getAntiHoaxByJenis } from "@/utils/antihoax-queries";
import { AlertTriangle } from 'lucide-react';

export default async function AntiHoaxPage() {
    const { hoax, verified } = await getAntiHoaxByJenis();
    
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="text-black">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        Anti Hoax
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                        Klarifikasi dan verifikasi informasi seputar Pemprov Sumatera Barat
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Warning Alert Section */}
                <section className="mb-16">
                    <div className="bg-red-600 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
                        <div className="bg-yellow-400 rounded-xl p-3 flex-shrink-0">
                            <AlertTriangle className="w-8 h-8 text-gray-900" />
                        </div>
                        <div className="text-white">
                            <h2 className="text-xl font-bold mb-2">
                                Waspadai Informasi Hoax!
                            </h2>
                            <p className="text-sm leading-relaxed opacity-95">
                                Selalu verifikasi informasi melalui saluran resmi Pemprov Sumbar.
                                <br />
                                Jangan mudah percaya dan menyebarkan informasi yang belum jelas kebenarannya.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Client Component with Loading State */}
                <Suspense fallback={<AntiHoaxSkeleton />}>
                    <AntiHoaxClient hoaxData={hoax} verifiedData={verified} />
                </Suspense>
            </div>
        </div>
    );
}

function AntiHoaxSkeleton() {
    return (
        <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                            <div className="flex-grow">
                                <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-2 animate-pulse" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded-lg animate-pulse" />
                            <div className="h-4 w-4/5 bg-gray-200 rounded-lg animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}