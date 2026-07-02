import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PublicationStatus } from "@prisma/client";
import { getProjectBySlug } from "@/lib/registry";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicationPage({ params }: PageProps) {
  const { slug } = await params;

  const publication = await prisma.publication.findFirst({
    where: { slug, status: PublicationStatus.PUBLISHED },
  });

  if (!publication) {
    notFound();
  }

  if (publication.externalUrl) {
    redirect(publication.externalUrl);
  }

  const project = getProjectBySlug(publication.projectSlug);

  return (
    <main className="container-app py-10 sm:py-14">
      <Link href="/" className="link-accent text-sm font-medium">
        ← Volver al hub
      </Link>

      <article className="mx-auto mt-6 max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="badge badge-accent">
            {project?.emoji} {project?.name}
          </span>
          {publication.publishedAt ? (
            <time
              dateTime={publication.publishedAt.toISOString()}
              className="text-sm text-[var(--muted)]"
            >
              {publication.publishedAt.toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          ) : null}
        </div>

        <h1 className="hero-title text-4xl font-semibold tracking-tight">
          {publication.title}
        </h1>

        {publication.excerpt ? (
          <p className="mt-4 text-lg text-[var(--muted)]">{publication.excerpt}</p>
        ) : null}

        {publication.content ? (
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap text-[var(--text)]">
            {publication.content}
          </div>
        ) : (
          <p className="mt-8 text-[var(--muted)]">
            Esta publicación no tiene contenido interno.
          </p>
        )}
      </article>
    </main>
  );
}
