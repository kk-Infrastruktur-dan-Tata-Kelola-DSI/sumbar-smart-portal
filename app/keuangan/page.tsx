"use client";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Download } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
      color: "default" as const,
    },
    {
      category: "Belanja Barang & Jasa",
      percentage: 83,
      label: "83% dari total belanja",
      color: "default" as const,
    },
    {
      category: "Belanja Modal",
      percentage: 33,
      label: "33% dari total belanja",
      color: "default" as const,
    },
    {
      category: "Belanja Lainnya",
      percentage: 83,
      label: "7% dari total belanja",
      color: "default" as const,
    },
  ];

  const expendituresChart = expenditures.map((e) => ({
    name: e.category,
    nilai: e.percentage,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-black">
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
            <Card key={idx} className="border border-gray-200 shadow-sm">
              <div className="p-6 text-center">
                <h2 className="text-4xl font-semibold text-foreground mb-1">{stat.value}</h2>
                <p className="text-xs text-foreground-500 mb-1">{stat.label}</p>
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
                <Card key={idx} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm truncate">{report.title}</h3>
                          <Chip size="sm" color="warning" variant="flat" className="hidden sm:inline-flex">PDF</Chip>
                        </div>
                        <p className="text-xs text-foreground-500">
                          {report.size} • {report.date}
                        </p>
                      </div>
                    </div>
                    <Button
                      color="warning"
                      variant="flat"
                      size="sm"
                      className="flex-shrink-0"
                      startContent={<Download size={16} />}
                     
                    >
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Expenditures Section with Chart */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Realisasi Belanja</h2>
            <Card className="border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expendituresChart} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={8} />
                      <YAxis tick={{ fontSize: 12 }} unit="%" />
                      <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} formatter={(v: number) => [`${v}%`, "Realisasi"]} />
                      <Bar dataKey="nilai" radius={[4, 4, 0, 0]} fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-foreground-500 mt-3">Komposisi realisasi belanja per kategori (%).</p>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-12 border border-gray-200 shadow-sm">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Transparansi Anggaran</h3>
            <p className="text-sm text-foreground-600 mb-4 max-w-2xl mx-auto">
              Pemerintah Provinsi Sumatera Barat berkomitmen pada pengelolaan keuangan daerah yang transparan dan akuntabel.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button color="default" variant="solid" size="md">
                Lihat Semua Laporan
              </Button>
              <Button color="default" variant="bordered" size="md">
                Hubungi BPKD
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
    </div>
  );
}
