// import gs3Image from "../../public/cars/gs3.jpeg"
// import aionImage from "../../public/cars/aion-tiny.jpg"
// import aionFullImage from "../../public/cars/aion-full-tiny.jpg"
// import aionBackImage from "../../public/cars/aion-back-tiny.jpg"
// import hyptecImage from "../../public/cars/hyptec.png"


// export interface CarColor {
//   name: string;
//   value: string;
//   image: string;
// }

// export interface CarSpec {
//   range: string;
//   acceleration: string;
//   topSpeed: string;
//   power: string;
//   battery: string;
//   seating: string;
// }

// export interface Car {
//   id: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   description: string;
//   shortDescription: string;
//   colors: CarColor[];
//   specs: CarSpec;
//   images: string[];
//   featured: boolean;
//   interior: string[];
//   mainImage: string;
//   drivetrain: string;
// }

// export const cars: Car[] = [
//   {
//     id: "aion-v-plus",
//     make: "AION V",
//     model: "PLUS",
//     year: 2025,
//     price: 79900,
//     description:
//       "Experience the future of electric SUVs with the Stellar EX. This premium electric vehicle combines luxury, performance, and sustainability, offering up to 400 miles of range on a single charge. With advanced AI-assisted driving features, spacious interiors with premium materials, and a cutting-edge infotainment system, the Stellar EX delivers an unparalleled driving experience. The dual-motor all-wheel drive system provides exhilarating acceleration and superior handling in all weather conditions.",
//     shortDescription:
//       "Premium electric SUV with up to 400 miles of range and advanced AI assistance.",
//     colors: [
//       {
//         name: "Midnight Black",
//         value: "#121212",
//         image: aionImage,
//       },
//       {
//         name: "Arctic Silver",
//         value: "#E8E9EB",
//         image: aionImage,
//       },
//       {
//         name: "Sapphire Blue",
//         value: "#0F52BA",
//         image: aionImage,
//       },
//     ],
//     specs: {
//       range: "400 miles",
//       acceleration: "0-60 in 3.1s",
//       topSpeed: "155 mph",
//       power: "495 hp",
//       battery: "115 kWh",
//       seating: "5 Adults",
//     },
//     images: [
//       aionImage,
//       "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1000&auto=format&fit=crop",
//     ],
//     featured: true,
//     interior: [
//       aionFullImage,
//       aionBackImage,
//     ],
//     mainImage: aionImage,
//   },

//   {
//     id: "hyptec-gt",
//     make: "Hyptec-",
//     model: "GT",
//     year: 2025,
//     price: 115000,
//     description:
//       "The Aurora GT redefines what an electric sports car can be, combining breathtaking design with exhilarating performance. With a range of up to 350 miles and acceleration that rivals supercars, this vehicle delivers thrills without compromise. The lightweight carbon fiber construction and advanced aerodynamics optimize efficiency without sacrificing style. Inside, the driver-focused cockpit features handcrafted materials, state-of-the-art displays, and intuitive controls that keep you connected to the road and the world around you.",
//     shortDescription:
//       "Luxury electric sports car with stunning design and exhilarating performance.",
//     colors: [
//       {
//         name: "Performance Red",
//         value: "#FF2800",
//         image:
//           hyptecImage,
//       },
//       {
//         name: "Phantom White",
//         value: "#FFFFFF",
//         image:
//           hyptecImage,
//       },
//       {
//         name: "Monaco Blue",
//         value: "#00205B",
//         image:
//           hyptecImage,
//       },
//     ],
//     specs: {
//       range: "350 miles",
//       acceleration: "0-60 in 2.8s",
//       topSpeed: "200 mph",
//       power: "670 hp",
//       battery: "95 kWh",
//       seating: "2+2",
//     },
//     images: [
//       "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop",
//     ],
//     featured: true,
//     interior: [
//       hyptecImage,
//       hyptecImage,
//     ],
//     mainImage: hyptecImage,
//   },

//   {
//     id: "gs3",
//     make: "GS3",
//     model: "",
//     year: 2025,
//     price: 42500,
//     description:
//       "The Quantum City combines efficiency with style in a compact electric vehicle that's perfect for urban driving. Despite its smaller footprint, this EV offers surprising interior space and comfort, with clever storage solutions throughout. With a range of 280 miles and nimble handling, it's designed to make city driving a pleasure. Smart features include autonomous parking, advanced driver assistance, and seamless connectivity with your digital life. The highly efficient battery system supports fast charging, getting you back on the road quickly.",
//     shortDescription:
//       "Compact urban electric vehicle with smart features and surprising interior space.",
//     colors: [
//       {
//         name: "Urban Gray",
//         value: "#808080",
//         image:
//           gs3Image,
//       },
//       {
//         name: "Electric Yellow",
//         value: "#F9E430",
//         image:
//           gs3Image,
//       },
//       {
//         name: "Ocean Teal",
//         value: "#008080",
//         image:
//           gs3Image,
//       },
//     ],
//     specs: {
//       range: "280 miles",
//       acceleration: "0-60 in 6.2s",
//       topSpeed: "120 mph",
//       power: "220 hp",
//       battery: "75 kWh",
//       seating: "5 Adults",
//     },
//     images: [
//       gs3Image,
//       "https://images.unsplash.com/photo-1594639464720-28eb974c373e?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1637846896755-f3569ba7b3af?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1462396240927-52f3a60f5a0f?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1581233216447-413420e9525e?q=80&w=1000&auto=format&fit=crop",
//     ],
//     featured: false,
//     interior: [
//       gs3Image,
//       gs3Image,
//     ],
//     mainImage: gs3Image,
//   },
// ];


// import gs3Image from "../../public/cars/gs3.jpeg";
// import aionImage from "../../public/cars/aion-tiny.jpg";
// import aionFullImage from "../../public/cars/aion-full-tiny.jpg";
// import aionBackImage from "../../public/cars/aion-back-tiny.jpg";
// import hyptecImage from "../../public/cars/hyptec.png";

// Define interfaces for the car data structure
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string; // Should be a string
  shortDescription: string;
  colors: CarColor[];
  specs: {
    range: string;
    acceleration: string;
    topSpeed: string;
    power: string;
    battery: string;
    seating: string;
  };
  images: string[];
  featured: boolean;
  interior: string[];
  mainImage: string;
  drivetrain: string;
}

export interface CarColor {
  name: string;
  value: string;
  image: string;
}

// Function to fetch cars from Strapi CMS
// cars.tsx (fetchCars function)
export const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_STRAPI_API_URL}/api/cars?populate[images][populate]=image&populate=mainImage&populate[colors][populate]=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Raw Strapi data:", data);

    const cars: Car[] = data.data.map((item: any) => {
      // Parse the description field from rich text to plain text
      const parseDescription = (desc: any[]): string => {
        if (!desc || !Array.isArray(desc)) return "";
        return desc
          .map((block: any) => {
            if (block.type === "paragraph" && block.children) {
              return block.children
                .map((child: any) => (child.type === "text" ? child.text : ""))
                .join("");
            }
            return "";
          })
          .join("\n");
      };

      return {
        id: item.id.toString(),
        make: item.make,
        model: item.model,
        year: item.year,
        price: item.price,
        description: parseDescription(item.description), // Parse rich text to string
        shortDescription: item.shortDescription,
        colors: item.colors
          ? item.colors.map((color: any) => ({
              name: color.name,
              value: color.value,
              image: color.image?.url
                ? `${process.env.REACT_APP_STRAPI_API_URL}${color.image.url}`
                : "",
            }))
          : [],
        specs: item.specs || {
          range: "N/A",
          acceleration: "N/A",
          topSpeed: "N/A",
          power: "N/A",
          battery: "N/A",
          seating: "N/A",
        },
        images: item.images
          ? item.images.map(
              (img: any) => `${process.env.REACT_APP_STRAPI_API_URL}${img.image.url}`
            )
          : [],
        featured: item.featured || false,
        interior: item.interior
          ? item.interior.map(
              (img: any) => `${process.env.REACT_APP_STRAPI_API_URL}${img.url}`
            )
          : [],
        mainImage: item.mainImage
          ? `${process.env.REACT_APP_STRAPI_API_URL}${item.mainImage.url}`
          : "",
        drivetrain: item.drivetrain || "",
      };
    });

    console.log("Mapped cars with parsed description:", cars);
    return cars;
  } catch (error) {
    console.error("Error fetching cars from Strapi:", error);
    return [];
  }
};