import registryData from "../../data/registry.json";

export type ProjectBrand = {
  logo: string;
  primary: string;
  secondary: string;
  surface: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: string;
  emoji: string;
  url: string | null;
  repo: string;
  brand: ProjectBrand;
};

export function getProjects(): Project[] {
  return registryData.projects as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectLabel(slug: string): string {
  return getProjectBySlug(slug)?.name ?? slug;
}
