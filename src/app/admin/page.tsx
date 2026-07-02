import Link from "next/link";
import { PublicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getProjects } from "@/lib/registry";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [publishedCount, draftCount, recent] = await Promise.all([
    prisma.publication.count({ where: { status: PublicationStatus.PUBLISHED } }),
    prisma.publication.count({ where: { status: PublicationStatus.DRAFT } }),
    prisma.publication.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const projects = getProjects();

  return (
    <main className="container-app py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            Panel
          </p>
          <h1 className="hero-title text-3xl font-semibold">Dashboard</h1>
        </div>
        <Link href="/admin/publications/new" className="btn-primary">
          Nueva publicación
        </Link>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-[var(--muted)]">Publicadas</p>
          <p className="hero-title mt-2 text-3xl font-semibold">
            {publishedCount}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[var(--muted)]">Borradores</p>
          <p className="hero-title mt-2 text-3xl font-semibold">{draftCount}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[var(--muted)]">Proyectos</p>
          <p className="hero-title mt-2 text-3xl font-semibold">
            {projects.length}
          </p>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="hero-title text-xl font-semibold">
            Últimas actualizaciones
          </h2>
          <Link href="/admin/publications" className="link-accent text-sm">
            Ver todas →
          </Link>
        </div>

        <div className="card overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-[var(--muted)]">
              <tr>
                <th className="pb-3 pr-4 font-medium">Título</th>
                <th className="pb-3 pr-4 font-medium">Proyecto</th>
                <th className="pb-3 pr-4 font-medium">Estado</th>
                <th className="pb-3 font-medium">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((publication) => (
                <tr key={publication.id} className="border-t border-[var(--border)]">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/admin/publications/${publication.id}/edit`}
                      className="link-accent font-medium"
                    >
                      {publication.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-[var(--muted)]">
                    {publication.projectSlug}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="badge">{publication.status}</span>
                  </td>
                  <td className="py-3 text-[var(--muted)]">
                    {publication.updatedAt.toLocaleDateString("es-CO")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
