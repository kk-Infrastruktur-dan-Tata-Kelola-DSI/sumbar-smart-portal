"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Star, MapPin, Calendar, Users, Share2, Heart } from "lucide-react";
import Image from "next/image";
import type { BudayaItemWithRelations } from "@/types/budaya";

interface DetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: BudayaItemWithRelations | null;
}

export default function DetailDialog({ isOpen, onClose, item }: DetailDialogProps) {
  if (!item) return null;

  const buildExplanation = (dest: BudayaItemWithRelations) => {
    const tipe = dest.type ? dest.type.charAt(0).toUpperCase() + dest.type.slice(1) : "Objek";
    const rating = `${dest.rating} dari ${dest.reviews_count || 0} ulasan`;
    const tags = dest.tags && dest.tags.length ? `Tag: ${dest.tags.join(", ")}.` : "";
    const kabName = dest.kabupaten?.name || "";
    const longDesc = dest.long_description || dest.description || "";
    return `${dest.name} adalah ${tipe.toLowerCase()} di ${kabName}. ${longDesc} Rating pengunjung ${rating}. ${tags}`.trim();
  };

  const getTypeIcon = (type: string) => {
    if (type === 'kuliner') return '🍽️';
    if (type === 'tradisi') return '🎎';
    return '📍';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside" radius="lg">
      <ModalContent className="max-h-[90vh] overflow-hidden rounded-3xl">
        {() => (
          <>
            {/* Hero Image Header with Overlay Title */}
            <div className="relative w-full h-72 overflow-hidden">
              <Image 
                src={item.image_url?.startsWith('http') ? item.image_url : `https://${item.image_url}` || "/placeholder.jpg"} 
                alt={item.name} 
                fill 
                className="object-cover" 
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              
              {/* Top Left Badge */}
              <div className="absolute top-4 left-4">
                <Chip 
                  size="sm" 
                  className="bg-warning text-white font-semibold"
                  radius="full"
                >
                  {item.category?.name || item.type}
                </Chip>
              </div>

              {/* Title Overlay - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
                  {item.name}
                </h1>
              </div>
            </div>

            {/* Compact Info Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-warning" />
                  <span className="text-sm font-medium">{item.kabupaten?.name || ""}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-warning text-warning" />
                <span className="text-xl font-bold">{item.rating}</span>
                <span className="text-sm text-foreground-500">({item.reviews_count} Ulasan)</span>
              </div>
            </div>

            <ModalBody className="py-6">
              {/* Main Content */}
              <div className="space-y-6">
                {/* Description Section */}
                <div>
                  <h3 className="text-base font-semibold mb-3">{item.name}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Full Explanation */}
                <div>
                  <p className="text-sm text-foreground-700 leading-relaxed">
                    {buildExplanation(item)}
                  </p>
                </div>

              

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <Chip 
                        key={idx} 
                        size="sm" 
                        variant="flat"
                        radius="full"
                        className="text-xs"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="bg-white">
              <Button variant="light" onPress={onClose} radius="full">
                Tutup
              </Button>
              <Button color="warning" variant="solid" onPress={onClose} radius="full">
                Kunjungi Sekarang
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
