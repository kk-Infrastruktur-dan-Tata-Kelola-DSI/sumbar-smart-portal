"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import placeholderVertical from "@/public/images/placholder-vertical.jpg";
import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";

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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">BERITA TERKINI</h1>
        <p className="text-gray-600 text-sm">
          Kabar terbaru seputar pembangunan dan pemerintahan Provinsi Sumatera Barat
        </p>
      </div>

      <div className="flex flex-col gap-6 container mx-auto px-16 py-8">
        {newsData.map((news) => (
          <div key={news.id} className="flex flex-col md:flex-row gap-4 pb-6">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-lg font-bold mb-2">{news.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{news.date}</p>
              <p className="text-gray-700 mb-4 line-clamp-3">{news.summary}</p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="text-sm font-bold bg-transparent hover:bg-blue-50 px-3"
                >
                  Info Selengkapnya →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}