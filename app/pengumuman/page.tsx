import CardPengumuman from "@/components/card_pengumuman";
import { getPengumuman } from "@/utils/pengumuman-queries";

export default async function PengumumanPage() {
  const pengumumanData = await getPengumuman();

  return (
    <div className="container mx-auto px-10 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 px-2">Pengumuman</h1>
      
      {pengumumanData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Belum ada pengumuman</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pengumumanData.map((pengumuman) => {
            // Validasi dan normalize status
            const validStatus = pengumuman.status?.toLowerCase() === 'penting' ? 'penting' : 'info';
            
            return (
              <CardPengumuman
                key={pengumuman.id}
                status={validStatus}
                judul={pengumuman.judul}
                desc_preview={pengumuman.deskripsi}
                tanggal={new Date(pengumuman.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                fileUrl={pengumuman.file_url}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}