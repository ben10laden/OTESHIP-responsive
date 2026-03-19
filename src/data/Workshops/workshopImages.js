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

// 3. Grab images inside the exhibitions folder
const exhibitionModules = import.meta.glob(
  "../../assets/workshops/exhibitions/*.{jpg,png,jpeg,webp}",
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

export const loadWorkshopImages = () => {
  try {
    const resolvedUrls = Object.values(workshopModules);

    return resolvedUrls.map((url, index) => ({
      id: index,
      src: url,
      alt: `Workshop image ${index + 1}`,
    }));
  } catch (error) {
    console.error("Error loading workshop images:", error);
    return [];
  }
};

export const loadProductImages = (countryCode) => {
  try {
    const images = [];
    let index = 0;

    for (const [path, url] of Object.entries(productModules)) {
      if (path.includes(`/products/${countryCode}/`)) {
        images.push({
          id: index++,
          src: url,
          alt: `${countryCode.toUpperCase()} Product image ${index}`,
        });
      }
    }

    return images;
  } catch (error) {
    console.error(`Error loading product images for ${countryCode}:`, error);
    return [];
  }
};

export const loadExhibitionImages = () => {
  try {
    const resolvedUrls = Object.values(exhibitionModules);

    return resolvedUrls.map((url, index) => ({
      id: index,
      src: url,
      alt: `Exhibition image ${index + 1}`,
    }));
  } catch (error) {
    console.error("Error loading exhibition images:", error);
    return [];
  }
};

export const loadRandomProductImages = (count = 6) => {
  try {
    const allUrls = Object.values(productModules);
    const shuffledUrls = [...allUrls].sort(() => 0.5 - Math.random());
    const selectedUrls = shuffledUrls.slice(0, count);

    return selectedUrls.map((url, index) => ({
      id: index,
      src: url,
      alt: `Featured Product ${index + 1}`,
    }));
  } catch (error) {
    console.error("Error loading random product images:", error);
    return [];
  }
};

export const loadRandomWorkshopImages = (count = 1) => {
  try {
    const allUrls = Object.values(workshopModules);
    if (allUrls.length === 0) return [];

    const shuffledUrls = [...allUrls].sort(() => 0.5 - Math.random());
    const selectedUrls = shuffledUrls.slice(0, count);

    return selectedUrls.map((url, index) => ({
      id: index,
      src: url,
      alt: `Workshop image ${index + 1}`,
    }));
  } catch (error) {
    console.error("Error loading random workshop images:", error);
    return [];
  }
};
