"use client"

import { MapPin, Mail, Phone } from "lucide-react"


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

  const bodies = ["Bappeda", "BKD", "Badan Riset & Inovasi Daerah", "Satpol PP", "BPKAD", "DPRD"]

  const contacts = [
    { label: "Lokasi", value: "Jl. Gubernur No. 1, Padang 25000", icon: "📍" },
    { label: "Email", value: "info@sumbarprov.go.id", icon: "✉️" },
    { label: "Telepon", value: "+62 751 27000", icon: "📞" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Vision and Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Visi dan Misi</h2>

          {/* Vision */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-2xl">👁️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visi</h3>
                <p className="text-gray-700 italic text-center text-lg">{visiText}</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Misi</h3>
                <ol className="space-y-3">
                  {misiPoints.map((point, index) => (
                    <li key={index} className="flex gap-4 text-gray-700">
                      <span className="font-bold text-gray-900 flex-shrink-0">{index + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Yellow Banner */}
          <div className="bg-yellow-300 rounded-lg p-6 my-8 flex justify-between items-center">
            <span className="font-semibold text-gray-900">Mekipanggil sebagai 4 Pilar Inti</span>
            <span className="text-gray-900 font-semibold">Mekipanggil sebagai 4 Pilar Inti</span>
          </div>
        </section>

        {/* Organizational Structure Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Struktur Organisasi</h2>

          {/* Org Chart */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 flex justify-center items-start overflow-x-auto">
            <div className="flex flex-col items-center gap-8 min-w-full">
              {/* Top Level */}
              <div className="flex gap-8 justify-center">
                <div className="border-2 border-gray-900 px-6 py-3 min-w-max">
                  <p className="font-bold text-center text-sm">GUBERNUR</p>
                  <p className="font-bold text-center text-sm">WAKIL GUBERNUR</p>
                </div>
                <div className="border-2 border-gray-900 px-6 py-3 min-w-max">
                  <p className="font-bold text-center text-sm">DPRD</p>
                </div>
              </div>

              {/* Second Level */}
              <div className="border-t-2 border-gray-900 w-32"></div>

              <div className="flex gap-8 justify-center">
                <div className="border-2 border-gray-900 px-6 py-3 min-w-max">
                  <p className="font-bold text-center text-sm">SEKRETARIS DAERAH</p>
                  <p className="text-center text-xs mt-1">ASISTEN A</p>
                  <p className="text-center text-xs">ASISTEN B</p>
                  <p className="text-center text-xs">ASISTEN C</p>
                </div>
              </div>

              {/* Third Level */}
              <div className="border-t-2 border-gray-900 w-32"></div>

              <div className="flex gap-12 justify-between">
                <div className="border-2 border-gray-900 px-4 py-3 text-center text-xs font-bold min-w-max">
                  <p>DINAS DAERAH</p>
                  <p>BADAN DAERAH</p>
                  <p>RUMAH SAKIT DAERAH</p>
                  <p>PERUSAHAAN DAERAH</p>
                </div>
                <div className="border-2 border-gray-900 px-6 py-3 min-w-max">
                  <p className="font-bold text-center text-sm">BIRO</p>
                </div>
              </div>
            </div>
          </div>

          {/* Yellow Banner */}
          <div className="bg-yellow-300 rounded-lg p-6 my-8 flex justify-between items-center">
            <span className="font-semibold text-gray-900">Mekipanggil sebagai 4 Pilar Inti</span>
            <span className="text-gray-900 font-semibold">Mekipanggil sebagai 4 Pilar Inti</span>
          </div>
        </section>

        {/* OPD Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Organisasi dan Perangkat Daerah (OPD)</h2>
          <p className="text-center text-gray-600 mb-12">
            Daftar Organisasi Perangkat Daerah di Lingkungan Pemerintah Provinsi Sumatera Barat
          </p>

          {/* Secretariat */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Sekretariat Daerah</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                <p className="font-semibold text-gray-900">Asisten Pemerintahan</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                <p className="font-semibold text-gray-900">Asisten Ekonomi & Pembangunan</p>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Dinas Daerah</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <p className="font-semibold text-gray-900">{dept.title}</p>
                  {dept.subtitle && <p className="text-sm text-gray-600">{dept.subtitle}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Bodies & Institutions */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Badan & Lembaga</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bodies.map((body, index) => (
                <button
                  key={index}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {body}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
