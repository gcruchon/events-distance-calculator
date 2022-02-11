import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const apiSpec = path.join(dirname, 'openapi.yaml');

export default apiSpec;
