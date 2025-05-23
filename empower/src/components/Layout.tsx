
import { ReactNode, createContext, useContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

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

export const useLanguage = () => useContext(LanguageContext);

export default function Layout({ children, transparentHeader = false, noFooter = false }: LayoutProps) {
  const [language, setLanguage] = useState<Language>("en");
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className={`flex flex-col min-h-screen ${language === "ar" ? "rtl text-right" : "ltr text-left"}`} dir={language === "ar" ? "rtl" : "ltr"}>
        <Header transparentHeader={transparentHeader} />
        <PageTransition>
          <main className="flex-grow pt-20">{children}</main>
        </PageTransition>
        {!noFooter && <Footer />}
      </div>
    </LanguageContext.Provider>
  );
}
