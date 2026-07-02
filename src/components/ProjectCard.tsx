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

  return (
    <article className="card flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="text-3xl" aria-hidden="true">
          {project.emoji}
        </span>
        <span className="badge">{project.status}</span>
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
          className="link-accent font-semibold"
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
