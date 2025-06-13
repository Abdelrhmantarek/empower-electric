import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { useLanguage } from "./Layout";
import { useState, useEffect } from "react";
import logoWhite from "../../public/logo/logo.png";
import logoDark from "../../public/logo/logo-dark.png";
import emailjs from "@emailjs/browser"; // Import EmailJS

const translations = {
  en: {
    quickLinks: "Quick Links",
    home: "Home",
    inventory: "Inventory",
    testDrive: "Book a Test Drive",
    about: "About Us",
    contact: "Contact",
    contactUs: "Contact Us",
    address: "ZUBAIRY STREET, IN FRONT OF MINISTRY OF OIL, SANA’A, REPUBLIC OF YEMEN.",
    businessHours: "Business Hours",
    monday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    weekdayHours: "9:00 AM - 7:00 PM",
    saturdayHours: "10:00 AM - 6:00 PM",
    sundayHours: "11:00 AM - 4:00 PM",
    evServices: "Services",
    chargingSolutions: "Charging Solutions",
    maintenanceService: "Maintenance Service",
    batteryWarranty: "Battery Warranty",
    homeChargerInstall: "Home Charger Installation",
    newsletter: "Stay Updated",
    newsletterText: "Subscribe to get the latest news, promotions and EV insights",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    subscriptionSuccess: "Thank you for subscribing!",
    subscriptionSuccessText: "You’ll receive updates soon.",
    subscriptionError: "Failed to subscribe. Please try again.",
    allRights: "All rights reserved.",
    sitemap: "Sitemap",
    aboutUsText: "Empower is dedicated to providing the best electric vehicle experience with a focus on sustainability, innovation, and customer satisfaction."
  },
  ar: {
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    inventory: "المخزون",
    testDrive: "حجز تجربة قيادة",
    about: "من نحن",
    contact: "اتصل بنا",
    contactUs: "اتصل بنا",
    address: ".شارع الزبيري ، أمام وزارة النفط ، صنعاء - الجمهورية اليمنية",
    businessHours: "ساعات العمل",
    monday: "الإثنين - الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
    weekdayHours: "9:00 صباحاً - 7:00 مساءً",
    saturdayHours: "10:00 صباحاً - 6:00 مساءً",
    sundayHours: "11:00 صباحاً - 4:00 مساءً",
    evServices: "خدمات السيارات الكهربائية",
    chargingSolutions: "حلول الشحن",
    maintenanceService: "خدمة الصيانة",
    batteryWarranty: "ضمان البطارية",
    homeChargerInstall: "تركيب شاحن منزلي",
    newsletter: "ابق على اطلاع",
    newsletterText: "اشترك للحصول على آخر الأخبار والعروض ورؤى السيارات الكهربائية",
    emailPlaceholder: "عنوان بريدك الإلكتروني",
    subscribe: "اشترك",
    subscribing: "جاري الاشتراك...",
    subscriptionSuccess: "شكراً لاشتراكك!",
    subscriptionSuccessText: "ستتلقى التحديثات قريبًا.",
    subscriptionError: "فشل الاشتراك. حاول مرة أخرى.",
    allRights: "جميع الحقوق محفوظة.",
    sitemap: "خريطة الموقع",
    aboutUsText: "Empower مكرسة لتوفير أفضل تجربة للسيارات الكهربائية مع التركيز على الاستدامة والابتكار ورضا العملاء."
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  const textAlign = isRtl ? "text-right" : "text-left";
  const flexDirection = isRtl ? "flex-row-reverse" : "flex-row";
  const justifyContent = isRtl ? "justify-end" : "justify-start";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    emailjs.init(`${process.env.REACT_APP_EMAILJS_USER_ID}`);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1: Submit to Strapi
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/api/newsletter-subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              email,
            },
          }),
        }
      );
      const responseData = await response.json();
      console.log("Response from Strapi:", responseData);

      if (!response.ok) {
        throw new Error("Failed to submit subscription to Strapi");
      }

      // Step 2: Send Thank You Email via EmailJS
      const emailParams = {
        email_subject: `Newsletter Subscription Confirmation`,
        car_make: "",
        email,
        submission_date: new Date().toLocaleString(language === "ar" ? "ar-SA" : "en-US"),
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_TESTDRIVE_ID,
        emailParams
      );
      console.log("Email sent successfully!");

      // Step 3: Update UI
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error: any) {
      console.error("Error during subscription:", error);
      setError(error.message || t.subscriptionError);
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-ev-charcoal to-ev-blue-dark text-white">
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Column 1: Logo & About */}
          <div className={`space-y-2 ${textAlign}`}>
            <Link to="/" className={`flex items-start ${justifyContent} mt-[-0.5rem]`}>
              <div className="relative">
                <img
                  src={logoDark}
                  alt="Empower Logo"
                  className={`h-48 w-60 ${isRtl ? 'ml-auto' : 'mr-auto'}`}
                />
              </div>
            </Link>
            <p className={`text-gray-200 text-sm leading-relaxed font-medium mt-1 ${textAlign}`}>
              {t.aboutUsText}
            </p>
            <div className={`flex gap-3 ${flexDirection}`}>
              <a href="https://www.facebook.com/EmpowerCarsYe" target="_blank" className="bg-white/10 hover:bg-ev-blue p-2 rounded-full transition-all duration-300 hover:scale-105" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/empower_car" target="_blank" className="bg-white/10 hover:bg-ev-blue p-2 rounded-full transition-all duration-300 hover:scale-105" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@EmpowerCarsYe" target="_blank" className="bg-white/10 hover:bg-ev-blue p-2 rounded-full transition-all duration-300 hover:scale-105" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.958 2.958 0 0 0-2.081-2.09C19.64 3.5 12 3.5 12 3.5s-7.64 0-9.417.596a2.958 2.958 0 0 0-2.081 2.09C0 8.01 0 12 0 12s0 3.99.502 5.814a2.958 2.958 0 0 0 2.081 2.09C4.36 20.5 12 20.5 12 20.5s7.64 0 9.417-.596a2.958 2.958 0 0 0 2.081-2.09C24 15.99 24 12 24 12s0-3.99-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={`space-y-4 ${textAlign}`}>
            <h3 className="text-lg font-semibold relative inline-block tracking-tight">
              {t.quickLinks}
              <span className={`absolute -bottom-1 ${isRtl ? 'right-0' : 'left-0'} h-0.5 bg-ev-accent/90`}></span>
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className={`text-gray-200 hover:text-ev-accent transition-colors flex items-center ${flexDirection} gap-1.5 text-sm font-medium`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.home}</span>
                </Link>
              </li>
              <li>
                <Link to="/inventory" className={`text-gray-200 hover:text-ev-accent transition-colors flex items-center ${flexDirection} gap-1.5 text-sm font-medium`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.inventory}</span>
                </Link>
              </li>
              <li>
                <Link to="/test-drive" className={`text-gray-200 hover:text-ev-accent transition-colors flex items-center ${flexDirection} gap-1.5 text-sm font-medium`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.testDrive}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-gray-200 hover:text-ev-accent transition-colors flex items-center ${flexDirection} gap-1.5 text-sm font-medium`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.about}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-gray-200 hover:text-ev-accent transition-colors flex items-center ${flexDirection} gap-1.5 text-sm font-medium`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.contact}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className={`space-y-4 ${textAlign}`}>
            <h3 className="text-lg font-semibold relative inline-block tracking-tight">
              {t.contactUs}
              <span className={`absolute -bottom-1 ${isRtl ? 'right-0' : 'left-0'} h-0.5 bg-ev-accent/90`}></span>
            </h3>
            <ul className="space-y-3">
              <li className={`flex ${flexDirection} items-start gap-2.5 text-sm font-medium`}>
                <MapPin className="h-5 w-5 text-ev-accent shrink-0 mt-0.5" />
                <span className="text-gray-200">{t.address}</span>
              </li>
              <li className={`flex ${flexDirection} items-center gap-2.5 text-sm font-medium`}>
                <Phone className="h-5 w-5 text-ev-accent shrink-0" />
                <a href="tel:+9678-1781550" className="text-gray-200 hover:text-ev-accent transition-colors">
                  +967781781550
                </a>
                <br />
                <a href="tel:+9670-1200077" className="text-gray-200 hover:text-ev-accent transition-colors">
                  +9671200077
                </a>
              </li>
              <li className={`flex ${flexDirection} items-center gap-2.5 text-sm font-medium`}>
                <Mail className="h-5 w-5 text-ev-accent shrink-0" />
                <a href="mailto:info@emtiazpower.com" className="text-gray-200 hover:text-ev-accent transition-colors">
                  info@emtiazpower.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className={`space-y-4 ${textAlign}`}>
            <h3 className="text-lg font-semibold relative inline-block tracking-tight">
              {t.newsletter}
              <span className={`absolute -bottom-1 ${isRtl ? 'right-0' : 'left-0'} h-0.5 bg-ev-accent/90`}></span>
            </h3>
            <p className={`text-gray-200 text-sm font-medium ${textAlign}`}>
              {t.newsletterText}
            </p>
            <div className={`flex flex-col space-y-2.5 ${isRtl ? 'items-end' : 'items-start'}`}>
              {isSubmitted ? (
                <div className="text-center w-full">
                  <p className="text-green-400 text-sm font-medium">{t.subscriptionSuccess}</p>
                  <p className="text-gray-300 text-xs">{t.subscriptionSuccessText}</p>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm text-center w-full">{error}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="w-full">
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-white/10 px-5 py-2.5 rounded-lg border-0 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-ev-accent text-sm ${textAlign}`}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-ev-accent hover:bg-ev-accent-dark text-ev-charcoal font-medium py-2.5 px-5 rounded-lg transition-all duration-300 mt-2 w-full ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? t.subscribing : t.subscribe}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-600 my-6" />

        {/* Bottom Section */}
        <div className={`flex flex-col md:flex-row ${flexDirection} justify-between items-center space-y-2 md:space-y-0`}>
          <p className={`text-xs text-gray-400 font-medium ${textAlign}`}>
            © {currentYear} Empower. {t.allRights}
          </p>
        </div>
      </div>
    </footer>
  );
}