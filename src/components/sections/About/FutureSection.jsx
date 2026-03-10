import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../common/SectionHeader";

const FutureSection = () => {
  const { t } = useTranslation("about");
  return (
    <section className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <SectionHeader
        title={t("future.title")}
        description={t("future.description")}
      />
    </section>
  );
};

export default FutureSection;
