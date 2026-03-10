import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../common/SectionHeader";

const FutureSection = () => {
  const { t } = useTranslation("about");
  return (
    <section className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-20 transition-colors duration-200">
      <SectionHeader
        title={t("future.title")}
        description={t("future.description")}
      />
    </section>
  );
};

export default FutureSection;
