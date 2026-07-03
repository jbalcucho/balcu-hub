import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/registry";

type ProjectCardProps = {
  project: Project;
  publicationCount?: number;
};

export default function ProjectCard({
  project,
  publicationCount = 0,
}: ProjectCardProps) {
  const primaryHref = project.url ?? project.repo;
  const { brand } = project;

  return (
    <article
      className="card project-card flex h-full flex-col"
      style={
        {
          "--project-primary": brand.primary,
          "--project-secondary": brand.secondary,
        } as React.CSSProperties
      }
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div
          className="project-logo-wrap"
          style={{ backgroundColor: `${brand.primary}18` }}
        >
          <Image
            src={brand.logo}
            alt=""
            width={40}
            height={40}
            aria-hidden
          />
        </div>
        <span
          className="badge project-badge"
          style={{
            borderColor: `${brand.primary}33`,
            color: brand.primary,
            backgroundColor: `${brand.primary}14`,
          }}
        >
          {project.status}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text)]">{project.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link font-semibold"
          style={{ color: brand.primary }}
        >
          {project.url ? "Ver sitio →" : "Ver repo →"}
        </Link>
        {publicationCount > 0 ? (
          <span className="text-[var(--muted)]">
            {publicationCount} publicación{publicationCount === 1 ? "" : "es"}
          </span>
        ) : null}
      </div>
    </article>
  );
}
