import { useLanguage } from "./Layout";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const handleLanguageChange = (newLanguage: "en" | "ar") => {
    // Save to localStorage
    localStorage.setItem("preferredLanguage", newLanguage);
    // Update the state
    setLanguage(newLanguage);
    // Dispatch event to force immediate update across components
    window.dispatchEvent(new CustomEvent('languageChange'));
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => handleLanguageChange("en")}
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
        onClick={() => handleLanguageChange("ar")}
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