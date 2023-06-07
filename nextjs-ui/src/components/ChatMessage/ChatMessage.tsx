import { FC, memo, useMemo } from 'react';
import styles from './ChatMessage.module.css';

export const testID = {
  container: 'ChatMessage',
  when: 'ChatMessage--when',
  sender: 'ChatMessage--sender',
  text: 'ChatMessage--text',
};

type Props = {
  data: EnhancedChatMessage;
};

const ChatMessage: FC<Props> = ({ data }) => {
  const { when, sender, message } = data;

  const date = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: false, timeZone: 'UTC' }).format(
      new Date(when),
    );
  }, [when]);

  return (
    <div className={`${styles.container}${data.old ? ` ${styles.oldMessage}` : ''}`} data-testid={testID.container}>
      <span className={styles.when} data-testid={testID.when}>
        {date}
      </span>
      <span> </span>
      <span className={styles.sender} data-testid={testID.sender}>
        {sender}
      </span>
      <span>: </span>
      <span className={styles.text} data-testid={testID.text}>
        {message}
      </span>
    </div>
  );
};

export default memo(ChatMessage);
