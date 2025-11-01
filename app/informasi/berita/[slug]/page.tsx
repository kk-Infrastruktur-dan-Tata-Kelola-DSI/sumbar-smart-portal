"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import { ArrowLeft } from "lucide-react";
import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock data for a single news article with detailed content
const newsDetailData = {
  id: 1,
  title: "BPBD: Kerugian sementara bencana Sumbar mencapai Rp108,38 miliar",
  date: "Senin, 20 Mei 2024 9:23 WIB",
  image: placeholderHorizontal,
  content: [
    "Badan Penanggulangan Bencana Daerah (BPBD) Sumatera Barat (Sumbar) menyatakan kerugian sementara akibat bencana banjir dan banjir bandang yang melanda sejumlah wilayah di provinsi itu berdasarkan hitung cepat diperkirakan mencapai Rp108,38 miliar.",
    "Juru Bicara BPBD Sumbar Ilham di Padang, Senin, mengatakan data kerugian sebesar Rp108,38 miliar itu masih bisa berubah seiring proses pendataan yang terus dilakukan petugas di lapangan.",
    "Ia mengatakan data yang ada saat ini sebenarnya memasukkan akumulatif komponen kerusakan dan kerugian, karena masih berupa data hitung cepat. Nantinya data tersebut akan dipisahkan.",
    "Ilham merinci data sementara, untuk Kabupaten Agam diperkirakan kerugian mencapai Rp79,85 miliar, Padang Panjang Rp28,18 miliar, sementara untuk Kabupaten Tanah Datar yang terdampak dalam penghitungan.",
    "Data hitung cepat tersebut juga memasukkan dampak bencana yang terjadi di Kabupaten Padang Pariaman yang menjadi hilir dari Sungai Batang Anai yang meluap pada Sabtu (11/5). Kerugian di Padang Pariaman diperkirakan mencapai Rp0,12 juta.",
    "Bencana yang melanda tiga daerah di Sumbar pada Sabtu (11/5) mengakibatkan 41 orang meninggal dunia dan 11 orang masih dalam pencarian.",
    "Dari 11 orang itu, menurut Ilham, satu orang di Kabupaten Agam dan sisanya di Kabupaten Tanah Datar. \"Tim SAR bersama tim gabungan masih terus melakukan pencarian di lapangan. Pencarian diperluas hingga ke perbatasan Riau,\" katanya.",
    "Selain menelan korban jiwa, bencana tersebut membuat ribuan orang harus mengungsi karena rumah yang ditempati rusak atau karena berada di zona merah.",
    "Data sementara di Kabupaten Agam sebanyak 196 jiwa mengungsi, Padang Panjang sebanyak 291 orang mengungsi, di Kabupaten Tanah Datar 3.020 orang mengungsi. Warga yang mengungsi juga terjadi di Kabupaten Padang Pariaman sebanyak 35 KK.",
    "Bencana juga mengakibatkan kerusakan parah pada pemukiman warga, infrastruktur sekolah, tempat ibadah, puskesmas hingga putusnya sejumlah ruas jalan dan jembatan."
  ],
  author: "Tim Redaksi Sumbar Smart Portal"
};

// Mock related news
const relatedNews = [
  {
    id: 2,
    title: "Respons Cepat Kebakaran di Pasa Gadang, Pemprov Sumbar Salurkan 317 Kilogram Beras",
    date: "10 Oktober 2023, 21:11 WIB",
    image: placeholderHorizontal,
    slug: "respons-cepat-kebakaran"
  },
  {
    id: 3,
    title: "Banjir Bandang di Sumatera Barat, Korban Tewas Bertambah jadi 34 Orang",
    date: "Minggu, 12 Mei 2024, 20:15:00 WIB",
    image: placeholderHorizontal,
    slug: "banjir-bandang-sumbar"
  }
];

export default function BeritaDetailPage() {
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const slug = params.slug;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BeritaDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center gap-2 text-sm text-foreground-600 mb-3 justify-center">
            <span>{newsDetailData.date}</span>
          </div>
          <h1 className="text-4xl px-12 md:text-5xl font-bold tracking-tighter">
            {newsDetailData.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto">
          {/* Main Image Section */}
          <section className="mb-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-md">
              <Image
                src={newsDetailData.image}
                alt={newsDetailData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </section>

          {/* Article Content Section */}
          <section className="mb-16">
            <div className="prose max-w-none">
              {newsDetailData.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Author Section */}
          <section className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-2xl font-bold">Penulis</h2>
              <div className="h-[3px] flex-grow bg-black"></div>
            </div>
            <p className="text-foreground-600">{newsDetailData.author}</p>
          </section>

          {/* Related News Section */}
          <section className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-2xl font-bold">Berita Terkait</h2>
              <div className="h-[3px] flex-grow bg-black"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((news) => (
                <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-foreground-500 mb-3">{news.date}</p>
                    <Link href={`/informasi/berita/${news.slug}`}>
                      <Button
                        size="sm"
                        className="text-sm bg-transparent text-blue-600 hover:bg-blue-50 px-0"
                      >
                        Info Selengkapnya →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Back Button Section */}
          <section className="mb-8">
            <div className="flex justify-center">
              <Link href="/informasi/berita">
                <Button 
                  className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95"
                  startContent={<ArrowLeft size={20} />}
                >
                  Kembali ke Berita
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function BeritaDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <Skeleton className="h-4 w-32 mx-auto rounded-lg mb-3" />
          <Skeleton className="h-12 w-3/4 mx-auto rounded-lg mb-4" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Image Skeleton */}
          <section className="mb-16">
            <Skeleton className="aspect-[16/9] rounded-lg w-full" />
          </section>

          {/* Content Skeleton */}
          <section className="mb-16">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <React.Fragment key={item}>
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-5/6 rounded-lg" />
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Author Skeleton */}
          <section className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <Skeleton className="h-8 w-32 rounded-lg" />
              <div className="h-[3px] flex-grow bg-gray-200"></div>
            </div>
            <Skeleton className="h-6 w-48 rounded-lg" />
          </section>

          {/* Related News Skeleton */}
          <section className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <div className="h-[3px] flex-grow bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="aspect-[16/9] rounded-t-lg" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-full rounded-lg mb-2" />
                    <Skeleton className="h-4 w-32 rounded-lg mb-3" />
                    <Skeleton className="h-4 w-24 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Back Button Skeleton */}
          <section className="mb-8">
            <div className="flex justify-center">
              <Skeleton className="h-12 w-48 rounded-full" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}