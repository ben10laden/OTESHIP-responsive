import AboutSection from "../components/sections/About/AboutSection";
import FutureSection from "../components/sections/About/FutureSection";
import HeroSection from "../components/sections/About/HeroSection";
import ImpactSection from "../components/sections/About/ImpactSection";
import ProcessSection from "../components/sections/About/ProcessSection";
import SchoolsSection from "../components/sections/About/SchoolsSection";

export default function About() {
  return (
    <div className="bg-(--color-bg-primary) flex-1">
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <ImpactSection />
      <SchoolsSection />
      <FutureSection />
    </div>
  );
}
