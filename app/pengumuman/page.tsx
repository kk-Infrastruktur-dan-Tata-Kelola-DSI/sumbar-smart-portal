import { Suspense } from "react";
import CardPengumuman from "@/components/card_pengumuman";
import { getPengumuman } from "@/utils/pengumuman-queries";
import { Skeleton } from "@heroui/skeleton";
import Link from "next/link";

interface PageProps {
  searchParams: { page?: string };
}

export default async function PengumumanPage({ searchParams }: PageProps) {
  const pengumumanData = await getPengumuman();
  
  const ITEMS_PER_PAGE = 9;
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(pengumumanData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = pengumumanData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Pengumuman
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Informasi dan pengumuman resmi Pemprov Sumatera Barat
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Suspense fallback={<PengumumanSkeleton />}>
          {pengumumanData.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-600">Belum ada pengumuman</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedData.map((pengumuman) => {
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-3 mt-10">
                  <div className="flex items-center gap-1">
                    {/* Previous Button */}
                    <Link
                      href={`?page=${currentPage - 1}`}
                      className={`p-2 rounded-md transition-all ${
                        currentPage === 1
                          ? 'pointer-events-none opacity-40 text-gray-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        const showPage = 
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1);
                        
                        const showEllipsis = 
                          (page === currentPage - 2 && currentPage > 3) ||
                          (page === currentPage + 2 && currentPage < totalPages - 2);

                        if (showEllipsis) {
                          return (
                            <span key={page} className="px-2 text-gray-400 text-sm">
                              ···
                            </span>
                          );
                        }

                        if (!showPage) return null;

                        return (
                          <Link
                            key={page}
                            href={`?page=${page}`}
                            className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                              currentPage === page
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <Link
                      href={`?page=${currentPage + 1}`}
                      className={`p-2 rounded-md transition-all ${
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-40 text-gray-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Info */}
                  <p className="text-xs text-gray-500">
                    {startIndex + 1}–{Math.min(endIndex, pengumumanData.length)} dari {pengumumanData.length} pengumuman
                  </p>
                </div>
              )}
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}

function PengumumanSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-6 w-full rounded-lg mb-3" />
          <Skeleton className="h-4 w-full rounded-lg mb-2" />
          <Skeleton className="h-4 w-5/6 rounded-lg mb-2" />
          <Skeleton className="h-4 w-4/6 rounded-lg" />
          <div className="flex justify-end mt-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}