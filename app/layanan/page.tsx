import { Button } from "@heroui/button";

export default function LayananPage() {
    return (
      <>
        <div className="container mx-auto px-8 py-8">
                <h1 className="text-2xl font-bold text-center">
                Survey Kepuasan Masyarakat
                </h1>
                <p className="text-center">
                Survey Kepuasan Masyarakat adalah pengukuran tingkat kepuasan masyarakat terhadap kualitas pelayanan yang diberikan oleh unit pelayanan publik.
                </p>
        </div>

        <div className="container mx-auto px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {/* Rata-rata Kepuasan */}
            <div className="group relative bg-white/80 backdrop-blur-sm border-2 border-amber-400 p-8 md:p-12 lg:p-16 transition-all duration-500 hover:border-amber-500">
              <div className="absolute"></div>
              <div className="relative">
                <div className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 mb-4">
                  4.7
                </div>
                <p className="text-sm md:text-lg font-bold text-slate-700 uppercase tracking-wider">
                  Rata-rata Kepuasan
                </p>
              </div>
            </div>
  
            {/* Tingkat Kepuasan */}
            <div className="group relative bg-white/80 backdrop-blur-sm border-2 border-amber-400 p-8 md:p-12 lg:p-16 transition-all duration-500 hover:border-amber-500">
              <div className="absolute"></div>
              <div className="relative">
                <div className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 mb-4">
                  92%
                </div>
                <p className="text-sm md:text-lg font-bold text-slate-700 uppercase tracking-wider">
                  Tingkat Kepuasan
                </p>
              </div>
            </div>
  
            {/* Total Responden */}
            <div className="group relative bg-white/80 backdrop-blur-sm border-2 border-amber-400 p-8 md:p-12 lg:p-16 transition-all duration-500 hover:border-amber-500">
              <div className="absolute"></div>
              <div className="relative">
                <div className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 mb-4">
                  15K
                </div>
                <p className="text-sm md:text-lg font-bold text-slate-700 uppercase tracking-wider">
                  Total Responden
                </p>
              </div>
            </div>
          </div>

          {/* Aspek Penilaian */}
          <div className="container mx-auto px-16 py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">
              Aspek Penilaian
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Left Column */}
              <div className="space-y-4">
                {[
                  "Persyaratan Pelayanan",
                  "Waktu Pelayanan",
                  "Produk Spesifika Jenis Pelayanan",
                  "Perlakuan Pelaksana",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/90 border border-amber-200/50 hover:border-amber-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
                        {i * 2 + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Right Column */}
              <div className="space-y-4">
                {[
                  "Sistem, Mekanisme & Prosedur",
                  "Biaya/Tarif",
                  "Kompetensi Pelaksana",
                  "Masukkan Pengaduan, Saran",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/90 border border-amber-200/50 hover:border-amber-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
                        {i * 2 + 2}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
                        <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                           Isi Survey Kepuasan
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </div>
          </div>

          
      </>
    );
  }
  