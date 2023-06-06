'use client';

import { FC, useCallback } from 'react';
import { useSubscription } from 'urql';
import { Chat } from '@/components/Chat';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { useAuthContext } from '@/context/AuthContext';
import { SUB_NEW_MESSAGE } from '@/graphql/subscriptions';
import styles from './Home.module.css';

type Props = {
  initialData: ChatMessage[];
  addMessageMutation: (params: AddMessageParams) => Promise<AddMessageResponse>;
};

const Home: FC<Props> = ({ initialData, addMessageMutation }) => {
  const { loading, user, login, logout } = useAuthContext();
  const [subResult] = useSubscription(
    { query: SUB_NEW_MESSAGE },
    (messages: ChatMessage[] = initialData, response: { messageAdded: ChatMessage }) => {
      return [...messages, response.messageAdded];
    },
  );

  const onLogin = useCallback(
    (name: string) => {
      if (name && name.length >= 3) {
        login(name);
      }
    },
    [login],
  );

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (loading) {
    return <Loading full />;
  }

  return (
    <div className={styles.page}>
      <Header onLogin={onLogin} onLogout={onLogout} user={user} />
      <main>
        {user?.name ? (
          <Chat addMessageMutation={addMessageMutation} messages={subResult.data || initialData} user={user} />
        ) : null}
      </main>
    </div>
  );
};

export default Home;
