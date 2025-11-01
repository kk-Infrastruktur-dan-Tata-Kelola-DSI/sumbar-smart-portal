"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function InovasiPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* PPID Section - Text Left, Logo Right */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground-900">
              PPID
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <p className="text-foreground-700 leading-relaxed">
                  PPID adalah singkatan dari Pejabat Pengelola Informasi dan Dokumentasi, 
                  yaitu individu atau unit di setiap pemerintah Sumatra Barat yang 
                  bertanggung jawab untuk memberikan informasi kepada publik sesuai 
                  dengan amanat undang-undang. Keberadaan PPID mempermudah 
                  masyarakat untuk mendapatkan informasi dengan cara yang terbuka, 
                  mudah dan informasi yang wajib diumumkan secara berkala hingga 
                  informasi yang harus disediakan setiap saat dan sewaktu-waktu.
                </p>
              </div>

              {/* PPID Logo */}
              <div className="flex justify-center">
                <Card className="w-80 h-80 flex items-center justify-center bg-gray-50 shadow-lg">
                  <div className="text-center p-6">
                    <div className="text-8xl mb-4">🏛️</div>
                    <p className="text-base font-medium text-foreground-600">PPID Logo</p>
                    <p className="text-sm text-foreground-400 mt-2">Placeholder</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Aplikasi SIDADOK Section - Image Left, Text Right */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground-900">
              Aplikasi SIDADOK
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div>
                <Card className="overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4">📱</div>
                      <p className="text-base font-medium text-foreground-600">SIDADOK App</p>
                      <p className="text-sm text-foreground-400 mt-2">Placeholder Image</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Text Content */}
              <div className="space-y-6">
                <p className="text-foreground-700 leading-relaxed">
                  SIDADOK ialah mempermudah ketersediaan data yang sosok dilakukan 
                  antara lain dalam hal kepada Instansi Daerah dan Satuan Kerja Perangkat 
                  Daerah provinsi untuk Ikhtisar yang mudah dikumpulkan oleh Kementerian 
                  Dalam Negeri yang memiliki kompetensi Pusat dan data dalam budaya peringatn 
                  Provinsi.
                </p>
                <Button 
                  color="warning" 
                  size="lg"
                  className="font-semibold px-8"
                  radius="sm"
                >
                  Kunjungi
                </Button>
              </div>
            </div>
          </div>

          {/* Aplikasi E-Riset Section - Text Left, Image Right */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground-900">
              Aplikasi E-Riset
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <p className="text-foreground-700 leading-relaxed">
                  SIDADOK ialah mempermudah ketersediaan data yang sosok dilakukan 
                  antara lain dalam hal kepada Instansi Daerah dan Satuan Kerja Perangkat 
                  Daerah provinsi untuk Ikhtisar yang mudah dikumpulkan oleh Kementerian 
                  Dalam Negeri yang memiliki kompetensi Pusat dan data dalam budaya peringatn 
                  Provinsi.
                </p>
                <Button 
                  color="warning" 
                  size="lg"
                  className="font-semibold px-8"
                  radius="sm"
                >
                  Kunjungi
                </Button>
              </div>

              {/* Image */}
              <div>
                <Card className="overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4">📊</div>
                      <p className="text-base font-medium text-foreground-600">E-Riset App</p>
                      <p className="text-sm text-foreground-400 mt-2">Placeholder Image</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
