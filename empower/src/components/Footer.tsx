
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronRight, Zap, Leaf, Shield, Car } from "lucide-react";
import { useLanguage } from "./Layout";

const translations = {
  en: {
    quickLinks: "Quick Links",
    home: "Home",
    inventory: "Inventory",
    testDrive: "Book a Test Drive",
    about: "About Us",
    contact: "Contact",
    contactUs: "Contact Us",
    address: "123 EV Boulevard, Electric City, EC 12345",
    businessHours: "Business Hours",
    monday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    weekdayHours: "9:00 AM - 7:00 PM",
    saturdayHours: "10:00 AM - 6:00 PM",
    sundayHours: "11:00 AM - 4:00 PM",
    evServices: "EV Services",
    chargingSolutions: "Charging Solutions",
    maintenanceService: "Maintenance Service",
    batteryWarranty: "Battery Warranty",
    homeChargerInstall: "Home Charger Installation",
    newsletter: "Stay Updated",
    newsletterText: "Subscribe to get the latest news, promotions and EV insights",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    allRights: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    terms: "Terms of Service",
    sitemap: "Sitemap"
  },
  ar: {
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    inventory: "المخزون",
    testDrive: "حجز تجربة قيادة",
    about: "من نحن",
    contact: "اتصل بنا",
    contactUs: "اتصل بنا",
    address: "١٢٣ شارع السيارات الكهربائية، المدينة الكهربائية، EC 12345",
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
    allRights: "جميع الحقوق محفوظة.",
    privacyPolicy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    sitemap: "خريطة الموقع"
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  const textAlign = isRtl ? "text-right" : "text-left";
  const flexDirection = isRtl ? "flex-row-reverse" : "flex-row";
  
  return (
    <footer className="bg-gradient-to-br from-ev-charcoal to-ev-blue-dark text-white">
      {/* Top wavy divider */}
      <div className="relative h-16">
        {/* <svg className="absolute -top-1 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg> */}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo & About */}
          <div className={`space-y-6 ${textAlign}`}>
            <Link to="/" className={`flex items-center ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <div className="relative">
                <span className="text-3xl font-bold text-white">
                  EMPOWER<span className="text-ev-accent">EV</span>
                </span>
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ev-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-ev-accent"></span>
                </span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Leading the sustainable driving revolution with cutting-edge electric vehicles. Experience the future of mobility today.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 hover:bg-ev-blue p-2.5 rounded-full transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-ev-blue p-2.5 rounded-full transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-ev-blue p-2.5 rounded-full transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-ev-blue p-2.5 rounded-full transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={`space-y-6 ${textAlign}`}>
            <h3 className="text-lg font-semibold relative inline-block">
              {t.quickLinks}
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-ev-accent/80"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.home}</span>
                </Link>
              </li>
              <li>
                <Link to="/inventory" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.inventory}</span>
                </Link>
              </li>
              <li>
                <Link to="/test-drive" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.testDrive}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.about}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <ChevronRight className={`h-4 w-4 text-ev-accent ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.contact}</span>
                </Link>
              </li>
            </ul>
            {/* EV-Services */}
            {/* <h3 className="text-lg font-semibold pt-2 relative inline-block">
              {t.evServices}
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-ev-accent/80"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <Zap className="h-4 w-4 text-ev-accent" />
                  <span>{t.chargingSolutions}</span>
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <Car className="h-4 w-4 text-ev-accent" />
                  <span>{t.maintenanceService}</span>
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <Shield className="h-4 w-4 text-ev-accent" />
                  <span>{t.batteryWarranty}</span>
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-300 hover:text-ev-accent transition-colors flex items-center ${isRtl ? 'flex-row-reverse justify-end' : ''} gap-2`}>
                  <Leaf className="h-4 w-4 text-ev-accent" />
                  <span>{t.homeChargerInstall}</span>
                </a>
              </li>
            </ul> */}
            {/* EV-Services */}
          </div>

          {/* Column 3: Contact Info */}
          <div className={`space-y-6 ${textAlign}`}>
            <h3 className="text-lg font-semibold relative inline-block">
              {t.contactUs}
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-ev-accent/80"></span>
            </h3>
            <ul className="space-y-4">
              <li className={`flex ${flexDirection} items-start gap-3`}>
                <MapPin className="h-5 w-5 text-ev-accent shrink-0 mt-1" />
                <span className="text-gray-300">{t.address}</span>
              </li>
              <li className={`flex ${flexDirection} items-center gap-3`}>
                <Phone className="h-5 w-5 text-ev-accent shrink-0" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-ev-accent transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className={`flex ${flexDirection} items-center gap-3`}>
                <Mail className="h-5 w-5 text-ev-accent shrink-0" />
                <a href="mailto:info@empowerev.com" className="text-gray-300 hover:text-ev-accent transition-colors">
                  info@empowerev.com
                </a>
              </li>
            </ul>

            {/* <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941512199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652813333306!5m2!1sen!2s" 
              className="w-full h-32 rounded-lg mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300" 
              allowFullScreen 
              loading="lazy" 
              title="Map"
            /> */}
          </div>

          {/* Column 4: Newsletter & Business Hours */}
          <div className={`space-y-6 ${textAlign}`}>
            <h3 className="text-lg font-semibold relative inline-block">
              {t.newsletter}
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-ev-accent/80"></span>
            </h3>
            <p className="text-gray-300">
              {t.newsletterText}
            </p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder={t.emailPlaceholder}
                className={`bg-white/10 px-4 py-3 rounded-lg border-0 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-ev-accent ${textAlign}`}
              />
              <button className="bg-ev-accent hover:bg-ev-accent-dark text-ev-charcoal font-medium py-3 px-5 rounded-lg transition-all duration-300">
                {t.subscribe}
              </button>
            </div>

            {/* <h3 className="text-lg font-semibold pt-4 relative inline-block">
              {t.businessHours}
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-ev-accent/80"></span>
            </h3>
            <ul className="space-y-3">
              <li className={`flex justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-300">{t.monday}:</span>
                <span className="text-white">{t.weekdayHours}</span>
              </li>
              <li className={`flex justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-300">{t.saturday}:</span>
                <span className="text-white">{t.saturdayHours}</span>
              </li>
              <li className={`flex justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-300">{t.sunday}:</span>
                <span className="text-white">{t.sundayHours}</span>
              </li>
            </ul> */}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex justify-center">
            <div className="w-full h-40 bg-ev-blue/10 blur-3xl rounded-full -translate-y-1/2"></div>
          </div>
        </div>

        <hr className="border-gray-700 my-10" />

        {/* Bottom Section */}
        <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <p className={`text-sm text-gray-400 ${textAlign}`}>
            © {currentYear} EmpowerEV. {t.allRights}
          </p>
          <div className={`flex space-x-6 rtl:space-x-reverse`}>
            <a href="#" className="text-gray-400 hover:text-ev-accent transition-colors">
              {t.privacyPolicy}
            </a>
            <a href="#" className="text-gray-400 hover:text-ev-accent transition-colors">
              {t.terms}
            </a>
            <a href="#" className="text-gray-400 hover:text-ev-accent transition-colors">
              {t.sitemap}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
