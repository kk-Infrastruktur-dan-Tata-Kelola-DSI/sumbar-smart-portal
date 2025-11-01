"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const slug = params.slug;
  
  // In a real app, you would fetch the specific article based on the slug
  // For now, we'll just use our mock data

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          {newsDetailData.title}
        </h1>
        
        <p className="text-gray-500 text-sm mb-6">
          {newsDetailData.date}
        </p>
        
        {/* Main Image */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
          <Image
            src={newsDetailData.image}
            alt={newsDetailData.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Article Content */}
        <div className="prose max-w-none">
          {newsDetailData.content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-800">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Author */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Penulis: {newsDetailData.author}
          </p>
        </div>
        
        {/* Related News */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Berita Terkait</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{news.date}</p>
                  <Button
                    size="sm"
                    className="text-sm bg-transparent text-blue-600 hover:bg-blue-50 px-0"
                  >
                    Info Selengkapnya →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <Button
            className="px-8 py-2 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="m12 19-7-7 7-7"></path>
            </svg>
            Kembali ke Berita
          </Button>
        </div>
      </div>
    </div>
  );
}