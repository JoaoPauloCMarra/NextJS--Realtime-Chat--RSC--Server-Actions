import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { MOCK_RESPONSE, MOCK_WHEN_DATESTRING } from './datasource';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

type TestServerResponse = {
  body: {
    kind: string;
    singleResult: {
      data: { messages: ChatMessage[]; addChat: ChatMessage };
      errors?: string[];
    };
  };
};

const MOCK_MESSAGE = {
  message: 'Message from Test',
  sender: 'Jest',
};

jest.mock('graphql-subscriptions', () => ({
  PubSub: jest.fn(() => ({
    asyncIterator: jest.fn(),
    publish: jest.fn(),
    subscribe: jest.fn(),
  })),
}));

describe('---> GraphQL Server Tests', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
    });
  });

  afterAll(async () => {
    await server?.stop();
  });

  it('fetches list of messages', async () => {
    const response = await server.executeOperation({
      query: `
      query ChatMessages {
        messages {
          message
          sender
          when
        }
      }`,
      variables: {},
    });
    const { body } = response as unknown as TestServerResponse;

    expect(body.kind).toBe('single');
    expect(body.singleResult.errors).toBeUndefined();
    expect(JSON.stringify(body.singleResult.data)).toBe(JSON.stringify({ messages: MOCK_RESPONSE }));
  });

  it("allows adding a chat message with 'addChat' mutation", async () => {
    const response = await server.executeOperation({
      query: `
      mutation AddChat($message: String!, $sender: String!) {
        addChat(message: $message, sender: $sender) {
          message
          sender
          when
        }
      }`,
      variables: MOCK_MESSAGE,
    });
    const { body } = response as unknown as TestServerResponse;

    expect(body.kind).toBe('single');
    expect(body.singleResult.errors).toBeUndefined();
    expect(JSON.stringify(body.singleResult.data)).toBe(
      JSON.stringify({ addChat: { ...MOCK_MESSAGE, when: MOCK_WHEN_DATESTRING } }),
    );
  });
});
