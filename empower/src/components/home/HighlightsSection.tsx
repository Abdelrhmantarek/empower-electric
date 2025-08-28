import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { fetchCars } from "@/data/cars";
import { useLanguage } from "../Layout"; // Add useLanguage hook

export default function HighlightsSection() {
  const [carHighlights, setCarHighlights] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { language } = useLanguage(); // Add language context
  const t = translations[language]; // Use translations based on language

  useEffect(() => {
    const loadCars = async () => {
      const cars = await fetchCars();
      const formattedHighlights = cars.map(car => ({
        id: car.id,
        name: `${car.make} ${car.model}`,
        subtitle: car.shortDescription.split(" ").slice(0, 2).join(" ") || "Featured",
        image: car.mainImage,
        description: car.shortDescription,
        specs: {
          range: car.specs.range,
          acceleration: car.specs.acceleration,
          topSpeed: car.specs.topSpeed,
        },
        colors: car.colors, // Include colors array from the car data
      })).filter(car => car.image);
      setCarHighlights(formattedHighlights);
    };
    loadCars();
  }, []);

  const handleCardClick = (index) => {
    if (index === activeIndex || isAnimating) return;

    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && carHighlights.length > 0) {
        setIsAnimating(true);
        setActiveIndex((prevIndex) => (prevIndex + 1) % carHighlights.length);

        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isAnimating, carHighlights.length]);

  if (carHighlights.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ev-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ev-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-ev-accent/3 to-ev-blue/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: "60s" }}></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16 px-4">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-ev-blue via-ev-accent to-ev-blue-light bg-clip-text text-transparent animate-fade-in">
              {t.featuredModels}
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-ev-accent to-ev-blue mx-auto rounded-full animate-scale-in"></div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t.discoverModels}
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[700px]" onMouseMove={handleMouseMove}>
            <div className="relative w-full flex items-center justify-center gap-8 overflow-visible">
              {carHighlights.map((car, index) => {
                if (car.name === "GAC GS3") return null;
                const isActive = index === activeIndex;
                const isPrev = index === (activeIndex - 1 + carHighlights.length) % carHighlights.length;
                const isNext = index === (activeIndex + 1) % carHighlights.length;
                const isVisible = isActive || isPrev || isNext;

                return (
                  <Link
                    key={car.id}
                    to={`/inventory/${car.id}`}
                    className={cn(
                      "absolute transition-all duration-800 ease-out cursor-pointer perspective",
                      isActive && "z-30 transform scale-100",
                      isPrev && "z-20 transform scale-75 -translate-x-[calc(80vw*0.6)] opacity-60",
                      isNext && "z-20 transform scale-75 translate-x-[calc(80vw*0.6)] opacity-60",
                      !isVisible && "z-10 transform scale-50 opacity-0 pointer-events-none"
                    )}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        handleCardClick(index);
                      }
                    }}
                    style={{
                      transform: isActive
                        ? `
                        scale(1) 
                        rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg) 
                        rotateX(${(mousePosition.y - 350) * -0.01}deg)
                        translateZ(50px)
                      `
                        : undefined,
                    }}
                  >
                    <div
                      className={cn(
                        "relative w-[80vw] h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-800",
                        isActive && "shadow-ev-accent/20 shadow-[0_0_50px_rgba(0,234,255,0.3)]",
                        "hover:shadow-[0_0_60px_rgba(0,234,255,0.4)] hover:scale-105"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 z-10"></div>
                      <div className="relative h-[70%] overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className={cn(
                            "w-full h-full object-cover transition-all duration-1000",
                            isActive ? "scale-110" : "scale-100"
                          )}
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 animate-fade-in">
                            {car.subtitle}
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute top-6 right-6 z-20 space-y-2 animate-slide-in-right">
                            <div className="bg-ev-accent/90 backdrop-blur-md text-ev-charcoal px-3 py-1 rounded-full text-xs font-bold">
                              {car.specs.range}
                            </div>
                            <div className="bg-white/90 backdrop-blur-md text-ev-charcoal px-3 py-1 rounded-full text-xs font-bold">
                              {car.specs.acceleration}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative h-[30%] bg-gradient-to-br from-white via-white to-gray-50 dark:from-ev-charcoal dark:via-ev-gray-dark dark:to-black p-6 z-20">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-2 text-foreground">
                              {car.name}
                            </h3>
                            <p className="text-ev-blue font-semibold text-sm">
                              {car.lease}
                            </p>
                          </div>
                          {isActive && (
                            <div className="flex justify-between items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                              <span className="button-primary group inline-flex items-center">
                                {t.viewDetails}
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </span>
                              {/* {car.colors && car.colors.length > 0 && (
                                <div className="flex gap-2">
                                  {car.colors.map((color, colorIndex) => (
                                    <div
                                      key={colorIndex}
                                      className="w-10 h-10 rounded-full border border-gray-300"
                                      style={{ backgroundColor: color.value }}
                                      title={color.name}
                                    />
                                  ))}
                                </div>
                              )} */}
                            </div>
                          )}
                        </div>
                        <div
                          className={cn(
                            "absolute inset-0 rounded-b-3xl border-2 transition-all duration-500",
                            isActive
                              ? "border-ev-accent shadow-[inset_0_0_20px_rgba(0,234,255,0.1)]"
                              : "border-transparent"
                          )}
                        ></div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setActiveIndex((prevIndex) => (prevIndex === 0 ? carHighlights.length - 1 : prevIndex - 1));
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 z-40 hover:scale-110 hover:shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setActiveIndex((prevIndex) => (prevIndex + 1) % carHighlights.length);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 z-40 hover:scale-110 hover:shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center space-x-3 mt-12">
          {carHighlights.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "relative w-3 h-3 rounded-full transition-all duration-500 hover:scale-125",
                index === activeIndex
                  ? "bg-ev-accent w-12 shadow-[0_0_20px_rgba(0,234,255,0.5)]"
                  : "bg-gray-400 hover:bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === activeIndex && (
                <div className="absolute inset-0 bg-ev-accent rounded-full animate-ping opacity-75"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add translations object (merge with existing HeroSection translations)
const translations = {
  en: {
    featuredModels: "Featured Models",
    discoverModels: "Discover our premium selection of cutting-edge electric vehicles that redefine the future of transportation",
    title: "Launch <span>Toward the Future</span>",
    description: "Experience premium electric vehicles with cutting-edge technology, exceptional performance, and zero emissions.",
    exploreButton: "Explore Our Stock",
    // testDriveButton: "Book a Test Drive",
    scrollIndicator: "Scroll down to explore",
    viewDetails: "View Details"
  },
  ar: {
    featuredModels: "موديلاتنا",
    discoverModels: "اكتشف مجموعتنا المميزة من السيارات الكهربائية المتطورة التي تعيد تعريف مستقبل النقل",
    title: "انطلق <span>نحو المستقبل</span>",
    description: "استمتع بتجربة السيارات الكهربائية الفاخرة مع تكنولوجيا متطورة، أداء استثنائي، وانبعاثات صفرية.",
    exploreButton: "استكشف مخزوننا",
    // testDriveButton: "احجز تجربة قيادة",
    scrollIndicator: "مرر لأسفل لاستكشاف المزيد",
    viewDetails: "عرض التفاصيل"
  }
};