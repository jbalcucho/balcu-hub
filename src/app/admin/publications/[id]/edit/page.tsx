import Link from "next/link";
import { notFound } from "next/navigation";
import PublicationForm from "@/components/PublicationForm";
import { updatePublicationAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { getProjects } from "@/lib/registry";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPublicationPage({ params }: PageProps) {
  const { id } = await params;
  const publication = await prisma.publication.findUnique({ where: { id } });

  if (!publication) {
    notFound();
  }

  const projects = getProjects();

  return (
    <main className="container-app py-10">
      <Link href="/admin/publications" className="link-accent text-sm">
        ← Publicaciones
      </Link>
      <h1 className="hero-title mt-2 text-3xl font-semibold">
        Editar publicación
      </h1>
      <div className="card mt-8 max-w-3xl">
        <PublicationForm
          projects={projects}
          initialValues={{
            id: publication.id,
            projectSlug: publication.projectSlug,
            title: publication.title,
            slug: publication.slug,
            excerpt: publication.excerpt ?? "",
            content: publication.content ?? "",
            externalUrl: publication.externalUrl ?? "",
            status: publication.status,
          }}
          submitLabel="Guardar cambios"
          onSubmit={updatePublicationAction}
        />
      </div>
    </main>
  );
}
