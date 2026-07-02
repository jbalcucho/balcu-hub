import registryData from "../../data/registry.json";

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: string;
  emoji: string;
  url: string | null;
  repo: string;
};

export function getProjects(): Project[] {
  return registryData.projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectLabel(slug: string): string {
  return getProjectBySlug(slug)?.name ?? slug;
}
