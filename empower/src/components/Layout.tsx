import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import LoaderScreen from "./LoaderScreen";

interface LayoutProps {
  children: ReactNode;
  transparentHeader?: boolean;
  noFooter?: boolean;
}

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

// export const useLanguage = () => useContext(LanguageContext);

export const useLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>(
    () => (localStorage.getItem('preferredLanguage') as 'en' | 'ar') || 'en'
  );

  // This effect ensures all components get the updated language immediately
  useEffect(() => {
    const updateLanguage = () => {
      const lang = localStorage.getItem('preferredLanguage') as 'en' | 'ar';
      if (lang && lang !== language) {
        setLanguage(lang);
      }
    };

    // Custom event listener for language changes
    window.addEventListener('languageChange', updateLanguage);
    return () => window.removeEventListener('languageChange', updateLanguage);
  }, [language]);

  return { language, setLanguage };
};

export default function Layout({
  children,
  transparentHeader = false,
  noFooter = false,
}: LayoutProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [initialLoading, setInitialLoading] = useState(true);

  // Show initial loader for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-[1000]">
        <LoaderScreen />
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div
        className={`flex flex-col min-h-screen ${
          language === "ar" ? "rtl text-right" : "ltr text-left"
        }`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Header transparentHeader={transparentHeader} />
        <main className="flex-grow pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        {!noFooter && <Footer />}
      </div>
    </LanguageContext.Provider>
  );
}
