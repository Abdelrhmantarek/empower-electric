
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import mission from "../../public/about/mission.png"; // Importing the mission image

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <Layout>
      <div className="section-container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            At Empower EV, we're dedicated to accelerating the transition to sustainable mobility by providing premium electric vehicles and exceptional customer experiences.
          </p>
        </div>
        
        {/* Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, Empower EV has rapidly become a leader in the electric vehicle market. Our team consists of industry experts, EV enthusiasts, and sustainability advocates who share a passion for the future of transportation.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that transitioning to electric vehicles is not just about reducing emissions—it's about creating a better driving experience with cutting-edge technology, exceptional performance, and elegant design.
            </p>
            <p className="text-muted-foreground">
              As a specialized EV dealership, we curate only the finest electric vehicles, ensuring that each model in our inventory meets our high standards for quality, performance, and sustainability.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Journey</h2>
          
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
                  <h4 className="font-semibold mb-2">Foundation</h4>
                  <p className="text-muted-foreground">
                    Empower EV was founded with a vision to make premium electric vehicles more accessible through exceptional service and expertise.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="md:ml-8 md:w-1/2 md:text-left pl-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2021</h3>
                  <h4 className="font-semibold mb-2">Expansion</h4>
                  <p className="text-muted-foreground">
                    Opened our flagship showroom featuring state-of-the-art facilities and a curated selection of premium electric vehicles.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="ml-0 md:ml-auto md:pl-8 md:w-1/2 md:text-right pr-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2022</h3>
                  <h4 className="font-semibold mb-2">Innovation</h4>
                  <p className="text-muted-foreground">
                    Launched our home charging installation service and educational workshops to help customers transition seamlessly to electric mobility.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-blue flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div className="md:ml-8 md:w-1/2 md:text-left pl-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-blue">2023</h3>
                  <h4 className="font-semibold mb-2">Recognition</h4>
                  <p className="text-muted-foreground">
                    Recognized as "EV Dealership of the Year" and achieved certification as a sustainable business through our carbon-neutral operations.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-ev-accent flex items-center justify-center">
                  <span className="text-ev-charcoal text-sm font-bold">5</span>
                </div>
                <div className="ml-0 md:ml-auto md:pl-8 md:w-1/2 md:text-right pr-4">
                  <h3 className="text-xl font-bold mb-2 text-ev-accent">2024</h3>
                  <h4 className="font-semibold mb-2">Today & Beyond</h4>
                  <p className="text-muted-foreground">
                    Continuing to grow our inventory with the most advanced electric vehicles and expanding our service offerings to meet the evolving needs of EV owners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Certifications & Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Certified EV Specialist</h3>
              <p className="text-sm text-muted-foreground">Industry recognized certification for electric vehicle sales and service</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Carbon Neutral Business</h3>
              <p className="text-sm text-muted-foreground">Committed to sustainable operations and minimal environmental impact</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Green Energy Partner</h3>
              <p className="text-sm text-muted-foreground">Powered by 100% renewable energy sources for all operations</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <svg className="w-10 h-10 text-ev-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Customer Excellence</h3>
              <p className="text-sm text-muted-foreground">Top-rated customer service with 98% satisfaction rating</p>
            </div>
          </div>
        </div>
        
        {/* Location Map */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Visit Our Dealership</h2>
          
          <div className="aspect-video rounded-lg overflow-hidden border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.10283158156!2d-118.80171792351112!3d34.02070294688781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1658458343948!5m2!1sen!2s"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience the Electric Revolution?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Schedule a test drive today and discover why our customers are making the switch to electric vehicles with Empower EV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/test-drive" className="button-accent">
              Book a Test Drive
            </Link>
            <Link to="/contact" className="bg-transparent border border-white text-white hover:bg-white hover:text-ev-blue font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
