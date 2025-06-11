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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { fetchCars, Car as CarType } from "@/data/cars";
import { useLanguage } from "@/components/Layout";
import emailjs from "@emailjs/browser";

const formatDate = (date: Date, locale: string) => {
  return date.toLocaleDateString(locale === "ar" ? "en-US" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).replace(/(\w+), (\w+) (\d+)/, "$1, $2 $3");
};

const formatTime = (hour: number, minute: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const minuteString = minute === 0 ? "00" : minute.toString();
  return `${adjustedHour}:${minuteString} ${period}`;
};

const translations = {
  en: {
    noDatesAvailable: "No available dates for this vehicle.",
    noTimesAvailable: "No available time slots for this date.",
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
    submissionError: "Failed to schedule test drive. Please try again.",
    timeBooked: "This time slot is already booked for this vehicle.",
  },
  ar: {
    noDatesAvailable: "لا توجد تواريخ متاحة لهذه السيارة.",
    noTimesAvailable: "لا توجد أوقات متاحة لهذا التاريخ.",
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
    submissionError: "فشل في جدولة تجربة القيادة. الرجاء المحاولة مرة أخرى.",
    timeBooked: "هذا الوقت محجوز بالفعل لهذه السيارة.",
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

  const [cars, setCars] = useState<CarType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<{ [carAndDate: string]: string[] }>({});
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

  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  // Add to useEffect for initialization
  useEffect(() => {
    emailjs.init(`${process.env.REACT_APP_EMAILJS_USER_ID}`); 
  }, []);

  // Fetch cars
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
    window.scrollTo(0, 0);
  }, [carId, t.error]);

  // Fetch booked slots for the selected car and date
  useEffect(() => {
  const fetchBookedSlots = async () => {
    if (!selectedCar || !selectedDate) return;

    const carText = `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`;
    const dateText = formatDate(selectedDate, language);

    try {
      const url = `${process.env.REACT_APP_STRAPI_API_URL}/api/test-drive-submissions?filters[car][$eq]=${encodeURIComponent(carText)}&filters[date][$eq]=${encodeURIComponent(dateText)}`;
      console.log("Fetching booked slots from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", JSON.stringify(errorData, null, 2));
        throw new Error(`Failed to fetch booked slots: ${errorData.error?.message || response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Strapi booked slots response:", JSON.stringify(responseData, null, 2));

      const bookedTimes = Array.isArray(responseData.data)
        ? responseData.data
            .filter((submission: any) => submission.time)
            .map((submission: any) => submission.time)
        : [];

      setBookedSlots((prev) => ({
        ...prev,
        [`${carText}|${dateText}`]: bookedTimes,
      }));
    } catch (err: any) {
      console.error("Error fetching booked slots:", err.message);
      setError(`${t.submissionError}: ${err.message}`);
    }
  };

  fetchBookedSlots();
}, [selectedCar, selectedDate, language, t.submissionError]);

  useEffect(() => {
  const fetchAvailabilityConfig = async () => {
    if (!selectedCar) return;

    const carText = `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`;
    try {
      const url = `${process.env.REACT_APP_STRAPI_API_URL}/api/test-drive-availability-configs?filters[car][$eq]=${encodeURIComponent(carText)}`;
      console.log("Fetching availability config from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", JSON.stringify(errorData, null, 2));
        throw new Error(`Failed to fetch availability config: ${errorData.error?.message || response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Strapi availability config response:", JSON.stringify(responseData, null, 2));

      // Extract config
      const config = responseData.data[0];

      if (!config) {
        setAvailableDates([]);
        setAvailableTimeSlots([]);
        return;
      }

      // Generate dates
      const startDate = new Date(config.startDate);
      const endDate = new Date(config.endDate);
      const dates: Date[] = [];
      const currentDate = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today for comparison

      while (currentDate <= endDate) {
        if (currentDate >= today) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setAvailableDates(dates);

      // Generate time slots if a date is selected
      // if (selectedDate) {
        const timeSlots: string[] = [];
        let hour = config.startHour;
        let minute = 0;

        while (hour < config.endHour || (hour === config.endHour && minute === 0)) {
          timeSlots.push(formatTime(hour, minute));
          minute += config.intervalMinutes;
          if (minute >= 60) {
            hour += Math.floor(minute / 60);
            minute = minute % 60;
          }
        }
        setAvailableTimeSlots(timeSlots);
      // }
    } catch (err: any) {
      console.error("Error fetching availability config:", err.message);
      setError(`${t.submissionError}: ${err.message}`);
    }
  };

  fetchAvailabilityConfig();
}, [selectedCar, selectedDate, language, t.submissionError]);


  const handleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (name === "carModel" && value) {
    const car = cars.find((c) => c.id === value);
    setSelectedCar(car || null);
    setSelectedDate(null);
    setAvailableTimeSlots([]);
    setFormData((prev) => ({ ...prev, date: "", time: "" }));
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
    time: "", // Clear time when date changes
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Prepare the car details as a text field
    const carText = selectedCar
      ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`
      : "Unknown Vehicle";

    // Prepare the JSON data for the test drive submission
    const jsonData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      car: carText,
      date: formData.date,
      time: formData.time,
      comments: formData.comments,
    };

    try {
      // Step 1: Create the test drive entry with text data (JSON request)
      console.log("Submitting test drive data to Strapi (JSON)...");
      console.log("Data:", JSON.stringify(jsonData, null, 2));

      const createResponse = await fetch(`${process.env.REACT_APP_STRAPI_API_URL}/api/test-drive-submissions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: jsonData }),
      });

      const createResponseData = await createResponse.json();
      console.log("Create Response from Strapi:", JSON.stringify(createResponseData, null, 2));

      if (!createResponse.ok) {
        const errorMessage = createResponseData.error?.message || t.submissionError;
        const errorDetails = createResponseData.error?.details || {};
        throw new Error(`Failed to create entry: ${errorMessage}. Details: ${JSON.stringify(errorDetails)}`);
      }

      // Step 2: If a file is provided, upload it to the created entry
      if (formData.licenseFile) {
        const entryId = createResponseData.data.id; // Get the ID of the newly created entry
        console.log(`Uploading license file for entry ID ${entryId}...`);

        const fileFormData = new FormData();
        fileFormData.append("files", formData.licenseFile);
        fileFormData.append("ref", "api::test-drive-submission.test-drive-submission"); // Strapi collection API ID
        fileFormData.append("refId", entryId); // ID of the created entry
        fileFormData.append("field", "licenseFile"); // Field to attach the file to

        for (const [key, value] of fileFormData.entries()) {
          console.log(`${key}: ${value instanceof File ? `[File: ${value.name}]` : value}`);
        }

        const uploadResponse = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          body: fileFormData,
        });

        const uploadResponseData = await uploadResponse.json();
        console.log("Upload Response from Strapi:", JSON.stringify(uploadResponseData, null, 2));

        if (!uploadResponse.ok) {
          const uploadErrorMessage = uploadResponseData.error?.message || "Failed to upload file";
          console.warn(`File upload failed: ${uploadErrorMessage}`);
          // Note: We won't fail the entire submission if the file upload fails
        }
      }

      // Step 3: Update bookedSlots state locally
      if (formData.date && formData.time && selectedCar) {
        const key = `${carText}|${formData.date}`;
        setBookedSlots((prev) => ({
          ...prev,
          [key]: [...(prev[key] || []), formData.time],
        }));
      }

      // Send email via EmailJS
      const emailParams = {
        email_subject: `New Test Drive Booking for ${selectedCar?.year || "Unknown"} ${selectedCar?.make || "Unknown"} ${selectedCar?.model || "Unknown"}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: "info@emtiazpower.com",
        phone: formData.phone,
        car_make: selectedCar?.make || "Unknown",
        car_model: selectedCar?.model || "Unknown",
        car_year: selectedCar?.year || "Unknown",
        date: formData.date,
        time: formData.time,
        comments: formData.comments || "No comments provided",
        submission_date: new Date().toLocaleString(language === "ar" ? "ar-SA" : "en-US"),
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_TESTDRIVE_ID,
        emailParams
      );
      console.log("Email sent successfully!");

      // If we reach here, the submission is successful
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(`Submission failed: ${err.message || t.submissionError}`);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
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
              <h3 className="text-xl font-bold mb-4">{t.viewDetails}</h3>

              <div className="space-y-5">
                <div className="flex items-start">
                  <Car
                    className={`text-ev-blue-dark dark:text-ev-blue-light flex-shrink-0 mt-1 ${isRtl ? "ml-4" : "mr-4"}`}
                    size={20}
                  />
                  <div className={textAlign}>
                    <p className="font-medium">{t.vehicle}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedCar
                        ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`
                        : "Selected Vehicle"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center gap-1 flex-shrink-0 mt-1 text-ev-blue-dark dark:text-ev-blue-light">
                    <Calendar className={isRtl ? "ml-4" : "mr-4"} size={20} />
                  </div>
                  <div className={textAlign}>
                    <p className="font-medium">{t.dateAndTime}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {formData.date} {formData.time && `- ${formData.time}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User
                    className={`text-ev-blue-dark dark:text-ev-blue-light flex-shrink-0 mt-1 ${isRtl ? "ml-4" : "mr-4"}`}
                    size={20}
                  />
                  <div className={textAlign}>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-gray-500 dark:text-gray-400">
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
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-3 rounded-full font-semibold transition-all duration-200"
              >
                {t.scheduleAnother}
              </button>

              <Link to="/" className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-5 py-3 rounded-full font-semibold transition-all duration-200">
                {t.return}
              </Link>

              <Link to="/inventory" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-3 rounded-full font-semibold transition-all duration-200">
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
                    step >= 1 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                      step >= 1
                        ? "border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-600 text-gray-foreground dark:text-gray-400"
                    }`}
                  >
                    <Car className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{t.selectVehicle}</span>
                </div>

                <div
                  className={`h-1 flex-1 mx-4 ${
                    step >= 2 ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                />

                <div
                  className={`flex flex-col items-center ${
                    step >= 2 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                      step >= 2
                        ? "border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-600 text-gray-foreground dark:text-gray-400"
                    }`}
                  >
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{t.schedule}</span>
                </div>

                <div
                  className={`h-1 flex-1 mx-4 ${
                    step >= 3 ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                />

                <div
                  className={`flex flex-col items-center ${
                    step >= 3 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${
                      step >= 3
                        ? "border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-600 text-gray-foreground dark:text-gray-400"
                    }`}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{t.yourDetails}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
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
                      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                        {t.selectVehicle}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-8">
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
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
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
                                  ? "border-blue-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {formData.carModel === car.id && (
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                              )}
                            </div>

                            <div className="flex-grow flex items-center">
                              <img
                                src={car.mainImage}
                                alt={car.model}
                                className="w-16 h-16 object-cover rounded-md mr-4"
                              />
                              <div>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {car.year} {car.make} {car.model}
                                </span>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
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
                          className={`bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-5 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                            !formData.carModel
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
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
                      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">{t.schedule}</h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-8">
                        {t.schedulePrompt}
                      </p>

                      {selectedCar && (
  <div
    className={`bg-gray-100 dark:bg-gray-700/30 rounded-xl p-4 flex ${isRtl ? "flex-row-reverse" : ""} items-center mb-8`}
  >
    <img
      src={selectedCar.mainImage}
      alt={`${selectedCar.make} ${selectedCar.model}`}
      className={`w-20 h-20 object-cover rounded-md ${isRtl ? "ml-4" : "mr-4"}`}
    />
    <div>
      <h3 className="font-medium text-gray-800 dark:text-gray-200">
        {selectedCar.year} {selectedCar.make} {selectedCar.model}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {selectedCar.shortDescription}
      </p>
    </div>
  </div>
)}

                      <div className="mb-8">
  <label className={`block font-medium mb-4 text-gray-700 dark:text-gray-300 ${textAlign}`}>
    {t.selectDate}
  </label>
  {availableDates.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">{t.noDatesAvailable}</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {availableDates.map((date, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleDateSelect(date)}
          className={`p-3 text-center rounded-lg border transition-all ${
            selectedDate && selectedDate.toDateString() === date.toDateString()
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
        >
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", { weekday: "short" })}
          </div>
          <div className="font-medium text-gray-800 dark:text-gray-200">
            {date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", { day: "numeric" })}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", { month: "short" })}
          </div>
        </button>
      ))}
    </div>
  )}
</div>

                      <div className="mb-8">
  <label className={`block font-medium mb-4 text-gray-700 dark:text-gray-300 ${textAlign}`}>
    {t.selectTime}
  </label>
  {availableTimeSlots.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">{t.noTimesAvailable}</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {availableTimeSlots.map((time, index) => {
        const isBooked =
          selectedCar &&
          formData.date &&
          bookedSlots[
            `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}|${formData.date}`
          ]?.includes(time);
        return (
          <button
            key={index}
            type="button"
            onClick={() => !isBooked && setFormData({ ...formData, time })}
            disabled={isBooked}
            className={`p-3 text-center rounded-lg border transition-all flex items-center justify-center gap-2 ${
              formData.time === time
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : isBooked
                ? "border-gray-400 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
            title={isBooked ? t.timeBooked : undefined}
          >
            <Clock size={16} />
            <span>{time}</span>
          </button>
        );
      })}
    </div>
  )}
</div>

                      <div
                        className={`mt-10 flex justify-between ${
                          isRtl ? "flex-row-reverse" : ""
                        }`}
                      >
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2"
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
                          className={`bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-5 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                            !formData.date || !formData.time
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
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
                      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                        {t.yourDetails}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-8">
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
                              className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textAlign}`}
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
                              className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textAlign}`}
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
                              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textAlign}`}
                          />
                        </div>

                        <div
                          className={`mt-10 flex justify-between ${
                            isRtl ? "flex-row-reverse" : ""
                          }`}
                        >
                          <button
                            type="button"
                            onClick={handlePrevious}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2"
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
                            className={`bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-5 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                              isSubmitting
                                ? "opacity-70 cursor-not-allowed"
                                : ""
                            }`}
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
                        {error && (
                          <p className={`text-red-600 dark:text-red-400 text-center mt-4 ${textAlign}`}>
                            {error}
                          </p>
                        )}
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