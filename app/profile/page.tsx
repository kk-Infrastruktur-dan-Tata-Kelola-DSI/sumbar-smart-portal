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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Vision and Mission Section */}
        <section className="mb-16">
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

          {/* Yellow Banner */}
          <div className="w-full bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 rounded-lg shadow-md py-2 px-6 flex justify-end items-center text-sm font-semibold text-black mt-12">
            Dikunjungi sebanyak 3.980 kali
          </div>


        </section>

        {/* Organizational Structure Section */}
        <section className="mb-16">
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

          {/* Yellow Banner */}
          <div className="w-full bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 rounded-lg shadow-md py-2 px-6 flex justify-end items-center text-sm font-semibold text-black mt-6">
            Dikunjungi sebanyak 3.980 kali
          </div>

        </section>

        {/* OPD Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Organisasi dan Perangkat Daerah (OPD)
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Daftar Organisasi Perangkat Daerah di Lingkungan Pemerintah Provinsi Sumatera Barat
          </p>

          {/* Secretariat */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sekretariat Daerah</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.slice(0, 3).map((dept, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center font-semibold text-gray-900">
                  {dept.title}
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Dinas Daerah</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.slice(3).map((dept, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 font-semibold text-gray-900">
                  {dept.title}
                </div>
              ))}
            </div>
          </div>

          {/* Bodies & Institutions */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Badan & Lembaga</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bodies.map((body, index) => (
                <div
                  key={index}
                  className="bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg text-center shadow-sm text-base"
                >
                  {body}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}