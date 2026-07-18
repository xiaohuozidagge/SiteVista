import { createClient, type ClientConfig } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./sanity.env";

function getConfig(): ClientConfig | null {
  if (!projectId) return null;
  return {
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
    stega: { enabled: false },
  };
}

function createSanityClient() {
  const config = getConfig();
  if (!config) return null;
  return createClient(config);
}

async function safeFetch<T = unknown>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  const c = createSanityClient();
  if (!c) return null;
  try {
    return await c.fetch<T>(query, params || {});
  } catch {
    return null;
  }
}

export const client = {
  fetch: safeFetch,
};
