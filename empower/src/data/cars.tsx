export interface CarColor {
  name: string;
  value: string;
  image: string;
}

export interface CarSpec {
  range: string;
  acceleration: string;
  topSpeed: string;
  power: string;
  battery: string;
  seating: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  shortDescription: string;
  colors: CarColor[];
  specs: CarSpec;
  images: string[];
  featured: boolean;
  interior: string[];
  mainImage: string;
  drivetrain: string;
}

export const cars: Car[] = [
  {
    id: "stellar-ex-2025",
    make: "Stellar",
    model: "EX",
    year: 2025,
    price: 79900,
    description:
      "Experience the future of electric SUVs with the Stellar EX. This premium electric vehicle combines luxury, performance, and sustainability, offering up to 400 miles of range on a single charge. With advanced AI-assisted driving features, spacious interiors with premium materials, and a cutting-edge infotainment system, the Stellar EX delivers an unparalleled driving experience. The dual-motor all-wheel drive system provides exhilarating acceleration and superior handling in all weather conditions.",
    shortDescription:
      "Premium electric SUV with up to 400 miles of range and advanced AI assistance.",
    colors: [
      {
        name: "Midnight Black",
        value: "#121212",
        image:
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Arctic Silver",
        value: "#E8E9EB",
        image:
          "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Sapphire Blue",
        value: "#0F52BA",
        image:
          "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    specs: {
      range: "400 miles",
      acceleration: "0-60 in 3.1s",
      topSpeed: "155 mph",
      power: "495 hp",
      battery: "115 kWh",
      seating: "5 Adults",
    },
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    interior: [
      "https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "aurora-gt-2025",
    make: "Aurora",
    model: "GT",
    year: 2025,
    price: 115000,
    description:
      "The Aurora GT redefines what an electric sports car can be, combining breathtaking design with exhilarating performance. With a range of up to 350 miles and acceleration that rivals supercars, this vehicle delivers thrills without compromise. The lightweight carbon fiber construction and advanced aerodynamics optimize efficiency without sacrificing style. Inside, the driver-focused cockpit features handcrafted materials, state-of-the-art displays, and intuitive controls that keep you connected to the road and the world around you.",
    shortDescription:
      "Luxury electric sports car with stunning design and exhilarating performance.",
    colors: [
      {
        name: "Performance Red",
        value: "#FF2800",
        image:
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Phantom White",
        value: "#FFFFFF",
        image:
          "https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Monaco Blue",
        value: "#00205B",
        image:
          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    specs: {
      range: "350 miles",
      acceleration: "0-60 in 2.8s",
      topSpeed: "200 mph",
      power: "670 hp",
      battery: "95 kWh",
      seating: "2+2",
    },
    images: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    interior: [
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669215324603-068a6dcd37be?q=80&w=1000&auto=format&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "quantum-city-2025",
    make: "Quantum",
    model: "City",
    year: 2025,
    price: 42500,
    description:
      "The Quantum City combines efficiency with style in a compact electric vehicle that's perfect for urban driving. Despite its smaller footprint, this EV offers surprising interior space and comfort, with clever storage solutions throughout. With a range of 280 miles and nimble handling, it's designed to make city driving a pleasure. Smart features include autonomous parking, advanced driver assistance, and seamless connectivity with your digital life. The highly efficient battery system supports fast charging, getting you back on the road quickly.",
    shortDescription:
      "Compact urban electric vehicle with smart features and surprising interior space.",
    colors: [
      {
        name: "Urban Gray",
        value: "#808080",
        image:
          "https://images.unsplash.com/photo-1593055357429-33f4e469504d?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Electric Yellow",
        value: "#F9E430",
        image:
          "https://images.unsplash.com/photo-1594639464720-28eb974c373e?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Ocean Teal",
        value: "#008080",
        image:
          "https://images.unsplash.com/photo-1637846896755-f3569ba7b3af?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    specs: {
      range: "280 miles",
      acceleration: "0-60 in 6.2s",
      topSpeed: "120 mph",
      power: "220 hp",
      battery: "75 kWh",
      seating: "5 Adults",
    },
    images: [
      "https://images.unsplash.com/photo-1593055357429-33f4e469504d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594639464720-28eb974c373e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1637846896755-f3569ba7b3af?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1462396240927-52f3a60f5a0f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581233216447-413420e9525e?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: false,
    interior: [
      "https://images.unsplash.com/photo-1581233216447-413420e9525e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607853734263-57a8f0ae04a7?q=80&w=1000&auto=format&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1593055357429-33f4e469504d?q=80&w=1000&auto=format&fit=crop",
  },
];
