export const MOCK_WHEN_DATESTRING = '2023-05-23T01:00:00.000Z';

export const MOCK_RESPONSE: ChatMessage[] = [
  { message: 'test 1', sender: 'Jota', when: MOCK_WHEN_DATESTRING },
  { message: 'test 2', sender: 'Robert', when: MOCK_WHEN_DATESTRING },
];

export const CHAT_MESSAGES_DB = process.env.NODE_ENV === 'test' ? MOCK_RESPONSE : [];
