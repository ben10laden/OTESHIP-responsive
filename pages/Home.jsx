import HeroSection from "../components/sections/Home/HeroSection";
import AboutSection from "../components/sections/Home/AboutSection";
import GoalsSection from "../components/sections/Home/GoalsSection";
import SchoolsSection from "../components/sections/Home/SchoolsSection";
import CeramicsSection from "../components/sections/Home/CeramicsSection";
import OpportunitiesSection from "../components/sections/Home/OpportunitiesSection";
import ContactSection from "../components/sections/Home/ContactSection";

export default function Home() {
  return (
    <div className="bg-(--color-bg-primary) flex-1">
      <HeroSection />
      <AboutSection />
      <GoalsSection />
      <SchoolsSection />
      <CeramicsSection />
      <OpportunitiesSection />
      <ContactSection />
    </div>
  );
}
