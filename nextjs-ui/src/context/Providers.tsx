'use client';

import { FC, PropsWithChildren } from 'react';
import { Provider } from 'urql';
import GraphqlClient from '@/graphql/GraphqlClient';
import { AuthContextProvider } from './AuthContext';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthContextProvider>
      <Provider value={GraphqlClient}>{children}</Provider>
    </AuthContextProvider>
  );
};

export default Providers;
