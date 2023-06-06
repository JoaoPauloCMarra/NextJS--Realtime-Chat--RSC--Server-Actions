import { createServer } from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bodyParser from 'body-parser';
import cors, { CorsRequest } from 'cors';
import express, { Request, Response } from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const PORT = process.env.PORT || 4000;
const BASE_PATH = process.env.BASE_PATH || '/';
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: BASE_PATH,
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart(): Promise<{ drainServer(): Promise<void> }> {
        return {
          async drainServer(): Promise<void> {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

async function main(): Promise<void> {
  await server.start();

  app.use(BASE_PATH, cors<CorsRequest>(), bodyParser.json(), expressMiddleware(server));

  app.use((err: Error, _: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}`);
  });
}

void main();
