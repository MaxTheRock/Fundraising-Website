"use client"

import { motion } from "framer-motion"

// Define the images array with imports from your specific folder
const images = [
  "/images/facebook/image1.png",
  "/images/facebook/image2.png",
  "/images/facebook/image3.png",
  "/images/facebook/image4.png",
  "/images/facebook/image5.png",
  "/images/facebook/image6.png",
  // Add more images as needed
]

// Define which images are landscape (you can add more as needed)
const landscapeImages = ["image2.png", "image3.png", "image6.png"]

export default function FacebookImagesPage() {
  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "-100%" },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow flex flex-col justify-center items-center px-6 md:px-8 relative z-[1]"
    >
      <h1 className="text-4xl md:text-5xl font-black text-center mb-12">
        Images
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, index) => {
          const isLandscape = landscapeImages.some(filename => image.includes(filename));
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg border-2 border-black ${
                isLandscape ? 'col-span-2 row-span-2' : ''
              } ${
                index % 5 === 0 ? 'row-span-2' : ''
              } ${
                index % 7 === 0 && !isLandscape ? 'md:col-span-2' : ''
              }`}
            >
              <div className="group w-full h-full aspect-square">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-300 
                    group-hover:scale-105 group-hover:opacity-90
                    ${isLandscape ? 'object-contain bg-white' : 'object-cover'}`}
                />
                <div className="absolute inset-0 border-2 border-black opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  )
}

