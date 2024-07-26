import path from 'path';
import { fileURLToPath } from 'url';

export function dirname1(importMetaUrl) {
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = path.dirname(__filename);
    return __dirname;
}

export function dirname2() {
    const __dirname = path.resolve()
    return __dirname
}