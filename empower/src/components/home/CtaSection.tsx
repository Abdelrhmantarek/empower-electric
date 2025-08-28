
import { Link } from "react-router-dom";
import { useLanguage } from "../Layout";

const translations = {
  en: {
    title: "Ready to Experience Electric Driving?",
    description: "Schedule a test drive today and discover the thrill of electric vehicles. Our expert consultants are ready to guide you through the entire experience.",
    // testDriveButton: "Book a Test Drive",
    // inventoryButton: "Browse Our Inventory"
  },
  ar: {
    title: "هل أنت مستعد لتجربة القيادة الكهربائية؟",
    description: "احجز تجربة قيادة اليوم واكتشف إثارة السيارات الكهربائية. مستشارونا الخبراء مستعدون لإرشادك خلال التجربة بأكملها.",
    // testDriveButton: "احجز تجربة قيادة",
    // inventoryButton: "تصفح مخزوننا"
  }
};

export default function CtaSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  
  return (
    <section className="bg-ev-blue text-white py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-ev-accent/10 -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-ev-blue-light/10 -bottom-40 -right-40"></div>
      </div>
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-pulse">{t.title}</h2>
          <p className="text-lg text-blue-100 mb-8">
            {t.description}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRtl ? "flex-row-reverse" : ""}`}>
            {/* <Link to="/test-drive" className="button-accent transform hover:scale-105 transition-transform">
              {t.testDriveButton}
            </Link> */}
            {/* <Link to="/inventory" className="bg-transparent border border-white text-white hover:bg-white hover:text-ev-blue font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105">
              {t.inventoryButton}
            </Link> */}
          </div>
        </div>
      </div>
      
      {/* Decorative electric bolt */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="opacity-20">
          <path d="M60 0L40 30H60L50 60L80 25H60L70 0H60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
