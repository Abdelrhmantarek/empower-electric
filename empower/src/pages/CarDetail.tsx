import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/Layout";
import {
  Car as CarIcon,
  Battery,
  ArrowRight,
  Gauge,
  Clock,
  Zap,
  LayoutGrid,
  RotateCw,
  Circle,
  CircleGauge,
  CirclePercent,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import ImageGallery from "@/components/inventory/ImageGallery";
import CarSpinView from "@/components/inventory/CarSpinView";
import ColorSelector from "@/components/inventory/ColorSelector";
import QuoteModal from "@/components/inventory/QuoteModal";
import { fetchCars, Car, CarColor } from "@/data/cars";

const translations = {
  en: {
    loading: "Loading...",
    errorTitle: "Error",
    notFoundTitle: "Vehicle Not Found",
    notFoundMessage: "The vehicle you're looking for doesn't exist or has been removed.",
    returnToInventory: "Return to Inventory",
    home: "Home",
    inventory: "Inventory",
    range: "Range",
    featured: "Featured",
    gallery: "Gallery",
    spinView: "360° View",
    overview: "Overview",
    year: "Year",
    acceleration: "0-60 mph",
    seating: "Seating",
    requestQuote: "Request a Quote",
    bookTestDrive: "Book a Test Drive",
    delivery: "Delivery",
    warranty: "Warranty",
    technicalSpecs: "Technical Specifications",
    topSpeed: "Top Speed",
    power: "Power",
    battery: "Battery",
    chargingExperience: "Charging Experience",
    fastCharging: "Fast Charging",
    supercharger: "Supercharger (150kW)",
    homeCharging: "Home Charging",
    wallConnector: "Wall Connector (11kW)",
    efficiency: "Efficiency",
    chargePorts: "Charge ports",
    preconditioning: "Pre-conditioning",
    electricFreedom: "Experience Electric Freedom",
    rapidCharging: "Rapid Charging",
    longRange: "Long Range",
    instantAcceleration: "Instant Acceleration",
    readyFuture: "Ready to experience the future?",
    electricRevolution: "Join the electric revolution with the"
  },
  ar: {
    loading: "جار التحميل...",
    errorTitle: "خطأ",
    notFoundTitle: "السيارة غير موجودة",
    notFoundMessage: "السيارة التي تبحث عنها غير موجودة أو تمت إزالتها.",
    returnToInventory: "العودة إلى المخزون",
    home: "الرئيسية",
    inventory: "المخزون",
    range: "المدى",
    featured: "مميز",
    gallery: "المعرض",
    spinView: "عرض 360°",
    overview: "نظرة عامة",
    year: "السنة",
    acceleration: "0-60 ميل في الساعة",
    seating: "المقاعد",
    requestQuote: "طلب عرض سعر",
    // bookTestDrive: "حجز تجربة قيادة",
    delivery: "التوصيل",
    warranty: "الضمان",
    technicalSpecs: "المواصفات الفنية",
    topSpeed: "السرعة القصوى",
    power: "القوة",
    battery: "البطارية",
    chargingExperience: "تجربة الشحن",
    fastCharging: "الشحن السريع",
    supercharger: "الشاحن السريع (150kW)",
    homeCharging: "الشحن المنزلي",
    wallConnector: "حائط الشحن (11kW)",
    efficiency: "الكفاءة",
    chargePorts: "منافذ الشحن",
    preconditioning: "التكييف المسبق",
    electricFreedom: "اختبر حرية الكهرباء",
    rapidCharging: "شحن سريع",
    longRange: "مدى طويل",
    instantAcceleration: "تسارع فوري",
    readyFuture: "هل أنت مستعد لتجربة المستقبل؟",
    electricRevolution: "انضم إلى ثورة الكهرباء مع"
  }
};


const CarDetail = () => {

  const { language } = useLanguage();
  const t = translations[language];

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<CarColor | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"photos" | "spin">("photos");
  const [showSpecsAnimation, setShowSpecsAnimation] = useState(false);
  const carNameRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const chargingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCar = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const cars = await fetchCars();
        const foundCar = cars.find((c) => c.id === id);
        if (foundCar) {
          setCar(foundCar);
          console.log(`Found car: ${JSON.stringify(foundCar)}`);
          setSelectedColor(foundCar.colors[0] || null);
          setTimeout(() => {
            carNameRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
          setTimeout(() => {
            setShowSpecsAnimation(true);
          }, 1000);
        } else {
          setCar(undefined);
        }
      } catch (err) {
        setError("Failed to load car details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCar();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="section-container flex justify-center items-center h-96">
          <div className="animate-pulse text-xl">{t.loading}</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="section-container text-center py-20">
          <h2 className="text-2xl font-bold mb-4">{t.errorTitle}</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="button-primary"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <div className="section-container text-center py-20">
          <h2 className="text-2xl font-bold mb-4">{t.notFoundTitle}</h2>
          <p className="text-muted-foreground mb-8">
            {t.notFoundMessage}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Navigating to /inventory");
              navigate("/inventory");
            }}
            className="button-primary"
          >
            {t.returnToInventory}
          </button>
        </div>
      </Layout>
    );
  }

  const handleColorChange = (color: CarColor) => {
    setSelectedColor(color);
  };

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <Layout>
      <div 
        dir={language === 'ar' ? "rtl" : "ltr"}
        className={`section-container ${language === 'ar' ? 'text-right' : 'text-left'}`}
      >
        {/* Breadcrumbs */}
        <motion.div
          className="pt-8 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex text-sm">
            <button
              onClick={(e) => handleNavigation(e, "/")}
              className="text-muted-foreground hover:text-foreground rtl:mr-2"
            >
              {t.home}
            </button>
            <span className="mx-2 text-muted-foreground">/</span>
            <button
              onClick={(e) => handleNavigation(e, "/inventory")}
              className="text-muted-foreground hover:text-foreground rtl:mr-2"
            >
              {t.inventory}
            </button>
            <span className="mx-2 text-muted-foreground rtl:mx-0">/</span>
            <span className="text-foreground">
              {car.make} {car.model}
            </span>
          </nav>
        </motion.div>

        {/* Car Title Section */}
        <motion.div
          ref={carNameRef}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ev-blue to-ev-accent bg-clip-text text-transparent mb-3">
            {car.year} {car.make} {car.model}
          </h1>

          <div 
            className={`flex flex-wrap items-center gap-4 mt-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="h-5 w-[1px] bg-border"></div>
              <span className="text-muted-foreground text-lg">
                {t.range}: {car.specs.range}
              </span>
            </motion.div>

            {car.featured && (
              <motion.span
                className="bg-gradient-to-r from-ev-accent to-ev-blue text-white px-3 py-1 text-xs font-bold uppercase rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {t.featured}
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <div className="space-y-8">
          {/* Product Images Section */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* View Mode Selector */}
            <div className={`flex mb-6 gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode("photos");
                }}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium ${
                  viewMode === "photos"
                    ? "bg-ev-blue text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                } ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <LayoutGrid size={20} />
                <span>{t.gallery}</span>
              </button>
              <button
                disabled
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium bg-gray-100 dark:bg-gray-800 text-muted-foreground cursor-not-allowed ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <RotateCw size={20} />
                <span>{t.spinView}</span>
              </button>
            </div>

            {/* Image Gallery & 360° View */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 w-full h-[80vh] max-h-[550px] min-h-[300px] mx-auto">
              <ImageGallery
                images={selectedColor ? selectedColor.image : [car.mainImage]}
                alt={`${car.make} ${car.model}`}
              />
              <CarSpinView carId={car.id} isActive={viewMode === "spin"} />
            </div>

            {/* Color Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <ColorSelector colors={car.colors} onChange={handleColorChange} />
            </motion.div>
          </motion.div>

          {/* Product Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Overview and Quick Actions */}
            <div className={`lg:col-span-2 space-y-8 ${language === 'ar' ? 'lg:order-2' : ''}`}>
              {/* Overview Section */}
              <motion.div
                ref={overviewRef}
                id="overview-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-6 w-1.5 bg-ev-blue rounded-full"></div>
                  <h2 className="text-3xl font-bold">{t.overview}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {car.description}
                </p>

                {/* Key Specifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
                    <div className="text-2xl font-bold text-ev-blue mb-1">
                      {car.year}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.year}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
                    <div className="text-2xl font-bold text-ev-blue mb-1">
                      {car.specs.range}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.range}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
                    <div className="text-2xl font-bold text-ev-blue mb-1">
                      {car.specs.acceleration}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.acceleration}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
                    <div className="text-2xl font-bold text-ev-blue mb-1">
                      {car.specs.seating}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.seating}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Purchase Actions */}
            <div className={`space-y-6 ${language === 'ar' ? 'lg:order-1' : ''}`}>
              {/* Actions Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-8"
              >

                {/* Call to Action Buttons */}
                <div className={`space-y-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <motion.button
                    className={`w-full bg-ev-blue hover:bg-ev-blue/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuoteModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t.requestQuote}</span>
                    <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {/* <motion.button
                    onClick={(e) =>
                      handleNavigation(e, `/test-drive?car=${car.id}`)
                    }
                    className="w-full border-2 border-ev-blue text-ev-blue hover:bg-ev-blue hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t.bookTestDrive}</span>
                    <ChevronRight 
                      className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} 
                    />
                  </motion.button> */}
                </div>

                {/* Quick Info */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.delivery}</span>
                      <span className="font-medium">
                        {language === "ar" ? car.specs.delivery_ar : car.specs.delivery_en}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.warranty}</span>
                      <span className="font-medium">
                        {language === "ar" ? car.specs.warranty_ar : car.specs.warranty_en}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-muted-foreground">Financing</span>
                      <span className="font-medium">Available</span>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          ref={specsRef}
          id="specs-section"
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSpecsAnimation ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1.5 bg-gradient-to-b from-ev-blue to-ev-accent rounded-full rtl:ml-3"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.technicalSpecs}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent p-8 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg hover:shadow-ev-blue/5 transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showSpecsAnimation ? 1 : 0,
                y: showSpecsAnimation ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
            >
              <Zap className="text-ev-blue mb-6 h-10 w-10 p-2 bg-ev-blue/10 rounded-xl" />
              <p className="text-sm text-muted-foreground mb-1">{t.range}</p>
              <p className="text-3xl font-semibold text-foreground">
                {car.specs.range}
              </p>

              <motion.div
                className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.4 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent p-8 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg hover:shadow-ev-blue/5 transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showSpecsAnimation ? 1 : 0,
                y: showSpecsAnimation ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.03 }}
            >
              <Gauge className="text-ev-blue mb-6 h-10 w-10 p-2 bg-ev-blue/10 rounded-xl" />
              <p className="text-sm text-muted-foreground mb-1">{t.acceleration}</p>
              <p className="text-3xl font-semibold text-foreground">
                {car.specs.acceleration}
              </p>

              <motion.div
                className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 1.2, delay: 1.5 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent p-8 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg hover:shadow-ev-blue/5 transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showSpecsAnimation ? 1 : 0,
                y: showSpecsAnimation ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
            >
              <ArrowRight className="text-ev-blue mb-6 h-10 w-10 p-2 bg-ev-blue/10 rounded-xl" />
              <p className="text-sm text-muted-foreground mb-1">{t.topSpeed}</p>
              <p className="text-3xl font-semibold text-foreground">
                {car.specs.topSpeed}
              </p>

              <motion.div
                className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.3, delay: 1.6 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent p-8 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg hover:shadow-ev-blue/5 transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showSpecsAnimation ? 1 : 0,
                y: showSpecsAnimation ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.03 }}
            >
              <CircleGauge className="text-ev-blue mb-6 h-10 w-10 p-2 bg-ev-blue/10 rounded-xl" />
              <p className="text-sm text-muted-foreground mb-1">{t.power}</p>
              <p className="text-3xl font-semibold text-foreground">
                {car.specs.power}
              </p>

              <motion.div
                className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 1.4, delay: 1.7 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent p-8 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg hover:shadow-ev-blue/5 transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showSpecsAnimation ? 1 : 0,
                y: showSpecsAnimation ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Battery className="text-ev-blue mb-6 h-10 w-10 p-2 bg-ev-blue/10 rounded-xl" />
              <p className="text-sm text-muted-foreground mb-1">{t.battery}</p>
              <p className="text-3xl font-semibold text-foreground">
                {car.specs.battery}
              </p>

              <motion.div
                className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.8 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent p-8 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg hover:shadow-ev-blue/5 transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showSpecsAnimation ? 1 : 0,
                y: showSpecsAnimation ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <CarIcon className="text-ev-blue mb-6 h-10 w-10 p-2 bg-ev-blue/10 rounded-xl" />
              <p className="text-sm text-muted-foreground mb-1">{t.seating}</p>
              <p className="text-3xl font-semibold text-foreground">
                {car.specs.seating}
              </p>

              <motion.div
                className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1.1, delay: 1.9 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Charging Info with Circular Progress */}
        <motion.div
          ref={chargingRef}
          id="charging-section"
          className="mt-24 bg-gradient-to-br from-ev-blue/5 via-ev-accent/5 to-transparent p-10 rounded-2xl border border-ev-blue/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSpecsAnimation ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              className="p-3 bg-gradient-to-br from-ev-blue/20 to-ev-accent/20 rounded-lg rtl:ml-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Clock className="text-ev-accent h-6 w-6" />
            </motion.div>
            <h3 className="text-2xl font-semibold">{t.chargingExperience}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{t.fastCharging}</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t.supercharger}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">30</span>
                  <span className="text-muted-foreground">mins</span>
                </div>
              </div>

              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1.2, delay: 1.5 }}
                />
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10%</span>
                <span>80%</span>
              </div>

              <div className="mt-4 bg-ev-blue/5 p-4 rounded-lg">
                <p className="text-sm">
                  Charge from 10% to 80% in just 30 minutes, adding up to 270
                  miles of range for your journey.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-1 -right-1">
                <motion.div
                  className="absolute inset-0 bg-ev-accent/20 rounded-full blur-md"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-medium">{t.homeCharging}</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t.wallConnector}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">7</span>
                  <span className="text-muted-foreground">hours</span>
                </div>
              </div>

              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.7, delay: 1.7 }}
                />
              </div>

              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>

              <div className="mt-4 bg-ev-blue/5 p-4 rounded-lg">
                <p className="text-sm">
                  Charge overnight from empty to full in 7 hours, perfect for
                  daily commuting and electric lifestyle.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg flex items-center gap-4"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-3 bg-ev-accent/10 rounded-full">
                <CirclePercent className="text-ev-accent h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">{t.efficiency}</h4>
                <p className="text-sm text-muted-foreground">4.3 miles/kWh</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg flex items-center gap-4"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-3 bg-ev-blue/10 rounded-full">
                <Circle className="text-ev-blue h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">{t.chargePorts}</h4>
                <p className="text-sm text-muted-foreground">CCS & Type 2</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg flex items-center gap-4"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-3 bg-ev-blue/10 rounded-full">
                <Zap className="text-ev-blue h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">{t.preconditioning}</h4>
                <p className="text-sm text-muted-foreground">Smart routing</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          ref={featuresRef}
          id="features-section"
          className="mt-24 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1.5 bg-gradient-to-b from-ev-accent to-ev-blue rounded-full rtl:ml-3"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.electricFreedom}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-8 rounded-xl bg-gradient-to-br from-ev-blue/5 to-transparent border border-ev-blue/10 relative overflow-hidden group"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,98,204,0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-gradient-to-br from-ev-blue/10 to-ev-accent/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>

              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ev-blue to-ev-blue/70 flex items-center justify-center mb-6 relative">
                <Zap className="text-white h-7 w-7" />
                <div className="absolute -inset-0.5 bg-ev-blue/20 blur-sm rounded-xl"></div>
              </div>

              <h3 className="text-xl font-semibold mb-3 relative">
                {t.rapidCharging}
              </h3>
              <p className="text-muted-foreground relative">
                Charge up to 80% in just 30 minutes with fast-charging stations
                across the country.
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ev-blue to-ev-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </motion.div>

            <motion.div
              className="p-8 rounded-xl bg-gradient-to-br from-ev-blue/5 to-transparent border border-ev-blue/10 relative overflow-hidden group"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,98,204,0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-gradient-to-br from-ev-accent/10 to-ev-blue/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>

              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ev-accent to-ev-accent/70 flex items-center justify-center mb-6 relative">
                <ArrowRight className="text-white h-7 w-7" />
                <div className="absolute -inset-0.5 bg-ev-accent/20 blur-sm rounded-xl"></div>
              </div>

              <h3 className="text-xl font-semibold mb-3 relative">
                {t.longRange}
              </h3>
              <p className="text-muted-foreground relative">
                Drive up to {car.specs.range} on a single charge, perfect for
                long trips and daily commutes.
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ev-accent to-ev-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </motion.div>

            <motion.div
              className="p-8 rounded-xl bg-gradient-to-br from-ev-blue/5 to-transparent border border-ev-blue/10 relative overflow-hidden group"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,98,204,0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-gradient-to-br from-ev-blue/10 to-ev-accent/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>

              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ev-blue to-ev-blue/70 flex items-center justify-center mb-6 relative">
                <Gauge className="text-white h-7 w-7" />
                <div className="absolute -inset-0.5 bg-ev-blue/20 blur-sm rounded-xl"></div>
              </div>

              <h3 className="text-xl font-semibold mb-3 relative">
                {t.instantAcceleration}
              </h3>
              <p className="text-muted-foreground relative">
                Experience thrilling {car.specs.acceleration} acceleration with
                instant torque from the electric motors.
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ev-blue to-ev-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-20 bg-gradient-to-br from-ev-blue/10 to-ev-accent/10 p-10 rounded-2xl border border-ev-blue/10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t.readyFuture}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {t.electricRevolution} {car.year} {car.make}{" "}
              {car.model}. Schedule a test drive today or request a personalized
              quote.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="button-primary relative overflow-hidden px-8 py-4 rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuoteModalOpen(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.requestQuote}
              </motion.button>

              {/* <motion.button
                onClick={(e) =>
                  handleNavigation(e, `/test-drive?car=${car.id}`)
                }
                className="button-secondary px-8 py-4 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.bookTestDrive}
              </motion.button> */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        car={car}
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </Layout>
  );
};

export default CarDetail;
