import StackedCarousel from "@/components/carousel";

export default function InformasiPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center">
                    Berita Terkini
                </h1>
                <p className="text-center">
                    Kabar terbaru seputar pembangunan dan pemerintahan Provinsi
                    Sumatera Barat
                </p>

                <StackedCarousel />

                <section className="container mx-auto px-16 py-8">
                    <div className="flex items-center gap-6">
                        <h2 className="text-2xl font-bold mr-4">Infografis</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                </section>
            </div>
        </>
    );
}
