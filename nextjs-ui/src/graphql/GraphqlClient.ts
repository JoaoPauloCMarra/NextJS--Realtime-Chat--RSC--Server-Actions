import { createClient as createWSClient } from 'graphql-ws';
import { Client, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';

export const SERVER_URL = 'localhost:4000';

const GraphqlClient = new Client({
  url: `http://${SERVER_URL}`,
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' };
        return {
          subscribe(sink) {
            const unsubscribe = createWSClient({
              url: `ws://${SERVER_URL}`,
            }).subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});

export default GraphqlClient;
