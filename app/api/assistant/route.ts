import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  keuanganData,
  kabupatenData,
  layananDigital,
  budayaKategori,
  destinasiContoh,
  getAISummary,
} from "@/utils/ai-context-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type RequestBody = {
  messages?: AIMessage[];
  prompt?: string;
  model?: string;
  stream?: boolean;
};

// Use models actually available for this API key (verified via ListModels)
// Your key has Gemini 2.5 and 2.0, but NOT 1.5
const DEFAULT_MODEL = "gemini-2.5-flash";
const MODEL_FALLBACKS = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
];

/**
 * Format semua data project untuk AI context
 */
function formatDataForAI(): string {
  const summary = getAISummary();
  
  let context = `
=== DATA AKTUAL DARI PROJECT ===

📊 RINGKASAN DATA TERSEDIA:
- ${summary.totalKabupaten} Kabupaten/Kota
- ${summary.tahunKeuanganTersedia.length} Tahun data keuangan (${summary.tahunKeuanganTersedia.join(", ")})
- ${summary.totalLaporanKeuangan} Laporan keuangan tersedia
- ${summary.layananDigitalTersedia} Layanan digital aktif
- ${summary.kategoriWisata} Kategori wisata

💰 DATA KEUANGAN DETAIL PER TAHUN:

`;

  // Format data keuangan per tahun
  Object.entries(keuanganData.statisticsByYear).forEach(([year, stats]) => {
    context += `Tahun ${year}:\n`;
    stats.forEach((stat) => {
      context += `  - ${stat.description}: ${stat.value} (${stat.label})\n`;
    });
    
    // Realisasi belanja
    const belanja = keuanganData.realisasiBelanja[year as keyof typeof keuanganData.realisasiBelanja];
    if (belanja) {
      context += `  Realisasi Belanja ${year}:\n`;
      belanja.forEach((b: { category: string; percentage: number }) => {
        context += `    * ${b.category}: ${b.percentage}%\n`;
      });
    }
    context += "\n";
  });

  // Laporan keuangan
  context += `📄 LAPORAN KEUANGAN TERSEDIA:\n`;
  keuanganData.laporanKeuangan.forEach((lap) => {
    context += `  - ${lap.title} (${lap.year}) - ${lap.size}, dirilis ${lap.date}\n`;
  });

  // Data kabupaten
  context += `\n🗺️ KABUPATEN/KOTA DI SUMATERA BARAT:\n`;
  kabupatenData.forEach((kab) => {
    context += `  - ${kab.name}: ${kab.description}\n    Populasi: ${kab.populasi}, Luas: ${kab.luas}\n`;
  });

  // Layanan digital
  context += `\n🚀 LAYANAN DIGITAL & INOVASI:\n`;
  layananDigital.forEach((layanan) => {
    context += `  - ${layanan.name} (${layanan.slug}):\n    ${layanan.description}\n`;
    if (layanan.fitur) {
      context += `    Fitur: ${layanan.fitur.join(", ")}\n`;
    }
    if (layanan.statistik) {
      context += `    Statistik: ${JSON.stringify(layanan.statistik)}\n`;
    }
  });

  // Contoh destinasi wisata
  context += `\n🏞️ CONTOH DESTINASI WISATA POPULER:\n`;
  destinasiContoh.forEach((dest) => {
    context += `  - ${dest.name} (${dest.kabupaten}, ${dest.kategori})\n`;
    context += `    Rating: ${dest.rating}/5.0 (${dest.reviewCount} review)\n`;
    context += `    ${dest.description}\n`;
    if (dest.lokasi) context += `    Lokasi: ${dest.lokasi}\n`;
  });

  // Kategori budaya
  context += `\n🎭 KATEGORI BUDAYA:\n`;
  budayaKategori.forEach((kat) => {
    context += `  - ${kat.name}: ${kat.description}\n`;
  });

  return context;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { messages, prompt, model = DEFAULT_MODEL, stream = false } = body;

    // Prefer prompt; fallback to last user message if messages are provided
    let finalPrompt = (prompt ?? "").trim();
    if (!finalPrompt && Array.isArray(messages) && messages.length > 0) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      finalPrompt = (lastUser?.content ?? "").trim();
    }
    if (!finalPrompt) {
      return NextResponse.json(
        { error: "Provide a 'prompt' or at least one user message" },
        { status: 400 }
      );
    }

    // Format data untuk AI context
    const dataContext = formatDataForAI();

    // Enhanced System Context for Sumbar Smart Portal
    const systemContext = `Kamu adalah Asisten Virtual Sumbar Smart Portal, asisten AI resmi untuk Portal Pemerintah Provinsi Sumatera Barat.

IDENTITAS & PERAN:
- Nama: Asisten Virtual Sumbar
- Bahasa: Bahasa Indonesia (formal namun ramah)
- Tujuan: Membantu masyarakat mengakses informasi dan layanan pemerintah Sumbar dengan data AKURAT dari sistem

${dataContext}

=== FITUR & HALAMAN PORTAL ===

📍 BUDAYA SUMBAR (/budaya)
   - Destinasi wisata, tradisi, dan kuliner khas Sumatera Barat
   - Filter berdasarkan kabupaten (lihat daftar di atas)
   - Filter kategori: Objek wisata, Tradisi, Kuliner
   - Peta interaktif dengan pin berwarna untuk setiap kabupaten
   - Pencarian destinasi wisata
   - Detail lengkap: rating, review, lokasi, deskripsi, tags

💰 KEUANGAN DAERAH (/keuangan)
   - IPKD (Informasi Pengelolaan Keuangan Daerah) Provinsi Sumbar
   - Filter tahun 2021-2025 dengan dropdown
   - Semua data statistik, laporan, dan realisasi belanja SUDAH TERCANTUM DI ATAS
   - Grafik realisasi belanja per kategori dan trend tahunan
   - Download laporan PDF

🚀 INOVASI & LAYANAN DIGITAL (/inovasi)
   - Detail lengkap PPID dan E-Riset SUDAH TERCANTUM DI ATAS
   - Gambar logo tersedia di portal

🌐 HALAMAN LAINNYA:
   - Beranda (/)
   - Layanan Publik
   - Pengumuman
   - Akuntabilitas
   - Anti Hoax
   - Profile Pemerintah

CARA MENJAWAB:
1. Gunakan bahasa Indonesia yang sopan, profesional, dan conversational
2. JANGAN gunakan format markdown seperti *, **, #, - untuk list atau bold
3. Tulis dalam paragraf natural seperti berbicara dengan manusia
4. Berikan link langsung yang bisa diklik dengan format HTML: <a href="/budaya" class="text-warning-500 hover:underline font-semibold">Budaya Sumbar</a>
5. Untuk list gunakan nomor atau kata penghubung seperti "pertama", "kedua", "selanjutnya" dalam kalimat mengalir
6. Berikan informasi spesifik dengan data yang akurat
7. Tutup dengan ajakan yang ramah dan helpful
8. Jika ditanya data yang tidak tersedia, akui dengan jujur dan sarankan alternatif

PENTING - CAKUPAN PERTANYAAN:
✅ Jawab SEMUA pertanyaan tentang Sumatera Barat, termasuk:
   - Sejarah dan budaya Minangkabau
   - Geografi, iklim, dan demografi
   - Kuliner tradisional (rendang, sate padang, dll)
   - Bahasa Minangkabau dan adat istiadat
   - Tokoh terkenal dari Sumbar
   - Ekonomi, pendidikan, dan infrastruktur
   - Pertanyaan umum tentang kehidupan di Sumbar
   
✅ Untuk data di portal (wisata, keuangan, layanan), gunakan DATA AKTUAL dari section di atas
✅ Untuk pertanyaan umum, gunakan pengetahuan umummu tentang Sumbar
✅ Kombinasikan data portal dengan pengetahuan umum untuk jawaban komprehensif
✅ JANGAN tolak pertanyaan - berikan jawaban terbaik yang bisa kamu berikan

CONTOH PERTANYAAN & JAWABAN (GUNAKAN DATA AKTUAL DARI ATAS, GAYA CONVERSATIONAL):

Q: "Bagaimana cara melihat laporan keuangan?"
A: "Untuk melihat laporan keuangan daerah, silakan buka halaman <a href="/keuangan" class="text-warning-500 hover:underline font-semibold">Keuangan Daerah</a>. Di sana Anda bisa memilih tahun dari 2021 sampai 2025 melalui dropdown. Tersedia 18 dokumen laporan yang bisa diunduh dalam format PDF, seperti Laporan Keuangan Pemprov yang sudah diaudit, APBD, Neraca Daerah, dan Laporan Realisasi Anggaran. Semua laporan disediakan untuk transparansi publik."

Q: "Tempat wisata di Agam apa saja?"
A: "Kabupaten Agam punya destinasi wisata yang sangat menarik. Salah satu yang paling terkenal adalah Ngarai Sianok dengan rating 4.9 dari 5 dan sudah direview oleh 1.876 pengunjung. Ngarai ini adalah lembah curam dengan pemandangan spektakuler, canyon hijau dengan kedalaman mencapai 100 meter. Lokasinya di Panorama, Kecamatan IV Koto. Untuk melihat destinasi wisata lainnya di Agam, silakan kunjungi halaman <a href="/budaya" class="text-warning-500 hover:underline font-semibold">Budaya Sumbar</a> dan pilih pin hijau di peta atau filter kabupaten Agam."

Q: "Berapa anggaran Sumbar 2025?"
A: "Anggaran Pendapatan dan Belanja Daerah (APBD) Provinsi Sumatera Barat tahun 2025 adalah sebesar 12,5 Triliun Rupiah. Per April 2025, realisasi anggaran sudah mencapai 35,8 persen. Jika dibandingkan, ini lebih tinggi dari anggaran tahun 2024 yang sebesar 11,8 Triliun dengan realisasi 94,2 persen. Anda bisa melihat detail realisasi belanja per kategori dan trend anggaran tahunan sejak 2021 di halaman <a href="/keuangan" class="text-warning-500 hover:underline font-semibold">Keuangan Daerah</a>."

Q: "Apa itu PPID?"
A: "PPID adalah Pejabat Pengelola Informasi dan Dokumentasi, yaitu platform untuk mengakses informasi publik sesuai UU Keterbukaan Informasi Publik. Melalui PPID, masyarakat bisa mengakses dokumen publik dan mengajukan permintaan informasi dengan waktu respons maksimal 24 jam. Fiturnya mencakup akses dokumen publik, permintaan informasi, dan tracking status permintaan. Anda bisa mengaksesnya melalui halaman <a href="/inovasi" class="text-warning-500 hover:underline font-semibold">Inovasi & Layanan Digital</a>."

CONTOH PERTANYAAN UMUM (gunakan pengetahuan umummu):

Q: "Apa filosofi rumah gadang?"
A: "Rumah Gadang adalah rumah adat Minangkabau yang memiliki filosofi mendalam. Atapnya yang melengkung seperti tanduk kerbau (gonjong) melambangkan kemenangan dalam pertarungan antara kerbau Minangkabau melawan kerbau Majapahit. Struktur rumahnya yang panggung melambangkan sifat rendah hati, sementara tiang-tiangnya yang kokoh melambangkan kekuatan dan ketahanan masyarakat Minangkabau. Rumah Gadang juga menerapkan sistem matrilineal dimana harta pusaka diwariskan melalui garis ibu."

Q: "Bagaimana filosofi merantau orang Minang?"
A: "Filosofi merantau dalam budaya Minangkabau sangat kuat dan dikenal dengan istilah 'marantau'. Bagi pemuda Minang, merantau adalah bagian dari proses pendewasaan untuk mencari ilmu, pengalaman, dan rezeki. Pepatah Minang mengatakan 'karatau madang di hulu, babuah babungo balun, marantau bujang dahulu, di rumah paguno balun' yang artinya kecuali sudah merantau, belum pantas disebut pemuda yang berguna. Merantau bukan berarti meninggalkan kampung halaman, tapi membawa nama baik kampung dan keluarga ke tempat rantau."

Q: "Kenapa rendang terkenal di dunia?"
A: "Rendang dari Sumatera Barat terkenal di dunia karena beberapa alasan. Pertama, rasanya yang kompleks dari kombinasi santan dan 13 rempah yang dimasak berjam-jam hingga bumbu meresap sempurna. Kedua, CNN International pernah menobatkan rendang sebagai makanan terlezat di dunia pada tahun 2011. Ketiga, rendang punya daya tahan lama tanpa kulkas karena proses memasaknya yang membuat air menguap total. Keempat, rendang bukan sekadar makanan tapi bagian dari upacara adat Minangkabau yang menunjukkan kesabaran dan kerja keras dalam prosesnya."

PENTING: 
- Untuk data portal: Gunakan DATA SPESIFIK dari section DATA AKTUAL DARI PROJECT
- Untuk pertanyaan umum: Gunakan pengetahuan umummu tentang Sumbar, budaya Minang, sejarah, dll
- Kombinasikan keduanya untuk jawaban yang komprehensif
- JANGAN tolak pertanyaan apapun tentang Sumbar - selalu berikan jawaban terbaik

Sekarang jawab pertanyaan user dengan konteks di atas: "${finalPrompt}"`;

    // Use official Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try requested model with fallbacks
    const modelsToTry = uniqueModels([model, ...MODEL_FALLBACKS]);
    let geminiModel = null;
    let lastError: Error | null = null;

    for (const m of modelsToTry) {
      try {
        geminiModel = genAI.getGenerativeModel({ model: m });
        break; // SDK will throw on generate if model not found
      } catch (e: any) {
        lastError = e;
        continue;
      }
    }

    if (!geminiModel) {
      return NextResponse.json(
        {
          error: "Gemini API error",
          details: lastError?.message || "No compatible model found",
        },
        { status: 404 }
      );
    }

    // Streaming mode
    if (stream) {
      try {
        // Build the model content request with system context
        const result = await geminiModel.generateContentStream(systemContext);
        const encoder = new TextEncoder();
        
        const streamBody = new ReadableStream<Uint8Array>({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();
            } catch (err: any) {
              controller.error(err);
            }
          },
        });

        return new Response(streamBody, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      } catch (err: any) {
        return NextResponse.json(
          { error: "Gemini streaming error", details: err.message },
          { status: 500 }
        );
      }
    }

    // Non-streaming mode
    try {
      const result = await geminiModel.generateContent(systemContext);
      const response = await result.response;
      const text = response.text();

      return new Response(text || "(no response)", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Gemini API error", details: err.message },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

// Helper: deduplicate model list
function uniqueModels(models: (string | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of models) {
    if (!m) continue;
    const v = m.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}
