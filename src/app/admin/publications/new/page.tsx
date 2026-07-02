import Link from "next/link";
import { PublicationStatus } from "@prisma/client";
import PublicationForm from "@/components/PublicationForm";
import { createPublicationAction } from "@/app/admin/actions";
import { getProjects } from "@/lib/registry";

export default function NewPublicationPage() {
  const projects = getProjects();
  const defaultProject = projects[0]?.slug ?? "chacachon_stories";

  return (
    <main className="container-app py-10">
      <Link href="/admin/publications" className="link-accent text-sm">
        ← Publicaciones
      </Link>
      <h1 className="hero-title mt-2 text-3xl font-semibold">
        Nueva publicación
      </h1>
      <div className="card mt-8 max-w-3xl">
        <PublicationForm
          projects={projects}
          initialValues={{
            projectSlug: defaultProject,
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            externalUrl: "",
            status: PublicationStatus.DRAFT,
          }}
          submitLabel="Crear publicación"
          onSubmit={createPublicationAction}
        />
      </div>
    </main>
  );
}
