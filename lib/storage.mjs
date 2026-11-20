import { writeFile, rename, rm } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

export async function atomicWrite(destination, text) {
  const temporary = new URL(`.${destination.pathname.split('/').at(-1)}.${randomUUID()}.tmp`, destination);
  try {
    await writeFile(temporary, text, { mode:0o600 });
    await rename(temporary, destination);
  } finally { await rm(temporary, { force:true }); }
}
