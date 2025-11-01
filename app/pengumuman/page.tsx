import Footer from "@/components/footer";
import CardPengumuman from "@/components/card_pengumuman";

const pengumumanData = [
  {
    id: 1,
    status: 'penting' as const,
    judul: "Pembukaan Pendaftaran Beasiswa Unggulan Pemprov",
    desc_preview: "Dibuka pendaftaran beasiswa untuk 1.000 pelajar dan mahasiswa",
    tanggal: "5 Oktober 2025"
  },
  {
    id: 2,
    status: 'info' as const,
    judul: "Laporan Penyelenggaraan Pemerintahan Daerah (LPPD)",
    desc_preview: "LPPD Provinsi Sumatera Barat tahun anggaran 2024 telah dipublikasikan",
    tanggal: "20 Oktober 2025"
  },
  {
    id: 3,
    status: 'penting' as const,
    judul: "Pengumuman Hasil Seleksi CPNS 2025",
    desc_preview: "Hasil seleksi CPNS tahap 1 telah diumumkan. Peserta dapat mengecek hasilnya",
    tanggal: "15 Oktober 2025"
  },
  {
    id: 4,
    status: 'info' as const,
    judul: "Pembaruan Sistem Pelayanan Publik Online",
    desc_preview: "Sistem pelayanan publik akan mengalami maintenance pada 25 Oktober 2025",
    tanggal: "18 Oktober 2025"
  },
  {
    id: 5,
    status: 'penting' as const,
    judul: "Pendaftaran Program Kartu Prakerja Gelombang 50",
    desc_preview: "Dibuka pendaftaran Kartu Prakerja untuk 100.000 peserta di seluruh Indonesia",
    tanggal: "22 Oktober 2025"
  },
  {
    id: 6,
    status: 'info' as const,
    judul: "Rapat Koordinasi Kepala Dinas Se-Sumatera Barat",
    desc_preview: "Akan dilaksanakan rapat koordinasi membahas program kerja triwulan IV",
    tanggal: "28 Oktober 2025"
  },
  {
    id: 7,
    status: 'penting' as const,
    judul: "Vaksinasi Booster Gratis untuk Masyarakat",
    desc_preview: "Pemprov membuka layanan vaksinasi booster gratis di 15 lokasi",
    tanggal: "1 November 2025"
  },
  {
    id: 8,
    status: 'info' as const,
    judul: "Laporan Keuangan Daerah Semester I 2025",
    desc_preview: "Laporan keuangan daerah semester I tahun 2025 tersedia untuk publik",
    tanggal: "10 Oktober 2025"
  },
  {
    id: 9,
    status: 'penting' as const,
    judul: "Pembukaan Lowongan Tenaga Honorer",
    desc_preview: "Dibuka rekrutmen tenaga honorer untuk 50 posisi di berbagai instansi",
    tanggal: "3 November 2025"
  }
];

export default function PengumumanPage() {
  return (
    <div className="container mx-auto px-10 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 px-2">Pengumuman</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pengumumanData.map((pengumuman) => (
          <CardPengumuman
            key={pengumuman.id}
            status={pengumuman.status}
            judul={pengumuman.judul}
            desc_preview={pengumuman.desc_preview}
            tanggal={pengumuman.tanggal}
          />
        ))}
      </div>
    </div>
  );
}