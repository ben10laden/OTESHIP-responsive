// workshopImages.js - Optimized image loader with lazy loading and pre-processing

// Dynamic import function - images will be loaded on demand
const imageModules = import.meta.glob(
  "../../assets/workshops/*.{jpg,png,jpeg,webp}",
  {
    eager: false, // Keep as false for better performance
  },
);

// Async function to load all workshop images
export const loadWorkshopImages = async () => {
  try {
    const modules = await Promise.all(
      Object.values(imageModules).map((loader) => loader()),
    );

    return modules.map((mod, index) => ({
      id: index,
      src: mod.default,
      // You can add more metadata here if needed
      alt: `Workshop image ${index + 1}`,
    }));
  } catch (error) {
    console.error("Error loading workshop images:", error);
    return [];
  }
};

// Optional: Preload first few images for better UX
export const preloadFirstImages = async (count = 4) => {
  const entries = Object.entries(imageModules).slice(0, count);
  const modules = await Promise.all(entries.map(([path, loader]) => loader()));

  return modules.map((mod) => mod.default);
};

// For backward compatibility - this will be empty initially
export const wsImagesArray = [];

// Function to get a specific image by index (loads on demand)
export const getWorkshopImage = async (index) => {
  const entries = Object.entries(imageModules);
  if (index >= 0 && index < entries.length) {
    const [_, loader] = entries[index];
    const mod = await loader();
    return mod.default;
  }
  return null;
};
