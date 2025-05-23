
import { useState, useRef, useEffect } from "react";
import { Filter, Search, Sliders, ChevronDown, XCircle, Check, ArrowUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../Layout";

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
}

const translations = {
  en: {
    search: "Search for a vehicle...",
    filters: "Filters",
    hideFilters: "Hide Filters",
    sort: {
      featured: "Featured",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
      newest: "Newest First"
    },
    priceRange: "Price Range",
    min: "Min",
    max: "Max",
    year: "Year",
    allYears: "All Years",
    clearFilters: "Clear Filters",
    apply: "Apply Filters",
    activeFilters: "Active Filters",
    sortBy: "Sort by"
  },
  ar: {
    search: "ابحث عن سيارة...",
    filters: "الفلاتر",
    hideFilters: "إخفاء الفلاتر",
    sort: {
      featured: "مميز",
      priceLow: "السعر: من الأقل للأعلى",
      priceHigh: "السعر: من الأعلى للأقل",
      newest: "الأحدث أولاً"
    },
    priceRange: "نطاق السعر",
    min: "الحد الأدنى",
    max: "الحد الأقصى",
    year: "السنة",
    allYears: "كل السنوات",
    clearFilters: "مسح الفلاتر",
    apply: "تطبيق الفلاتر",
    activeFilters: "الفلاتر النشطة",
    sortBy: "ترتيب حسب"
  }
};

// Price range config
const MIN_PRICE = 30000;
const MAX_PRICE = 120000;

export default function FilterSection({ 
  onFilterChange, 
  onSortChange,
  onSearchChange 
}: FilterSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    year: "all"
  });
  const [sortOption, setSortOption] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateActiveFilters(newFilters, priceRange);
  };

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
    const newFilters = { 
      ...filters, 
      priceMin: values[0].toString(), 
      priceMax: values[1].toString() 
    };
    setFilters(newFilters);
    updateActiveFilters(newFilters, values);
  };
  
  const updateActiveFilters = (currentFilters: any, prices: number[]) => {
    const newActiveFilters: string[] = [];
    
    // Add price range if it's not the default
    if (prices[0] !== MIN_PRICE || prices[1] !== MAX_PRICE) {
      newActiveFilters.push(`Price: ${formatPrice(prices[0])} - ${formatPrice(prices[1])}`);
    }
    
    // Add year if selected
    if (currentFilters.year && currentFilters.year !== "all") {
      newActiveFilters.push(`Year: ${currentFilters.year}`);
    }
    
    setActiveFilters(newActiveFilters);
  };
  
  const applyFilters = () => {
    const filtersToApply = {
      ...filters,
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    };
    onFilterChange(filtersToApply);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };
  
  const clearFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      year: "all"
    });
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSortOption("featured");
    setSearchTerm("");
    setActiveFilters([]);
    onFilterChange({});
    onSortChange("featured");
    onSearchChange("");
  };
  
  return (
    <div className="mb-8 space-y-6">
      {/* Search & Filter Header */}
      <motion.div 
        className="bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <motion.div 
              className="relative flex-grow"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-5 h-5 text-ev-blue" />
              </div>
              <input
                type="text"
                placeholder={t.search}
                className={`w-full ps-12 pe-4 py-4 bg-muted/30 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all duration-300 text-lg ${
                  searchTerm ? "ring-2 ring-ev-blue" : ""
                }`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      setSearchTerm("");
                      onSearchChange("");
                    }}
                    className="absolute inset-y-0 end-4 flex items-center text-muted-foreground hover:text-ev-blue transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              {/* Sort */}
              <motion.div 
                className="relative flex-shrink-0 group w-full md:w-auto"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-ev-blue">
                  <ArrowUpDown className="w-4 h-4" />
                </div>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className={`w-full md:w-auto appearance-none ps-12 pe-10 py-4 bg-muted/30 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-ev-blue transition-all text-base ${isRtl ? "text-right" : ""}`}
                >
                  <option value="featured">{t.sort.featured}</option>
                  <option value="price-low">{t.sort.priceLow}</option>
                  <option value="price-high">{t.sort.priceHigh}</option>
                  <option value="newest">{t.sort.newest}</option>
                </select>
                <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </motion.div>
              
              {/* Filter Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <motion.button 
                    className={`flex items-center gap-2 bg-ev-blue hover:bg-ev-blue-light text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 w-full md:w-auto relative overflow-hidden ${isRtl ? "flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 4px 20px rgba(0, 98, 204, 0.2)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Filter className="h-4 w-4" />
                    {t.filters}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-ev-blue/0 via-white/20 to-ev-blue/0"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent className="w-full md:w-[550px] p-6 animate-fade-in z-50 shadow-xl" align={isRtl ? "end" : "start"}>
                  <motion.div 
                    ref={formRef} 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <h3 className={`font-semibold text-lg ${isRtl ? "text-right" : ""}`}>{t.priceRange}</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[MIN_PRICE, MAX_PRICE]}
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            step={1000}
                            value={priceRange}
                            onValueChange={handleSliderChange}
                            className="py-4"
                          />
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <span>{formatPrice(priceRange[0])}</span>
                            <span>{formatPrice(priceRange[1])}</span>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <h3 className={`font-semibold text-lg ${isRtl ? "text-right" : ""}`}>{t.year}</h3>
                        <div className="grid grid-cols-3 gap-2">
                          <motion.button
                            type="button"
                            onClick={() => handleFilterChange({ target: { name: 'year', value: 'all' }} as any)}
                            className={`py-2 px-3 rounded-md text-center transition-all ${
                              filters.year === 'all' 
                                ? 'bg-ev-blue text-white' 
                                : 'bg-muted/50 hover:bg-muted'
                            }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {t.allYears}
                          </motion.button>
                          {[2025, 2024, 2023, 2022, 2021].map((year, index) => (
                            <motion.button
                              key={year}
                              type="button"
                              onClick={() => handleFilterChange({ target: { name: 'year', value: year.toString() }} as any)}
                              className={`py-2 px-3 rounded-md text-center transition-all ${
                                filters.year === year.toString() 
                                  ? 'bg-ev-blue text-white' 
                                  : 'bg-muted/50 hover:bg-muted'
                              }`}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 + (index * 0.05) }}
                            >
                              {year}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <motion.button
                        onClick={clearFilters}
                        className="text-ev-blue hover:text-ev-blue-light transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <XCircle className="h-4 w-4" />
                        {t.clearFilters}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => {
                          applyFilters();
                          document.body.click(); // Close popover
                        }}
                        className="bg-ev-blue hover:bg-ev-blue-light text-white py-2 px-6 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 98, 204, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t.apply}
                      </motion.button>
                    </div>
                  </motion.div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        {/* Active Filters */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-muted/30 border-t border-border/50 px-6 py-3 overflow-hidden"
            >
              <div className={`flex items-center flex-wrap gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                <span className="text-sm text-muted-foreground">{t.activeFilters}:</span>
                {activeFilters.map((filter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Badge variant="secondary" className="flex items-center gap-1 py-1.5 px-3 group">
                      {filter}
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <XCircle 
                          className="h-3 w-3 cursor-pointer hover:text-destructive group-hover:text-destructive transition-colors" 
                          onClick={() => {
                            if (filter.includes("Price")) {
                              setPriceRange([MIN_PRICE, MAX_PRICE]);
                              setFilters({...filters, priceMin: "", priceMax: ""});
                            } else if (filter.includes("Year")) {
                              setFilters({...filters, year: "all"});
                            }
                            // Re-apply filters without this one
                            const updatedFilters = activeFilters.filter((_, i) => i !== index);
                            setActiveFilters(updatedFilters);
                            applyFilters();
                          }}
                        />
                      </motion.div>
                    </Badge>
                  </motion.div>
                ))}
                
                {activeFilters.length > 0 && (
                  <motion.button 
                    onClick={clearFilters}
                    className="text-xs underline text-ev-blue hover:text-ev-blue-light ml-2 hover:font-medium transition-all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.clearFilters}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
