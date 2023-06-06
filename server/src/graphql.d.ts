type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
declare interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

declare interface ChatMessage {
  __typename?: 'ChatMessage';
  message: Scalars['String'];
  sender: Scalars['String'];
  when: Scalars['String'];
}

declare interface Mutation {
  __typename?: 'Mutation';
  addChat: ChatMessage;
}

declare interface MutationAddChatArgs {
  message: Scalars['String'];
  sender: Scalars['String'];
}

declare interface Query {
  __typename?: 'Query';
  messages: Array<ChatMessage>;
}

declare interface Subscription {
  __typename?: 'Subscription';
  messageAdded: ChatMessage;
}
