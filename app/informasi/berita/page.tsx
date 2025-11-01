"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";
import Link from "next/link";

const newsData = [
  {
    id: 1,
    title: "BPBD: Kerugian sementara bencana Sumbar mencapai Rp108,38 miliar",
    date: "Senin, 20 Mei 2024 9:23 WIB",
    summary: "Badan Penanggulangan Bencana Daerah (BPBD) Sumatera Barat (Sumbar) menyatakan kerugian sementara akibat bencana banjir dan banjir bandang yang melanda sejumlah wilayah di provinsi tersebut berdasarkan hitung cepat diperkirakan mencapai Rp108,38 miliar.",
    image: placeholderHorizontal,
  },
  {
    id: 2,
    title: "Respons Cepat Kebakaran di Pasa Gadang, Pemprov Sumbar Salurkan 317 Kilogram Beras ke Dapur Umum",
    date: "10 Oktober 2023, 21:11 WIB",
    summary: "Pemerintah Provinsi Sumatera Barat (Pemprov Sumbar) merespons cepat kejadian bencana kebakaran yang melanda 19 unit rumah yang dihuni oleh 30 KK di Kelurahan Pasa Gadang, Kota Padang.",
    image: placeholderHorizontal,
  },
  {
    id: 3,
    title: "Banjir Bandang di Sumatera Barat, Korban Tewas Bertambah jadi 34 Orang",
    date: "Minggu, 12 Mei 2024, 20:15:00 WIB",
    summary: "Sekjen Laka Mahyadi, dia juga menerima laporan ada sebanyak 5 orang masyarakat yang hingga siang tadi statusnya hilang. \"Sementara untuk korban luka-luka berjumlah sebanyak 16 orang, sekali lagi ini masih data sementara ya,\" ujarnya.",
    image: placeholderHorizontal,
  },
  {
    id: 4,
    title: "Gubernur Sumbar Lepas Kontingen Sumbar Menuju Pornas Korpri XVII di Palembang",
    date: "Minggu, 28 September 2023, 10:14 WIB",
    summary: "Gubernur Sumatera Barat (Sumbar), Mahyeldi Ansharullah secara resmi melepas keberangkatan Kontingen KORPRI Provinsi Sumbar untuk mengikuti Pekan Olahraga Nasional (PORNAS) KORPRI XVII Tahun 2023 yang akan diselenggarakan di Palembang, Sumatera Selatan.",
    image: placeholderHorizontal,
  }
];

export default function BeritaPage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BeritaSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Berita Terkini
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Kabar terbaru seputar pembangunan dan pemerintahan Provinsi Sumatera Barat
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* News List Section */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto space-y-8">
            {newsData.map((news) => (
              <div 
                key={news.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                      {news.title}
                    </h2>
                    <p className="text-sm text-foreground-500 mb-3">
                      {news.date}
                    </p>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                    <div className="flex justify-end">
                      <Link href={`/informasi/berita/${news.id}`}>
                        <Button
                          className="px-6 py-2 rounded-full text-sm bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300"
                        >
                          Info Selengkapnya →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BeritaSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <Skeleton className="h-12 w-64 mx-auto rounded-lg mb-4" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* News List Skeleton */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto space-y-8">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex-shrink-0">
                    <Skeleton className="aspect-[4/3] rounded-lg" />
                  </div>
                  <div className="md:w-2/3">
                    <Skeleton className="h-7 w-3/4 rounded-lg mb-2" />
                    <Skeleton className="h-4 w-32 rounded-lg mb-3" />
                    <Skeleton className="h-4 w-full rounded-lg mb-2" />
                    <Skeleton className="h-4 w-5/6 rounded-lg mb-2" />
                    <Skeleton className="h-4 w-4/6 rounded-lg mb-4" />
                    <div className="flex justify-end">
                      <Skeleton className="h-9 w-36 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}