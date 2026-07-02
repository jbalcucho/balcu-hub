import { PrismaClient, PublicationStatus } from "@prisma/client";

const prisma = new PrismaClient();

const seedPublications = [
  {
    projectSlug: "chacachon_stories",
    title: "El lobo de las palabras feas",
    slug: "el-lobo-de-las-palabras-feas",
    excerpt:
      "Cuidar las palabras y no contestarle feo a mamá y papá. Versión narrativa en vereda y bosque.",
    externalUrl:
      "https://chacachon-stories.vercel.app/cuentos/familia-chacachon-el-lobo-y-las-palabras.html",
    status: PublicationStatus.PUBLISHED,
    publishedAt: new Date("2026-06-01"),
  },
  {
    projectSlug: "chacachon_stories",
    title: "Los Tres Cerditos del Edificio",
    slug: "los-tres-cerditos-del-edificio",
    excerpt:
      "Las palabras feas alimentan al lobo; el respeto protege la casa. Versión apartamento.",
    externalUrl:
      "https://chacachon-stories.vercel.app/cuentos/familia-chacachon-cerditos-caperucita.html",
    status: PublicationStatus.PUBLISHED,
    publishedAt: new Date("2026-06-01"),
  },
  {
    projectSlug: "chacachon_stories",
    title: "Operación A Dormir",
    slug: "operacion-a-dormir",
    excerpt:
      "La rutina de noche: tablet, chanclas, chichi y la lista de Pauleta.",
    status: PublicationStatus.DRAFT,
  },
  {
    projectSlug: "rotatudisfraz",
    title: "RotaTuDisfraz en producción",
    slug: "rotatudisfraz-en-produccion",
    excerpt:
      "Marketplace comunitario de disfraces de segunda mano para colegios.",
    externalUrl: "https://rotatudisfraz.vercel.app",
    status: PublicationStatus.PUBLISHED,
    publishedAt: new Date("2026-05-15"),
  },
];

async function main() {
  for (const publication of seedPublications) {
    await prisma.publication.upsert({
      where: { slug: publication.slug },
      update: publication,
      create: publication,
    });
  }

  console.log(`Seed completado: ${seedPublications.length} publicaciones.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
