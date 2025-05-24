import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Check,
  Calendar,
  Car,
  User,
  Clock,
  ChevronRight,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { fetchCars, Car as CarType } from "@/data/cars"; // Import fetchCars instead of static cars
import { useLanguage } from "@/components/Layout";

// Date helper functions
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
};

const formatDate = (date: Date, locale: string) => {
  return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const generateTimeSlots = () => {
  const slots = [];

  for (let hour = 9; hour <= 17; hour++) {
    const hourString = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
    slots.push(hourString);

    if (hour < 17) {
      const halfHourString = hour > 12 ? `${hour - 12}:30 PM` : `${hour}:30 AM`;
      slots.push(halfHourString);
    }
  }

  return slots;
};

const translations = {
  en: {
    testDriveTitle: "Book a Test Drive",
    testDriveSubtitle:
      "Experience the thrill of driving an electric vehicle. Fill out the form below to schedule your test drive.",
    selectVehicle: "Select Vehicle",
    schedule: "Schedule",
    yourDetails: "Your Details",
    vehiclePrompt:
      "Choose the electric vehicle you'd like to test drive from our premium selection.",
    schedulePrompt: "Select an available date and time for your test drive.",
    detailsPrompt:
      "Please provide your contact information so we can confirm your test drive.",
    selectDate: "Select Date",
    selectTime: "Select Time",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    comments: "Additional Comments (Optional)",
    uploadLicense: "Upload Driver's License (Optional)",
    fileFormats: "Accepted formats: JPG, PNG, PDF (Max 5MB)",
    nextStep: "Next Step",
    prevStep: "Previous Step",
    submitTest: "Schedule Test Drive",
    submitting: "Submitting...",
    success: "Test Drive Scheduled!",
    successMsg:
      "Thank you for scheduling a test drive with us. We'll contact you shortly to confirm your appointment.",
    viewDetails: "Your Test Drive Details",
    vehicle: "Vehicle",
    dateAndTime: "Date & Time",
    name: "Name",
    scheduleAnother: "Schedule Another Test Drive",
    return: "Return to Home",
    browse: "Browse Inventory",
    loading: "Loading vehicles...",
    error: "Failed to load vehicles. Please try again later.",
    noVehicles: "No vehicles available for test drive at the moment.",
  },
  ar: {
    testDriveTitle: "حجز تجربة قيادة",
    testDriveSubtitle:
      "استمتع بتجربة قيادة السيارات الكهربائية. املأ النموذج أدناه لجدولة تجربة القيادة الخاصة بك.",
    selectVehicle: "اختر السيارة",
    schedule: "جدولة",
    yourDetails: "بياناتك",
    vehiclePrompt:
      "اختر السيارة الكهربائية التي ترغب في تجربة قيادتها من مجموعتنا المتميزة.",
    schedulePrompt: "حدد تاريخًا ووقتًا متاحًا لتجربة القيادة.",
    detailsPrompt:
      "يرجى تقديم معلومات الاتصال الخاصة بك حتى نتمكن من تأكيد تجربة قيادتك.",
    selectDate: "اختر التاريخ",
    selectTime: "اختر الوقت",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    comments: "تعليقات إضافية (اختياري)",
    uploadLicense: "تحميل رخصة القيادة (اختياري)",
    fileFormats: "الصيغ المقبولة: JPG, PNG, PDF (أقصى حجم 5 ميغابايت)",
    nextStep: "الخطوة التالية",
    prevStep: "الخطوة السابقة",
    submitTest: "جدولة تجربة القيادة",
    submitting: "جارٍ الإرسال...",
    success: "تم جدولة تجربة القيادة!",
    successMsg: "شكرًا لجدولة تجربة قيادة معنا. سنتصل بك قريبًا لتأكيد موعدك.",
    viewDetails: "تفاصيل تجربة القيادة الخاصة بك",
    vehicle: "السيارة",
    dateAndTime: "التاريخ والوقت",
    name: "الاسم",
    scheduleAnother: "جدولة تجربة قيادة أخرى",
    return: "العودة إلى الصفحة الرئيسية",
    browse: "تصفح المخزون",
    loading: "جارٍ تحميل السيارات...",
    error: "فشل في تحميل السيارات. الرجاء المحاولة مرة أخرى لاحقًا.",
    noVehicles: "لا توجد سيارات متاحة لتجربة القيادة في الوقت الحالي.",
  },
};

const TestDrive = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get("car");
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  const textAlign = isRtl ? "text-right" : "text-left";

  const [cars, setCars] = useState<CarType[]>([]); // State to store fetched cars
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    carModel: carId || "",
    date: "",
    time: "",
    licenseFile: null as File | null,
    comments: "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedCars = await fetchCars();
        setCars(fetchedCars);

        if (carId) {
          const car = fetchedCars.find((c) => c.id === carId);
          if (car) {
            setSelectedCar(car);
            setFormData((prev) => ({ ...prev, carModel: car.id }));
          }
        }
      } catch (err) {
        setError(t.error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [carId, t.error]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If car model is selected, find and set the selected car
    if (name === "carModel" && value) {
      const car = cars.find((c) => c.id === value);
      setSelectedCar(car || null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, licenseFile: e.target.files![0] }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: formatDate(date, language),
    });
  };

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo({ top: 375, behavior: "smooth" });
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo({ top: 375, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Submitted test drive form:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-gradient-to-r from-ev-blue to-ev-charcoal text-white py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <div className={`text-center ${textAlign}`}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t.testDriveTitle}
            </h1>
            <p className="text-xl text-gray-200">{t.testDriveSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="section-container max-w-5xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse text-xl">{t.loading}</div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="button-primary"
            >
              Retry
            </button>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">{t.noVehicles}</h2>
            <Link to="/inventory" className="button-primary">
              {t.browse}
            </Link>
          </div>
        ) : isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-500 mb-6"
            >
              <Check className="h-9 w-9" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4"
            >
              {t.success}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-green-700 dark:text-green-400 mb-8 text-lg"
            >
              {t.successMsg}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800/50 rounded-xl p-6 mb-10 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {t.viewDetails}
              </h3>

              <div className="space-y-5">
                <div className="flex items-start">
                  <Car
                    className={`text-ev-blue flex-shrink-0 mt-1 ${
                      isRtl ? "ml-4" : "mr-4"
                    }`}
                    size={20}
                  />
                  <div className={textAlign}>
                    <p className="font-medium">{t.vehicle}</p>
                    <p className="text-muted-foreground">
                      {selectedCar
                        ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`
                        : "Selected Vehicle"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center gap-1 flex-shrink-0 mt-1 text-ev-blue">
                    <Calendar className={isRtl ? "ml-4" : "mr-4"} size={20} />
                  </div>
                  <div className={textAlign}>
                    <p className="font-medium">{t.dateAndTime}</p>
                    <p className="text-muted-foreground">
                      {formData.date} {formData.time && `- ${formData.time}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User
                    className={`text-ev-blue flex-shrink-0 mt-1 ${
                      isRtl ? "ml-4" : "mr-4"
                    }`}
                    size={20}
                  />
                  <div className={textAlign}>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => {
                  window.scrollTo({ top: 375, behavior: "smooth" });
                  setIsSubmitted(false);
                  setStep(1);
                  setSelectedCar(null);
                  setSelectedDate(null);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    carModel: "",
                    date: "",
                    time: "",
                    licenseFile: null,
                    comments: "",
                  });
                }}
                className="button-secondary"
              >
                {t.scheduleAnother}
              </button>

              <Link to="/" className="button-primary">
                {t.return}
              </Link>

              <Link to="/inventory" className="button-secondary">
                {t.browse}
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div>
            {/* Progress Tracker */}
            <div className="mb-10">
              <div
                className={`flex justify-between items-center max-w-3xl mx-auto ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex flex-col items-center ${
                    step >= 1 ? "text-ev-blue" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                      step >= 1
                        ? "border-ev-blue text-ev-blue"
                        : "border-muted text-muted-foreground"
                    }`}
                  >
                    <Car className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{t.selectVehicle}</span>
                </div>

                <div
                  className={`h-1 flex-1 mx-4 ${
                    step >= 2 ? "bg-ev-blue" : "bg-muted"
                  }`}
                />

                <div
                  className={`flex flex-col items-center ${
                    step >= 2 ? "text-ev-blue" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                      step >= 2
                        ? "border-ev-blue text-ev-blue"
                        : "border-muted text-muted-foreground"
                    }`}
                  >
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{t.schedule}</span>
                </div>

                <div
                  className={`h-1 flex-1 mx-4 ${
                    step >= 3 ? "bg-ev-blue" : "bg-muted"
                  }`}
                />

                <div
                  className={`flex flex-col items-center ${
                    step >= 3 ? "text-ev-blue" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                      step >= 3
                        ? "border-ev-blue text-ev-blue"
                        : "border-muted text-muted-foreground"
                    }`}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{t.yourDetails}</span>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Select Vehicle */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={textAlign}
                    >
                      <h2 className="text-2xl font-bold mb-3">
                        {t.selectVehicle}
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        {t.vehiclePrompt}
                      </p>

                      <div className="grid gap-4">
                        {cars.map((car) => (
                          <label
                            key={car.id}
                            className={`flex ${
                              isRtl ? "flex-row-reverse" : ""
                            } items-center p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                              formData.carModel === car.id
                                ? "border-ev-blue bg-ev-blue/5"
                                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="carModel"
                              value={car.id}
                              checked={formData.carModel === car.id}
                              onChange={handleInputChange}
                              className="sr-only"
                              required
                            />
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                                isRtl ? "order-last ml-4 mr-0" : "order-first"
                              } flex-shrink-0 ${
                                formData.carModel === car.id
                                  ? "border-ev-blue"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {formData.carModel === car.id && (
                                <div className="w-3 h-3 rounded-full bg-ev-blue" />
                              )}
                            </div>

                            <div className="flex-grow flex items-center">
                              <img
                                src={car.mainImage}
                                alt={car.model}
                                className="w-16 h-16 object-cover rounded-md mr-4"
                              />
                              <div>
                                <span className="font-medium">
                                  {car.year} {car.make} {car.model}
                                </span>
                                <p className="text-sm text-muted-foreground">
                                  {car.shortDescription}
                                </p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div
                        className={`mt-10 flex ${
                          isRtl ? "justify-start" : "justify-end"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!formData.carModel}
                          className={`button-primary ${
                            !formData.carModel
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } flex items-center gap-2`}
                        >
                          {t.nextStep}
                          {isRtl ? (
                            <ChevronLeft size={18} />
                          ) : (
                            <ChevronRight size={18} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Schedule */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={textAlign}
                    >
                      <h2 className="text-2xl font-bold mb-3">{t.schedule}</h2>
                      <p className="text-muted-foreground mb-8">
                        {t.schedulePrompt}
                      </p>

                      {selectedCar && (
                        <div
                          className={`bg-muted/50 rounded-xl p-4 flex ${
                            isRtl ? "flex-row-reverse" : ""
                          } items-center mb-8`}
                        >
                          <img
                            src={selectedCar.mainImage}
                            alt={`${selectedCar.make} ${selectedCar.model}`}
                            className={`w-20 h-20 object-cover rounded-md ${
                              isRtl ? "ml-4" : "mr-4"
                            }`}
                          />
                          <div>
                            <h3 className="font-medium">
                              {selectedCar.year} {selectedCar.make}{" "}
                              {selectedCar.model}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedCar.shortDescription}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mb-8">
                        <label
                          className={`block font-medium mb-4 ${textAlign}`}
                        >
                          {t.selectDate}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                          {availableDates.map((date, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleDateSelect(date)}
                              className={`p-3 text-center rounded-lg border transition-all ${
                                selectedDate &&
                                selectedDate.toDateString() ===
                                  date.toDateString()
                                  ? "border-ev-blue bg-ev-blue/10 text-ev-blue"
                                  : "border-gray-200 dark:border-gray-700 hover:border-ev-blue hover:bg-ev-blue/5"
                              }`}
                            >
                              <div className="text-xs text-muted-foreground">
                                {date.toLocaleDateString(
                                  language === "ar" ? "ar-SA" : "en-US",
                                  { weekday: "short" }
                                )}
                              </div>
                              <div className="font-medium">
                                {date.toLocaleDateString(
                                  language === "ar" ? "ar-SA" : "en-US",
                                  { day: "numeric" }
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {date.toLocaleDateString(
                                  language === "ar" ? "ar-SA" : "en-US",
                                  { month: "short" }
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label
                          className={`block font-medium mb-4 ${textAlign}`}
                        >
                          {t.selectTime}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {timeSlots.map((time, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setFormData({ ...formData, time })}
                              className={`p-3 text-center rounded-lg border transition-all flex items-center justify-center gap-2 ${
                                formData.time === time
                                  ? "border-ev-blue bg-ev-blue/10 text-ev-blue"
                                  : "border-gray-200 dark:border-gray-700 hover:border-ev-blue hover:bg-ev-blue/5"
                              }`}
                            >
                              <Clock size={16} />
                              <span>{time}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`mt-10 flex justify-between ${
                          isRtl ? "flex-row-reverse" : ""
                        }`}
                      >
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="button-secondary"
                        >
                          {isRtl ? (
                            <ChevronRight size={18} />
                          ) : (
                            <ChevronLeft size={18} />
                          )}
                          {t.prevStep}
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!formData.date || !formData.time}
                          className={`button-primary ${
                            !formData.date || !formData.time
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } flex items-center gap-2`}
                        >
                          {t.nextStep}
                          {isRtl ? (
                            <ChevronLeft size={18} />
                          ) : (
                            <ChevronRight size={18} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Personal Details */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={textAlign}
                    >
                      <h2 className="text-2xl font-bold mb-3">
                        {t.yourDetails}
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        {t.detailsPrompt}
                      </p>

                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="firstName"
                              className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 ${textAlign}`}
                            >
                              {t.firstName}
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent ${textAlign}`}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="lastName"
                              className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 ${textAlign}`}
                            >
                              {t.lastName}
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent ${textAlign}`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="email"
                              className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 ${textAlign}`}
                            >
                              {t.email}
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                              dir="ltr"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 ${textAlign}`}
                            >
                              {t.phone}
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                              dir="ltr"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="comments"
                            className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 ${textAlign}`}
                          >
                            {t.comments}
                          </label>
                          <textarea
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            rows={3}
                            className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent ${textAlign}`}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="licenseFile"
                            className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 ${textAlign}`}
                          >
                            {t.uploadLicense}
                          </label>
                          <input
                            type="file"
                            id="licenseFile"
                            name="licenseFile"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent ${textAlign}`}
                          />
                          <p
                            className={`text-xs text-muted-foreground mt-1 ${textAlign}`}
                          >
                            {t.fileFormats}
                          </p>
                        </div>

                        <div
                          className={`mt-10 flex justify-between ${
                            isRtl ? "flex-row-reverse" : ""
                          }`}
                        >
                          <button
                            type="button"
                            onClick={handlePrevious}
                            className="button-secondary flex items-center gap-2"
                          >
                            {isRtl ? (
                              <ChevronRight size={18} />
                            ) : (
                              <ChevronLeft size={18} />
                            )}
                            {t.prevStep}
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`button-primary ${
                              isSubmitting
                                ? "opacity-70 cursor-not-allowed"
                                : ""
                            } flex items-center gap-2`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                {t.submitting}
                              </span>
                            ) : (
                              <>{t.submitTest}</>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TestDrive;