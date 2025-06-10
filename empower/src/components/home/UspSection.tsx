
import { Link } from "react-router-dom";
import { ShieldCheck, Award, ThumbsUp, Users } from "lucide-react";
import { useLanguage } from "../Layout";

const translations = {
  en: {
    title: "Why Choose Empower?",
    pointOne: {
      title: "EV Expertise",
      description: "Our team of certified EV specialists has extensive knowledge of electric vehicle technology, ensuring you receive expert guidance."
    },
    pointTwo: {
      title: "Premium Selection",
      description: "We curate only the finest electric vehicles, offering luxury, performance, and cutting-edge technology in every model."
    },
    pointThree: {
      title: "Personalized Service",
      description: "Experience white-glove service tailored to your needs, from personalized consultations to at-home test drives."
    },
    pointFour: {
      title: "Charging Solutions",
      description: "We offer comprehensive home charging installation services and guidance on public charging networks."
    },
    learnMore: "Learn More About Us",
    testimonial: "Empower provided an exceptional experience from start to finish. Their knowledge and passion for electric vehicles was evident throughout the process.",
    customer: "— Michael T., Satisfied Customer"
  },
  ar: {
    title: "لماذا تختار إمباور إي في؟",
    pointOne: {
      title: "خبرة السيارات الكهربائية",
      description: "فريقنا من المتخصصين المعتمدين في السيارات الكهربائية لديه معرفة واسعة بتكنولوجيا المركبات الكهربائية، مما يضمن حصولك على توجيه خبير."
    },
    pointTwo: {
      title: "اختيار متميز",
      description: "نقوم باختيار أفضل السيارات الكهربائية فقط، مما يوفر الفخامة والأداء والتكنولوجيا المتطورة في كل طراز."
    },
    pointThree: {
      title: "خدمة شخصية",
      description: "استمتع بخدمة راقية مصممة خصيصًا لاحتياجاتك، من الاستشارات الشخصية إلى تجارب القيادة المنزلية."
    },
    pointFour: {
      title: "حلول الشحن",
      description: "نقدم خدمات تركيب شاملة للشحن المنزلي وإرشادات حول شبكات الشحن العامة."
    },
    learnMore: "تعرف أكثر علينا",
    testimonial: "قدمت إمباور إي في تجربة استثنائية من البداية إلى النهاية. كانت معرفتهم وشغفهم بالسيارات الكهربائية واضحة طوال العملية.",
    customer: "— مايكل ت.، عميل راضٍ"
  }
};

export default function UspSection() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const isRtl = language === "ar";
  const textAlignment = isRtl ? "text-right" : "text-left";
  
  return (
    <section className="section-container" id="usp-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className={`space-y-6 ${textAlignment}`}>
          <h2 className="text-3xl md:text-4xl font-bold relative">
            <span className="relative z-10">{t.title}</span>
            <span className="absolute -bottom-3 left-0 h-3 w-20 bg-ev-accent/30 rounded-full"></span>
          </h2>
          
          <div className="space-y-8 mt-10">
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <div className={`flex gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="bg-ev-blue text-white rounded-full w-14 h-14 flex items-center justify-center shrink-0 shadow-lg shadow-ev-blue/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.pointOne.title}</h3>
                  <p className="text-muted-foreground">
                    {t.pointOne.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <div className={`flex gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="bg-ev-blue text-white rounded-full w-14 h-14 flex items-center justify-center shrink-0 shadow-lg shadow-ev-blue/20">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.pointTwo.title}</h3>
                  <p className="text-muted-foreground">
                    {t.pointTwo.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <div className={`flex gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="bg-ev-blue text-white rounded-full w-14 h-14 flex items-center justify-center shrink-0 shadow-lg shadow-ev-blue/20">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.pointThree.title}</h3>
                  <p className="text-muted-foreground">
                    {t.pointThree.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <div className={`flex gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="bg-ev-blue text-white rounded-full w-14 h-14 flex items-center justify-center shrink-0 shadow-lg shadow-ev-blue/20">
                  <ThumbsUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.pointFour.title}</h3>
                  <p className="text-muted-foreground">
                    {t.pointFour.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Link to="/about" className="button-primary group">
              {t.learnMore}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="relative h-[600px] rounded-xl overflow-hidden group perspective">
          <img
            src="https://images.unsplash.com/photo-1571987502227-9231b837d92a?q=80&w=2070&auto=format&fit=crop"
            alt="Empower Dealership"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 w-full">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="text-ev-accent mb-1 text-2xl">"</div>
                <p className="text-white text-lg font-medium mb-4">
                  {t.testimonial}
                </p>
                <p className="text-ev-accent">{t.customer}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ev-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
