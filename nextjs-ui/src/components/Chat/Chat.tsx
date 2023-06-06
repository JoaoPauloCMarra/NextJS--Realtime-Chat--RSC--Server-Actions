import { Children, FC, useCallback, useEffect, useRef } from 'react';
import { ChatInput } from '../ChatInput';
import { ChatMessage } from '../ChatMessage';
import styles from './Chat.module.css';

type Props = {
  user: User;
  messages?: ChatMessage[];
  addMessageMutation: (params: AddMessageParams) => Promise<AddMessageResponse>;
};

const Chat: FC<Props> = ({ user, messages = [], addMessageMutation }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const onSubmitMessage = useCallback(
    async (message: string) => {
      if (!user.name || !message) {
        return;
      }

      await addMessageMutation({ sender: user.name, message });
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    },
    [user?.name, addMessageMutation],
  );

  useEffect(() => {
    if (!user?.name || messages.length === 0) {
      return;
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [user?.name, messages.length]);

  return (
    <div className={styles.container}>
      <div ref={messagesContainerRef} className={styles.messages}>
        {messages.length > 0 ? (
          Children.toArray(messages.map((item) => <ChatMessage data={item} />))
        ) : (
          <span className={styles.emptyMessage}>no messages yet...</span>
        )}
      </div>
      <ChatInput onSubmit={onSubmitMessage} />
    </div>
  );
};

export default Chat;
