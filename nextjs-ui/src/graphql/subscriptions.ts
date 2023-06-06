export const SUB_NEW_MESSAGE = `
  subscription NewMessage {
    messageAdded {
      message
      sender
      when
    }
  }
`;
