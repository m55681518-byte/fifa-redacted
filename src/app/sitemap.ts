import type { MetadataRoute } from "next";
import { allDossiers } from "../../data/secrets";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fifa-redacted.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Records are deep-linkable via the ?file= query parameter.
    ...allDossiers.map((d) => ({
      url: `${SITE_URL}/?file=${d.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
