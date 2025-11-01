import StackedCarousel from "@/components/carousel";
import { Button, ButtonGroup } from "@heroui/button";
import Image from "next/image";
import placeholderImage from "@/public/images/placholder-vertical.jpg";

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

                <div className="flex justify-center mt-6 mb-8">
                    <Button
                        className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95"
                    >
                        Lihat Semua Berita
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </Button>
                </div>

                <section className="container mx-auto px-16 py-8">
                <div className="flex items-center gap-6 mb-6">
                        <h2 className="text-2xl font-bold">Infografis</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                            <Image
                                src={placeholderImage}
                                alt="Infografis 1"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                            <Image
                                src={placeholderImage}
                                alt="Infografis 2"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                            Lihat Semua Infografis
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </div>
                </section>

                {/* Update Image components in Foto section */}
                <section className="container mx-auto px-16 py-8">
                    <div className="flex items-center gap-6 mb-6">
                        <h2 className="text-2xl font-bold">Foto</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="relative aspect-square rounded-lg overflow-hidden">
                                <Image
                                    src={placeholderImage}
                                    alt={`Foto ${item}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                            Lihat Semua Foto
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </div>
                </section>

                {/* Update Image components in Video section */}
                <section className="container mx-auto px-16 py-8">
                    <div className="flex items-center gap-6 mb-6">
                        <h2 className="text-2xl font-bold">Video</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="relative aspect-video rounded-lg overflow-hidden group">
                                <Image
                                    src={placeholderImage}
                                    alt={`Video ${item}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" className="transform scale-75 md:scale-100">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button className="px-10 py-3 rounded-full font-medium text-base flex items-center gap-2 bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white hover:from-[#FFB900] hover:to-[#ffdd00] hover:shadow-lg shadow-md transition-all duration-300 hover:brightness-105 active:scale-95">
                            Lihat Semua Video
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </div>
                </section>

                {/* Update Image components in Index Agenda section */}
                <section className="container mx-auto px-16 py-8">
                    <div className="flex items-center gap-6 mb-6">
                        <h2 className="text-2xl font-bold">Index Agenda</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={placeholderImage}
                                    alt="Webinar Renotech"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Webinar Renotech</h3>
                            <p className="text-gray-600 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={placeholderImage}
                                    alt="Webinar Business"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Webinar Business</h3>
                            <p className="text-gray-600 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        </div>
                    </div>
                </section>

                {/* Pedoman Teknis Section */}
                <section className="container mx-auto px-16 py-8">
                    <div className="flex items-center gap-6 mb-6">
                        <h2 className="text-2xl font-bold">Pedoman Teknis</h2>
                        <div className="h-[3px] flex-grow bg-black"></div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                                    PDF
                                </div>
                                <div>
                                    <h3 className="font-medium">Pedoman teknis aplikasi web versi {item}.0</h3>
                                    <p className="text-sm text-gray-500">2.5 MB</p>
                                </div>
                                <Button className="ml-auto px-6 py-2 rounded-full text-sm bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white">
                                    Download
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
