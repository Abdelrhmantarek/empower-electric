import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  console.log("Images:", images);

  // Handle case when images array is empty
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative h-[450px] rounded-lg overflow-hidden"
        // onClick={() => setLightboxOpen(true)}
      >
        <img
          src={images[currentImageIndex]}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/5 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-white/80 text-black px-4 py-2 rounded-md backdrop-blur-sm">
            Click to enlarge
          </span>
        </div> */}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
              index === currentImageIndex
                ? "ring-2 ring-ev-blue"
                : "ring-1 ring-border hover:ring-ev-blue/50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={image}
              alt={`${alt} - Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[80vh] mx-4">
            <img
              src={images[currentImageIndex]}
              alt={`${alt} - Lightbox Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 bg-white/10 hover:bg-white/20 rounded-full p-2"
              onClick={() => setLightboxOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
