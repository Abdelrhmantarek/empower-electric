// CarCard.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car } from "@/data/cars";
import QuoteModal from "./QuoteModal";
import { useLanguage } from "../Layout";

interface CarCardProps {
  car: Car;
  onRequestQuote: () => void;
}

const translations = {
  en: {
    range: "Range",
    acceleration: "0-60",
    viewDetails: "View Details",
    requestQuote: "Request a Quote",
  },
  ar: {
    range: "المدى",
    acceleration: "0-60",
    viewDetails: "عرض التفاصيل",
    requestQuote: "طلب عرض سعر",
  },
};

export default function CarCard({ car, onRequestQuote }: CarCardProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";


  return (
    <>
      <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-ev-blue/5 transition-all duration-500 border border-border/50 hover:border-ev-blue/20">
        <div className="relative h-52 overflow-hidden">
          <img
            src={car.mainImage}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {car.featured && (
            <div className={`absolute top-4 ${isRtl ? "right-4" : "left-4"} bg-ev-accent text-ev-charcoal text-xs font-bold uppercase py-1 px-3 rounded-full`}>
              {isRtl ? "مميز" : "Featured"}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">
              {car.make} {car.model}
            </h3>
          </div>

          <p className={`text-sm text-muted-foreground mb-4 ${isRtl ? "text-right" : "text-left"}`}>{car.shortDescription}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span className="font-medium">{t.range}:</span> {car.specs.range}
            </div>
            <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span className="font-medium">{t.acceleration}:</span> {car.specs.acceleration}
            </div>
            <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span className="font-medium">{car.year}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/inventory/${car.id}`} // Matches the route in App.tsx
              className="button-primary text-sm py-2.5 group-hover:bg-ev-blue-light"
            >
              {t.viewDetails}
            </Link>
            <button
              className="button-secondary text-sm py-2.5 group-hover:bg-ev-blue group-hover:text-white"
              onClick={onRequestQuote}
            >
              {t.requestQuote}
            </button>
          </div>
        </div>
      </div>

      <QuoteModal
        car={car}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}