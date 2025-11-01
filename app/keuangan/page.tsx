"use client";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Chip } from "@heroui/chip";

export default function KeuanganDaerahPage() {
  const statisticCards = [
    {
      value: "12,5 T",
      label: "Per April 2025",
      description: "Anggaran Pendapatan & Belanja Daerah",
      color: "warning",
    },
    {
      value: "94,2%",
      label: "Realisasi hingga 2024",
      description: "Tingkat Kepuasan",
      color: "warning",
    },
    {
      value: "WTP",
      label: "Opini BPK 2024",
      description: "Wajar Tanpa Pengecualian",
      color: "warning",
    },
  ];

  const reports = [
    {
      title: "Laporan Keuangan Pemprov 2024 (Audited)",
      size: "3.5 MB",
      date: "28 Jan 2025",
    },
    {
      title: "Laporan Keuangan Pemprov 2023 (Audited)",
      size: "3.4 MB",
      date: "15 Feb 2024",
    },
    {
      title: "APBD Tahun Anggaran 2025",
      size: "4.8 MB",
      date: "1 Nov 2024",
    },
    {
      title: "APBD Tahun Anggaran 2024",
      size: "4.3 MB",
      date: "7 Nov 2023",
    },
    {
      title: "Laporan Realisasi Anggaran 2024",
      size: "3.2 MB",
      date: "15 Jan 2025",
    },
    {
      title: "Neraca Daerah 2024",
      size: "2.8 MB",
      date: "15 Jan 2025",
    },
  ];

  const expenditures = [
    {
      category: "Belanja Pegawai",
      percentage: 72,
      label: "72% dari total belanja",
      color: "success" as const,
    },
    {
      category: "Belanja Barang & Jasa",
      percentage: 83,
      label: "83% daeterna bekenjo",
      color: "success" as const,
    },
    {
      category: "Belanja Modal",
      percentage: 33,
      label: "20% car notul bake'yo",
      color: "warning" as const,
    },
    {
      category: "Belanja Lainnya",
      percentage: 83,
      label: "7% daeterna bekenjo",
      color: "success" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className=" text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Keuangan Daerah</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Informasi Pengelolaan Keuangan Daerah (IPKD) Provinsi Sumatera Barat
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statisticCards.map((stat, idx) => (
            <Card key={idx} className="border-2 border-warning shadow-lg">
              <div className="p-8 text-center">
                <h2 className="text-5xl font-bold text-warning mb-2">{stat.value}</h2>
                <p className="text-sm text-warning-600 font-medium mb-3">{stat.label}</p>
                <p className="text-foreground-600 text-sm">{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reports Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Laporan & Dokumen</h2>
            <div className="space-y-4">
              {reports.map((report, idx) => (
                <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-danger rounded-full p-3 flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1 truncate">{report.title}</h3>
                        <p className="text-xs text-foreground-500">
                          {report.size} • {report.date}
                        </p>
                      </div>
                    </div>
                    <Button
                      color="warning"
                      size="sm"
                      className="flex-shrink-0"
                      startContent={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    >
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Expenditures Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Realisasi Belanja</h2>
            <div className="space-y-4">
              {expenditures.map((item, idx) => (
                <Card key={idx} className="border-2 border-warning shadow-md">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-base">{item.category}</h3>
                      <Chip color={item.color} size="sm" variant="flat">
                        {item.percentage}%
                      </Chip>
                    </div>
                    <Progress
                      value={item.percentage}
                      color={item.color}
                      size="md"
                      className="mb-2"
                    />
                    <p className="text-xs text-foreground-500">{item.label}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="mt-12 bg-gradient-to-r from-warning-50 to-warning-100 border-2 border-warning">
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold text-warning-900 mb-3">
              Transparansi Anggaran
            </h3>
            <p className="text-foreground-700 mb-6 max-w-2xl mx-auto">
              Pemerintah Provinsi Sumatera Barat berkomitmen untuk mengelola keuangan daerah
              secara transparan dan akuntabel. Semua laporan keuangan dapat diakses oleh
              masyarakat.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button color="warning" variant="solid" size="lg">
                Lihat Semua Laporan
              </Button>
              <Button color="default" variant="bordered" size="lg">
                Hubungi BPKD
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
    </div>
  );
}
