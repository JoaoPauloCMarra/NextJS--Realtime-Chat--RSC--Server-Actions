import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput, { testID } from './ChatInput';

describe('ChatInput', () => {
  test('calls onSubmit when send button is clicked', () => {
    const onSubmitMock = jest.fn();
    render(<ChatInput onSubmit={onSubmitMock} />);

    const messageInput: HTMLInputElement = screen.getByTestId(testID.messageInput);
    const sendButton: HTMLButtonElement = screen.getByTestId(testID.submitButton);

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    expect(onSubmitMock).toHaveBeenCalledWith('Test message');
    expect(messageInput.value).toBe('');
  });

  test('calls onSubmit when Enter key is pressed in the input field', () => {
    const onSubmitMock = jest.fn();
    render(<ChatInput onSubmit={onSubmitMock} />);

    const messageInput: HTMLInputElement = screen.getByTestId(testID.messageInput);

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.keyDown(messageInput, { key: 'Enter', code: 'Enter' });

    expect(onSubmitMock).toHaveBeenCalledWith('Test message');
    expect(messageInput.value).toBe('');
  });
});
