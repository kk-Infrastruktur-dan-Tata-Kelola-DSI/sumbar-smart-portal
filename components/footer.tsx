"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a2332] text-gray-300 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Grid Utama */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
          {/* Kolom 1 - Logo dan Deskripsi */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/images/sumbarmap.svg" alt="Sumatera Barat" className="w-10 h-10 object-contain" />
              <h2 className="ml-3 text-white font-semibold text-base">Sumatera Barat</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Portal digital resmi Pemerintah Provinsi Sumatera Barat. Melayani dengan teknologi, berinovasi untuk masa depan.
            </p>
            <div className="flex gap-4 text-gray-500">
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <Facebook size={16} />
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <Twitter size={16} />
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <Instagram size={16} />
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <Globe size={16} />
              </Link>
            </div>
          </div>

          {/* Kolom 2 - Tentang Kami */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Tentang Kami</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Profil Provinsi</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Visi & Misi</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Struktur Organisasi</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Sejarah</Link></li>
            </ul>
          </div>

          {/* Kolom 3 - Layanan */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-amber-400 transition-colors">PPDB Online</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Info Publik</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Sublek</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Survey Kepuasan Masyarakat</Link></li>
            </ul>
          </div>

          {/* Kolom 4 - Informasi */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Berita</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Pengumuman</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Anti Hoax</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Galeri</Link></li>
            </ul>
          </div>
        </div>

        {/* Bagian Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700 pt-10">
          {/* Alamat */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-amber-500/20">
              <MapPin className="text-amber-400" size={18} />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1 text-sm">Alamat</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                Jl. Jenderal Sudirman No. 51<br />
                Padang, Sumatera Barat 25112
              </p>
            </div>
          </div>

          {/* Telepon */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-amber-500/20">
              <Phone className="text-amber-400" size={18} />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1 text-sm">Telepon</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                (0751) 7051711<br />
                Senin - Jumat, 08:00 - 16:00 WIB
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-amber-500/20">
              <Mail className="text-amber-400" size={18} />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1 text-sm">Email</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                info@sumbarprov.go.id<br />
                humas@sumbarprov.go.id
              </p>
            </div>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-xs text-gray-500 border-t border-gray-700 pt-6">
          <p>© 2025 Pemerintah Provinsi Sumatera Barat. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="#" className="hover:text-amber-400 transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}