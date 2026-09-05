import { createRequire } from 'node:module';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// Resolve through react-pdf so pnpm's isolated dependency tree and the worker
// version always match the installed viewer.
const require = createRequire(import.meta.url);
const pdfRequire = createRequire(require.resolve('react-pdf'));
const pdfPackagePath = pdfRequire.resolve('pdfjs-dist/package.json');
const { version } = pdfRequire('pdfjs-dist/package.json');
const publicDir = new URL('../public/', import.meta.url);
await mkdir(publicDir, { recursive: true });
await copyFile(
  path.join(path.dirname(pdfPackagePath), 'build/pdf.worker.min.mjs'),
  new URL(`pdf.worker.${version}.min.mjs`, publicDir),
);
