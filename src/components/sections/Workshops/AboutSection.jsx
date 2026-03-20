import React, { useState, useEffect } from "react";
import WorkshopCardBig from "../../common/WorkshopCardBig";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import SectionHeader from "../../common/SectionHeader";
import { loadRandomWorkshopImages } from "../../../data/Workshops/workshopImages";

const AboutSection = () => {
  const { t } = useTranslation("workshops");
  const { workshopData } = useLanguageData();
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      // Fetch exactly as many random images as there are workshops in your data
      const images = await loadRandomWorkshopImages(workshopData.length || 3);
      setRandomImages(images.map((img) => img.src));
    };

    fetchImages();
  }, [workshopData.length]);

  return (
    <section
      className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200 scroll-mt-8"
      id="workshops"
    >
      <div className="flex flex-col justify-between items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10 max-w-7xl mx-auto">
        <SectionHeader title={t("about.title")} description={t("about.desc")} />
        <div className="flex flex-col gap-8 lg:gap-10 xl:gap-12 w-full">
          {workshopData.map((workshop, index) => (
            <WorkshopCardBig
              key={index}
              // Pass the fetched random image based on the current index
              image={randomImages[index] || ""}
              title={workshop.title}
              description={workshop.description}
              outcomes={workshop.outcomes}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
        <SectionHeader description={t("about.desc2")} />
      </div>
    </section>
  );
};

export default AboutSection;
