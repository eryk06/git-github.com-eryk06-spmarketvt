import * as path from 'path';
import { SERVER_URL } from '../configs';

const ROOT_PATH = path.join(__dirname, '..');
const packageJSON = require(path.resolve(ROOT_PATH, '../package.json'));

export const CROSS_DOMAIN = {
  allowedOrigins: [SERVER_URL],
  allowedReferer: SERVER_URL,
};

export const PROJECT = {
  name: packageJSON.name,
  version: packageJSON.version,
  author: packageJSON.author,
  homepage: packageJSON.homepage,
  documentation: packageJSON.documentation,
  // repository: packageJSON.repository.url
};
