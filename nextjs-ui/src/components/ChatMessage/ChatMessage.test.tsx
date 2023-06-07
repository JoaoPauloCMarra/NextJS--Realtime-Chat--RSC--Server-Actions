import { render, screen } from '@testing-library/react';
import ChatMessage, { testID } from './ChatMessage';

const mockData: EnhancedChatMessage = {
  sender: 'Jest',
  message: 'Hello, this is a test!',
  when: '2000-01-01T12:30:20.000Z',
};

describe('ChatMessage', () => {
  test('renders chat message correctly', () => {
    render(<ChatMessage data={mockData} />);

    const chatMessageContainer: HTMLDivElement = screen.getByTestId(testID.container);
    expect(chatMessageContainer).toBeInTheDocument();

    const whenElement: HTMLSpanElement = screen.getByTestId(testID.when);
    expect(whenElement).toHaveTextContent('12:30');

    const senderElement: HTMLSpanElement = screen.getByTestId(testID.sender);
    expect(senderElement).toHaveTextContent(mockData.sender);

    const textElement: HTMLSpanElement = screen.getByTestId(testID.text);
    expect(textElement).toHaveTextContent(mockData.message);
  });

  test('applies "oldMessage" style when "old" prop is true', () => {
    const dataWithOldProp = { ...mockData, old: true };
    render(<ChatMessage data={dataWithOldProp} />);

    const chatMessageContainer: HTMLDivElement = screen.getByTestId(testID.container);
    expect(chatMessageContainer).toHaveClass('oldMessage');
  });
});
