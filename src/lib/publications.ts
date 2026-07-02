import { PublicationStatus } from "@prisma/client";
import { z } from "zod";
import { getProjects } from "./registry";

const projectSlugs = getProjects().map((project) => project.slug) as [
  string,
  ...string[],
];

export const publicationSchema = z.object({
  projectSlug: z.enum(projectSlugs),
  title: z.string().trim().min(3).max(200),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa kebab-case: mi-publicacion"),
  excerpt: z.string().trim().max(500).optional().or(z.literal("")),
  content: z.string().trim().max(20000).optional().or(z.literal("")),
  externalUrl: z.string().url().optional().or(z.literal("")),
  status: z.nativeEnum(PublicationStatus),
});

export type PublicationInput = z.infer<typeof publicationSchema>;

export function slugifyTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function publicationHref(slug: string, externalUrl?: string | null): string {
  return externalUrl ?? `/publicaciones/${slug}`;
}
