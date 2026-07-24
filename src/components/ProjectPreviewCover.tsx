import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import styles from "./project-preview-cover.module.css";

type ProjectPreviewCoverProps = {
  project: Project;
  index: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  showMetadata?: boolean;
  fill?: boolean;
};

export function ProjectPreviewCover({
  project,
  index,
  sizes,
  priority = false,
  className = "",
  showMetadata = true,
  fill = false,
}: ProjectPreviewCoverProps) {
  const previewImage = project.previewImage ?? project.cover;

  return (
    <div
      className={`${styles.cover} ${fill ? styles.fill : ""} ${project.previewFit === "contain" ? styles.contain : ""} ${project.previewDevice ? styles.withDevice : ""} ${project.previewDeviceSide === "left" ? styles.phoneLeft : ""} ${className}`}
      style={{ "--preview-accent": project.accent } as CSSProperties}
    >
      <Image
        src={previewImage}
        alt={`Обложка проекта «${project.previewTitle}»: ${project.previewCategory}`}
        fill
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        style={{
          objectPosition: project.coverPosition,
          "--cover-zoom": project.coverZoom ?? 1,
        } as CSSProperties}
        className={`${styles.image} transition-transform duration-700 ease-out`}
      />
      {project.previewDevice ? (
        <div className={styles.phone} aria-hidden>
          <Image
            src={previewImage}
            alt=""
            fill
            sizes="(max-width: 700px) 38vw, 15vw"
            style={{ objectPosition: project.previewDevicePosition }}
            className={styles.phoneImage}
          />
        </div>
      ) : null}
      <div className={styles.wash} aria-hidden />
      <div className={styles.frame} aria-hidden />

      {showMetadata ? (
        <div className={styles.meta}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <div className={styles.copy}>
            <span>{project.previewCategory}</span>
            <strong>{project.previewTitle}</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}
