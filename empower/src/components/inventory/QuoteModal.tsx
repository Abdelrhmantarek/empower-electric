import { useState, useEffect } from "react";
import { Car } from "@/data/cars";
import { X, Check, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../Layout";

interface QuoteModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const translations = {
  en: {
    requestInfo: "Request Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    inquiryType: "I want to...",
    getPrice: "Get Price",
    availability: "Know Availability",
    askQuestion: "Ask a Question",
    message: "Message",
    submitting: "Submitting...",
    submit: "Submit Request",
    requestSubmitted: "Request Submitted!",
    thankYou: "We'll get back to you shortly regarding your inquiry about the"
  },
  ar: {
    requestInfo: "طلب معلومات",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    inquiryType: "أريد أن...",
    getPrice: "معرفة السعر",
    availability: "معرفة التوفر",
    askQuestion: "طرح سؤال",
    message: "الرسالة",
    submitting: "جاري الإرسال...",
    submit: "إرسال الطلب",
    requestSubmitted: "تم إرسال الطلب!",
    thankYou: "سنعود إليك قريبًا بخصوص استفسارك عن"
  }
};

export default function QuoteModal({ car, isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "price",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalPosition, setModalPosition] = useState(0);
  
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  const textAlign = isRtl ? "text-right" : "text-left";
  
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      setModalPosition(scrollY);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Submitted form data:", { car: car.id, ...formData });
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiryType: "price",
          message: ""
        });
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }, 1000);
  };
  
  if (!isOpen) return null;
  
  const formattedPrice = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(car.price);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-md"
            style={{ top: modalPosition, height: '100vh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <div 
            className="fixed z-50 flex items-center justify-center overflow-y-auto p-4"
            style={{ top: modalPosition, height: '100vh', width: '100%' }}
          >
            <motion.div 
              className="bg-card dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
            >
              {/* Header with Car Image */}
              <div className="relative h-32 overflow-hidden">
                <motion.img 
                  src={car.mainImage} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                
                {/* Car details overlay */}
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 p-3 text-gray-200 dark:text-gray-100 ${textAlign}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h3 className="text-base font-bold">{car.make} {car.model}</h3>
                  <div className="flex items-center gap-2 text-gray-200 dark:text-gray-100 text-xs">
                    <span>{car.year}</span>
                    <span>•</span>
                    <span className="font-semibold text-ev-accent">{formattedPrice}</span>
                  </div>
                </motion.div>
                
                {/* Close Button */}
                <motion.button
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/70 text-white p-1.5 rounded-full"
                  onClick={onClose}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ rotate: 90, backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              
              {/* Content */}
              <div className="p-4">
                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mx-auto w-14 h-14 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    >
                      <Check className="h-7 w-7 text-green-500 dark:text-green-400" />
                    </motion.div>
                    <motion.h3 
                      className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-200"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {t.requestSubmitted}
                    </motion.h3>
                    <motion.p 
                      className="mt-2 text-muted-foreground text-sm"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {t.thankYou} {car.year} {car.make} {car.model}.
                    </motion.p>
                  </motion.div>
                ) : (
                  <>
                    <motion.div 
                      className={`text-center mb-3 ${textAlign}`}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-base font-bold">{t.requestInfo}</h2>
                    </motion.div>
                    
                    <form onSubmit={handleSubmit} className={`${textAlign} space-y-3`}>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div 
                          className="col-span-2"
                          initial={{ x: isRtl ? 20 : -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label htmlFor="name" className={`block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300 font-inter ${textAlign}`}>
                            {t.name} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent font-inter ${textAlign} transition-all duration-200`}
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </motion.div>
                        
                        <motion.div 
                          initial={{ x: isRtl ? 20 : -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label htmlFor="email" className={`block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300 font-inter ${textAlign}`}>
                            {t.email} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent font-inter ${textAlign}`}
                            value={formData.email}
                            onChange={handleChange}
                            dir="ltr"
                          />
                        </motion.div>
                        
                        <motion.div 
                          initial={{ x: isRtl ? 20 : -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <label htmlFor="phone" className={`block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300 font-inter ${textAlign}`}>
                            {t.phone} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent font-inter ${textAlign}`}
                            value={formData.phone}
                            onChange={handleChange}
                            dir="ltr"
                          />
                        </motion.div>
                        
                        <motion.div 
                          initial={{ x: isRtl ? 20 : -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <label htmlFor="inquiryType" className={`block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300 font-inter ${textAlign}`}>
                            {t.inquiryType} <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="inquiryType"
                            name="inquiryType"
                            required
                            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent font-inter ${textAlign}`}
                            value={formData.inquiryType}
                            onChange={handleChange}
                          >
                            <option value="price">{t.getPrice}</option>
                            <option value="availability">{t.availability}</option>
                            <option value="question">{t.askQuestion}</option>
                          </select>
                        </motion.div>
                        
                        <motion.div 
                          className="col-span-2"
                          initial={{ x: isRtl ? 20 : -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <label htmlFor="message" className={`block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300 font-inter ${textAlign}`}>
                            {t.message}
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={2}
                            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent font-inter ${textAlign}`}
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                        </motion.div>
                        
                        <motion.div 
                          className="col-span-2 pt-1"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`button-primary w-full py-2 rounded-lg flex items-center justify-center gap-2 dark:bg-ev-blue-dark dark:text-gray-100 ${
                              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t.submitting}
                              </span>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                {t.submit}
                              </>
                            )}
                          </button>
                        </motion.div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}