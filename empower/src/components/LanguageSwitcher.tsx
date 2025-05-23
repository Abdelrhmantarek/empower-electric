
import { useLanguage } from "./Layout";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => setLanguage("en")}
        className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
          language === "en" 
            ? "bg-ev-blue text-white" 
            : "hover:bg-muted"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
          language === "ar" 
            ? "bg-ev-blue text-white" 
            : "hover:bg-muted"
        }`}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  );
}
