import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { useLanguage } from "@/components/Layout";
import { Car } from "@/data/cars";

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
}

const translations = {
  en: {
    filters: "Filters",
    search: "Search Electric Vehicles...",
    make: "Manufacturer",
    model: "Model",
    range: "Range (mi)",
    color: "Color",
    year: "Year",
    battery: "Battery Capacity (kWh)",
    charging: "Charging Speed (kW)",
    drivetrain: "Drivetrain",
    sortBy: "Sort By",
    all: "All",
    minRange: "Min Range",
    maxRange: "Max Range",
    minBattery: "Min Battery",
    maxBattery: "Max Battery",
    minCharging: "Min Charging",
    maxCharging: "Max Charging",
    clearFilters: "Clear Filters",
    applyFilters: "Apply Filters",
    sortOptions: {
      featured: "Featured",
      rangeHigh: "Range: High to Low",
      newest: "Newest First",
    },
    drivetrainOptions: {
      all: "All",
      awd: "All-Wheel Drive",
      rwd: "Rear-Wheel Drive",
      fwd: "Front-Wheel Drive",
    },
  },
  ar: {
    filters: "الفلاتر",
    search: "ابحث عن السيارات الكهربائية...",
    make: "الصانع",
    model: "الطراز",
    range: "المدى (كم)",
    color: "اللون",
    year: "السنة",
    battery: "سعة البطارية (كيلوواط ساعة)",
    charging: "سرعة الشحن (كيلوواط)",
    drivetrain: "نظام الدفع",
    sortBy: "ترتيب حسب",
    all: "الكل",
    minRange: "الحد الأدنى للمدى",
    maxRange: "الحد الأقصى للمدى",
    minBattery: "الحد الأدنى للبطارية",
    maxBattery: "الحد الأقصى للبطارية",
    minCharging: "الحد الأدنى للشحن",
    maxCharging: "الحد الأقصى للشحن",
    clearFilters: "مسح الفلاتر",
    applyFilters: "تطبيق الفلاتر",
    sortOptions: {
      featured: "مميز",
      rangeHigh: "المدى: من الأعلى إلى الأقل",
      newest: "الأحدث أولاً",
    },
    drivetrainOptions: {
      all: "الكل",
      awd: "الدفع الرباعي",
      rwd: "الدفع الخلفي",
      fwd: "الدفع الأمامي",
    },
  },
};

const FilterSection: React.FC<FilterSectionProps> = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
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
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  // Sample data for filters (in a real app, this would come from cars data)
  const makes = [
    "all",
    "Tesla",
    "Rivian",
    "Lucid",
    "BMW",
    "Mercedes",
    "Porsche",
    "Audi",
  ];
  const models = [
    "all",
    "Model S",
    "Model 3",
    "Model Y",
    "R1T",
    "Air",
    "i4",
    "Taycan",
    "e-tron",
  ];
  const colors = [
    "all",
    "Black",
    "White",
    "Red",
    "Blue",
    "Silver",
    "Green",
    "Gray",
  ];
  const years = ["all", "2025", "2024", "2023", "2022", "2021", "2020"];
  const drivetrains = ["all", "awd", "rwd", "fwd"];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  useEffect(() => {
    onSortChange(sort);
  }, [sort, onSortChange]);

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
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
    setSort("featured");
    setSearch("");
  };

  const filterVariants = {
    hidden: { opacity: 0, maxHeight: 0, overflow: "hidden" },
    visible: { opacity: 1, maxHeight: 1000, overflow: "hidden" },
    exit: { opacity: 0, maxHeight: 0, overflow: "hidden" },
  };

  const inputVariants = {
    hover: { scale: 1.01, transition: { duration: 0.2 } },
    focus: { scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" },
  };

  return (
    <div className="mb-8">
      <motion.div
  className="flex items-center justify-between mb-6 space-x-4 rtl:space-x-reverse"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {isRtl ? (
    <>
      <motion.button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center space-x-2 bg-ev-blue text-white px-5 py-3 rounded-xl hover:bg-ev-blue/90 transition-all duration-200 dark:bg-ev-blue/80 dark:hover:bg-ev-blue"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <SlidersHorizontal className="h-5 w-5" />
        <span>{t.filters}</span>
      </motion.button>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <motion.input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200 ${
            isRtl ? "text-right" : ""
          }`}
          variants={inputVariants}
          whileHover="hover"
          whileFocus="focus"
        />
      </div>
    </>
  ) : (
    <>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <motion.input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200 ${
            isRtl ? "text-right" : ""
          }`}
          variants={inputVariants}
          whileHover="hover"
          whileFocus="focus"
            />
          </div>
          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-ev-blue text-white px-5 py-3 rounded-xl hover:bg-ev-blue/90 transition-all duration-200 dark:bg-ev-blue/80 dark:hover:bg-ev-blue"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>{t.filters}</span>
          </motion.button>
        </>
        )}
      </motion.div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t.filters}
              </h3>
              <motion.button
                onClick={() => setIsFilterOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
              </motion.button>
            </div>

            <div
              className={`grid gap-6 ${
                isRtl ? "text-right" : ""
              } md:grid-cols-2 lg:grid-cols-4`}
            >
              {/* Make Filter */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.make}
                </label>
                <select
                  value={filters.make}
                  onChange={(e) => handleFilterChange("make", e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                >
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make === "all" ? t.all : make}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Model Filter */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.model}
                </label>
                <select
                  value={filters.model}
                  onChange={(e) => handleFilterChange("model", e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                >
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model === "all" ? t.all : model}
                    </option>
                  ))}
                </select>
              </motion.div>


              {/* Range */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.range}
                </label>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <input
                    type="number"
                    placeholder={t.minRange}
                    value={filters.rangeMin}
                    onChange={(e) =>
                      handleFilterChange("rangeMin", e.target.value)
                    }
                    className="w-1/2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                  />
                  <input
                    type="number"
                    placeholder={t.maxRange}
                    value={filters.rangeMax}
                    onChange={(e) =>
                      handleFilterChange("rangeMax", e.target.value)
                    }
                    className="w-1/2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Color Filter */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.color}
                </label>
                <select
                  value={filters.color}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color === "all" ? t.all : color}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Year Filter */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.year}
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year === "all" ? t.all : year}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Battery Capacity */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.battery}
                </label>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <input
                    type="number"
                    placeholder={t.minBattery}
                    value={filters.batteryMin}
                    onChange={(e) =>
                      handleFilterChange("batteryMin", e.target.value)
                    }
                    className="w-1/2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                  />
                  <input
                    type="number"
                    placeholder={t.maxBattery}
                    value={filters.batteryMax}
                    onChange={(e) =>
                      handleFilterChange("batteryMax", e.target.value)
                    }
                    className="w-1/2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Charging Speed */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.charging}
                </label>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <input
                    type="number"
                    placeholder={t.minCharging}
                    value={filters.chargingMin}
                    onChange={(e) =>
                      handleFilterChange("chargingMin", e.target.value)
                    }
                    className="w-1/2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                  />
                  <input
                    type="number"
                    placeholder={t.maxCharging}
                    value={filters.chargingMax}
                    onChange={(e) =>
                      handleFilterChange("chargingMax", e.target.value)
                    }
                    className="w-1/2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Drivetrain Filter */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.drivetrain}
                </label>
                <select
                  value={filters.drivetrain}
                  onChange={(e) =>
                    handleFilterChange("drivetrain", e.target.value)
                  }
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                >
                  {drivetrains.map((drivetrain) => (
                    <option key={drivetrain} value={drivetrain}>
                      {
                        t.drivetrainOptions[
                          drivetrain as keyof typeof t.drivetrainOptions
                        ]
                      }
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Sort By */}
              <motion.div variants={inputVariants} whileHover="hover">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.sortBy}
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-200"
                >
                  <option value="featured">{t.sortOptions.featured}</option>
                  <option value="range-high">{t.sortOptions.rangeHigh}</option>
                  <option value="newest">{t.sortOptions.newest}</option>
                </select>
              </motion.div>
            </div>

            <div className="mt-8 flex justify-end space-x-3 rtl:space-x-reverse">
              <motion.button
                onClick={handleClearFilters}
                className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.clearFilters}
              </motion.button>
              <motion.button
                onClick={() => setIsFilterOpen(false)}
                className="px-5 py-2 bg-ev-blue text-white rounded-lg hover:bg-ev-blue/90 dark:bg-ev-blue/80 dark:hover:bg-ev-blue transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.applyFilters}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSection;
