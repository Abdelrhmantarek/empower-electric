import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import mission from "../../public/about/mission.png";
import first_about from "../../public/about/first_about_us.png";
import second_about from "../../public/about/second_about_us.png";
import third_about from "../../public/about/third_about_us.png";
import { useLanguage } from "@/components/Layout"; // Add useLanguage hook

const About = () => {
  const { language } = useLanguage(); // Add language context
  const t = translations[language]; // Use translations based on language

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="section-container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.ourMission}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.missionDescription}
          </p>
        </div>
        
        {/* Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.whoWeAre}</h2>
            <p className="text-muted-foreground mb-4">
              {t.whoWeAreDesc1}
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <img
              src={mission}
              alt="Empower EV Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.ourJourney}</h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-muted"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="ml-0 md:ml-auto md:pl-8 md:w-1/2 md:text-right pr-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2020</h3>
                  <h4 className="font-semibold mb-2">{t.foundation}</h4>
                  <p className="text-muted-foreground">
                    {t.foundationDesc}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="md:ml-8 md:w-1/2 md:text-left pl-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2021</h3>
                  <h4 className="font-semibold mb-2">{t.expansion}</h4>
                  <p className="text-muted-foreground">
                    {t.expansionDesc}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="ml-0 md:ml-auto md:pl-8 md:w-1/2 md:text-right pr-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2022</h3>
                  <h4 className="font-semibold mb-2">{t.innovation}</h4>
                  <p className="text-muted-foreground">
                    {t.innovationDesc}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div className="md:ml-8 md:w-1/2 md:text-left pl-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2023</h3>
                  <h4 className="font-semibold mb-2">{t.recognition}</h4>
                  <p className="text-muted-foreground">
                    {t.recognitionDesc}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-accent flex items-center justify-center">
                  <span className="text-ev-charcoal text-sm font-bold">5</span>
                </div>
                <div className="ml-0 md:ml-auto md:pl-8 md:w-1/2 md:text-right pr-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-accent">2024</h3>
                  <h4 className="font-semibold mb-2">{t.todayBeyond}</h4>
                  <p className="text-muted-foreground">
                    {t.todayBeyondDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Achievements */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.ourAchievements}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 text-center">
            {t.achievementsDescription}
          </p>
          <div className="space-y-16">
            {/* Achievement 1: Image Right, Text Left */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-1 lg:order-1">
                <h3 className="text-xl font-semibold mb-2 text-ev-blue">{t.flagshipShowroom}</h3>
                <p className="text-muted-foreground">
                  {t.flagshipShowroomDesc}
                </p>
              </div>
              <div className="order-2 lg:order-2">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img
                    src={first_about}
                    alt="Flagship Showroom Opening"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Achievement 2: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img
                    src={second_about}
                    alt="EV Dealership of the Year"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-xl font-semibold mb-2 text-ev-blue">{t.evDealershipAward}</h3>
                <p className="text-muted-foreground">
                  {t.evDealershipAwardDesc}
                </p>
              </div>
            </div>
            {/* Achievement 3: Image Right, Text Left */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-1 lg:order-1">
                <h3 className="text-xl font-semibold mb-2 text-ev-blue">{t.carbonNeutral}</h3>
                <p className="text-muted-foreground">
                  {t.carbonNeutralDesc}
                </p>
              </div>
              <div className="order-2 lg:order-2">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img
                    src={third_about}
                    alt="Carbon Neutral Certification"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.certificationsTitle}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">{t.certifiedEVSpecialist}</h3>
              <p className="text-sm text-muted-foreground">{t.certifiedEVSpecialistDesc}</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">{t.carbonNeutralBusiness}</h3>
              <p className="text-sm text-muted-foreground">{t.carbonNeutralBusinessDesc}</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">{t.greenEnergyPartner}</h3>
              <p className="text-sm text-muted-foreground">{t.greenEnergyPartnerDesc}</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">{t.customerExcellence}</h3>
              <p className="text-sm text-muted-foreground">{t.customerExcellenceDesc}</p>
            </div>
          </div>
        </div>
        
        {/* Location Map */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.visitDealership}</h2>
          
          <div className="aspect-video rounded-lg overflow-hidden border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1673.400926093519!2d44.18215108901525!3d15.332009120934389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z2IzYtNin2LHYuSDYp9mE2LLYqNmK2LHZiiDYjNij2YXYp9mFINmI2LLYp9ix2Kkg2KfZhNmG2YHYtyDYtdmG2LnYp9ihIC0g2KfZhNis2YXZh9mI2LHZitipINin2YTZitmF2YbZitip!5e1!3m2!1sen!2seg!4v1748455891794!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Empower EV Dealership Location"
            ></iframe>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-ev-blue text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/test-drive" className="button-accent">
              {t.bookTestDrive}
            </Link>
            <Link to="/contact" className="bg-transparent border border-white text-white hover:bg-white hover:text-ev-blue font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center">
              {t.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Add translations object (merge with existing translations)
const translations = {
  en: {
    ourMission: "Our Mission",
    missionDescription: "Empower aims to promote the use of electric vehicles as a sustainable and eco-friendly option by offering a variety of high-quality electric vehicles, providing excellent after-sales services, and raising awareness about the benefits of electric transportation.",
    whoWeAre: "Who We Are",
    whoWeAreDesc1: "Empower is the first specialized agency for electric vehicles in Yemen, leading the way to the future in this field. It offers a wide and diverse range of electric cars that meets various preferences and needs, from com- pact city cars to luxurious and high-performance models",
    ourJourney: "Our Journey",
    foundation: "Foundation",
    foundationDesc: "Empower EV was founded with a vision to make premium electric vehicles more accessible through exceptional service and expertise.",
    expansion: "Expansion",
    expansionDesc: "Opened our flagship showroom featuring state-of-the-art facilities and a curated selection of premium electric vehicles.",
    innovation: "Innovation",
    innovationDesc: "Launched our home charging installation service and educational workshops to help customers transition seamlessly to electric mobility.",
    recognition: "Recognition",
    recognitionDesc: "Recognized as 'EV Dealership of the Year' and achieved certification as a sustainable business through our carbon-neutral operations.",
    todayBeyond: "Today & Beyond",
    todayBeyondDesc: "Continuing to grow our inventory with the most advanced electric vehicles and expanding our service offerings to meet the evolving needs of EV owners.",
    ourAchievements: "Our Achievements",
    achievementsDescription: "Discover the milestones that highlight Empower EV's leadership in sustainable mobility.",
    flagshipShowroom: "Flagship Showroom Opening",
    flagshipShowroomDesc: "In 2021, we opened our state-of-the-art flagship showroom in Los Angeles, designed to showcase the latest in electric vehicle technology with a focus on customer experience.",
    evDealershipAward: "EV Dealership of the Year",
    evDealershipAwardDesc: "Recognized in 2023 as the 'EV Dealership of the Year' for our outstanding service, innovative approach, and commitment to advancing electric mobility.",
    carbonNeutral: "Our Engineers",
    carbonNeutralDesc: "Empower Electric Cars is one of the leading companies with a team of specialized engineers in this field. The team includes engineers with the expertise and skills necessary to efficiently maintain electric vehicles.",
    certificationsTitle: "Our Certifications & Partners",
    certifiedEVSpecialist: "Certified EV Specialist",
    certifiedEVSpecialistDesc: "Industry recognized certification for electric vehicle sales and service",
    carbonNeutralBusiness: "Carbon Neutral Business",
    carbonNeutralBusinessDesc: "Committed to sustainable operations and minimal environmental impact",
    greenEnergyPartner: "Green Energy Partner",
    greenEnergyPartnerDesc: "Powered by 100% renewable energy sources for all operations",
    customerExcellence: "Customer Excellence",
    customerExcellenceDesc: "Top-rated customer service with 98% satisfaction rating",
    visitDealership: "Visit Our Dealership",
    ctaTitle: "Ready to Experience the Electric Revolution?",
    ctaDescription: "Schedule a test drive today and discover why our customers are making the switch to electric vehicles with Empower EV.",
    bookTestDrive: "Book a Test Drive",
    contactUs: "Contact Us",
    quickLinks: "Quick Links",
    home: "Home",
    inventory: "Inventory",
    testDrive: "Book a Test Drive",
    about: "About Us",
    contact: "Contact",
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
    sitemap: "Sitemap",
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
    ourMission: "مهمتنا",
    missionDescription: "تهدف شركة إمباور إلى تعزيز استخدام المركبات الكهربائية كخيار مستدام وصديق للبيئة من خلال تقديم مجموعة متنوعة من المركبات الكهربائية عالية الجودة، وتوفير خدمات ما بعد البيع الممتازة، وزيادة الوعي حول فوائد النقل الكهربائي.",
    whoWeAre: "من نحن",
    whoWeAreDesc1: "إمباور هي أول وكالة متخصصة بالسيارات الكهربائية في اليمن، رائدة في هذا المجال. تقدم تشكيلة واسعة ومتنوعة من السيارات الكهربائية التي تلبي مختلف الأذواق والاحتياجات، من سيارات المدينة الصغيرة إلى السيارات الفاخرة عالية الأداء.",
    ourJourney: "رحلتنا",
    foundation: "التأسيس",
    foundationDesc: "تأسست Empower EV برؤية لجعل السيارات الكهربائية الفاخرة أكثر سهولة من خلال خدمة وخبرة استثنائية.",
    expansion: "التوسع",
    expansionDesc: "افتتحنا صالة العرض الرئيسية التي تضم مرافق حديثة ومجموعة مختارة من السيارات الكهربائية الفاخرة.",
    innovation: "الابتكار",
    innovationDesc: "أطلقنا خدمة تركيب الشواحن المنزلية وورش عمل تعليمية لمساعدة العملاء على الانتقال بسلاسة إلى التنقل الكهربائي.",
    recognition: "التقدير",
    recognitionDesc: "تم الاعتراف بنا كـ 'وكيل السيارات الكهربائية للعام' وحصلنا على شهادة كعمل تجاري مستدام من خلال عملياتنا المحايدة للكربون.",
    todayBeyond: "اليوم وما بعده",
    todayBeyondDesc: "نواصل توسيع مخزوننا بأحدث السيارات الكهربائية وتوسيع خدماتنا لتلبية الاحتياجات المتطورة لمالكي السيارات الكهربائية.",
    ourAchievements: "إنجازاتنا",
    achievementsDescription: "اكتشف المعالم التي تبرز ريادة Empower EV في التنقل المستدام.",
    flagshipShowroom: "افتتاح صالة العرض الرئيسية",
    flagshipShowroomDesc: "في عام 2021، افتتحنا صالة عرضنا الرئيسية الحديثة في لوس أنجلوس، المصممة لعرض أحدث ما في تكنولوجيا السيارات الكهربائية مع التركيز على تجربة العملاء.",
    evDealershipAward: "وكيل السيارات الكهربائية للعام",
    evDealershipAwardDesc: "تم الاعتراف بنا في عام 2023 كـ 'وكيل السيارات الكهربائية للعام' لخدمتنا المتميزة، ونهجنا المبتكر، والتزامنا بتطوير التنقل الكهربائي.",
    carbonNeutral: "مهندسونا",
    carbonNeutralDesc: "تُعد شركة إمباور للسيارات الكهربائية من الشركات الرائدة في هذا المجال، حيث تضم فريقًا من المهندسين المتخصصين ذوي الخبرة والمهارات اللازمة لصيانة السيارات الكهربائية بكفاءة.",
    certificationsTitle: "شهاداتنا وشركاؤنا",
    certifiedEVSpecialist: "أخصائي سيارات كهربائية معتمد",
    certifiedEVSpecialistDesc: "شهادة معترف بها في الصناعة لمبيعات وخدمة السيارات الكهربائية",
    carbonNeutralBusiness: "عمل تجاري محايد للكربون",
    carbonNeutralBusinessDesc: "ملتزمون بالعمليات المستدامة والتأثير البيئي الأدنى",
    greenEnergyPartner: "شريك الطاقة الخضراء",
    greenEnergyPartnerDesc: "مدعوم بنسبة 100% من مصادر الطاقة المتجددة لجميع العمليات",
    customerExcellence: "تميز العملاء",
    customerExcellenceDesc: "خدمة عملاء من الدرجة الأولى مع معدل رضا 98%",
    visitDealership: "زوروا وكالتنا",
    ctaTitle: "هل أنت جاهز لتجربة الثورة الكهربائية؟",
    ctaDescription: "جدولة اختبار قيادة اليوم واكتشف لماذا يتحول عملاؤنا إلى السيارات الكهربائية مع Empower EV.",
    bookTestDrive: "حجز اختبار قيادة",
    contactUs: "اتصل بنا",
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    inventory: "المخزون",
    testDrive: "حجز تجربة قيادة",
    about: "من نحن",
    contact: "اتصل بنا",
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
    sitemap: "خريطة الموقع",
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

export default About;