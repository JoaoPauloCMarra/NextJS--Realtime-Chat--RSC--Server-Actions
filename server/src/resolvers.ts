import { PubSub } from 'graphql-subscriptions';

import { MOCK_WHEN_DATESTRING, CHAT_MESSAGES_DB } from './datasource';

const pubsub = new PubSub();
export const MESSAGE_ADDED = 'MESSAGE_ADDED';

const wait = (seconds: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const resolvers = {
  Query: {
    messages: async (): Promise<ChatMessage[]> => {
      await wait(1.5);
      return CHAT_MESSAGES_DB;
    },
  },
  Mutation: {
    addChat: async (_: unknown, { message, sender }: ChatMessage): Promise<ChatMessage> => {
      const chat = {
        message,
        sender,
        when: process.env.NODE_ENV === 'test' ? MOCK_WHEN_DATESTRING : new Date().toISOString(),
      };
      CHAT_MESSAGES_DB.push(chat);
      pubsub.publish(MESSAGE_ADDED, { messageAdded: chat });
      return chat;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

export default resolvers;
