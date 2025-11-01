"use client";

import CardAntiHoax from "@/components/card_antihoax";
import PopupAntiHoax from "@/components/popup-antihoax";
import React, { useState } from 'react';
import { AntiHoax } from "@/utils/antihoax-queries";

interface AntiHoaxClientProps {
    hoaxData: AntiHoax[];
    verifiedData: AntiHoax[];
}

export default function AntiHoaxClient({ hoaxData, verifiedData }: AntiHoaxClientProps) {
    const [selectedItem, setSelectedItem] = useState<AntiHoax | null>(null);

    // Format tanggal dari ISO string ke format yang diinginkan
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        };
        return date.toLocaleDateString('id-ID', options);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-6">
                {/* Klarifikasi Informasi Hoax Section */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-red-900 mb-8">
                        Klarifikasi Informasi Hoax
                    </h1>
                    {hoaxData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hoaxData.map((item) => (
                                <CardAntiHoax
                                    key={item.id}
                                    jenis={item.jenis}
                                    judul={item.judul}
                                    penjelasan={item.penjelasan}
                                    tanggal={formatDate(item.created_at)}
                                    onClick={() => setSelectedItem(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            Belum ada data klarifikasi hoax
                        </div>
                    )}
                </div>
                
                {/* Berita Terverifikasi Section */}
                <div>
                    <h2 className="text-3xl font-bold text-red-900 mb-8">
                        Berita Terverifikasi
                    </h2>
                    {verifiedData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {verifiedData.map((item) => (
                                <CardAntiHoax
                                    key={item.id}
                                    jenis={item.jenis}
                                    judul={item.judul}
                                    penjelasan={item.penjelasan}
                                    tanggal={formatDate(item.created_at)}
                                    onClick={() => setSelectedItem(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            Belum ada berita terverifikasi
                        </div>
                    )}
                </div>
            </div>

            {/* Popup Component */}
            {selectedItem && (
                <PopupAntiHoax
                    jenis={selectedItem.jenis}
                    judul={selectedItem.judul}
                    written_by={selectedItem.written_by}
                    tanggal={formatDate(selectedItem.created_at)}
                    penjelasan={selectedItem.penjelasan}
                    gambar={selectedItem.gambar_url || undefined}
                    isOpen={true}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </>
    );
}