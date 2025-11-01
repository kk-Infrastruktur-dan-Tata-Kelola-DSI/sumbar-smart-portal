import CardPengumuman from "@/components/card_pengumuman";

export default function TesPage(){
    return(
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <CardPengumuman
        status="penting"
        judul="Pembukaan Pendaftaran Beasiswa Unggulan Pemprov"
        desc_preview="Dibuka pendaftaran beasiswa untuk 1.000 pelajar dan mahasiswa"
        tanggal="5 Oktober 2025"
      />
      
      <CardPengumuman
        status="info"
        judul="Laporan Penyelenggaraan Pemerintahan Daerah (LPPD)"
        desc_preview="LPPD Provinsi Sumatera Barat tahun anggaran 2024 telah dipublikasikan"
        tanggal="20 Oktober 2025"
      />
    </div>
    )
}