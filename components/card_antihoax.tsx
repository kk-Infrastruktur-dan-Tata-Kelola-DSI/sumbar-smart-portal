
import React from 'react';
import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface CardProps {
    jenis: 'hoax' | 'sebagian' | 'verified';
    judul: string;
    penjelasan: string;
    tanggal: string;
}

export default function CardAntiHoax({ jenis, judul, penjelasan, tanggal }: CardProps) {
    const getCardConfig = () => {
        switch (jenis) {
            case 'hoax':
            return {
                icon: <AlertCircle className="w-6 h-6 text-white" />,
                bgIcon: 'bg-red-600',
                label: 'HOAX',
                labelColor: 'bg-red-600',
                checkColor: 'text-green-600',
                checkBg: 'bg-green-50',
            };
            case 'sebagian':
            return {
                icon: <AlertTriangle className="w-8 h-8 text-white" />,
                bgIcon: 'bg-yellow-500',
                label: 'MISLEADING CONTENT',
                labelColor: 'bg-yellow-500',
                checkColor: 'text-yellow-600',
                checkBg: 'bg-yellow-50',
            };
            case 'verified':
            return {
                icon: <CheckCircle className="w-8 h-8 text-white" />,
                bgIcon: 'bg-green-600',
                label: 'VERIFIED',
                labelColor: 'bg-green-600',
                checkColor: 'text-green-600',
                checkBg: 'bg-green-50',
            };
        }
    };
    
    const config = getCardConfig();
    
    return (
        <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
        <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
        <div className={`${config.bgIcon} rounded-xl p-3 flex items-center justify-center`}>
        {config.icon}
        </div>
        <Chip 
        className={`${config.labelColor} text-white text-xs font-semibold px-3`}
        size="sm"
        >
        {config.label}
        </Chip>
        </div>
        
        <h3 className="text-red-700 font-bold text-base mb-4 leading-tight">
        "{judul}"
        </h3>
        
        <div className={`${config.checkBg} rounded-lg p-3 flex gap-3`}>
        <CheckCircle className={`${config.checkColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
        <p className="text-sm text-gray-700 leading-relaxed">
        {penjelasan}
        </p>
        </div>
        </CardBody>
        
        <CardFooter className="px-6 pb-6 pt-0">
        <p className="text-xs text-gray-500">{tanggal}</p>
        </CardFooter>
        </Card>
    );
}