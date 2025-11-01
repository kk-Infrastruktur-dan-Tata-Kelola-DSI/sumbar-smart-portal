"use client";

import React from "react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Skeleton } from "@heroui/skeleton";

export default function LayananPage() {
  const [loading, setLoading] = useState(true);
  const [isPeriodeOpen, setIsPeriodeOpen] = useState(false);
  const [selectedPeriode, setSelectedPeriode] = useState<string>("");
  const [showNilai, setShowNilai] = useState(false);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const periodeOptions = [
    "Bulan Lalu",
    "Periode 1 (Jan-Apr)",
    "Periode 2 (May-Aug)",
    "Periode 3 (Sep-Dec)",
    "Semester 1 (Jan-Jun)",
    "Semester 2 (Jul-Dec)",
    "Tahun Ini",
    "Tahun Lalu"
  ];

  // Dummy data nilai SKM untuk setiap periode
  const nilaiData: Record<string, { nilai: string; tingkat: string; responden: string }> = {
    "Bulan Lalu": { nilai: "4.69", tingkat: "93%", responden: "1.2K" },
    "Periode 1 (Jan-Apr)": { nilai: "4.65", tingkat: "91%", responden: "4.5K" },
    "Periode 2 (May-Aug)": { nilai: "4.72", tingkat: "94%", responden: "5.1K" },
    "Periode 3 (Sep-Dec)": { nilai: "4.68", tingkat: "92%", responden: "5.4K" },
    "Semester 1 (Jan-Jun)": { nilai: "4.70", tingkat: "93%", responden: "7.8K" },
    "Semester 2 (Jul-Dec)": { nilai: "4.71", tingkat: "93%", responden: "7.2K" },
    "Tahun Ini": { nilai: "4.69", tingkat: "93%", responden: "15K" },
    "Tahun Lalu": { nilai: "4.63", tingkat: "90%", responden: "14.2K" }
  };

  const handleLihatNilai = () => {
    if (selectedPeriode) {
      setShowNilai(true);
    } else {
      alert("Silakan pilih periode terlebih dahulu");
    }
  };

  if (loading) {
    return <LayananSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <div className="text-black">
        <div className="container mx-auto px-4 pt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Survey Kepuasan Masyarakat
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Survey Kepuasan Masyarakat adalah pengukuran tingkat kepuasan masyarakat terhadap kualitas pelayanan yang diberikan oleh unit pelayanan publik.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {/* Rata-rata Kepuasan */}
          <div className="bg-white border-4 border-yellow-400 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl md:text-6xl font-bold text-red-600 mb-3">
              4.7
            </div>
            <p className="text-base md:text-lg font-semibold text-gray-900">
              Rata-rata Kepuasan
            </p>
          </div>

          {/* Tingkat Kepuasan */}
          <div className="bg-white border-4 border-yellow-400 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl md:text-6xl font-bold text-red-600 mb-3">
              92%
            </div>
            <p className="text-base md:text-lg font-semibold text-gray-900">
              Tingkat Kepuasan
            </p>
          </div>

          {/* Total Responden */}
          <div className="bg-white border-4 border-yellow-400 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl md:text-6xl font-bold text-red-600 mb-3">
              15K
            </div>
            <p className="text-base md:text-lg font-semibold text-gray-900">
              Total Responden
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {/* Pilih Periode Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPeriodeOpen(!isPeriodeOpen)}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-xl py-4 px-6 text-center font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {selectedPeriode || "Pilih Periode"}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isPeriodeOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isPeriodeOpen && (
              <>
                <div
                  className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm transition-opacity"
                  onClick={() => setIsPeriodeOpen(false)}
                ></div>
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 border border-gray-200">
                  <div className="py-2">
                    {periodeOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedPeriode(option);
                          setIsPeriodeOpen(false);
                        }}
                        className={`w-full px-6 py-3.5 text-left hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${selectedPeriode === option ? 'bg-yellow-50 text-gray-900' : 'text-gray-700'
                          }`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 transform transition-transform duration-300" style={{
                          transform: selectedPeriode === option ? 'translateX(0)' : 'translateX(-100%)'
                        }}></div>
                        <svg
                          className={`w-4 h-4 text-yellow-500 transition-opacity duration-200 ${selectedPeriode === option ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-200">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleLihatNilai}
            className="bg-white rounded-xl py-4 px-6 text-center font-bold text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 border-2"
            style={{ borderColor: '#d48b00' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d48b00' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Lihat Nilai
          </button>
          <a
            href="/file/SEPAKAT - Manual Book.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-yellow-400 rounded-xl py-4 px-6 text-center font-bold text-gray-900 hover:bg-yellow-50 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Manual Book
          </a>
        </div>
      </div>

      {/* Modal Nilai SKM */}
      {showNilai && selectedPeriode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nilai SKM Provinsi Sumatera Barat</h2>
                <p className="text-gray-500 mt-1">{selectedPeriode}</p>
              </div>
              <button
                onClick={() => setShowNilai(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nilai Utama */}
            <div className="rounded-xl p-8 mb-6 border-2" style={{ borderColor: '#d48b00' }}>
              <p className="text-base text-gray-700 mb-3 font-medium text-center">Nilai SKM</p>
              <div className="text-7xl font-bold text-center mb-3" style={{ color: '#d48b00' }}>
                {nilaiData[selectedPeriode].nilai}
              </div>
              <div className="flex items-center justify-center gap-2" style={{ color: '#d48b00' }}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">Sangat Baik</span>
              </div>
            </div>

            {/* Detail Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl p-6 border-2" style={{ borderColor: '#d48b00' }}>
                <p className="text-sm text-gray-600 mb-2">Tingkat Kepuasan</p>
                <p className="text-4xl font-bold" style={{ color: '#d48b00' }}>{nilaiData[selectedPeriode].tingkat}</p>
              </div>
              <div className="rounded-xl p-6 border-2" style={{ borderColor: '#d48b00' }}>
                <p className="text-sm text-gray-600 mb-2">Total Responden</p>
                <p className="text-4xl font-bold" style={{ color: '#d48b00' }}>{nilaiData[selectedPeriode].responden}</p>
              </div>
            </div>

            {/* Info Footer */}
            <div className="rounded-xl p-4 flex items-start gap-3 mb-6 border" style={{ borderColor: '#d48b00' }}>
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#d48b00' }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-600 leading-relaxed">
                Data ini merupakan hasil survey kepuasan masyarakat terhadap pelayanan publik di Provinsi Sumatera Barat untuk periode <span className="font-semibold">{selectedPeriode}</span>.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowNilai(false)}
              className="w-full text-white font-bold py-4 rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: '#d48b00' }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LayananSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <Skeleton className="h-12 w-80 mx-auto rounded-lg mb-4" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            {/* Statistics Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-8 border-4 border-gray-200">
                  <Skeleton className="h-16 w-24 mx-auto rounded-lg mb-3" />
                  <Skeleton className="h-6 w-32 mx-auto rounded-lg" />
                </div>
              ))}
            </div>

            {/* Action Buttons Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
