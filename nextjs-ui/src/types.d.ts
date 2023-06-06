declare type User = {
  name?: string;
};

declare type EnhancedChatMessage = ChatMessage & { old?: boolean };

declare type GetAllChatsResponse = { messages: EnhancedChatMessage[] };

declare type AddMessageParams = Pick<ChatMessage, 'sender' | 'message'>;
declare type AddMessageResponse = { error: boolean; message?: string };
