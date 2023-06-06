import { HomePage } from '@/components/pages/Home';
import Providers from '@/context/Providers';
import { SERVER_URL } from '@/graphql/GraphqlClient';

const ERROR_RESPONSES = {
  getAllMessages: 'Failed to fetch all chat messages',
  addMessage: 'Failed to create a new message',
};

const messagesSort = (a: ChatMessage, b: ChatMessage) => {
  return new Date(a.when).getTime() - new Date(b.when).getTime();
};

const getAllMessages = async (): Promise<ChatMessage[]> => {
  const result = await fetch(`http://${SERVER_URL}/api`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error(ERROR_RESPONSES.getAllMessages);
  }

  const messages = (await result.json()) as EnhancedChatMessage[];

  return messages.sort(messagesSort);
};

const Home = async () => {
  const messages = await getAllMessages();

  const addMessage = async (params: AddMessageParams) => {
    'use server';

    const result = await fetch(`http://${SERVER_URL}/api`, {
      method: 'POST',
      body: JSON.stringify(params),
    });

    if (!result.ok) {
      throw new Error(ERROR_RESPONSES.addMessage);
    }

    const response = (await result.json()) as AddMessageResponse;

    return response;
  };

  return (
    <Providers>
      <HomePage addMessageMutation={addMessage} initialData={messages} />
    </Providers>
  );
};

export default Home;
