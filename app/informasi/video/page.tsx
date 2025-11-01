const iframeSrc = "https://www.youtube.com/embed/"
let videos = [
    {
        id: "6U_Fi8FzFYQ"
    },
    {
        id: "DtxIaAY7Qto"
    },
    {
        id: "nZgRsT0t9lk"
    }
]

export default function VideoPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-8">
                Video Kegiatan
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                    <div key={video.id} className="relative aspect-video w-full">
                        <iframe
                            className="absolute inset-0 w-full h-full rounded-xl shadow-md"
                            src={iframeSrc + video.id}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}