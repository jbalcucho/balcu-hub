import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getProjectLabel } from "@/lib/registry";
import DeletePublicationButton from "./delete-button";

export const dynamic = "force-dynamic";

export default async function AdminPublicationsPage() {
  const publications = await prisma.publication.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  return (
    <main className="container-app py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/admin" className="link-accent text-sm">
            ← Dashboard
          </Link>
          <h1 className="hero-title mt-2 text-3xl font-semibold">
            Publicaciones
          </h1>
        </div>
        <Link href="/admin/publications/new" className="btn-primary">
          Nueva publicación
        </Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-[var(--muted)]">
            <tr>
              <th className="pb-3 pr-4 font-medium">Título</th>
              <th className="pb-3 pr-4 font-medium">Proyecto</th>
              <th className="pb-3 pr-4 font-medium">Estado</th>
              <th className="pb-3 pr-4 font-medium">Enlace</th>
              <th className="pb-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {publications.map((publication) => (
              <tr
                key={publication.id}
                className="border-t border-[var(--border)] align-top"
              >
                <td className="py-3 pr-4">
                  <Link
                    href={`/admin/publications/${publication.id}/edit`}
                    className="link-accent font-medium"
                  >
                    {publication.title}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    /{publication.slug}
                  </p>
                </td>
                <td className="py-3 pr-4 text-[var(--muted)]">
                  {getProjectLabel(publication.projectSlug)}
                </td>
                <td className="py-3 pr-4">
                  <span className="badge">{publication.status}</span>
                </td>
                <td className="py-3 pr-4 text-[var(--muted)]">
                  {publication.externalUrl ? (
                    <a
                      href={publication.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-accent"
                    >
                      Externo
                    </a>
                  ) : (
                    <Link
                      href={`/publicaciones/${publication.slug}`}
                      className="link-accent"
                    >
                      Interno
                    </Link>
                  )}
                </td>
                <td className="py-3">
                  <DeletePublicationButton id={publication.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
