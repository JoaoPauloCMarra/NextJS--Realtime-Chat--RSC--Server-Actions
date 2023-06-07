import { render, screen } from '@testing-library/react';
import { ChatInputTestID } from '../ChatInput';
import { ChatMessageTestID } from '../ChatMessage';
import Chat, { testID } from './Chat';

const MOCK_USER = { name: 'Jest' };
const MOCK_MESSAGES = [
  { sender: 'User1', message: 'Hello', when: '2000-01-01T12:30:20.000Z' },
  { sender: 'User2', message: 'Hi', when: '2000-01-01T12:30:20.000Z' },
];
const MOCK_ADD_MESSAGE_MUTATION = jest.fn();

describe('Chat', () => {
  test('renders Chat components', () => {
    render(<Chat addMessageMutation={MOCK_ADD_MESSAGE_MUTATION} user={MOCK_USER} />);

    const chatWindow: HTMLDivElement = screen.getByTestId(testID.container);

    expect(chatWindow).toBeInTheDocument();
  });

  test('renders empty message when no messages are provided', () => {
    render(<Chat addMessageMutation={MOCK_ADD_MESSAGE_MUTATION} user={MOCK_USER} />);

    const emptyMessage: HTMLSpanElement = screen.getByTestId(testID.empty);

    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage).toHaveTextContent('no messages yet...');
  });

  test('renders ChatMessage components for each message', () => {
    render(<Chat addMessageMutation={MOCK_ADD_MESSAGE_MUTATION} messages={MOCK_MESSAGES} user={MOCK_USER} />);

    const chatMessages: HTMLDivElement[] = screen.getAllByTestId(ChatMessageTestID.container);

    expect(chatMessages).toHaveLength(MOCK_MESSAGES.length);
  });

  test('renders ChatInput component', () => {
    render(<Chat addMessageMutation={MOCK_ADD_MESSAGE_MUTATION} user={MOCK_USER} />);

    const container = screen.getByTestId(ChatInputTestID.container);
    const messageInput = screen.getByTestId(ChatInputTestID.messageInput);
    const submitButton = screen.getByTestId(ChatInputTestID.submitButton);

    expect(container).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
