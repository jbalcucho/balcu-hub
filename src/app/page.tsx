import Link from "next/link";
import { PublicationStatus } from "@prisma/client";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import { prisma } from "@/lib/prisma";
import { getProjects } from "@/lib/registry";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = getProjects();

  let publications: Awaited<
    ReturnType<typeof prisma.publication.findMany>
  > = [];
  let countsByProject = new Map<string, number>();

  try {
    publications = await prisma.publication.findMany({
      where: { status: PublicationStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 12,
    });

    const grouped = await prisma.publication.groupBy({
      by: ["projectSlug"],
      where: { status: PublicationStatus.PUBLISHED },
      _count: { _all: true },
    });

    countsByProject = new Map(
      grouped.map((item) => [item.projectSlug, item._count._all]),
    );
  } catch {
    publications = [];
  }

  return (
    <main className="container-app py-10 sm:py-14">
      <section className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-emerald-300/80">
          Ecosistema Balcu
        </p>
        <h1 className="hero-title text-4xl font-semibold tracking-tight sm:text-5xl">
          Tus proyectos y publicaciones en un solo lugar
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Vitrina pública de Balcu Apps. Desde aquí ves el estado de cada
          producto y las publicaciones recientes — cuentos, demos, lanzamientos
          y más.
        </p>
      </section>

      <section className="mb-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              Proyectos
            </p>
            <h2 className="hero-title mt-1 text-2xl font-semibold">
              Portfolio activo
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              publicationCount={countsByProject.get(project.slug) ?? 0}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              Feed
            </p>
            <h2 className="hero-title mt-1 text-2xl font-semibold">
              Publicaciones recientes
            </h2>
          </div>
        </div>

        {publications.length === 0 ? (
          <div className="card text-sm text-[var(--muted)]">
            Aún no hay publicaciones en el hub. Cuando configures la base de
            datos y entres al{" "}
            <Link href="/admin" className="link-accent">
              panel admin
            </Link>
            , podrás publicar cuentos, demos y novedades.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {publications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
