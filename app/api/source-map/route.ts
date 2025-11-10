import {NextResponse} from 'next/server';

import {isDeveloperDocs} from 'sentry-docs/isDeveloperDocs';
import {getDevDocsFrontMatter, getDocsFrontMatter} from 'sentry-docs/mdx';

/**
 * API endpoint that returns a mapping of slugs to their source file paths.
 * This is used by the 404 link checker to deduplicate pages that share the same source.
 */
export async function GET() {
  const docs = await (isDeveloperDocs ? getDevDocsFrontMatter() : getDocsFrontMatter());

  const sourceMap: Record<string, string | null> = {};

  for (const doc of docs) {
    // Normalize slug (remove trailing slash if present)
    const slug = doc.slug.replace(/\/$/, '');
    // sourcePath will be null for API-generated pages, which we want to keep
    sourceMap[slug] = doc.sourcePath ?? null;
  }

  return NextResponse.json(sourceMap);
}

