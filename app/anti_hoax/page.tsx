"use client";

import CardAntiHoax from "@/components/card_antihoax";
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AntiHoaxPage() {
    const hoaxData = [
        {
            jenis: 'hoax' as const,
            judul: 'Pemprov Sumbar Akan Memotong Gaji PNS 20%',
            penjelasan: 'Informasi ini tidak benar. Tidak ada kebijakan pemotongan gaji PNS di Lingkungan Pemprov Sumbar.',
            tanggal: '28 Okt 2025'
        },
        {
            jenis: 'hoax' as const,
            judul: 'Bantuan Tunai Rp 5 Juta untuk Semua Warga Sumbar',
            penjelasan: 'Informasi tidak benar. Tidak ada program bantuan tunai Rp 5 juta untuk semua warga.',
            tanggal: '25 Okt 2025'
        },
        {
            jenis: 'sebagian' as const,
            judul: 'Pemprov Sumbar Gratiskan Biaya Pendidikan SD-SMA',
            penjelasan: 'Program Beasiswa memang ada, namun dengan kriteria tertentu, bukan gratis untuk semua.',
            tanggal: '15 Okt 2025'
        },
        {
            jenis: 'hoax' as const,
            judul: 'Bantuan Tunai Rp 5 Juta untuk Semua Warga Sumbar',
            penjelasan: 'Informasi ini menyesatkan. Tidak ada program bantuan tunai Rp 5 juta untuk semua warga.',
            tanggal: '01 Okt 2025'
        },
        {
            jenis: 'hoax' as const,
            judul: 'Pendaftaran CPNS Sumbar Dibuka Tanpa Tes',
            penjelasan: 'Informasi tidak benar. Seluruh proses seleksi CPNS dilaksanakan dengan tes BKN.',
            tanggal: '20 Okt 2025'
        },
        {
            jenis: 'sebagian' as const,
            judul: 'Pemprov Sumbar Gratiskan Biaya Pendidikan SD-SMA',
            penjelasan: 'Program Beasiswa memang ada, namun dengan kriteria tertentu, bukan gratis untuk semua.',
            tanggal: '16 Okt 2025'
        },
    ];
    
    const verifiedData = [
        {
            jenis: 'verified' as const,
            judul: 'APBD Sumbar 2025 Sebesar Rp 12,5 Triliun',
            penjelasan: 'Dinas Biro Humas',
            tanggal: '28 Okt 2025'
        },
        {
            jenis: 'verified' as const,
            judul: 'Beasiswa Unggulan untuk 1.000 Pelajar Dibuka',
            penjelasan: 'Dinas Pendidikan Sumbar',
            tanggal: '26 Okt 2025'
        },
        {
            jenis: 'verified' as const,
            judul: 'Festival Budaya Minang Digelar 10-15 November',
            penjelasan: 'Dinas Pariwisata & Kebudayaan',
            tanggal: '20 Okt 2025'
        },
    ];
    
    return (
        <div className="min-h-screen bg-gray-50 p-8">
        <div className="w-full bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Anti Hoax
        </h1>
        <p className="text-gray-600 text-sm">
        Klarifikasi dan verifikasi informasi seputar Pemprov Sumatera Barat
        </p>
        </div>
        
        {/* Warning Alert Box */}
        <div className="bg-red-600 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
        {/* Icon */}
        <div className="bg-yellow-400 rounded-xl p-3 flex-shrink-0">
        <AlertTriangle className="w-8 h-8 text-gray-900" />
        </div>
        
        {/* Content */}
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
        </div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
        {/* Klarifikasi Informasi Hoax Section */}
        <div className="mb-12">
        <h1 className="text-3xl font-bold text-red-900 mb-8">
        Klarifikasi Informasi Hoax
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hoaxData.map((item, index) => (
            <CardAntiHoax
            key={index}
            jenis={item.jenis}
            judul={item.judul}
            penjelasan={item.penjelasan}
            tanggal={item.tanggal}
            />
        ))}
        </div>
        </div>
        
        {/* Berita Terverifikasi Section */}
        <div>
        <h2 className="text-3xl font-bold text-red-900 mb-8">
        Berita Terverifikasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedData.map((item, index) => (
            <CardAntiHoax
            key={index}
            jenis={item.jenis}
            judul={item.judul}
            penjelasan={item.penjelasan}
            tanggal={item.tanggal}
            />
        ))}
        </div>
        </div>
        </div>
        </div>
    );
}