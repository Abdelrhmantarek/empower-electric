import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/components/Layout";

// Define translations for English (en) and Arabic (ar)
const translations = {
  en: {
    pageTitle: "Contact Us",
    pageDescription: "Have questions about our electric vehicles or services? We're here to help you find the perfect EV for your needs.",
    getInTouch: "Get In Touch",
    phone: "Phone",
    salesPhone: "+(967) 8-1781550",
    servicePhone: "+(967) 0-1200077",
    email: "Email",
    supportEmail: "info@emtiazpower.com",
    location: "Location",
    locationDetails: "ZUBAIRY STREET,<br />IN FRONT OF MINISTRY OF OIL,<br /> SANA’A, REPUBLIC OF YEMEN.",
    businessHours: "Business Hours",
    saturdayThursday: "Saturday - Thursday:",
    saturdayThursdayHours: "8:00 AM - 4:00 PM",
    friday: "Friday:",
    fridayHours: "Closed",
    connectWithUs: "Connect With Us",
    sendMessage: "Send Us a Message",
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    subjectLabel: "Subject",
    selectSubject: "Select a subject",
    generalInquiry: "General Inquiry",
    sales: "Sales",
    service: "Service",
    feedback: "Feedback",
    messageLabel: "Message",
    sendButton: "Send Message",
    sending: "Sending...",
    successMessage: "Message Sent Successfully!",
    successDescription: "Thank you for reaching out. We'll get back to you as soon as possible.",
    errorMessage: "Failed to submit the form. Please try again.",
    serverErrorMessage: "An error occurred. Please check the console and try again.",
    ourLocation: "Our Location",
    required: "*",
  },
  ar: {
    pageTitle: "اتصل بنا",
    pageDescription: "هل لديك أسئلة حول سياراتنا الكهربائية أو خدماتنا؟ نحن هنا لمساعدتك في العثور على السيارة الكهربائية المثالية لاحتياجاتك.",
    getInTouch: "تواصلوا معنا",
    phone: "الهاتف",
    salesPhone: "8-1781550 (967)+",
    servicePhone: "0-1200077 (967)+",
    email: "البريد الإلكتروني",
    supportEmail: "الدعم: info@emtiazpower.com",
    location: "الموقع",
    locationDetails: "شارع الزبيري،<br />أمام وزارة النفط،<br />صنعاء - الجمهورية اليمنية",
    businessHours: "ساعات العمل",
    saturdayThursday: "السبت - الخميس:",
    saturdayThursdayHours: "8:00 صباحًا - 4:00 مساءً",
    friday: "الجمعة:",
    fridayHours: "مغلق",
    connectWithUs: "تواصلوا معنا",
    sendMessage: "أرسل لنا رسالة",
    nameLabel: "الاسم",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم الهاتف",
    subjectLabel: "الموضوع",
    selectSubject: "اختر موضوعًا",
    generalInquiry: "استفسار عام",
    sales: "المبيعات",
    service: "الخدمة",
    feedback: "التعليقات",
    messageLabel: "الرسالة",
    sendButton: "إرسال الرسالة",
    sending: "جارٍ الإرسال...",
    successMessage: "تم إرسال الرسالة بنجاح!",
    successDescription: "شكرًا لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.",
    errorMessage: "فشل في إرسال النموذج. الرجاء المحاولة مرة أخرى.",
    serverErrorMessage: "حدث خطأ. يرجى التحقق من وحدة التحكم والمحاولة مرة أخرى.",
    ourLocation: "موقعنا",
    required: "*",
  },
};

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init(`${process.env.REACT_APP_EMAILJS_USER_ID}`);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/api/contact-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();
      console.log("Response from Strapi:", JSON.stringify(responseData, null, 2));

      if (response.ok) {
        const emailParams = {
          form_type: "Contact Us Submission",
          subject_or_car: formData.subject || "No Subject",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          inquiry_label: t.subjectLabel, // Use translated label
          inquiry_type: formData.subject,
          message: formData.message,
          submission_date: new Date().toLocaleString(language === "ar" ? "ar-SA" : "en-US"),
          // Omit car-related fields for Contact Us
          car_make: "",
          car_model: "",
          car_year: "",
        };

        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_COMMON_ID,
          emailParams
        );
        console.log("Email sent successfully!");

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(t.errorMessage);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(t.serverErrorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="section-container" dir={language === "ar" ? "rtl" : "ltr"} lang={language}>
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.pageDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">{t.getInTouch}</h2>

            <div className="space-y-6">
              <div className="flex items-start flex-row">
                <div className="bg-ev-blue/10 dark:bg-ev-blue/20 rounded-full p-3 me-4">
                  <Phone className="h-6 w-6 text-ev-blue rtl:scale-x-[-1]" aria-label={t.phone} />
                </div>
                <div className="text-start">
                  <h3 className="font-medium mb-1">{t.phone}</h3>
                  <p className="text-muted-foreground mb-1">{t.salesPhone}</p>
                  <p className="text-muted-foreground">{t.servicePhone}</p>
                </div>
              </div>

              <div className="flex items-start flex-row">
                <div className="bg-ev-blue/10 dark:bg-ev-blue/20 rounded-full p-3 me-4">
                  <Mail className="h-6 w-6 text-ev-blue rtl:scale-x-[-1]" aria-label={t.email} />
                </div>
                <div className="text-start">
                  <h3 className="font-medium mb-1">{t.email}</h3>
                  <p className="text-muted-foreground">{t.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-start flex-row">
                <div className="bg-ev-blue/10 dark:bg-ev-blue/20 rounded-full p-3 me-4">
                  <MapPin className="h-6 w-6 text-ev-blue" aria-label={t.location} />
                </div>
                <div className="text-start">
                  <h3 className="font-medium mb-1">{t.location}</h3>
                  <p
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: t.locationDetails }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 mx-auto max-w-md" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <h3 className="text-xl font-semibold mb-4 text-center">{t.businessHours}</h3>
              <div className="bg-muted p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-[1fr,auto] gap-y-3">
                  <div className={`${language === 'ar' ? 'text-right' : 'text-left'} text-muted-foreground`}>
                    {t.saturdayThursday}
                  </div>
                  <div className={`${language === 'ar' ? 'text-left' : 'text-right'}`}>
                    {t.saturdayThursdayHours}
                  </div>

                  <div className={`${language === 'ar' ? 'text-right' : 'text-left'} text-muted-foreground`}>
                    {t.friday}
                  </div>
                  <div className={`${language === 'ar' ? 'text-left' : 'text-right'}`}>
                    {t.fridayHours}
                  </div>
                </div>
              </div>
            </div>



            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4 text-center">{t.connectWithUs}</h3>
              <div className={`flex ${language === "ar" ? "space-x-4 space-x-reverse" : "space-x-4"} justify-center`}>
                <a
                  href="https://www.facebook.com/EmpowerCarsYe"
                  target="_blank"
                  className="bg-ev-blue text-white p-3 rounded-full hover:bg-ev-blue-light transition-colors"
                  aria-label={language === "ar" ? "فيسبوك" : "Facebook"}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/empower_car?igsh=MXJhOGZ0MnZ2YjY0ZQ=="
                  target="_blank"
                  className="bg-ev-blue text-white p-3 rounded-full hover:bg-ev-blue-light transition-colors"
                  aria-label={language === "ar" ? "إنستغرام" : "Instagram"}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@EmpowerCarsYe"
                  target="_blank"
                  className="bg-ev-blue text-white p-3 rounded-full hover:bg-ev-blue-light transition-colors"
                  aria-label={language === "ar" ? "يوتيوب" : "YouTube"}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <div className="bg-card dark:bg-gray-800 shadow-sm rounded-lg p-6">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-500 mb-4">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
                  {t.successMessage}
                </h2>
                <p className="text-green-700 dark:text-green-400">
                  {t.successDescription}
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-6 text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">{t.sendMessage}</h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 text-start"
                        >
                          {t.nameLabel} <span className="text-red-500">{t.required}</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md ps-3 pe-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                          style={{ textAlign: language === "ar" ? "right" : "left" }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 text-start"
                        >
                          {t.emailLabel} <span className="text-red-500">{t.required}</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md ps-3 pe-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                          style={{ textAlign: language === "ar" ? "right" : "left" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 text-start"
                        >
                          {t.phoneLabel}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md ps-3 pe-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                          style={{ textAlign: language === "ar" ? "right" : "left" }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 text-start"
                        >
                          {t.subjectLabel} <span className="text-red-500">{t.required}</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md ps-3 pe-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                          style={{ textAlign: language === "ar" ? "right" : "left" }}
                        >
                          <option value="">{t.selectSubject}</option>
                          <option value="general">{t.generalInquiry}</option>
                          <option value="sales">{t.sales}</option>
                          <option value="service">{t.service}</option>
                          <option value="feedback">{t.feedback}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 text-start"
                      >
                        {t.messageLabel} <span className="text-red-500">{t.required}</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md ps-3 pe-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ev-blue focus:border-transparent"
                        style={{ textAlign: language === "ar" ? "right" : "left" }}
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`button-primary w-full ${
                          isSubmitting
                            ? "opacity-70 cursor-not-allowed bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                            : ""
                        }`}
                      >
                        {isSubmitting ? t.sending : t.sendButton}
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-600 dark:text-red-400 text-center">
                        {error}
                      </p>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t.ourLocation}</h2>
          <div className="aspect-video rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1260.1689281125423!2d44.18200892451583!3d15.342873411917235!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1603db6ebb561185%3A0x1128d2408a881041!2sEmpower%20Cars!5e1!3m2!1sen!2seg!4v1749565058758!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === "ar" ? "موقع معرض Empower" : "Empower Dealership Location"}
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;