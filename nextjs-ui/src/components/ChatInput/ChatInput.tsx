import { FC, KeyboardEventHandler, memo, useCallback, useEffect, useRef } from 'react';
import styles from './ChatInput.module.css';

type Props = {
  onSubmit: (message: string) => void;
};

const ChatInput: FC<Props> = ({ onSubmit }) => {
  const messageInputRef = useRef<HTMLInputElement>(null);

  const submitMessage = useCallback(() => {
    const value = messageInputRef.current?.value;
    if (!value || value.length === 0) {
      return;
    }

    onSubmit(messageInputRef.current?.value);
    messageInputRef.current.value = '';
  }, [onSubmit]);

  const onEnterPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Enter') {
        void submitMessage();
      }
    },
    [submitMessage],
  );

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      <input
        ref={messageInputRef}
        className={styles.input}
        onKeyDown={onEnterPress}
        placeholder="write your message..."
        type="text"
      />
      <button className={styles.submit} onClick={submitMessage} type="button">
        send
      </button>
    </div>
  );
};

export default memo(ChatInput);
