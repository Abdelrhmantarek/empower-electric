
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../Layout";
import video from "../../../public/hero/hero-video.mp4";

const translations = {
  en: {
    title: "Launch <span>Toward the Future</span>",
    description: "Experience premium electric vehicles with cutting-edge technology, exceptional performance, and zero emissions.",
    exploreButton: "Choose Your Car",
    // testDriveButton: "Book a Test Drive",
    scrollIndicator: "Scroll down to explore"
  },
  ar: {
    title: "انطلق <span>نحو المستقبل</span>",
    description: "استمتع بتجربة السيارات الكهربائية الفاخرة مع تكنولوجيا متطورة، أداء استثنائي، وانبعاثات صفرية.",
    exploreButton: "اختر سيارتك",
    // testDriveButton: "احجز تجربة قيادة",
    scrollIndicator: "مرر لأسفل لاستكشاف المزيد"
  }
};

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-ev-charcoal">
      {/* Hero Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src={video}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-8 h-full relative z-10">
        <div className={`flex flex-col justify-center h-full max-w-3xl ${language === "ar" ? "ms-auto" : ""}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <span dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", "<span class='text-ev-accent'>").replace("</span>", "</span>") }} />
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl opacity-0 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <Link to="/inventory" className="button-primary group">
              {t.exploreButton}
              <ArrowRight className={`ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
            </Link>
            {/* <Link to="/test-drive" className="button-secondary">
              {t.testDriveButton}
            </Link> */}
          </div>
          {/* Animated Car */}
          {/* <div className="absolute bottom-16 right-0 transform translate-x-1/2 opacity-0 animate-slide-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <div className="relative">
              <img src="https://res.cloudinary.com/dgek0ocgh/image/upload/v1716307076/electric-car-silhouette_oxxr0d.webp" alt="Electric Car" className="h-32 md:h-56 animate-float" />
              <div className="absolute inset-0 flex items-center">
                <div className="h-3 w-24 bg-ev-accent/20 rounded-full blur-md animate-pulse"></div>
              </div>
            </div>
          </div> */}
          {/* Scroll Indicator */}
          {/* <div className="hidden md:block absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-small">
            <div className="text-center text-white/70 text-xs mb-2">{t.scrollIndicator}</div>
            <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-1 mx-auto">
              <div className="w-1 h-2 rounded-full bg-white animate-slide-down"></div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
