import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import LayananCarousel from "@/components/LayananCarousel";

import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";

export default async function Home() {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").select("id").limit(1);
  const connected = !error;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto mt-8 rounded-t-xl">
      {/* Overlay */}
      <div className="absolute inset-0 left-1/2 -translate-x-1/2 rounded-t-xl bg-yellow-400 z-0 w-[105%] rotate-[1deg]"/>


      {/* Background Image */}
      <Image
        src="/images/gunung.png"
        alt="Gunung Sumatera Barat"
        width={1300}
        height={800}
        className="w-full h-[420px] object-cover rotate-[-1deg] relative z-10"
        priority
      />

      {/* Ornamen Daun */}
      <Image
        src="/images/daun.png"
        alt="Daun"
        width={80}
        height={80}
        className="absolute left-0 bottom-0 z-20"
      />
      <Image
        src="/images/daun.png"
        alt="Daun"
        width={60}
        height={60}
        className="absolute right-10 top-20 z-20"
      />
      <Image
        src="/images/daun.png"
        alt="Daun"
        width={100}
        height={100}
        className="absolute right-0 bottom-0 z-20"
      />

      {/* Content */}
      <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start z-30">
        <div className="flex gap-3 mb-5">
          <button className="bg-yellow-400 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:bg-yellow-500 transition-all flex items-center gap-2">
            Jelajahi Layanan <span className="font-bold">→</span>
          </button>
          <button className="bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-100 transition-all">
            Pelajari Lebih Lanjut
          </button>
        </div>
        <p className="text-white text-sm leading-relaxed max-w-lg drop-shadow-md">
          Portal digital yang menghubungkan pemerintah dan masyarakat. Akses layanan publik,
          informasi terkini, dan berpartisipasi dalam pembangunan daerah.
        </p>
      </div>
    </section>


      {/* Statistik Section */}
      <section className="max-w-5xl mx-auto flex relative -mt-12 z-30 px-4">
        <div className="flex w-full shadow-xl rounded-t-[32px] overflow-hidden">
          <div className="bg-white px-10 py-7 flex-1 border-r border-gray-100">
            <div className="text-sm font-semibold text-gray-800 mb-1.5 text-left tracking-wide">
              Penduduk
            </div>
            <div className="text-3xl font-bold text-orange-500 text-left">
              5.5M+
            </div>
          </div>
          <div className="bg-white px-10 py-7 flex-1">
            <div className="text-sm font-semibold text-gray-800 mb-1.5 text-right tracking-wide">
              Kab/Kota
            </div>
            <div className="text-3xl font-bold text-orange-500 text-right">19</div>
          </div>
        </div>
      </section>

      {/* Video Dokumentasi Section */}
      <section className="bg-yellow-400 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          {/* Kiri: Judul & Deskripsi */}
          <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col justify-start md:pl-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Video Dokumentasi
            </h2>
            <p className="text-gray-800 text-base">
              Video dokumentasi kegiatan dan informasi Pemerintah Provinsi
              Sumatera Barat
            </p>
          </div>
          {/* Kanan: Timeline & Cards */}
          <div className="md:w-2/3 relative flex">
            {/* Timeline Vertical */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-2 flex flex-col items-center z-0">
              <div className="w-6 h-6 bg-black rounded-full mb-2" />
              <div className="flex-1 w-2 bg-black" />
              <div className="w-6 h-6 bg-black rounded-full mt-2" />
            </div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full z-10" style={{ gridAutoRows: 'max-content' }}>
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden self-start">
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/CVPhqts7ZXA"
                    
                    title="Profil Provinsi Sumatera Barat 2024"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-t-xl"
                  ></iframe>
                  <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Profil
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    05:30
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 mb-1">
                    Profil Provinsi Sumatera Barat 2024
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Gambaran umum potensi dan pembangunan Sumbar
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>125K</span>
                    <span>28 Okt 2024</span>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-16">
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/s7cB7joWf7I"
                    title="Upacara Hari Jadi Provinsi Sumatera Barat ke-74"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-t-xl"
                  ></iframe>
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Kegiatan
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    12:45
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 mb-1">
                    Upacara Hari Jadi Provinsi Sumatera Barat ke-74
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Peringatan HUT Provinsi Sumbar tahun 2024
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>89K</span>
                    <span>25 Okt 2024</span>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden self-start">
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/cG-vZg1SrZI"
                    title="Digitalisasi Pelayanan Publik Sumbar"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-t-xl"
                  ></iframe>
                  <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Inovasi
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    08:20
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 mb-1">
                    Digitalisasi Pelayanan Publik Sumbar
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Transformasi digital layanan pemerintahan
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>67K</span>
                    <span>22 Okt 2024</span>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-16">
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/xIKrWBqiS-c"
                    title="Tatanan Normal Baru Pariwisata Sumatera Barat"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-t-xl"
                  ></iframe>
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Pariwisata
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    10:45
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 mb-1">
                    Tatanan Normal Baru Pariwisata Sumatera Barat
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Edukasi dan Sosialisasi Protokol Kesehatan Pariwisata Sumbar 2024
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>79K</span>
                    <span>25 Okt 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terkini & Pengumuman Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Judul & Deskripsi Tengah */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
              Berita Terkini
            </h2>
            <p className="text-center text-gray-500">
              Kabar terbaru seputar pembangunan dan pemerintahan Provinsi Sumatera
              Barat
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Berita Terkini */}
            <div className="md:w-2/3 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Berita 1 */}
                <div className="bg-white rounded-xl border border-yellow-400 shadow-sm overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src="images/placeholder-horizontal.jpg"
                      alt="Berita 1"
                      className="w-full h-44 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Inovasi
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="4"
                            fill="#FBBF24"
                          />
                          <path
                            d="M8 11h8M12 15V7"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </svg>
                        28 Oktober 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="8" r="4" fill="#FBBF24" />
                          <path
                            d="M12 12v4m0 0h4m-4 0H8"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </svg>
                        Humas Pemprov Sumbar
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 mb-1">
                      Gubernur Sumbar Resmikan Program Digitalisasi Pelayanan Publik
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Pemprov Sumbar meluncurkan sistem pelayanan publik berbasis
                      digital untuk meningkatkan kualitas layanan kepada masyarakat.
                    </div>
                    <a
                      href="#"
                      className="text-red-600 font-bold text-sm mt-auto flex items-center gap-1"
                    >
                      Baca Selengkapnya <span>→</span>
                    </a>
                  </div>
                </div>
                {/* Card Berita 2 */}
                <div className="bg-white rounded-xl border border-yellow-400 shadow-sm overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src="images/placeholder-horizontal.jpg"
                      alt="Berita 2"
                      className="w-full h-44 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Prestasi
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="4"
                            fill="#FBBF24"
                          />
                          <path
                            d="M8 11h8M12 15V7"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </svg>
                        25 Oktober 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="8" r="4" fill="#FBBF24" />
                          <path
                            d="M12 12v4m0 0h4m-4 0H8"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </svg>
                        Biro Keuangan
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 mb-1">
                      Sumbar Raih Penghargaan Provinsi Terbaik Pengelolaan Keuangan
                      Daerah
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Provinsi Sumatera Barat meraih penghargaan WTP (Wajar Tanpa
                      Pengecualian) untuk ketujuh kalinya berturut-turut.
                    </div>
                    <a
                      href="#"
                      className="text-red-600 font-bold text-sm mt-auto flex items-center gap-1"
                    >
                      Baca Selengkapnya <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Pengumuman Resmi */}
            <div className="md:w-1/3 flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Pengumuman Resmi
                </h3>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-semibold flex items-center gap-1"
                >
                  Lihat Semua <span>→</span>
                </a>
              </div>
              <div className="flex flex-col gap-4">
                {/* Pengumuman 1 */}
                <div className="bg-white rounded-xl shadow-sm border border-yellow-300 p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      Pengumuman Seleksi CPNS Provinsi Sumbar 2024
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="4"
                          fill="#FBBF24"
                        />
                        <path
                          d="M8 11h8M12 15V7"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      </svg>
                      1 November 2024
                    </div>
                  </div>
                  <span className="text-gray-400 ml-2">→</span>
                </div>
                {/* Pengumuman 2 */}
                <div className="bg-white rounded-xl shadow-sm border border-yellow-300 p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      Pembukaan Pendaftaran Beasiswa Sumbar Cerdas
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="4"
                          fill="#FBBF24"
                        />
                        <path
                          d="M8 11h8M12 15V7"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      </svg>
                      3 November 2024
                    </div>
                  </div>
                  <span className="text-gray-400 ml-2">→</span>
                </div>
                {/* Pengumuman 3 */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-400 p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      Jadwal Pemeliharaan Sistem Informasi
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="4"
                          fill="#3B82F6"
                        />
                        <path
                          d="M8 11h8M12 15V7"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      </svg>
                      5 November 2024
                    </div>
                  </div>
                  <span className="text-gray-400 ml-2">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Masyarakat Section */}
      <LayananCarousel />

    </div>
  );
}
