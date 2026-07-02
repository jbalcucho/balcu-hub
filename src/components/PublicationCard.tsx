import Link from "next/link";
import type { Publication } from "@prisma/client";
import { getProjectBySlug } from "@/lib/registry";
import { publicationHref } from "@/lib/publications";

type PublicationCardProps = {
  publication: Publication;
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  const project = getProjectBySlug(publication.projectSlug);
  const href = publicationHref(publication.slug, publication.externalUrl);
  const isExternal = Boolean(publication.externalUrl);

  return (
    <article className="card">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="badge badge-accent">
          {project?.emoji} {project?.name ?? publication.projectSlug}
        </span>
        {publication.publishedAt ? (
          <time
            dateTime={publication.publishedAt.toISOString()}
            className="text-xs text-[var(--muted)]"
          >
            {publication.publishedAt.toLocaleDateString("es-CO", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold text-[var(--text)]">
        {publication.title}
      </h3>
      {publication.excerpt ? (
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {publication.excerpt}
        </p>
      ) : null}
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="link-accent mt-4 inline-block text-sm font-semibold"
      >
        {isExternal ? "Abrir publicación →" : "Leer más →"}
      </Link>
    </article>
  );
}
