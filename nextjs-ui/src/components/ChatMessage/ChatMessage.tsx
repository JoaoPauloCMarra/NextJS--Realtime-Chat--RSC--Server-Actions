import { FC, memo, useMemo } from 'react';
import styles from './ChatMessage.module.css';

type Props = {
  data: EnhancedChatMessage;
};

const ChatMessage: FC<Props> = ({ data }) => {
  const { when, sender, message } = data;

  const date = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: false }).format(new Date(when));
  }, [when]);

  return (
    <div className={`${styles.container}${data.old ? ` ${styles.oldMEssage}` : ''}`}>
      <span className={styles.when}>{date}</span>
      <span> </span>
      <span className={styles.sender}>{sender}</span>
      <span>: </span>
      <span className={styles.text}>{message}</span>
    </div>
  );
};

export default memo(ChatMessage);
