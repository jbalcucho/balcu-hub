"use client";

import { useMemo, useState } from "react";
import { PublicationStatus } from "@prisma/client";
import { slugifyTitle } from "@/lib/publications";
import type { Project } from "@/lib/registry";

export type PublicationFormValues = {
  id?: string;
  projectSlug: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  externalUrl: string;
  status: PublicationStatus;
};

type PublicationFormProps = {
  projects: Project[];
  initialValues: PublicationFormValues;
  submitLabel: string;
  onSubmit: (values: PublicationFormValues) => Promise<void>;
};

export default function PublicationForm({
  projects,
  initialValues,
  submitLabel,
  onSubmit,
}: PublicationFormProps) {
  const [values, setValues] = useState(initialValues);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues.slug));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = useMemo(
    () => [
      { value: PublicationStatus.DRAFT, label: "Borrador" },
      { value: PublicationStatus.PUBLISHED, label: "Publicado" },
      { value: PublicationStatus.ARCHIVED, label: "Archivado" },
    ],
    [],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar la publicación.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Proyecto</span>
          <select
            value={values.projectSlug}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                projectSlug: event.target.value,
              }))
            }
            required
          >
            {projects.map((project) => (
              <option key={project.slug} value={project.slug}>
                {project.emoji} {project.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Estado</span>
          <select
            value={values.status}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                status: event.target.value as PublicationStatus,
              }))
            }
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Título</span>
        <input
          value={values.title}
          onChange={(event) => {
            const title = event.target.value;
            setValues((current) => ({
              ...current,
              title,
              slug: slugTouched ? current.slug : slugifyTitle(title),
            }));
          }}
          required
          maxLength={200}
        />
      </label>

      <label className="field">
        <span>Slug</span>
        <input
          value={values.slug}
          onChange={(event) => {
            setSlugTouched(true);
            setValues((current) => ({ ...current, slug: event.target.value }));
          }}
          required
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          maxLength={120}
        />
      </label>

      <label className="field">
        <span>Extracto</span>
        <textarea
          value={values.excerpt}
          onChange={(event) =>
            setValues((current) => ({ ...current, excerpt: event.target.value }))
          }
          rows={3}
          maxLength={500}
        />
      </label>

      <label className="field">
        <span>URL externa (opcional)</span>
        <input
          type="url"
          value={values.externalUrl}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              externalUrl: event.target.value,
            }))
          }
          placeholder="https://chacachon-stories.vercel.app/cuentos/..."
        />
      </label>

      <label className="field">
        <span>Contenido (opcional, markdown)</span>
        <textarea
          value={values.content}
          onChange={(event) =>
            setValues((current) => ({ ...current, content: event.target.value }))
          }
          rows={10}
        />
      </label>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
