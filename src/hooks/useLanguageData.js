import { useTranslation } from "react-i18next";
import featureCardsData from "../data/Home/featureCardsData";
import goalsData from "../data/Home/goalsData";
import opportunitiesCardsData from "../data/Home/opportunitiesCardsData";
import schoolCardsData from "../data/Home/schoolCardsData";
import contactSectionData from "../data/Home/contactSectionData";
import impactNumbersData from "../data/About/impactNumbersData";
import processCardsData from "../data/About/processCardsData";
import schoolData from "../data/About/schoolData";
import successCardsData from "../data/Guide/successCardsData";
import skillsData from "../data/Guide/skillsData"; // Updated
import entrepreneurshipStepsData from "../data/Guide/entrepreneurshipStepsData"; // New
import familyCardsData from "../data/Guide/familyCardsData";
import munCardsData from "../data/Guide/munCardsData";
import proposalsData from "../data/Guide/proposalsData"; // New
import businessDemandsData from "../data/Guide/businessDemandsData"; // New
import goodPracticesData from "../data/Guide/goodPracticesData"; // New
import toolkitData from "../data/Guide/toolkitData"; // New
import workshopData from "../data/Workshops/workshopData";

export const useLanguageData = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fallback to English if language data doesn't exist
  const getData = (dataObject) => {
    return dataObject[currentLanguage] || dataObject.en;
  };

  return {
    featureCardsData: getData(featureCardsData),
    goalsData: getData(goalsData),
    opportunitiesCardsData: getData(opportunitiesCardsData),
    schoolCardsData: getData(schoolCardsData),
    contactSectionData: getData(contactSectionData),
    processCardsData: getData(processCardsData),
    impactNumbersData: getData(impactNumbersData),
    schoolData: getData(schoolData),
    successCardsData: getData(successCardsData),
    skillsData: getData(skillsData),
    entrepreneurshipStepsData: getData(entrepreneurshipStepsData),
    familyCardsData: getData(familyCardsData),
    munCardsData: getData(munCardsData),
    proposalsData: getData(proposalsData),
    businessDemandsData: getData(businessDemandsData),
    goodPracticesData: getData(goodPracticesData),
    toolkitData: getData(toolkitData),
    workshopData: getData(workshopData),
  };
};
