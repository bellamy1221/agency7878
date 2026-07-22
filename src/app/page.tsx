import { ArchiveFolderSection } from "@/components/ArchiveFolderSection";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ArchiveFolderSection />
      <FinalCta />
    </>
  );
}
