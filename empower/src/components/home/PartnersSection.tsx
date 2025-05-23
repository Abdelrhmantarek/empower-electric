
import { motion } from "framer-motion";
import { useLanguage } from "../Layout";
import byd from "../../../public/partners/byd.png";
import rivian from "../../../public/partners/rivian.png";
import lucid from "../../../public/partners/lucid.png";
import polestar from "../../../public/partners/polestar.png";
import nio from "../../../public/partners/nio.png";

const translations = {
  en: {
    title: "Our EV Partners",
    subtitle: "We collaborate with leading EV manufacturers to bring you the best in electric mobility"
  },
  ar: {
    title: "شركاؤنا في السيارات الكهربائية",
    subtitle: "نتعاون مع الشركات الرائدة في صناعة السيارات الكهربائية لنقدم لك أفضل ما في التنقل الكهربائي"
  }
};

// Add partner logos here - these are placeholder URLs that should be replaced with actual logos
const partners = [
  {
    name: "Tesla",
    logo: "https://www.freepnglogos.com/uploads/tesla-logo-png-20.png"
  },
  {
    name: "BYD",
    logo: byd
  },
  {
    name: "Rivian",
    logo: rivian
  },
  {
    name: "Lucid Motors",
    logo: lucid
  },
  {
    name: "Polestar",
    logo: polestar
  },
  {
    name: "NIO",
    logo: nio
  }
];

export default function PartnersSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "ar";
  
  return (
    <section className="section-container py-20">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
          <motion.span 
            className="absolute -bottom-2 left-0 right-0 h-2 bg-ev-accent/30 rounded-full" 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.span>
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle}
        </motion.p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white/5 dark:bg-white/10 rounded-xl p-6 h-32 w-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-white/20 dark:hover:bg-white/20 backdrop-blur-sm">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="max-h-20 max-w-full object-contain filter dark:invert dark:brightness-0 dark:contrast-0" 
              />
            </div>
            <span className="mt-3 font-medium text-sm">{partner.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Animated connection lines */}
      <div className="relative h-20 mt-12">
        <motion.div 
          className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ev-blue/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-ev-accent transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-ev-accent opacity-70"
            animate={{ scale: [1, 2], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
