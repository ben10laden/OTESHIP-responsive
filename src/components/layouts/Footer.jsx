import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Footer() {
  const { t } = useTranslation("layouts");

  const quickLinks = [
    { name: t("footer.home"), href: "/" },
    { name: t("footer.about"), href: "/about" },
    { name: t("footer.guide"), href: "/guide" },
    { name: t("footer.ceramics"), href: "/ceramics" },
    { name: t("footer.contact"), href: "/contact" },
  ];

  const projectNumber = "2023-2-EL01-KA210-VET-000170737";

  return (
    <footer className="bg-(--color-dark-text) dark:bg-black p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-6 lg:gap-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          {/* Project Info */}
          <div className="flex flex-col gap-3 md:gap-4 flex-3">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-(--color-primary) dark:text-(--color-primary2)">
              {t("footer.title")}
            </h1>
            <p className="text-sm md:text-base text-white max-w-2xl leading-relaxed">
              {t("footer.description")}
            </p>
            <p className="text-xs md:text-sm text-(--color-light3-text) italic opacity-70">
              {t("footer.coFunded")}
            </p>
          </div>

          {/* Quick Links - Now a row on all screens with wrapping */}
          <div className="flex flex-col gap-4 md:min-w-fit flex-1">
            <h2 className="text-sm md:text-base font-bold text-white">
              {t("footer.quickLinks")}
            </h2>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs md:text-sm text-(--color-light3-text) hover-anim whitespace-nowrap w-fit"
                  style={{ "--hover-color": "var(--color-bg-primary)" }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider - Matches the subtle style of your other sections could also do from-transparent via-(--color-divider) to-transparent*/}
        <div className="h-px w-full bg-(--color-divider)"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] md:text-xs text-(--color-light3-text)">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
          <p className="text-[10px] md:text-xs text-(--color-light3-text) font-mono bg-white/5 dark:bg-white/10 px-2 py-1 rounded-sm">
            {t("footer.projectNumber", { number: projectNumber })}
          </p>
        </div>
      </div>
    </footer>
  );
}
