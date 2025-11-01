"use client"

import { Users2, Megaphone, MapPin, Mail, Phone, Menu, Eye, Target } from "lucide-react"
import Image from "next/image"
import struktur from "@/public/images/struktur.png"

export default function ProfilePage() {
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

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main>
        {/* Vision and Mission Section */}
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="visi-misi">
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
        </section>

        {/* Organizational Structure Section */}
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="struktur">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Struktur Organisasi</h2>

          {/* Image Placeholder - Ganti src dengan gambar struktur organisasi Anda */}
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
        </section>
      </main>
    </div>
  )
}