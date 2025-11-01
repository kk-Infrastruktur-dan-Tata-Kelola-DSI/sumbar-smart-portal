"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Building2, Building, Scale, FileText, DollarSign, Package, Heart, Hammer, Users } from "lucide-react";

export default function OPDPage() {
  const [loading, setLoading] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Sekretaris Daerah");

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    "Sekretaris Daerah",
    "Dinas Daerah",
    "Badan Daerah",
    "Rumah Sakit Daerah",
    "Rumah Sakit DPRD"
  ];

  const opdData = {
    "Sekretaris Daerah": [
      { name: "BIRO UMUM", icon: Building },
      { name: "BIRO HUKUM", icon: Scale },
      { name: "BIRO ADMINISTRASI PIMPINAN", icon: FileText },
      { name: "BIRO PEMERINTAHAN DAN OTONOMI DAERAH", icon: Building2 },
      { name: "BIRO PEREKONOMIAN", icon: DollarSign },
      { name: "BIRO PENGADAAN BARANG DAN JASA", icon: Package },
      { name: "BIRO KESEJAHTERAAN RAKYAT", icon: Heart },
      { name: "BIRO ADMINISTRASI PEMBANGUNAN", icon: Hammer },
      { name: "BIRO ORGANISASI", icon: Users }
    ],
    "Dinas Daerah": [
      { name: "DINAS PENDIDIKAN", icon: FileText },
      { name: "DINAS KESEHATAN", icon: Heart },
      { name: "DINAS PEKERJAAN UMUM DAN PENATAAN RUANG", icon: Hammer },
      { name: "DINAS PERUMAHAN DAN KAWASAN PERMUKIMAN", icon: Building },
      { name: "DINAS SOSIAL", icon: Users },
      { name: "DINAS TENAGA KERJA DAN TRANSMIGRASI", icon: Users },
      { name: "DINAS PEMBERDAYAAN PEREMPUAN DAN PERLINDUNGAN ANAK", icon: Heart },
      { name: "DINAS PANGAN", icon: Package },
      { name: "DINAS LINGKUNGAN HIDUP", icon: Building2 },
      { name: "DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL", icon: FileText },
      { name: "DINAS PEMBERDAYAAN MASYARAKAT DAN DESA", icon: Users },
      { name: "DINAS PERHUBUNGAN", icon: Building2 }
    ],
    "Badan Daerah": [
      { name: "BADAN PERENCANAAN PEMBANGUNAN DAERAH", icon: Building2 },
      { name: "BADAN KEUANGAN DAERAH", icon: DollarSign },
      { name: "BADAN KEPEGAWAIAN DAERAH", icon: Users },
      { name: "BADAN PENDAPATAN DAERAH", icon: DollarSign },
      { name: "BADAN PENGELOLAAN KEUANGAN DAN ASET DAERAH", icon: Package },
      { name: "BADAN PENANGGULANGAN BENCANA DAERAH", icon: Building2 },
      { name: "BADAN KESATUAN BANGSA DAN POLITIK", icon: Building },
      { name: "BADAN PENELITIAN DAN PENGEMBANGAN", icon: FileText }
    ],
    "Rumah Sakit Daerah": [
      { name: "RUMAH SAKIT UMUM DAERAH ACHMAD MOCHTAR", icon: Heart },
      { name: "RUMAH SAKIT UMUM DAERAH DR. RASIDIN", icon: Heart },
      { name: "RUMAH SAKIT JIWA PROF. HB. SAANIN", icon: Heart },
      { name: "RUMAH SAKIT KHUSUS PARU", icon: Heart },
      { name: "RUMAH SAKIT GIGI DAN MULUT", icon: Heart },
      { name: "RUMAH SAKIT ISWANDI", icon: Heart }
    ],
    "Rumah Sakit DPRD": [
      { name: "SEKRETARIAT DPRD PROVINSI SUMATERA BARAT", icon: Building },
      { name: "BAGIAN UMUM DAN PROTOKOL", icon: FileText },
      { name: "BAGIAN KEUANGAN", icon: DollarSign },
      { name: "BAGIAN PERSIDANGAN DAN PERUNDANG-UNDANGAN", icon: Scale },
      { name: "BAGIAN HUBUNGAN MASYARAKAT", icon: Users }
    ]
  };

  if (loading) {
    return <OPDSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Repositori OPD
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 justify-center">
            <Building2 size={16} />
            <span>OPD Sumbar adalah singkatan dari Organisasi Perangkat Daerah di Provinsi Sumatera Barat.</span>
          </div>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            OPD Sumbar adalah singkatan dari Organisasi Perangkat Daerah di Provinsi Sumatera Barat, yaitu unit kerja pemerintah provinsi yang bertugas melaksanakan fungsi-fungsi pemerintahan dan pelayanan publik di tingkat provinsi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <section className="mb-16">
          <div className="max-w-7xl mx-auto">
            {/* Tabs Navigation */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  color={selectedTab === tab ? "warning" : "default"}
                  variant={selectedTab === tab ? "solid" : "bordered"}
                  size="md"
                  className={`flex-shrink-0 font-medium ${
                    selectedTab === tab 
                      ? "bg-gradient-to-r from-[#F0B100] to-[#FFB900] text-white" 
                      : "border-default-300 hover:border-warning"
                  }`}
                  onPress={() => setSelectedTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* OPD Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opdData[selectedTab as keyof typeof opdData].map((opd, index) => {
                const IconComponent = opd.icon;
                return (
                  <Card 
                    key={index} 
                    className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                    isPressable
                  >
                    <CardBody className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="bg-gradient-to-r from-[#F0B100] to-[#FFB900] rounded-full p-4">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase leading-tight">
                          {opd.name}
                        </h3>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {opdData[selectedTab as keyof typeof opdData].length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Data Belum Tersedia
                </h3>
                <p className="text-gray-600">
                  Data untuk kategori {selectedTab} akan segera ditambahkan.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function OPDSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <Skeleton className="h-12 w-80 mx-auto rounded-lg mb-4" />
          <Skeleton className="h-6 w-96 mx-auto rounded-lg mb-3" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <section className="mb-16">
          <div className="max-w-7xl mx-auto">
            {/* Tabs Skeleton */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-lg flex-shrink-0" />
              ))}
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <CardBody className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Skeleton className="h-14 w-14 rounded-full" />
                      <Skeleton className="h-5 w-full rounded-lg" />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
