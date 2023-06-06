import { NextResponse } from 'next/server';
import { MUTATION_ADD_MESSAGE } from '@/graphql/mutations';
import { QUERY_ALL_MESSAGES } from '@/graphql/queries';

export const GET = async (): Promise<NextResponse> => {
  const result = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY_ALL_MESSAGES,
    }),
    cache: 'no-store',
  });

  if (!result.ok) {
    throw Error('Failed to fetch all messages');
  }

  const { data } = (await result.json()) as { data: GetAllChatsResponse };

  return NextResponse.json(data.messages.map((message) => ({ ...message, old: true })));
};

export const POST = async (req: Request): Promise<NextResponse> => {
  const { sender, message } = (await req.json()) as AddMessageParams;

  if (!sender || sender.length < 3 || !message) {
    return NextResponse.json({ error: true, message: 'No valid sender or message proided' });
  }

  const result = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: MUTATION_ADD_MESSAGE,
      variables: { sender, message },
    }),
    cache: 'no-store',
  });

  if (!result.ok) {
    throw Error('Failed to fetch all messages');
  }

  const { data } = (await result.json()) as { data: AddMessageResponse };

  return NextResponse.json(data);
};
