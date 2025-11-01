"use client";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Search, Filter, MapPin, Star, X, Share2 , Heart} from "lucide-react";
import Image from "next/image";
import MapSumbar from "../../components/MapSumbar";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";

export default function BudayaPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");
  const [selectedKabupaten, setSelectedKabupaten] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const categories = [
    { name: "Semua", icon: "📋" },
    { name: "Alam", icon: "🏔️" },
    { name: "Budaya", icon: "🎭" },
    { name: "Religi", icon: "🕌" },
    { name: "Kuliner", icon: "🍽️" },
    { name: "Pantai", icon: "🏖️" },
  ];

  // Data kabupaten dengan koordinat geografis untuk peta
  // Koordinat berdasarkan latitude dan longitude sebenarnya
  const kabupatenData = [
    {
      name: "Kota Padang",
      key: "padang",
      lat: -0.9480,
      lng: 100.3631,
      color: "bg-blue-500",
    },
    {
      name: "Kab. Agam",
      key: "agam",
      lat: -0.2209,
      lng: 100.1703,
      color: "bg-green-500",
    },
    {
      name: "Kab. Tanah Datar",
      key: "tanah-datar",
      lat: -0.4797,
      lng: 100.5746,
      color: "bg-purple-500",
    },
    {
      name: "Kab. Lima Puluh Kota",
      key: "lima-puluh-kota",
      lat: 0.0734,
      lng: 100.5296,
      color: "bg-orange-500",
    },
    {
      name: "Kab. Pesisir Selatan",
      key: "pesisir-selatan",
      lat: -1.7223,
      lng: 100.8903,
      color: "bg-teal-500",
    },
    {
      name: "Kab. Solok",
      key: "solok",
      lat: -0.7885,
      lng: 100.6550,
      color: "bg-pink-500",
    },
    {
      name: "Kab. Padang Pariaman",
      key: "padang-pariaman",
      lat: -0.5547,
      lng: 100.2152,
      color: "bg-indigo-500",
    },
    {
      name: "Kota Bukittinggi",
      key: "bukittinggi",
      lat: -0.3039,
      lng: 100.3835,
      color: "bg-red-500",
    },
  ];

  // Fungsi untuk mengkonversi lat/lng ke posisi pixel pada map (Web Mercator)
  // Map bounds (harus selaras dengan view pada Google Maps iframe)
  // Perkiraan batas Sumatera Barat pada zoom yang digunakan:
  //   Latitude: South=-2.2, North=0.7 | Longitude: West=99.2, East=101.8
  const getPixelPosition = (lat: number, lng: number) => {
    const bounds = { north: 0.7, south: -2.2, west: 99.2, east: 101.8 };

    // Konversi latitude ke koordinat Web Mercator (y)
    const merc = (phi: number) => {
      const rad = (Math.PI / 180) * phi;
      const val = Math.log(Math.tan(Math.PI / 4 + rad / 2));
      return val;
    };

    const mercN = merc(bounds.north);
    const mercS = merc(bounds.south);
    const mercLat = merc(lat);

    // Longitude linier (x), Latitude pakai mercator (y)
    const xPct = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const yPct = ((mercN - mercLat) / (mercN - mercS)) * 100;

    return {
      left: `${Math.max(2, Math.min(98, xPct))}%`,
      top: `${Math.max(2, Math.min(98, yPct))}%`,
    };
  };

  // Data destinasi wisata per kabupaten
  const destinationsByKabupaten: Record<string, any[]> = {
    padang: [
      {
        id: 1,
        name: "Pantai Air Manis",
        kabupaten: "Kota Padang",
        rating: 4.8,
        reviews: 1420,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        description: "Pantai indah dengan legenda batu Malin Kundang, menawarkan sunset spektakuler.",
        tags: ["Pantai", "Sunset", "Legenda"],
        category: "Pantai",
      },
      {
        id: 2,
        name: "Masjid Raya Sumbar",
        kabupaten: "Kota Padang",
        rating: 4.9,
        reviews: 1680,
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop",
        description: "Masjid megah dengan arsitektur modern dan tradisional, landmark ikonik Kota Padang.",
        tags: ["Religi", "Arsitektur", "Landmark"],
        category: "Religi",
      },
      {
        id: 3,
        name: "Rumah Makan Sederhana",
        kabupaten: "Kota Padang",
        rating: 4.7,
        reviews: 3000,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
        description: "Restoran legendaris yang menyajikan masakan Padang autentik dengan cita rasa khas.",
        tags: ["Kuliner", "Rendang", "Halal"],
        category: "Kuliner",
      },
    ],
    agam: [
      {
        id: 4,
        name: "Danau Maninjau",
        kabupaten: "Kab. Agam",
        rating: 4.9,
        reviews: 1850,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        description: "Danau indah dengan pemandangan 44 kelok yang menakjubkan dan udara sejuk pegunungan.",
        tags: ["Danau", "Alam", "Road Trip"],
        category: "Alam",
      },
      {
        id: 5,
        name: "Ngarai Sianok",
        kabupaten: "Kab. Agam",
        rating: 4.8,
        reviews: 1200,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        description: "Lembah hijau yang menakjubkan dengan tebing curam dan pemandangan spektakuler.",
        tags: ["Alam", "Hiking", "Fotografi"],
        category: "Alam",
      },
    ],
    "tanah-datar": [
      {
        id: 6,
        name: "Istana Pagaruyung",
        kabupaten: "Kab. Tanah Datar",
        rating: 4.6,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        description: "Istana kerajaan Minangkabau yang megah, menampilkan arsitektur tradisional dan sejarah budaya.",
        tags: ["Budaya", "Sejarah", "Wisata Edukasi"],
        category: "Budaya",
      },
      {
        id: 7,
        name: "Candi Muaro Jambi",
        kabupaten: "Kab. Tanah Datar",
        rating: 4.5,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        description: "Situs candi bersejarah dengan nilai arkeologi tinggi.",
        tags: ["Budaya", "Sejarah", "Arkeologi"],
        category: "Budaya",
      },
    ],
    "lima-puluh-kota": [
      {
        id: 8,
        name: "Lembah Harau",
        kabupaten: "Kab. Lima Puluh Kota",
        rating: 4.9,
        reviews: 1040,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
        description: "Surga tersembunyi dengan tebing tinggi 100 meter, air terjun indah, dan pemandangan menakjubkan.",
        tags: ["Alam", "Hiking", "Air Terjun"],
        category: "Alam",
      },
      {
        id: 9,
        name: "Kelok Sembilan",
        kabupaten: "Kab. Lima Puluh Kota",
        rating: 4.7,
        reviews: 1500,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
        description: "Jalan berkelok dengan pemandangan indah, ikon perjalanan Sumbar.",
        tags: ["Alam", "Road Trip", "Fotografi"],
        category: "Alam",
      },
    ],
    "pesisir-selatan": [
      {
        id: 10,
        name: "Pantai Carocok Painan",
        kabupaten: "Kab. Pesisir Selatan",
        rating: 4.6,
        reviews: 980,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        description: "Pantai dengan pulau kecil yang bisa dicapai dengan jembatan, pemandangan sunset indah.",
        tags: ["Pantai", "Sunset", "Jembatan"],
        category: "Pantai",
      },
    ],
    solok: [
      {
        id: 11,
        name: "Danau Kembar",
        kabupaten: "Kab. Solok",
        rating: 4.7,
        reviews: 750,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        description: "Dua danau yang berdampingan di ketinggian, pemandangan alam yang menawan.",
        tags: ["Danau", "Alam", "Camping"],
        category: "Alam",
      },
    ],
    "padang-pariaman": [
      {
        id: 12,
        name: "Pantai Gandoriah",
        kabupaten: "Kab. Padang Pariaman",
        rating: 4.5,
        reviews: 1100,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        description: "Pantai dengan mercusuar ikonik dan pemandangan laut yang indah.",
        tags: ["Pantai", "Mercusuar", "Sunset"],
        category: "Pantai",
      },
    ],
    bukittinggi: [
      {
        id: 13,
        name: "Jam Gadang",
        kabupaten: "Kota Bukittinggi",
        rating: 4.8,
        reviews: 2500,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        description: "Menara jam ikonik Bukittinggi, simbol kota dengan arsitektur unik.",
        tags: ["Budaya", "Landmark", "Sejarah"],
        category: "Budaya",
      },
      {
        id: 14,
        name: "Lobang Jepang",
        kabupaten: "Kota Bukittinggi",
        rating: 4.6,
        reviews: 1800,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        description: "Gua bersejarah dari masa pendudukan Jepang, wisata edukasi sejarah.",
        tags: ["Sejarah", "Wisata Edukasi", "Gua"],
        category: "Budaya",
      },
    ],
  };

  // Gabungkan semua destinasi
  const allDestinations = Object.values(destinationsByKabupaten).flat();

  const filteredDestinations = allDestinations.filter((dest: any) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.kabupaten.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || dest.category === selectedCategory;
    const matchesKabupaten = !selectedKabupaten || destinationsByKabupaten[selectedKabupaten]?.includes(dest);
    return matchesSearch && matchesCategory && matchesKabupaten;
  });

  const handleKabupatenClick = (key: string) => {
    // Hanya memfilter daftar berdasarkan kabupaten yang dipilih
    setSelectedKabupaten(key);
    // Pastikan dialog tidak dibuka
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedKabupaten(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white ">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-foreground-600 mb-3">
              <span>🏠</span>
              <span>Jelajah Keindahan Sumatera Barat</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground-900 mb-4">
              Budaya Sumbar
            </h1>
            <p className="text-lg text-foreground-700 mb-8 max-w-2xl">
              Menampilkan warisan budaya, kuliner, dan destinasi alam Sumbar dengan
              storytelling visual dan konten interaktif.
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 flex-wrap">
              <Input
                placeholder="Cari destinasi wisata..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="text-foreground-400" size={20} />}
                classNames={{
                  input: "text-base",
                  inputWrapper: "bg-white shadow-sm h-12",
                }}
                className="flex-1 min-w-[280px]"
              />
              <Button
                color="default"
                variant="flat"
                startContent={<Filter size={20} />}
                className="h-12"
              >
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Content - Categories and Destinations */}
          <div className="lg:col-span-7 space-y-6">
            {/* Categories Pills */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "solid" : "bordered"}
                  color={selectedCategory === cat.name ? "warning" : "default"}
                  size="sm"
                  onPress={() => setSelectedCategory(cat.name)}
                  startContent={<span>{cat.icon}</span>}
                  className={selectedCategory === cat.name ? "font-semibold" : ""}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Destinations Count */}
            <div className="flex items-center justify-between">
              <p className="text-foreground-600">
                Menampilkan <span className="font-semibold text-foreground-900">{filteredDestinations.length}</span> destinasi wisata
              </p>
              {selectedKabupaten && (
                <Button
                  size="sm"
                  color="warning"
                  variant="flat"
                  onPress={closeModal}
                  startContent={<X size={14} />}
                >
                  Reset Filter
                </Button>
              )}
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDestinations.map((dest: any) => (
                <Card key={dest.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="bg-white/90 backdrop-blur"
                      >
                        <Heart></Heart>
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="bg-white/90 backdrop-blur"
                      >
                        <Share2></Share2>
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Chip
                        startContent={<span>📍</span>}
                        size="sm"
                        className="bg-white/90 backdrop-blur font-medium"
                      >
                        {dest.kabupaten}
                      </Chip>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base">{dest.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <Star size={14} className="fill-warning text-warning" />
                        <span className="font-semibold text-sm">{dest.rating}</span>
                        <span className="text-xs text-foreground-400">({dest.reviews})</span>
                      </div>
                    </div>

                    <p className="text-sm text-foreground-600 mb-3 line-clamp-2">
                      {dest.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {dest.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <Chip
                          key={idx}
                          size="sm"
                          variant="flat"
                          className="text-xs"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🔍</div>
                <h3 className="text-lg font-semibold mb-2">Tidak ada destinasi ditemukan</h3>
                <p className="text-sm text-foreground-500">Coba ubah kata kunci atau filter pencarian Anda</p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Interactive Map */}
          <div className="lg:col-span-5">
            <Card className="sticky top-4 overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-lg mb-1">Peta Wisata</h3>
                <p className="text-sm text-foreground-600">Klik pin untuk memfilter destinasi</p>
              </div>
              
              <div className="relative h-[600px] bg-white">
                <MapSumbar
                  items={kabupatenData as any}
                  onSelect={(key: string) => handleKabupatenClick(key)}
                  selectedKey={selectedKabupaten}
                />
              </div>

              {/* Map Legend */}
              <div className="p-4 bg-white border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground-700">Kabupaten/Kota</span>
                  <span className="text-xs text-foreground-500">{kabupatenData.length} lokasi</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {kabupatenData.map((kab) => (
                    <button
                      key={kab.key}
                      onClick={() => handleKabupatenClick(kab.key)}
                      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                        selectedKabupaten === kab.key ? "bg-gray-100 ring-2 ring-warning" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${kab.color} flex-shrink-0`}></div>
                      <span className="text-xs font-medium truncate">{kab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Detail Kabupaten */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-white border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {kabupatenData.find(k => k.key === selectedKabupaten)?.name}
                    </h2>
                    <p className="text-sm text-foreground-600 font-normal">
                      Jelajahi budaya dan destinasi wisata di kabupaten ini
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody className="py-6">
                {selectedKabupaten && destinationsByKabupaten[selectedKabupaten] && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-foreground-600">
                        Ditemukan <span className="font-semibold text-foreground-900">
                          {destinationsByKabupaten[selectedKabupaten].length}
                        </span> destinasi wisata
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destinationsByKabupaten[selectedKabupaten].map((dest: any) => (
                        <Card key={dest.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48">
                            <Image
                              src={dest.image}
                              alt={dest.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2">
                              <Chip
                                size="sm"
                                color="warning"
                                variant="solid"
                                className="font-semibold"
                              >
                                {dest.category}
                              </Chip>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-base">{dest.name}</h4>
                              <div className="flex items-center gap-1">
                                <Star size={14} className="fill-warning text-warning" />
                                <span className="font-semibold text-sm">{dest.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-foreground-600 mb-3 line-clamp-2">
                              {dest.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {dest.tags.map((tag: string, idx: number) => (
                                <Chip
                                  key={idx}
                                  size="sm"
                                  variant="flat"
                                  className="text-xs"
                                >
                                  {tag}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
