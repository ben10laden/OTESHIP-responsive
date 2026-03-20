import BusinessSection from "../components/sections/Guide/BusinessSection";
import EmploymentSection from "../components/sections/Guide/EmploymentSection";
import GuideFooter from "../components/sections/Guide/GuideFooter";
import HeroSection from "../components/sections/Guide/HeroSection";
import LawSection from "../components/sections/Guide/LawSection";
import MunicipalitySection from "../components/sections/Guide/MunicipalitySection";
import PrefaceSection from "../components/sections/Guide/PrefaceSection";
import SkillsSection from "../components/sections/Guide/SkillsSection";
import EntrepreneursSection from "../components/sections/Guide/EntrepreneursSection";
import GoodPracticesSection from "../components/sections/Guide/GoodPracticesSection";
import ToolkitSection from "../components/sections/Guide/ToolkitSection";

export default function Guide() {
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col max-w-7xl mx-auto gap-12 xs:gap-14 md:gap-16 lg:gap-20">
        <HeroSection />
        <PrefaceSection />
        <LawSection />
        <EmploymentSection />
        <SkillsSection />
        <BusinessSection />
        <MunicipalitySection />
        <EntrepreneursSection />
        <GoodPracticesSection />
        <ToolkitSection />
        <GuideFooter />
      </div>
    </div>
  );
}
