import { readFileSync } from 'fs';
import { resolve } from 'path';

import type { TypeSource } from '@graphql-tools/utils';

const GRAPHQL_SCHEMA_PATH = resolve('./src/schema.graphql');

const typeDefs = readFileSync(GRAPHQL_SCHEMA_PATH, {
  encoding: 'utf-8',
}) as TypeSource;

export default typeDefs;
