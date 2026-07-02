"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PublicationStatus } from "@prisma/client";
import { requireAdminSession } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { publicationSchema } from "@/lib/publications";
import type { PublicationFormValues } from "@/components/PublicationForm";

function normalizeInput(values: PublicationFormValues) {
  return publicationSchema.parse({
    ...values,
    excerpt: values.excerpt || undefined,
    content: values.content || undefined,
    externalUrl: values.externalUrl || undefined,
  });
}

function publishedAtForStatus(
  status: PublicationStatus,
  current?: Date | null,
): Date | null {
  if (status === PublicationStatus.PUBLISHED) {
    return current ?? new Date();
  }
  return null;
}

export async function createPublicationAction(values: PublicationFormValues) {
  await requireAdminSession();
  const input = normalizeInput(values);

  await prisma.publication.create({
    data: {
      ...input,
      publishedAt: publishedAtForStatus(input.status),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/publications");
  redirect("/admin/publications");
}

export async function updatePublicationAction(values: PublicationFormValues) {
  await requireAdminSession();
  if (!values.id) {
    throw new Error("Falta el id de la publicación.");
  }

  const input = normalizeInput(values);
  const existing = await prisma.publication.findUnique({
    where: { id: values.id },
  });

  if (!existing) {
    throw new Error("Publicación no encontrada.");
  }

  await prisma.publication.update({
    where: { id: values.id },
    data: {
      ...input,
      publishedAt: publishedAtForStatus(input.status, existing.publishedAt),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/publications");
  revalidatePath(`/publicaciones/${existing.slug}`);
  redirect("/admin/publications");
}

export async function deletePublicationAction(id: string) {
  await requireAdminSession();
  await prisma.publication.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/publications");
}
