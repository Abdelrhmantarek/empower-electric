import { useLanguage } from "../Layout"; // Add useLanguage hook

export default function BenefitsSection() {
  const { language } = useLanguage(); // Add language context
  const t = translations[language]; // Use translations based on language

  const benefits = [
    {
      id: 1,
      title: "zeroEmissions",
      description: "zeroEmissionsDesc",
      icon: (
        <svg
          className="w-10 h-10 text-ev-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "lowerOperatingCosts",
      description: "lowerOperatingCostsDesc",
      icon: (
        <svg
          className="w-10 h-10 text-ev-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "cuttingEdgeTechnology",
      description: "cuttingEdgeTechnologyDesc",
      icon: (
        <svg
          className="w-10 h-10 text-ev-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "instantTorque",
      description: "instantTorqueDesc",
      icon: (
        <svg
          className="w-10 h-10 text-ev-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "reducedNoisePollution",
      description: "reducedNoisePollutionDesc",
      icon: (
        <svg
          className="w-10 h-10 text-ev-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: "taxIncentives",
      description: "taxIncentivesDesc",
      icon: (
        <svg
          className="w-10 h-10 text-ev-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-muted py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.benefitsTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.benefitsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-start">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{t[benefit.title]}</h3>
                <p className="text-muted-foreground">{t[benefit.description]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add translations object (merge with existing translations)
const translations = {
  en: {
    benefitsTitle: "Benefits of Electric Vehicles",
    benefitsDescription: "Discover why electric vehicles are the smarter choice for today and tomorrow",
    zeroEmissions: "Zero Emissions",
    zeroEmissionsDesc: "Drive with a clear conscience knowing your vehicle produces zero tailpipe emissions, helping to create cleaner air for everyone.",
    lowerOperatingCosts: "Lower Operating Costs",
    lowerOperatingCostsDesc: "Electric vehicles typically cost less to maintain and operate than traditional combustion engines, saving you money long-term.",
    cuttingEdgeTechnology: "Cutting-Edge Technology",
    cuttingEdgeTechnologyDesc: "Experience the latest innovations in autonomous driving features, connectivity, and infotainment systems.",
    instantTorque: "Instant Torque",
    instantTorqueDesc: "Electric motors deliver 100% of their torque immediately, providing superior acceleration and a thrilling driving experience.",
    reducedNoisePollution: "Reduced Noise Pollution",
    reducedNoisePollutionDesc: "Enjoy a quieter, more peaceful driving experience with electric vehicles' near-silent operation.",
    taxIncentives: "Tax Incentives",
    taxIncentivesDesc: "Take advantage of federal and state tax credits and incentives designed to encourage EV adoption.",
    title: "Drive The <span>Future</span> Today",
    description: "Experience premium electric vehicles with cutting-edge technology, exceptional performance, and zero emissions.",
    exploreButton: "Explore Our Stock",
    testDriveButton: "Book a Test Drive",
    scrollIndicator: "Scroll down to explore",
    featuredModels: "Featured Models",
    discoverModels: "Discover our premium selection of cutting-edge electric vehicles that redefine the future of transportation"
  },
  ar: {
    benefitsTitle: "فوائد السيارات الكهربائية",
    benefitsDescription: "اكتشف لماذا تُعتبر السيارات الكهربائية الخيار الأذكى لليوم والغد",
    zeroEmissions: "انبعاثات صفرية",
    zeroEmissionsDesc: "استمتع بالقيادة بضمير مرتاح عالمًا أن سيارتك لا تنبعث منها أي انبعاثات عادم، مما يساعد في تحسين جودة الهواء للجميع.",
    lowerOperatingCosts: "تكاليف تشغيل أقل",
    lowerOperatingCostsDesc: "السيارات الكهربائية عادةً ما تكون أقل تكلفة في الصيانة والتشغيل مقارنة بالمحركات التقليدية، مما يوفر لك المال على المدى الطويل.",
    cuttingEdgeTechnology: "تكنولوجيا متطورة",
    cuttingEdgeTechnologyDesc: "استمتع بالابتكارات الأحدث في ميزات القيادة الذاتية، الاتصال، وأنظمة الترفيه.",
    instantTorque: "عزم فوري",
    instantTorqueDesc: "المحركات الكهربائية تقدم 100% من عزمها فورًا، مما يوفر تسارعًا متفوقًا وتجربة قيادة مثيرة.",
    reducedNoisePollution: "تلوث صوتي أقل",
    reducedNoisePollutionDesc: "استمتع بتجربة قيادة هادئة ومريحة أكثر مع تشغيل السيارات الكهربائية الهادئ جدًا.",
    taxIncentives: "حوافز ضريبية",
    taxIncentivesDesc: "استفد من الائتمانات الضريبية الفيدرالية والولائية والحوافز المصممة لتشجيع اعتماد السيارات الكهربائية.",
    title: "قد <span>المستقبل</span> اليوم",
    description: "استمتع بتجربة السيارات الكهربائية الفاخرة مع تكنولوجيا متطورة، أداء استثنائي، وانبعاثات صفرية.",
    exploreButton: "استكشف مخزوننا",
    testDriveButton: "احجز تجربة قيادة",
    scrollIndicator: "مرر لأسفل لاستكشاف المزيد",
    featuredModels: "النماذج المميزة",
    discoverModels: "اكتشف مجموعتنا المميزة من السيارات الكهربائية المتطورة التي تعيد تعريف مستقبل النقل"
  }
};