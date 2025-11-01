import CardAntiHoax from "@/components/card_antihoax";
import PopupAntiHoax from "@/components/popup-antihoax";
import AntiHoaxClient from "@/app/anti_hoax/antihoax-client";
import { getAntiHoaxByJenis } from "@/utils/antihoax-queries";
import { AlertTriangle } from 'lucide-react';

export default async function AntiHoaxPage() {
    // Fetch data dari database
    const { hoax, verified } = await getAntiHoaxByJenis();
    
    return (
        <div className="min-h-screen p-8">
            <div className="w-full py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Title Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Anti Hoax
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Klarifikasi dan verifikasi informasi seputar Pemprov Sumatera Barat
                        </p>
                    </div>
                    
                    {/* Warning Alert Box */}
                    <div className="bg-red-600 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
                        {/* Icon */}
                        <div className="bg-yellow-400 rounded-xl p-3 flex-shrink-0">
                            <AlertTriangle className="w-8 h-8 text-gray-900" />
                        </div>
                        
                        {/* Content */}
                        <div className="text-white">
                            <h2 className="text-xl font-bold mb-2">
                                Waspadai Informasi Hoax!
                            </h2>
                            <p className="text-sm leading-relaxed opacity-95">
                                Selalu verifikasi informasi melalui saluran resmi Pemprov Sumbar.
                                <br />
                                Jangan mudah percaya dan menyebarkan informasi yang belum jelas kebenarannya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Pass data ke Client Component */}
            <AntiHoaxClient hoaxData={hoax} verifiedData={verified} />
        </div>
    );
}