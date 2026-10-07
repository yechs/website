import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { APIRoute } from 'astro';

/**
 * Serves the static /img/portrait.webp image path
 */
export const GET: APIRoute = async () => {
  const portrait = await readFile(
    join(process.cwd(), 'src/images/portrait.webp'),
  );

  return new Response(new Uint8Array(portrait), {
    headers: {
      'Content-Type': 'image/webp',
    },
  });
};
