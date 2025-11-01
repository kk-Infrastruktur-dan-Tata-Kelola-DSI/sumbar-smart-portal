"use client"

import React from "react";
import { Users2, Megaphone, MapPin, Mail, Phone, Menu, Eye, Target } from "lucide-react"
import Image from "next/image"
import struktur from "@/public/images/struktur.png"
import { Skeleton } from "@heroui/skeleton";

export default function ProfilePage() {
  const [loading, setLoading] = React.useState(true);
  const visiText = '"Terwujudnya Masyarakat Sumatera Barat yang Agamis, Berkualitas, Berdaulat, dan Sejahtera"'

  const misiPoints = [
    "Meningkatkan kualitas sumber daya manusia yang sehat, berpendidikan, terampil dan berbakat saling menghormati",
    "Meningkatkan tata kelolaan sosial kemasyarakatan berdasarkan Falsafah Adat Basandi Syarak, Syarak Basandi Alkitabiah",
    "Mengembangkan nilai tambah dari produk/jasa dengan inovasi, pertumbuhan, dan perkembangan",
    "Meningkatkan usaha perekonomian dan industri kecil menengah serta ekonomi berbasis digital",
    "Meningkatkan kualitas dan daya saing masyarakat yang mandiri dan kompetitif",
    "Meningkatkan kemandirian energi terbarukan dan efisiensi penggunaan sumber daya",
    "Mewujudkan tata kelola pemerintahan dan pelayanan publik yang bersih, akuntabel serta berkelanjutan",
  ]

  const departments = [
    { title: "Asisten Pemerintahan", subtitle: "" },
    { title: "Asisten Ekonomi & Pembangunan", subtitle: "" },
    { title: "Asisten Administrasi", subtitle: "" },
    { title: "Dinas Pendidikan", subtitle: "" },
    { title: "Dinas Kesehatan", subtitle: "" },
    { title: "Dinas Pekerjaan Umum & Penataan Ruang", subtitle: "" },
    { title: "Dinas Perhubungan", subtitle: "" },
    { title: "Dinas Penanggulangan Bencana", subtitle: "" },
    { title: "Dinas Kominfo & Informatika", subtitle: "" },
    { title: "Dinas Perlindungan Anak & PTIP", subtitle: "" },
    { title: "Dinas Lingkungan Hidup", subtitle: "" },
    { title: "Dinas Kepemudaan & Pariwisata Hari", subtitle: "" },
  ]

  const bodies = ["Bappeda", "BPKAD", "BKD" , "BPBD" ,"Badan Riset & Inovasi Daerah", "Inspektorat Daerah", "Satpol PP"]

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="container mx-auto px-4">
        {/* Vision and Mission Section */}
        <section className="mb-16" id="visi-misi">
          <div className="max-w-6xl mx-auto">
            {/* VISI */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Users2 className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-b from-[#FBBF24] to-[#0F172A] bg-clip-text text-transparent">Visi</h2>
            </div>
            <p className="text-lg italic text-gray-700 mb-12 ml-16">{visiText}</p>

            {/* MISI */}
            <div className="flex items-center gap-4 mb-8 mt-12">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Megaphone className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-b from-[#FBBF24] to-[#0F172A] bg-clip-text text-transparent">Misi</h2>
            </div>
            <ol className="ml-16 space-y-3 text-gray-700 text-base">
              {misiPoints.map((point, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-bold text-gray-900">{index + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Organizational Structure Section */}
        <section className="mb-16" id="struktur">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Struktur Organisasi</h2>

            {/* Image Placeholder */}
            <div className="bg-gray-50 rounded-xl p-8 flex justify-center">
              <div className="relative w-full max-w-4xl">
                <Image
                  src={struktur}
                  alt="Struktur Organisasi Pemerintah Provinsi Sumatera Barat"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* Vision and Mission Skeleton */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            {/* VISI Skeleton */}
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
            <Skeleton className="h-6 w-full max-w-2xl ml-16 rounded-lg mb-12" />

            {/* MISI Skeleton */}
            <div className="flex items-center gap-4 mb-8 mt-12">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
            <div className="ml-16 space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-6 w-6 rounded-lg" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Organizational Structure Skeleton */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-10 w-80 mx-auto rounded-lg mb-12" />
            <div className="bg-gray-50 rounded-xl p-8 flex justify-center">
              <Skeleton className="w-full max-w-4xl aspect-[3/2] rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}