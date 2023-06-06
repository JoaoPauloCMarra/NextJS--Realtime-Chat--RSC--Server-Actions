export const QUERY_ALL_MESSAGES = `
  query ChatMessages {
    messages {
      message
      sender
      when
    }
  }
`;
