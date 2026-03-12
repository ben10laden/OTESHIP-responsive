// workshopImages.js

// 1. Grab images directly inside the workshops folder
const workshopModules = import.meta.glob(
  "../../assets/workshops/*.{jpg,png,jpeg,webp}",
  {
    eager: true,
    query: {
      w: "800",
      format: "webp",
      as: "url",
    },
    import: "default",
  },
);

// 2. Grab images inside the products/country subfolders
const productModules = import.meta.glob(
  "../../assets/workshops/products/*/*.{jpg,png,jpeg,webp}",
  {
    eager: true,
    query: {
      w: "800",
      format: "webp",
      as: "url",
    },
    import: "default",
  },
);

// Restored: Loads the standard workshop images
export const loadWorkshopImages = async () => {
  try {
    const urls = Object.values(workshopModules);

    return urls.map((url, index) => ({
      id: index,
      src: url,
      alt: `Workshop image ${index + 1}`,
    }));
  } catch (error) {
    console.error("Error loading workshop images:", error);
    return [];
  }
};

// New: Loads product images for a specific country
export const loadProductImages = async (countryCode) => {
  try {
    const images = [];
    let index = 0;

    for (const [path, url] of Object.entries(productModules)) {
      if (path.includes(`/products/${countryCode}/`)) {
        images.push({
          id: index,
          src: url,
          alt: `${countryCode.toUpperCase()} Product image ${index + 1}`,
        });
        index++;
      }
    }

    return images;
  } catch (error) {
    console.error(`Error loading product images for ${countryCode}:`, error);
    return [];
  }
};
