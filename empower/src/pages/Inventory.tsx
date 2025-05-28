import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CarCard from "@/components/inventory/CarCard";
import FilterSection from "@/components/inventory/FilterSection";
import { fetchCars, Car } from "@/data/cars";
import { Link } from "react-router-dom";
import { Grid, List } from "lucide-react";
import { useLanguage } from "@/components/Layout";
import { motion } from "framer-motion";
import QuoteModal from "@/components/inventory/QuoteModal";

const translations = {
  en: {
    title: "Our Inventory",
    subtitle: "Discover our premium selection of electric vehicles",
    showing: "Showing",
    vehicles: "vehicles",
    noVehiclesFound: "No vehicles found",
    adjustFilters: "Try adjusting your filters or search criteria",
    resetFilters: "Reset Filters",
    testDriveHeading: "Want to test drive one of our vehicles?",
    bookTestDrive: "Book a Test Drive",
    loading: "Loading...",
  },
  ar: {
    title: "معرضنا",
    subtitle: "اكتشف مجموعتنا المميزة من السيارات الكهربائية",
    showing: "عرض",
    vehicles: "سيارات",
    noVehiclesFound: "لم يتم العثور على سيارات",
    adjustFilters: "حاول تعديل الفلاتر أو معايير البحث الخاصة بك",
    resetFilters: "إعادة ضبط الفلاتر",
    testDriveHeading: "هل تريد تجربة قيادة إحدى سياراتنا؟",
    bookTestDrive: "احجز تجربة قيادة",
    loading: "جار التحميل...",
  },
};

const Inventory = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>([]); // Store all cars fetched from Strapi
  const [isGridView, setIsGridView] = useState(true);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [activeSort, setActiveSort] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [resetFilters, setResetFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  const [selectedCarForQuote, setSelectedCarForQuote] = useState<Car | null>(null);

  // Fetch cars when component mounts
  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const carsData = await fetchCars();
        setAllCars(carsData);
        setFilteredCars(carsData); // Initially, filtered cars are all cars
      } catch (err) {
        setError("Failed to load inventory. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCars();
  }, []);

  const applyFilters = (filters: any, sort: string, search: string) => {
    let result = [...allCars];

    // Apply make filter
    if (filters.make && filters.make !== "all") {
      result = result.filter((car) => car.make === filters.make);
    }

    // Apply model filter
    if (filters.model && filters.model !== "all") {
      result = result.filter((car) => car.model === filters.model);
    }

    // Apply range filter
    if (filters.rangeMin) {
      result = result.filter(
        (car) =>
          parseInt(car.specs.range) >= Number(filters.rangeMin)
      );
    }
    if (filters.rangeMax) {
      result = result.filter(
        (car) =>
          parseInt(car.specs.range) <= Number(filters.rangeMax)
      );
    }

    // Apply color filter
    if (filters.color && filters.color !== "all") {
      result = result.filter((car) =>
        car.colors.some((color) => color.name === filters.color)
      );
    }

    // Apply year filter
    if (filters.year && filters.year !== "all") {
      result = result.filter((car) => car.year === Number(filters.year));
    }

    // Apply battery capacity filter
    if (filters.batteryMin) {
      result = result.filter(
        (car) =>
          parseInt(car.specs.battery) >= Number(filters.batteryMin)
      );
    }
    if (filters.batteryMax) {
      result = result.filter(
        (car) =>
          parseInt(car.specs.battery) <= Number(filters.batteryMax)
      );
    }

    // Apply drivetrain filter
    if (filters.drivetrain && filters.drivetrain !== "all") {
      result = result.filter(
        (car) => car.drivetrain === filters.drivetrain
      );
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (car) =>
          car.make.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          car.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (sort) {
      case "range-high":
        result.sort((a, b) => parseInt(b.specs.range) - parseInt(a.specs.range));
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "featured":
      default:
        result.sort((a, b) =>
          a.featured === b.featured ? 0 : a.featured ? -1 : 1
        );
    }

    setFilteredCars(result);
    setActiveFilters(filters);
    setActiveSort(sort);
    setSearchQuery(search);
  };

  const handleFilterChange = (filters: any) => {
    applyFilters(filters, activeSort, searchQuery);
  };

  const handleSortChange = (sort: string) => {
    applyFilters(activeFilters, sort, searchQuery);
  };

  const handleSearchChange = (search: string) => {
    applyFilters(activeFilters, activeSort, search);
  };

  const handleResetFilters = () => {
    setResetFilters(true);
    setActiveFilters({
      make: "all",
      model: "all",
      rangeMin: "",
      rangeMax: "",
      color: "all",
      year: "all",
      batteryMin: "",
      batteryMax: "",
      chargingMin: "",
      chargingMax: "",
      drivetrain: "all",
    });
    setActiveSort("featured");
    setSearchQuery("");
    applyFilters(
      {
        make: "all",
        model: "all",
        rangeMin: "",
        rangeMax: "",
        color: "all",
        year: "all",
        batteryMin: "",
        batteryMax: "",
        chargingMin: "",
        chargingMax: "",
        drivetrain: "all",
      },
      "featured",
      ""
    );
    setTimeout(() => setResetFilters(false), 0);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="section-container flex justify-center items-center h-96">
          <div className="animate-pulse text-xl">{t.loading || "Loading..."}</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="section-container text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="button-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-container">
        <motion.div
          className={`mb-8 ${isRtl ? "text-right" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 relative inline-block">
            {t.title}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-2 bg-ev-accent/30 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.span>
          </h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <FilterSection
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          // reset={resetFilters}
        />

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className={`flex justify-between items-center ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <p className="text-sm text-muted-foreground">
              {t.showing} {filteredCars.length} {t.vehicles}
            </p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <motion.button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md ${
                  isGridView ? "bg-ev-blue text-white" : "hover:bg-muted"
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md ${
                  !isGridView ? "bg-ev-blue text-white" : "hover:bg-muted"
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {filteredCars.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-muted/30 rounded-xl border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-xl font-medium mt-4 mb-2">
                {t.noVehiclesFound}
              </h3>
              <p className="text-muted-foreground mb-6">{t.adjustFilters}</p>
              <motion.button
                onClick={handleResetFilters}
                className="button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.resetFilters}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div
            className={`grid gap-6 ${
              isGridView
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } ${isRtl ? "rtl:grid-rtl" : ""}`}  // Add this custom class
          >
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-full ${isRtl ? "rtl:text-right" : ""}`}  // Ensure full width and text alignment
              >
                <CarCard 
                  car={car} 
                  onRequestQuote={() => setSelectedCarForQuote(car)}
                />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-20 text-center bg-ev-blue/5 p-10 rounded-xl border border-ev-blue/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">{t.testDriveHeading}</h3>
          <Link to="/test-drive" className="button-primary">
            {t.bookTestDrive}
          </Link>
        </motion.div>
      </div>
      {selectedCarForQuote && (
        <QuoteModal
          car={selectedCarForQuote}
          isOpen={!!selectedCarForQuote}
          onClose={() => setSelectedCarForQuote(null)}
        />
      )}
    </Layout>
  );
};

export default Inventory;