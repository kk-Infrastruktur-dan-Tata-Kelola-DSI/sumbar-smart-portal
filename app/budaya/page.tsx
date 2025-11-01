"use client";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Search, Filter, MapPin, Star, X, Share2, Heart } from "lucide-react";
import Image from "next/image";
import MapSumbar from "../../components/MapSumbar";
import DetailDialog from "./DetailDialog";
import { createClient } from "@/utils/supabase/client";
import type { BudayaItemWithRelations, KabupatenWithItems } from "@/types/budaya";

export default function BudayaPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");
  const [selectedKabupaten, setSelectedKabupaten] = React.useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<BudayaItemWithRelations | null>(null);
  
  // State untuk data dari database
  const [items, setItems] = React.useState<BudayaItemWithRelations[]>([]);
  const [kabupatens, setKabupatens] = React.useState<KabupatenWithItems[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Load data dari Supabase
  React.useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch kabupatens
        const { data: kabData, error: kabError } = await supabase
          .from("kabupatens")
          .select("*")
          .order("name");

        if (kabError) throw kabError;

        // Fetch budaya items dengan relasi
        const { data: itemsData, error: itemsError } = await supabase
          .from("budaya_items")
          .select(`
            *,
            kabupaten:kabupatens(*),
            category:budaya_categories(*)
          `)
          .eq("status", "published")
          .order("rating", { ascending: false });

        if (itemsError) throw itemsError;

        setKabupatens(kabData || []);
        setItems(itemsData || []);
      } catch (error) {
        console.error("Error loading budaya data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter tipe konten: Objek wisata, Tradisi, Kuliner
  const categories = [
    { name: "Semua", icon: "📋" },
    { name: "Objek", icon: "📍" },
    { name: "Tradisi", icon: "🎎" },
    { name: "Kuliner", icon: "🍽️" },
  ];

  // Convert kabupatens data untuk map component with item counts
  const kabupatenData = kabupatens.map((kab) => {
    const itemCount = items.filter((item) => item.kabupaten?.slug === kab.slug).length;
    return {
      name: kab.name,
      key: kab.slug,
      lat: kab.latitude,
      lng: kab.longitude,
      color: kab.color,
      itemCount: itemCount,
    };
  });

  // Filtering logic
  const filteredDestinations = items.filter((item) => {
    // Filter by search query
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kabupaten?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by type (Semua, Objek, Tradisi, Kuliner)
    const typeMap: Record<string, string> = {
      Objek: "objek",
      Tradisi: "tradisi",
      Kuliner: "kuliner",
    };
    const matchesType =
      selectedCategory === "Semua" || item.type === typeMap[selectedCategory];

    // Filter by kabupaten
    const matchesKabupaten =
      !selectedKabupaten ||
      item.kabupaten?.slug === selectedKabupaten;

    return matchesSearch && matchesType && matchesKabupaten;
  });

  const handleKabupatenClick = (key: string) => {
    // Hanya memfilter daftar berdasarkan kabupaten yang dipilih
    setSelectedKabupaten(key);
  };

  const openDetail = (item: BudayaItemWithRelations) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedItem(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warning mx-auto mb-4"></div>
          <p className="text-foreground-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white ">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-foreground-600 mb-3">
              <span><MapPin></MapPin></span>
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
                  onPress={() => setSelectedKabupaten(null)}
                  startContent={<X size={14} />}
                >
                  Reset Filter
                </Button>
              )}
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDestinations.map((dest) => (
                <Card key={dest.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dest.image_url?.startsWith('http') ? dest.image_url : `https://${dest.image_url}` || "/placeholder.jpg"}
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
                        {dest.kabupaten?.name || ""}
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
                        <span className="text-xs text-foreground-400">({dest.reviews_count})</span>
                      </div>
                    </div>

                    <p className="text-sm text-foreground-600 mb-3 line-clamp-2">
                      {dest.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {dest.tags?.slice(0, 3).map((tag: string, idx: number) => (
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

                    <div className="mt-4 flex justify-end">
                      <Button size="sm" color="warning" variant="flat" onPress={() => openDetail(dest)}>
                        Lihat detail
                      </Button>
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
                <h3 className="font-bold text-lg mb-1">Peta Budaya</h3>
                <p className="text-sm text-foreground-600">Klik pin untuk memfilter semua konten: objek, tradisi, dan kuliner</p>
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
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: kab.color }}
                      ></div>
                      <span className="text-xs font-medium truncate">{kab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog Detail Item */}
      <DetailDialog isOpen={isDetailOpen} onClose={closeDetail} item={selectedItem} />
    </div>
  );
}
