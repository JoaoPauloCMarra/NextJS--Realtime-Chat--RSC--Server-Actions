import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  overwrite: true,
  documents: undefined,
  generates: {
    './src/graphql.d.ts': {
      plugins: ['typescript'],
      hooks: {
        afterOneFileWrite: 'prettier --write',
      },
      config: {
        enumsAsTypes: true,
        noExport: true,
        declarationKind: 'declare interface',
      },
    },
    '../nextjs-ui/src/graphql.d.ts': {
      plugins: ['typescript'],
      hooks: {
        afterOneFileWrite: 'prettier --write',
      },
      config: {
        enumsAsTypes: true,
        noExport: true,
        declarationKind: 'declare interface',
      },
    },
  },
  require: ['ts-node/register/transpile-only'],
};

export default config;
